import { ImageResponse } from "next/og";
import { services, site } from "@/lib/site";

export const alt = `${site.name} — asphalt repair, paving and sealcoating in Middle Tennessee`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Deliberately built from layout and colour rather than a webfont: fetching a
   font at build time would add a network dependency to every deploy for a
   marginal gain in an image most people see at thumbnail size. */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#17181A",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Striping, at the rhythm of a road centreline */}
        <div style={{ display: "flex", gap: 26 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ width: 62, height: 8, backgroundColor: "#F2C230" }} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              color: "#F2C230",
              textTransform: "uppercase",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 84,
              lineHeight: 1.02,
              fontWeight: 800,
              color: "#E8E6E1",
              letterSpacing: -2,
            }}
          >
            Asphalt fails from the bottom up.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 27,
              color: "#9A9CA1",
            }}
          >
            {services.map((service) => service.name).join("  ·  ")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #2E3136",
            paddingTop: 26,
            fontSize: 25,
            letterSpacing: 3,
            color: "#E8E6E1",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>Middle Tennessee</div>
          <div style={{ display: "flex", color: "#F2C230" }}>{site.phone.display}</div>
        </div>
      </div>
    ),
    size,
  );
}
