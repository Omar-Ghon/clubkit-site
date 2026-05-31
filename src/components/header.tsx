"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { clubData } from "@/data/club-data";
import { HEADER_HEIGHT } from "@/lib/constants";

// HEADER_HEIGHT is now imported from @/lib/constants so Hero.tsx (and any
// future component) can read the same value without duplicating it.

export default function Header() {
  const { header, clubName } = clubData;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isTransparent = header.style === "transparent";
  const fromLeft = header.mobile.burgerSide === "left";

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isTransparent || !header.scrollSolid) return;

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparent, header.scrollSolid]);

  const headerBg =
    !isTransparent || (header.scrollSolid && scrolled)
      ? header.solidBackground
      : "transparent";

  // ── Hover CSS ────────────────────────────────────────────────────────────
  const hoverCSS = (() => {
    if (header.hoverEffect === "color") {
      return `.ck-nav-link:hover { color: ${header.hoverColor} !important; }`;
    }
    if (header.hoverEffect === "underline") {
      return `
        .ck-nav-link { position: relative; }
        .ck-nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -3px;
          width: 0; height: 2px;
          border-radius: 2px;
          background: ${header.hoverUnderlineColor};
          transition: width 0.25s ease;
        }
        .ck-nav-link:hover::after { width: 100%; }
      `;
    }
    if (header.hoverEffect === "translate") {
      return `
        .ck-nav-link { transition: transform 0.2s ease; display: inline-block; }
        .ck-nav-link:hover { transform: translateY(${header.hoverTranslateY}px); }
      `;
    }
    return "";
  })();

  // ── Brand ────────────────────────────────────────────────────────────────
  function Brand({ mobile = false }: { mobile?: boolean }) {
    const showLogo = mobile ? header.mobile.showLogo : header.logo !== null;
    const showName = mobile ? header.mobile.showName : header.showName;

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showLogo && header.logo && (
          <Image
            src={header.logo}
            alt={`${clubName} logo`}
            width={header.logoWidth}
            height={header.logoHeight}
            loading="eager"
            style={{ objectFit: "contain" }}
          />
        )}
        {showName && (
          <span
            style={{
              color: header.nameColor,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {clubName}
          </span>
        )}
      </div>
    );
  }

  // ── Desktop nav ──────────────────────────────────────────────────────────
  function NavLinks() {
    const linkStyle: React.CSSProperties = {
      color: header.tabColor,
      fontSize: 18,
      fontWeight: 500,
      textDecoration: "none",
      display: "inline-block",
    };

    if (header.showPill) {
      return (
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "rgba(255,255,255,0.12)",
            border: "0.5px solid rgba(255,255,255,0.20)",
            borderRadius: 999,
            padding: "5px 8px",
            backdropFilter: "blur(8px)",
          }}
        >
          {header.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="ck-nav-link"
              style={{ ...linkStyle, padding: "4px 14px", borderRadius: 999 }}
            >
              {item.label}
            </a>
          ))}
        </div>
      );
    }

    return (
      <div style={{ display: "flex", gap: 28 }}>
        {header.navigation.map((item) => (
          <a key={item.href} href={item.href} className="ck-nav-link" style={linkStyle}>
            {item.label}
          </a>
        ))}
      </div>
    );
  }

  // ── Burger / X ───────────────────────────────────────────────────────────
  function Burger() {
    return (
      <button
        onClick={() => setMobileOpen((o) => !o)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          width: 30,
          height: 30,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <span style={{
          display: "block", position: "absolute",
          width: 26, height: 3, borderRadius: 2,
          background: header.nameColor, left: 4,
          top: mobileOpen ? 14 : 6,
          transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "top 0.2s ease, transform 0.2s ease 0.15s",
        }} />
        <span style={{
          display: "block", position: "absolute",
          width: 26, height: 3, borderRadius: 2,
          background: header.nameColor, left: 4, top: 14,
          opacity: mobileOpen ? 0 : 1,
          transition: "opacity 0.15s ease",
        }} />
        <span style={{
          display: "block", position: "absolute",
          width: 26, height: 3, borderRadius: 2,
          background: header.nameColor, left: 4,
          top: mobileOpen ? 14 : 22,
          transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)",
          transition: "top 0.2s ease, transform 0.2s ease 0.15s",
        }} />
      </button>
    );
  }

  return (
    <>
      <style>{hoverCSS}</style>
      <style>{`
        @media (min-width: 769px) {
          .ck-drawer, .ck-overlay { display: none !important; }
        }
      `}</style>

      {/* ── Header bar ───────────────────────────────────────────────────── */}
      <header
        style={{
          position: isTransparent ? "fixed" : "relative",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: headerBg,
          transition: "background 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "0 24px",
            height: HEADER_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Desktop brand */}
          <div className="ck-hidden-mobile">
            <Brand />
          </div>

          {/* Mobile bar */}
          <div
            className="ck-shown-mobile"
            style={{
              width: "100%",
              alignItems: "center",
              position: "relative",
              height: "100%",
            }}
          >
            {fromLeft ? (
              <>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
                  <Burger />
                </div>
                <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                  <Brand mobile />
                </div>
                <div style={{ flex: 1 }} />
              </>
            ) : (
              <>
                <Brand mobile />
                <div style={{ flex: 1 }} />
                <Burger />
              </>
            )}
          </div>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="ck-hidden-mobile">
            <NavLinks />
          </nav>
        </div>
      </header>

      {/* ── Slide drawer ─────────────────────────────────────────────────── */}
      <div
        aria-hidden={!mobileOpen}
        className="ck-drawer"
        style={{
          position: "fixed",
          top: HEADER_HEIGHT,
          bottom: 0,
          left: fromLeft ? 0 : "auto",
          right: fromLeft ? "auto" : 0,
          width: "100vw",
          maxWidth: "100vw",
          background: header.mobile.drawerBackground,
          zIndex: 49,
          transform: mobileOpen
            ? "translateX(0)"
            : fromLeft
            ? "translateX(-100%)"
            : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          paddingTop: 8,
        }}
      >
        {header.navigation.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            style={{
              color: header.mobile.drawerTabColor,
              fontSize: 24,
              fontWeight: 500,
              textDecoration: "none",
              padding: "14px 24px",
              borderBottom: "0.5px solid rgba(255,255,255,0.08)",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen
                ? "translateX(0)"
                : fromLeft
                ? "translateX(-12px)"
                : "translateX(12px)",
              transition: `opacity 0.25s ease ${0.1 + i * 0.05}s, transform 0.25s ease ${0.1 + i * 0.05}s`,
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Dim overlay */}
      <div
        className="ck-overlay"
        onClick={() => setMobileOpen(false)}
        style={{
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 48,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />
    </>
  );
}