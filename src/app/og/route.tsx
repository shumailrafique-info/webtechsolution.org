import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

const WIDTH = 1200;
const HEIGHT = 630;

/** Keeps a pasted essay from overflowing the card. */
function clamp(value: string | null, max: number, fallback = "") {
  const text = (value ?? "").trim();
  if (!text) return fallback;
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const title = clamp(params.get("title"), 90, "Web Tech Solutions");
  const description = clamp(
    params.get("description"),
    140,
    "Web development, design and digital solutions for growing businesses.",
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        // An orange band down the left keeps the card recognisable at thumbnail
        // size, where the text is too small to read.
        borderLeft: "24px solid #f4552b",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#f4552b",
          }}
        >
          Web Tech Solutions
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: title.length > 55 ? 60 : 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1c1917",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 30,
            lineHeight: 1.4,
            color: "#6b6560",
          }}
        >
          {description}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            padding: "10px 20px",
            borderRadius: 999,
            backgroundColor: "#ffe9e1",
            color: "#b03a16",
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          400+ styles
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#6b6560" }}>
          Free · Copy and paste ready
        </div>
      </div>
    </div>,
    { width: WIDTH, height: HEIGHT },
  );
}
