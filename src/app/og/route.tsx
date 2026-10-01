import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE_DOMAIN, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

const WIDTH = 1200;
const HEIGHT = 630;

const ORANGE = "#f4552b";
const ORANGE_DEEP = "#b8380f";
const INK = "#1c1917";

const assets = Promise.all([
  readFile(join(process.cwd(), "assets/og/bricolage-700.ttf")),
  readFile(join(process.cwd(), "assets/og/bricolage-500.ttf")),
  readFile(join(process.cwd(), "assets/og/logo.png"), "base64"),
]);

function clamp(value: string | null, max: number, fallback = "") {
  const text = (value ?? "").trim();
  if (!text) return fallback;
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const title = clamp(params.get("title"), 96, SITE_NAME);
  const description = clamp(params.get("description"), 150, SITE_TAGLINE);
  const eyebrow = clamp(params.get("eyebrow"), 40);

  const [bold, medium, logo] = await assets;
  const titleSize = title.length > 70 ? 56 : title.length > 42 ? 66 : 78;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: "#ffffff",
        fontFamily: "Bricolage",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -160,
          bottom: -220,
          width: 640,
          height: 640,
          borderRadius: 9999,
          backgroundImage: `radial-gradient(circle, rgba(244,85,43,0.22), rgba(244,85,43,0) 70%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 18,
          backgroundImage: `linear-gradient(180deg, ${ORANGE}, ${ORANGE_DEEP})`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "64px 80px 60px 98px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain img */}
          <img
            src={`data:image/png;base64,${logo}`}
            alt=""
            width={260}
            height={75}
            style={{ objectFit: "contain" }}
          />
          {eyebrow ? (
            <div
              style={{
                display: "flex",
                marginLeft: 28,
                padding: "8px 18px",
                borderRadius: 999,
                backgroundColor: "#fff1ec",
                color: ORANGE_DEEP,
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: INK,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#57534e",
              maxWidth: 940,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 24,
              fontWeight: 500,
              color: "#57534e",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                backgroundColor: ORANGE,
                marginRight: 12,
              }}
            />
            SEO · Web &amp; App Development · Digital Marketing
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              color: ORANGE_DEEP,
            }}
          >
            {SITE_DOMAIN}
          </div>
        </div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Bricolage", data: bold, weight: 700, style: "normal" },
        { name: "Bricolage", data: medium, weight: 500, style: "normal" },
      ],
      headers: {
        "Cache-Control":
          "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
      },
    },
  );
}
