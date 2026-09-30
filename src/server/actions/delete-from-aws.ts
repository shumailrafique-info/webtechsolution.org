"use server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { BUCKET, s3 } from "@/lib/aws";

export async function deleteS3Objects(inputs: string[]): Promise<{
  success: boolean;
  deleted: string[];
  failed: string[];
}> {
  console.log("Attempting to delete from S3:", inputs);
  const keys = inputs.filter(Boolean).map((input) => {
    try {
      if (input.startsWith("http")) {
        return decodeURIComponent(new URL(input).pathname.slice(1));
      }
      return input;
    } catch {
      return input;
    }
  });

  const uniqueKeys = [...new Set(keys)];

  if (uniqueKeys.length === 0) {
    return { success: true, deleted: [], failed: [] };
  }

  const results = await Promise.allSettled(
    uniqueKeys.map((key) =>
      s3.send(
        new DeleteObjectCommand({
          Bucket: BUCKET,
          Key: key,
        }),
      ),
    ),
  );

  const deleted: string[] = [];
  const failed: string[] = [];

  results.forEach((res, idx) => {
    const key = uniqueKeys[idx];
    if (res.status === "fulfilled") {
      deleted.push(key);
    } else {
      failed.push(key);
      console.warn(`⚠️ Failed to delete [${key}]:`, res.reason);
    }
  });

  return {
    success: failed.length === 0,
    deleted,
    failed,
  };
}
