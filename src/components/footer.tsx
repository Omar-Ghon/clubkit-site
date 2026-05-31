"use client";

import Image from "next/image";
import { clubData } from "@/data/club-data";

export default function Footer() {
  const { footer, clubName } = clubData;
  const sections = footer.sections.slice(0, 3);

  // ── Count total columns so we can set grid breakpoints ───────────────────
  // Each visible column (brand, up to 3 sections, social) is one grid cell.
  const totalCols =
    (footer.brand.show ? 1 : 0) +
    sections.length +
    (footer.social.show ? 1 : 0);

  // ── Responsive stacking strategy ─────────────────────────────────────────
  // We use CSS Grid. The grid starts as a single column on small screens and
  // gains columns at each breakpoint until all columns are side-by-side.
  // The thresholds below are chosen so the layout only adds a column when
  // there's genuinely enough room — avoiding the hard binary flip.
  //
  // Breakpoints:
  //   < 480px  → 1 column  (all stacked)
  //   480–699  → 2 columns (pairs)
  //   700–959  → 3 columns (or all if totalCols ≤ 3)
  //   960+     → all columns side by side (up to 5)
  //
  // `minmax(0, 1fr)` on every cell ensures equal widths at every stage.

  const colsAt480 = Math.min(2, totalCols);
  const colsAt700 = Math.min(3, totalCols);
  const colsAt960 = totalCols;

  const sectionItemGapCSS = sections
    .map(
      (s, i) => `
      .ck-footer-section-${i} .ck-footer-item + .ck-footer-item { margin-top: ${s.item.gap.mobile}px; }
      .ck-footer-section-${i} .ck-footer-item                    { font-size: ${s.item.size.mobile}px; }
      .ck-footer-section-${i} .ck-footer-item-heading            { font-size: ${s.heading.size.mobile}px; }
      @media (min-width: 960px) {
        .ck-footer-section-${i} .ck-footer-item + .ck-footer-item { margin-top: ${s.item.gap.desktop}px; }
        .ck-footer-section-${i} .ck-footer-item                    { font-size: ${s.item.size.desktop}px; }
        .ck-footer-section-${i} .ck-footer-item-heading            { font-size: ${s.heading.size.desktop}px; }
      }
    `
    )
    .join("");

  const css = `
    /* ── Font sizes ── */
    .ck-footer-brand-name     { font-size: ${footer.brand.name.size.mobile}px; }
    .ck-footer-copyright      { font-size: ${footer.copyright?.size.mobile ?? 12}px; }
    .ck-footer-social-heading { font-size: ${footer.social.heading.size.mobile}px; }
    .ck-footer-inner          { padding: ${footer.padding.mobile}px 20px; }

    @media (min-width: 960px) {
      .ck-footer-brand-name     { font-size: ${footer.brand.name.size.desktop}px; }
      .ck-footer-copyright      { font-size: ${footer.copyright?.size.desktop ?? 13}px; }
      .ck-footer-social-heading { font-size: ${footer.social.heading.size.desktop}px; }
      .ck-footer-inner          { padding: ${footer.padding.desktop}px 40px; }
    }

    /* ── Grid layout — gradual stacking ── */
    .ck-footer-columns {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 36px;
    }
    @media (min-width: 480px) {
      .ck-footer-columns {
        grid-template-columns: repeat(${colsAt480}, minmax(0, 1fr));
      }
    }
    @media (min-width: 700px) {
      .ck-footer-columns {
        grid-template-columns: repeat(${colsAt700}, minmax(0, 1fr));
        gap: 40px;
      }
    }
    @media (min-width: 960px) {
      .ck-footer-columns {
        grid-template-columns: repeat(${colsAt960}, minmax(0, 1fr));
        gap: 48px;
      }
    }

    /* ── Link hover ── */
    .ck-footer-item-link {
      text-decoration: none;
      transition: color 0.18s ease;
    }

    ${sectionItemGapCSS}

    /* ── Social icon hover ── */
    .ck-footer-social-btn {
      transition: transform 0.18s ease;
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }
    .ck-footer-social-btn-scale:hover {
      transform: scale(${footer.social.hoverScale});
    }
    .ck-footer-icon-swap-hover {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.18s ease;
    }
    .ck-footer-social-btn:hover .ck-footer-icon-swap-hover {
      opacity: 1;
    }
    .ck-footer-social-btn:hover .ck-footer-icon-swap-default {
      opacity: 0;
    }
    .ck-footer-icon-swap-default {
      transition: opacity 0.18s ease;
    }
  `;

  // ── Shared section heading style ──────────────────────────────────────────
  function SectionHeading({
    text,
    color,
    fontWeight,
  }: {
    text: string;
    color: string;
    fontWeight: number;
  }) {
    return (
      <span
        className="ck-footer-item-heading"
        style={{
          color,
          fontWeight,
          marginBottom: 16,
          display: "block",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontSize: "inherit", // controlled by injected CSS per-section
        }}
      >
        {text}
      </span>
    );
  }

  // ── Brand column ─────────────────────────────────────────────────────────
  function BrandColumn() {
    if (!footer.brand.show) return null;
    const { brand } = footer;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {brand.logo.show && brand.logo.src && (
            <Image
              src={brand.logo.src}
              alt={`${clubName} logo`}
              width={brand.logo.size.desktop}
              height={brand.logo.size.desktop}
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
          )}
          {brand.name.show && (
            <span
              className="ck-footer-brand-name"
              style={{
                color: brand.name.color,
                fontWeight: brand.name.fontWeight,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              {brand.name.text}
            </span>
          )}
        </div>
      </div>
    );
  }

  // ── Single content section ────────────────────────────────────────────────
  function ContentSection({
    section,
    index,
  }: {
    section: (typeof sections)[number];
    index: number;
  }) {
    return (
      <div
        className={`ck-footer-section-${index}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {section.heading.text && (
          <SectionHeading
            text={section.heading.text}
            color={section.heading.color}
            fontWeight={section.heading.fontWeight}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {section.items.map((item, j) => {
            const isLink = !!item.href;
            const baseStyle: React.CSSProperties = {
              color: section.item.color,
              lineHeight: 1.6,
              display: "block",
            };
            return isLink ? (
              <a
                key={j}
                href={item.href!}
                className="ck-footer-item ck-footer-item-link"
                style={baseStyle}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    section.item.hoverColor)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    section.item.color)
                }
              >
                {item.label}
              </a>
            ) : (
              <span key={j} className="ck-footer-item" style={baseStyle}>
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Social column ─────────────────────────────────────────────────────────
  function SocialColumn() {
    if (!footer.social.show) return null;
    const { social } = footer;
    const isScale = social.hoverEffect === "scale";
    const isSwap  = social.hoverEffect === "swap";
    const sz      = social.iconSize.desktop;
    const circPad = social.circle.show ? social.circle.padding : 0;
    const boxSize = sz + circPad * 2;

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {social.heading.text && (
          <SectionHeading
            text={social.heading.text}
            color={social.heading.color}
            fontWeight={social.heading.fontWeight}
          />
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: social.iconGap.desktop,
          }}
        >
          {social.icons.map((icon) => (
            <a
              key={icon.label}
              href={icon.href}
              aria-label={icon.label}
              target="_blank"
              rel="noopener noreferrer"
              className={`ck-footer-social-btn${isScale ? " ck-footer-social-btn-scale" : ""}`}
            >
              <span
                style={{
                  width:        boxSize,
                  height:       boxSize,
                  borderRadius: "50%",
                  background:   social.circle.show ? social.circle.color : "transparent",
                  display:      "inline-flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  flexShrink:   0,
                  position:     "relative",
                }}
              >
                {/* Default icon */}
                <span
                  className={isSwap ? "ck-footer-icon-swap-default" : undefined}
                  style={{ display: "inline-flex" }}
                >
                  <Image
                    src={icon.src}
                    alt={icon.label}
                    width={sz}
                    height={sz}
                    style={{ display: "block" }}
                  />
                </span>
                {/* Swap hover icon */}
                {isSwap && icon.hoverSrc && (
                  <span className="ck-footer-icon-swap-hover">
                    <Image
                      src={icon.hoverSrc}
                      alt={`${icon.label} hover`}
                      width={sz}
                      height={sz}
                      style={{ display: "block" }}
                    />
                  </span>
                )}
              </span>
            </a>
          ))}
        </div>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <footer
        style={{
          background: footer.backgroundColor,
          borderTop: footer.topBorder.show
            ? `1px solid ${footer.topBorder.color}`
            : "none",
        }}
      >
        <div className="ck-footer-inner" style={{ maxWidth: 1152, margin: "0 auto" }}>

          {/* ── Columns grid ───────────────────────────────────────────── */}
          <div className="ck-footer-columns">
            {footer.brand.show  && <BrandColumn />}
            {sections.map((s, i) => (
              <ContentSection key={i} section={s} index={i} />
            ))}
            {footer.social.show && <SocialColumn />}
          </div>

          {/* ── Copyright ──────────────────────────────────────────────── */}
          {footer.copyright?.text && (
            <div
              style={{
                marginTop: 48,
                paddingTop: 24,
                borderTop: `1px solid ${footer.topBorder.color}`,
              }}
            >
              <p
                className="ck-footer-copyright"
                style={{
                  color: footer.copyright.color,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {footer.copyright.text}
              </p>
            </div>
          )}

        </div>
      </footer>
    </>
  );
}