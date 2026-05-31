"use client";

import Image from "next/image";
import { clubData } from "@/data/club-data";
import { HEADER_HEIGHT } from "@/lib/constants";

export default function Hero() {
  const { hero, header } = clubData;

  if (hero.layout === "none") return null;

  const isTransparentHeader = header.style === "transparent";

  // When the header is transparent it is fixed and overlays the top of the
  // page. The hero must start at top: 0 (behind the header) and push its own
  // content down by HEADER_HEIGHT so nothing is hidden.
  // When the header is solid it sits above the hero in normal flow — no
  // offset is needed here at all.
  const contentPaddingTop = isTransparentHeader ? HEADER_HEIGHT : 0;

  // ── Derived alignment values ─────────────────────────────────────────────
  const pos = hero.contentPosition;
  const flexJustify =
    pos === "left" ? "flex-start" : pos === "right" ? "flex-end" : "center";
  const textAlign = pos; // "left" | "center" | "right"
  const itemsAlign =
    pos === "left" ? "flex-start" : pos === "right" ? "flex-end" : "center";

  // ── Injected CSS (responsive font sizes, mobile layout overrides) ─────────
  const css = `
    .ck-hero-heading {
      font-size: ${hero.heading.size.mobile}px;
    }
    .ck-hero-subheading {
      font-size: ${hero.subheading.size.mobile}px;
    }
    .ck-hero-cta-primary {
      font-size: ${hero.cta.size.mobile}px;
    }
    .ck-hero-cta-secondary {
      font-size: ${hero.ctaSecondary.size.mobile}px;
    }
    .ck-hero-stat-value {
      font-size: ${hero.stats.value.size.mobile}px;
    }
    .ck-hero-stat-label {
      font-size: ${hero.stats.label.size.mobile}px;
    }
    @media (min-width: 769px) {
      .ck-hero-heading    { font-size: ${hero.heading.size.desktop}px; }
      .ck-hero-subheading { font-size: ${hero.subheading.size.desktop}px; }
      .ck-hero-cta-primary     { font-size: ${hero.cta.size.desktop}px; }
      .ck-hero-cta-secondary   { font-size: ${hero.ctaSecondary.size.desktop}px; }
      .ck-hero-stat-value { font-size: ${hero.stats.value.size.desktop}px; }
      .ck-hero-stat-label { font-size: ${hero.stats.label.size.desktop}px; }
    }

    /* Split / angled → stack on mobile */
    @media (max-width: 768px) {
      .ck-hero-two-col {
        flex-direction: column !important;
      }
      .ck-hero-media-panel {
        width: 100% !important;
        min-height: 260px;
        max-height: 380px;
        /* reset any desktop clip-path on the wrapper */
        clip-path: none !important;
      }
      .ck-hero-text-panel {
        width: 100% !important;
      }
      /* Angled clip lives on a child div — strip it on mobile */
      .ck-hero-angled-media-inner {
        clip-path: none !important;
      }
    }

    /* CTA hover — shadow pulse */
    .ck-hero-btn {
      transition: opacity 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
    }
    .ck-hero-btn:hover {
      opacity: 0.92;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
    .ck-hero-btn:active {
      transform: translateY(0px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    }
  `;

  const minHeightCSS = `
    .ck-hero-section {
      min-height: ${hero.minHeight.mobile}vh;
    }
    @media (min-width: 769px) {
      .ck-hero-section {
        min-height: ${hero.minHeight.desktop}vh;
      }
    }
  `;

  // ── Media background (image or video) ────────────────────────────────────
  // isMobile prop is not available server-side; we instead render both images
  // and show/hide via CSS classes to avoid layout shift.
  function MediaBackground() {
    const { media } = hero;

    const videoOrImageDesktop = media.video ?? media.imageDesktop;
    const videoOrImageMobile  = media.video ?? media.imageMobile;

    return (
      <>
        <style>{`
          .ck-hero-media-desktop { display: block; }
          .ck-hero-media-mobile  { display: none;  }
          @media (max-width: 768px) {
            .ck-hero-media-desktop { display: none;  }
            .ck-hero-media-mobile  { display: block; }
          }
        `}</style>

        {/* Desktop */}
        <div className="ck-hero-media-desktop" style={{ position: "absolute", inset: 0 }}>
          {media.video ? (
            <video autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: media.position }}>
              <source src={media.video} />
            </video>
          ) : media.imageDesktop ? (
            <Image src={media.imageDesktop} alt="" fill priority
              style={{ objectFit: "cover", objectPosition: media.position }} />
          ) : null}
        </div>

        {/* Mobile */}
        <div className="ck-hero-media-mobile" style={{ position: "absolute", inset: 0 }}>
          {media.video ? (
            <video autoPlay muted loop playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: media.position }}>
              <source src={media.video} />
            </video>
          ) : media.imageMobile ? (
            <Image src={media.imageMobile} alt="" fill priority
              style={{ objectFit: "cover", objectPosition: media.position }} />
          ) : null}
        </div>

        {/* Overlay */}
        {(media.video || media.imageDesktop || media.imageMobile) && (
          <div style={{
            position: "absolute", inset: 0,
            background: media.overlayColor,
            opacity: media.overlayOpacity,
          }} />
        )}
      </>
    );
  }

  // ── Media panel inner content (for split / angled) ────────────────────────
  // Handles padded vs edge-to-edge image within a panel.
  function MediaPanelContent() {
    const { media } = hero;
    const padded = media.padded;
    const pad = media.paddingAmount;

    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {padded ? (
          // Padded: image sits inset, background colour shows around it
          <div style={{
            position: "absolute",
            inset: pad,
            borderRadius: 8,
            overflow: "hidden",
          }}>
            <MediaBackground />
          </div>
        ) : (
          <MediaBackground />
        )}
      </div>
    );
  }

  // ── Text + CTA content block ──────────────────────────────────────────────
  function TextBlock({ extraPaddingTop = 0 }: { extraPaddingTop?: number }) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: itemsAlign,
        textAlign,
        paddingTop: extraPaddingTop,
        gap: 0,
        width: "100%",
      }}>

        {/* Heading */}
        <h1 className="ck-hero-heading" style={{
          color: hero.heading.color,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          margin: 0,
        }}>
          {hero.heading.text}
        </h1>

        {/* Subheading */}
        {hero.subheading.text && (
          <p className="ck-hero-subheading" style={{
            color: hero.subheading.color,
            lineHeight: 1.6,
            margin: "20px 0 0",
            maxWidth: "52ch",
          }}>
            {hero.subheading.text}
          </p>
        )}

        {/* CTA buttons */}
        {(hero.cta.label || hero.ctaSecondary.label) && (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 36,
            justifyContent: itemsAlign,
          }}>
            {hero.cta.label && (
              <a href={hero.cta.href} className="ck-hero-btn ck-hero-cta-primary"
                style={btnStyle(hero.cta)}>
                {hero.cta.label}
              </a>
            )}
            {hero.ctaSecondary.label && (
              <a href={hero.ctaSecondary.href} className="ck-hero-btn ck-hero-cta-secondary"
                style={btnStyle(hero.ctaSecondary)}>
                {hero.ctaSecondary.label}
              </a>
            )}
          </div>
        )}

        {/* Stats strip */}
        {hero.stats.show && <StatsStrip />}

      </div>
    );
  }

  // ── Stats strip ───────────────────────────────────────────────────────────
 function StatsStrip() {
  const { stats } = hero;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 24,
        marginTop: 52,
        paddingTop: 32,
        borderTop: `1px solid ${stats.dividerColor}`,
        width: "100%",
      }}
    >
      {stats.items.map((stat) => (
        <div
          key={stat.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 6,
          }}
        >
          <span
            className="ck-hero-stat-value"
            style={{
              color: stats.value.color,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {stat.value}
          </span>

          <span
            className="ck-hero-stat-label"
            style={{
              color: stats.label.color,
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

  // ── Button styles ─────────────────────────────────────────────────────────
  function btnStyle(btn: { variant: "solid" | "outline"; backgroundColor: string; textColor: string; borderColor: string }): React.CSSProperties {
    return {
      display: "inline-block",
      padding: "14px 32px",
      borderRadius: 6,
      fontWeight: 600,
      textDecoration: "none",
      cursor: "pointer",
      border: `2px solid ${btn.borderColor}`,
      background: btn.variant === "outline" ? "transparent" : btn.backgroundColor,
      color: btn.textColor,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LAYOUT: full-viewport
  // ─────────────────────────────────────────────────────────────────────────
  if (hero.layout === "full-viewport") {
    // Horizontal padding on left/right so content doesn't hug the screen edge
    const sidePad = 48;

    return (
      <>
        <style>{css + minHeightCSS}</style>
        <section className="ck-hero-section" style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: flexJustify,
          background: hero.background.color,
          overflow: "hidden",
        }}>
          {/* Full-bleed media */}
          <div style={{ position: "absolute", inset: 0 }}>
            <MediaBackground />
          </div>

          {/* Content block */}
          <div style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            // Cap max-width when centred; left/right aligned content gets a
            // narrower box that sits near the edge with side padding.
            maxWidth: pos === "center" ? 860 : 620,
            // When left or right, we use margin instead of auto to hug the edge
            marginLeft:  pos === "left"  ? 0      : pos === "center" ? "auto" : "auto",
            marginRight: pos === "right" ? 0      : pos === "center" ? "auto" : 0,
            padding: pos === "center"
              ? `${contentPaddingTop + 80}px ${sidePad}px 80px`
              : pos === "left"
              ? `${contentPaddingTop + 80}px ${sidePad}px 80px ${sidePad}px`
              : `${contentPaddingTop + 80}px ${sidePad}px 80px ${sidePad}px`,
          }}>
            <TextBlock />
          </div>
        </section>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LAYOUT: split
  // ─────────────────────────────────────────────────────────────────────────
  if (hero.layout === "split") {
    const mediaLeft = hero.mediaSide === "left";
    const leftPct   = hero.splitLeftPercent;
    const rightPct  = 100 - leftPct;

    // Text panel width is whichever side text is on
    const textPct  = mediaLeft ? rightPct : leftPct;
    const mediaPct = mediaLeft ? leftPct  : rightPct;

    return (
      <>
        <style>{css + minHeightCSS}</style>
        <section className="ck-hero-section ck-hero-two-col" style={{
          position: "relative",
          display: "flex",
          flexDirection: mediaLeft ? "row" : "row-reverse",
          overflow: "hidden",
        }}>
          {/* Text panel */}
          <div className="ck-hero-text-panel" style={{
            width: `${textPct}%`,
            display: "flex",
            alignItems: "center",
            justifyContent: flexJustify,
            background: hero.background.color,
            padding: `${contentPaddingTop + 64}px 48px 64px`,
            boxSizing: "border-box",
            flexShrink: 0,
          }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <TextBlock />
            </div>
          </div>

          {/* Media panel */}
          <div className="ck-hero-media-panel" style={{
            width: `${mediaPct}%`,
            position: "relative",
            flexShrink: 0,
            // Background colour shows when padded: true
            background: hero.background.color,
          }}>
            <MediaPanelContent />
          </div>
        </section>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // LAYOUT: angled
  // ─────────────────────────────────────────────────────────────────────────
if (hero.layout === "angled") {
  const mediaLeft = hero.mediaSide === "left";

  const clipPath = mediaLeft
    ? "polygon(0 0, 92% 0, 100% 100%, 0 100%)"
    : "polygon(8% 0, 100% 0, 100% 100%, 0 100%)";

  return (
    <>
      <style>{css + minHeightCSS}</style>

      <section
        className="ck-hero-section ck-hero-two-col"
        style={{
          position: "relative",
          display: "flex",
          flexDirection: mediaLeft ? "row" : "row-reverse",
          background: hero.background.color,
          overflow: "hidden",
        }}
      >
        {/* Media side spacer */}
        <div
          className="ck-hero-media-spacer"
          style={{
            width: "45%",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />

        {/* Text panel */}
        <div
          className="ck-hero-text-panel"
          style={{
            width: "55%",
            flexShrink: 0,
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: flexJustify,
            padding: `${contentPaddingTop + 64}px 56px 64px`,
            boxSizing: "border-box",
            background: hero.background.color,
          }}
        >
          <div style={{ width: "100%", maxWidth: 520 }}>
            <TextBlock />
          </div>
        </div>

        {/* Actual media panel */}
        <div
          className="ck-hero-media-panel"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            ...(mediaLeft ? { left: 0 } : { right: 0 }),
            width: "60%",
            background: hero.background.color,
            zIndex: 1,
          }}
        >
          <div
            className="ck-hero-angled-media-inner"
            style={{
              position: "absolute",
              inset: 0,
              clipPath,
              overflow: "hidden",
            }}
          >
            <MediaPanelContent />
          </div>
        </div>
      </section>
    </>
  );
}

  return null;
}