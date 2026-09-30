import { acceptedTypes } from "@/lib/utils";
import { getSignedURL } from "@/server/actions/upload-to-aws";

export type UploadedImage = { url: string; key: string };

async function sha256(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function isAcceptedImage(file: File) {
  return acceptedTypes.includes(file.type);
}

export async function uploadImageToS3(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<UploadedImage> {
  if (!isAcceptedImage(file)) {
    throw new Error("Only JPG, PNG, WebP and GIF images can be uploaded.");
  }

  const checksum = await sha256(file);
  const signed = await getSignedURL(file.type, file.size, checksum, file.name);
  if (!signed.success || !signed.data) {
    throw new Error(signed.error || "Could not start the upload.");
  }

  const { uploadUrl, publicUrl, key } = signed.data;

  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Upload failed (${xhr.status})`));
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.send(file);
  });

  return { url: publicUrl, key };
}
