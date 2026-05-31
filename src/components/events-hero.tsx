"use client";

import Image from "next/image";
import { eventPageData } from "@/data/event-data";
import { clubData } from "@/data/club-data";
import { HEADER_HEIGHT } from "@/lib/constants";

export default function EventsHero() {
  const { hero } = eventPageData;
  const { header } = clubData;

  if (hero.layout === "none") return null;

  // Transparent header is fixed and overlays the page — offset content down.
  // Solid header sits above in normal flow — no offset needed.
  const contentPaddingTop = header.style === "transparent" ? HEADER_HEIGHT : 0;

  const pos = hero.contentPosition;
  const flexJustify =
    pos === "left" ? "flex-start" : pos === "right" ? "flex-end" : "center";
  const textAlign = pos;
  const itemsAlign =
    pos === "left" ? "flex-start" : pos === "right" ? "flex-end" : "center";

  const { media } = hero;

  // Scale up blurred media slightly so blurred edges don't show through.
  const blurStyle: React.CSSProperties = media.blur
    ? { filter: `blur(${media.blurAmount}px)`, transform: "scale(1.08)" }
    : {};

  const hasMedia =
    hero.layout === "image"
      ? media.imageDesktop || media.imageMobile
      : media.videoDesktop || media.videoMobile;

  const css = `
    .ck-evhero-section {
      min-height: ${hero.minHeight.mobile}vh;
    }
    .ck-evhero-heading {
      font-size: ${hero.heading.size.mobile}px;
    }
    .ck-evhero-subheading {
      font-size: ${hero.subheading.size.mobile}px;
    }
    .ck-evhero-cta {
      font-size: ${hero.cta.size.mobile}px;
    }
    .ck-evhero-media-desktop { display: block; }
    .ck-evhero-media-mobile  { display: none;  }

    @media (min-width: 769px) {
      .ck-evhero-section    { min-height: ${hero.minHeight.desktop}vh; }
      .ck-evhero-heading    { font-size: ${hero.heading.size.desktop}px; }
      .ck-evhero-subheading { font-size: ${hero.subheading.size.desktop}px; }
      .ck-evhero-cta        { font-size: ${hero.cta.size.desktop}px; }
    }
    @media (max-width: 768px) {
      .ck-evhero-media-desktop { display: none;  }
      .ck-evhero-media-mobile  { display: block; }
    }

    .ck-evhero-btn {
      transition: opacity 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    }
    .ck-evhero-btn:hover {
      opacity: 0.92;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
    .ck-evhero-btn:active {
      transform: translateY(0px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }
  `;

  return (
    <>
      <style>{css}</style>
      <section
        className="ck-evhero-section"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: flexJustify,
          background: hero.background.color,
          overflow: "hidden",
        }}
      >
        {/* ── Media layer ─────────────────────────────────────────────────── */}
        {hasMedia && (
          <div style={{ position: "absolute", inset: 0 }}>

            {hero.layout === "image" ? (
              <>
                {media.imageDesktop && (
                  <div className="ck-evhero-media-desktop"
                    style={{ position: "absolute", inset: 0 }}>
                    <Image src={media.imageDesktop} alt="" fill priority
                      style={{ objectFit: "cover", objectPosition: media.position, ...blurStyle }} />
                  </div>
                )}
                {media.imageMobile && (
                  <div className="ck-evhero-media-mobile"
                    style={{ position: "absolute", inset: 0 }}>
                    <Image src={media.imageMobile} alt="" fill priority
                      style={{ objectFit: "cover", objectPosition: media.position, ...blurStyle }} />
                  </div>
                )}
              </>
            ) : (
              <>
                {media.videoDesktop && (
                  <div className="ck-evhero-media-desktop"
                    style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                    <video autoPlay muted loop playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover",
                               objectPosition: media.position, ...blurStyle }}>
                      <source src={media.videoDesktop} />
                    </video>
                  </div>
                )}
                {media.videoMobile && (
                  <div className="ck-evhero-media-mobile"
                    style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                    <video autoPlay muted loop playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover",
                               objectPosition: media.position, ...blurStyle }}>
                      <source src={media.videoMobile} />
                    </video>
                  </div>
                )}
              </>
            )}

            {/* Overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: media.overlayColor,
              opacity: media.overlayOpacity,
            }} />

          </div>
        )}

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <div style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: pos === "center" ? 860 : 620,
          marginLeft:  pos === "left"  ? 0      : "auto",
          marginRight: pos === "right" ? 0      : pos === "center" ? "auto" : 0,
          padding: `${contentPaddingTop + 80}px 48px 80px`,
          display: "flex",
          flexDirection: "column",
          alignItems: itemsAlign,
          textAlign,
          boxSizing: "border-box",
        }}>

          <h1 className="ck-evhero-heading" style={{
            color: hero.heading.color,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            {hero.heading.text}
          </h1>

          {hero.subheading.show && hero.subheading.text && (
            <p className="ck-evhero-subheading" style={{
              color: hero.subheading.color,
              lineHeight: 1.6,
              margin: "20px 0 0",
              maxWidth: "52ch",
            }}>
              {hero.subheading.text}
            </p>
          )}

          {hero.cta.show && hero.cta.label && (
            <div style={{ marginTop: 36 }}>
              <a href={hero.cta.href} className="ck-evhero-btn ck-evhero-cta"
                style={{
                  display: "inline-block",
                  padding: "14px 32px",
                  borderRadius: 6,
                  fontWeight: 600,
                  textDecoration: "none",
                  cursor: "pointer",
                  border: `2px solid ${hero.cta.borderColor}`,
                  background: hero.cta.variant === "outline" ? "transparent" : hero.cta.backgroundColor,
                  color: hero.cta.textColor,
                }}>
                {hero.cta.label}
              </a>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
