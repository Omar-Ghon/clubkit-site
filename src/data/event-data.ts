export const eventPageData = {

  // ─────────────────────────────────────────────────────────────────────────
  // EVENTS HERO
  // ─────────────────────────────────────────────────────────────────────────
  hero: {
    // "image"  → use imageDesktop / imageMobile
    // "video"  → use videoDesktop / videoMobile
    // "none"   → skip the hero entirely
    layout: "image" as "image" | "video" | "none",

    minHeight: {
      desktop: 55,  // vh
      mobile: 45,
    },

    contentPosition: "center" as "left" | "center" | "right",

    // Solid or gradient fallback shown when no media is set
    background: {
      color: `linear-gradient(135deg, #000000, #2B1D14)`,
    },

    media: {
      // Used when layout is "image"
      imageDesktop: "/images/event-hero-bg-d.png" as string | null,
      imageMobile:  "/images/event-hero-bg.png"   as string | null,

      // Used when layout is "video"
      videoDesktop: null as string | null,
      videoMobile:  null as string | null,

      // CSS object-position / background-position
      position: "center" as string,

      // Dark overlay on top of the media
      overlayColor: "#000000",
      overlayOpacity: 0.5,

      // Apply a CSS blur to the background media
      blur: false,
      blurAmount: 0.5,  // px; only applied when blur is true
    },

    heading: {
      text: "Events",
      color: "#ffffff",
      size: { desktop: 56, mobile: 40 },
    },

    // Set show: false to hide the subheading
    subheading: {
      show: true,
      text: "Workshops, networking nights, and more — see what's coming up.",
      color: "rgba(255,255,255,0.80)",
      size: { desktop: 20, mobile: 16 },
    },

    // Set show: false to hide the CTA button
    cta: {
      show: true,
      label: "View All Events",
      href: "#events-list",
      variant: "solid" as "solid" | "outline",
      backgroundColor: "#17a40a",
      textColor: "#ffffff",
      borderColor: "#17a40a",
      size: { desktop: 16, mobile: 15 },
    },
  },

};
