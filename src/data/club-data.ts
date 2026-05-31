export const clubData = {
  clubName: "McMaster NSBE",
  fullName: "National Society of Black Engineers",
  schoolName: "McMaster University",

  // ─────────────────────────────────────────────────────────────────────────
  // HEADER
  // ─────────────────────────────────────────────────────────────────────────
  header: {
    style: "solid" as "transparent" | "solid",
    solidBackground: "#2B1D14",
    scrollSolid: true,

    logo: "/images/nsbe-logo.png" as string | null,
    logoWidth: 42,
    logoHeight: 42,

    showName: true,
    nameColor: "#17a40a",

    navigation: [
      { label: "About",   href: "#about"   },
      { label: "Events",  href: "#events"  },
      { label: "Team",    href: "#team"    },
      { label: "Contact", href: "#contact" },
    ],
    tabColor: "rgba(255,255,255,0.80)",

    hoverEffect: "color" as "color" | "underline" | "translate",
    hoverColor: "#D8B46A",
    hoverUnderlineColor: "#B54A2F",
    hoverTranslateY: -3,

    showPill: true,

    mobile: {
      burgerSide: "left" as "left" | "right",
      showLogo: true,
      showName: false,
      drawerBackground: "#2B1D14",
      drawerTabColor: "#f4dd0e",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // HERO
  // ─────────────────────────────────────────────────────────────────────────
  hero: {
    layout: "full-viewport" as "full-viewport" | "split" | "angled" | "none",
    contentPosition: "center" as "left" | "center" | "right",
    mediaSide: "right" as "left" | "right",
    splitLeftPercent: 35,

    minHeight: {
      desktop: 100,
      mobile: 100,
    },

    background: {
      color: `radial-gradient(circle at top left, rgba(23,164,10,0.35), transparent 35%),
        linear-gradient(135deg, #000000, #2B1D14)`,
    },

    media: {
      imageDesktop: "/images/hero-bg-d.png" as string | null,
      imageMobile:  "/images/hero-bg.png" as string | null,
      video:        null as string | null,
      position: "center" as string,
      overlayOpacity: 0.5,
      overlayColor: "#000000",
      padded: false,
      paddingAmount: 44,
    },

    heading: {
      text: "Building the Next Generation of Black Engineers",
      color: "#ffffff",
      size: { desktop: 48, mobile: 36 },
    },

    subheading: {
      text: "McMaster NSBE connects, supports, and empowers Black engineering students at McMaster University.",
      color: "rgba(255,255,255,0.80)",
      size: { desktop: 20, mobile: 16 },
    },

    cta: {
      label: "Join Us" as string | null,
      href: "#contact",
      variant: "solid" as "solid" | "outline",
      backgroundColor: "#17a40a",
      textColor: "#ffffff",
      borderColor: "#17a40a",
      size: { desktop: 16, mobile: 15 },
    },

    ctaSecondary: {
      label: "Learn More" as string | null,
      href: "#about",
      variant: "outline" as "solid" | "outline",
      backgroundColor: "transparent",
      textColor: "#ffffff",
      borderColor: "rgba(255,255,255,0.6)",
      size: { desktop: 16, mobile: 15 },
    },

    stats: {
      show: true,
      items: [
        { label: "Members",           value: "200+" },
        { label: "Events / year",     value: "30+"  },
        { label: "Years active",      value: "10+"  },
        { label: "Partner companies", value: "15"   },
      ],
      value: {
        color: "#ffffff",
        size: { desktop: 32, mobile: 24 },
      },
      label: {
        color: "rgba(255,255,255,0.60)",
        size: { desktop: 14, mobile: 13 },
      },
      dividerColor: "rgba(255,255,255,0.20)",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────────────────────────────────────
  footer: {

    // ── Overall footer styles ────────────────────────────────────────────────
    backgroundColor: "#1a1008",
    // Optional top border line
    topBorder: {
      show: true,
      color: "rgba(255,255,255,0.10)",
    },
    // Padding inside the footer (px)
    padding: {
      desktop: 64,
      mobile: 40,
    },
    // Bottom copyright line (set to null to hide)
    copyright: {
      text: "© 2026 ClubKit. All rights reserved.",
      color: "rgba(255,255,255,0.35)",
      size: { desktop: 13, mobile: 12 },
    },

    // ── Brand section (leftmost, optional) ──────────────────────────────────
    // Set show: false to hide entirely.
    brand: {
      show: true,
      // Show the club logo image
      logo: {
        show: true,
        src: "/images/nsbe-logo.png" as string | null,
        size: { desktop: 48, mobile: 40 },   // rendered width & height in px
      },
      // Show a text name (can differ from clubName above if you want)
      name: {
        show: false,
        text: "McMaster NSBE",
        color: "#ffffff",
        size: { desktop: 20, mobile: 18 },
        fontWeight: 700,
      },
      // Optional short tagline beneath the name
    //   tagline: {
    //     show: false,
    //     text: "Empowering Black engineers since 2010.",
    //     color: "rgba(255,255,255,0.50)",
    //     size: { desktop: 14, mobile: 13 },
    //   },
    },

    // ── Content sections (1–3, each optional) ───────────────────────────────
    // Remove entries from this array to show fewer sections.
    sections: [
      {
        heading: {
          text: "Address" as string | null,
          color: "#ffffff",
          size: { desktop: 15, mobile: 14 },
          fontWeight: 600,
        },
        items: [
          { label: "1280 Main St W",         href: null as string | null },
          { label: "Hamilton, ON  L8S 4L8",  href: null as string | null },
          { label: "Canada",                  href: null as string | null },
        ],
        item: {
          color: "rgba(255,255,255,0.65)",
          hoverColor: "#D8B46A",
          size: { desktop: 15, mobile: 14 },
          gap: { desktop: 12, mobile: 10 },
        },
      },
      {
        // Section heading (set to null to hide)
        heading: {
          text: "Quick Links" as string | null,
          color: "#ffffff",
          size: { desktop: 15, mobile: 14 },
          fontWeight: 600,
        },
        items: [
          { label: "About Us",  href: "#about"   as string | null },
          { label: "Events",    href: "#events"  as string | null },
          { label: "Our Team",  href: "#team"    as string | null },
          { label: "Contact",   href: "#contact" as string | null },
        ],
        item: {
          // Color of item text at rest
          color: "rgba(255,255,255,0.65)",
          // Color on hover/focus (for linked items)
          hoverColor: "#D8B46A",
          size: { desktop: 15, mobile: 14 },
          // Spacing between items (px)
          gap: { desktop: 12, mobile: 10 },
        },
      },
      // Add a third object here to enable a third section, e.g.:
      // {
      //   heading: { text: "Resources", color: "#ffffff", size: { desktop: 15, mobile: 14 }, fontWeight: 600 },
      //   items: [
      //     { label: "Sponsorship Package", href: "/sponsors.pdf" },
      //     { label: "Constitution",        href: "/constitution.pdf" },
      //   ],
      //   item: { color: "rgba(255,255,255,0.65)", hoverColor: "#D8B46A", size: { desktop: 15, mobile: 14 }, gap: { desktop: 12, mobile: 10 } },
      // },
    ] as Array<{
      heading: { text: string | null; color: string; size: { desktop: number; mobile: number }; fontWeight: number };
      items: Array<{ label: string; href: string | null }>;
      item: { color: string; hoverColor: string; size: { desktop: number; mobile: number }; gap: { desktop: number; mobile: number } };
    }>,

    // ── Social media section (rightmost, optional) ───────────────────────────
    // Set show: false to hide entirely.
    social: {
      show: true,
      // Section heading above icons (set text: null to hide)
      heading: {
        text: "Follow Us" as string | null,
        color: "#ffffff",
        size: { desktop: 15, mobile: 14 },
        fontWeight: 600,
      },
      // Size of each social icon (px)
      iconSize: { desktop: 24, mobile: 22 },
      // Gap between icons (px)
      iconGap: { desktop: 14, mobile: 12 },
      // Optional circle behind each icon
      circle: {
        show: true,
        color: "rgba(255,255,255,0.08)",
        // Circle diameter is derived from iconSize + padding; control padding here (px each side)
        padding: 10,
      },
      // Hover behaviour: "scale" enlarges the icon | "swap" shows hoverSrc instead
      hoverEffect: "scale" as "scale" | "swap",
      // Scale factor used when hoverEffect is "scale"
      hoverScale: 1.18,
      icons: [
        {
          label: "Instagram",
          href: "https://instagram.com/nsbemac",
          // Default icon (SVG path or image URL from /public)
          src: "/icons/instagram.svg",
          // Only used when hoverEffect is "swap"
          hoverSrc: "/icons/instagram-hover.svg" as string | null,
        },
        {
          label: "LinkedIn",
          href: "https://linkedin.com/company/mcmaster-nsbe",
          src: "/icons/linkedin.svg",
          hoverSrc: "/icons/linkedin-hover.svg" as string | null,
        },
        {
          label: "Twitter / X",
          href: "https://twitter.com/mcmaster_nsbe",
          src: "/icons/twitter.svg",
          hoverSrc: null as string | null,
        },
        {
          label: "Discord",
          href: "https://discord.gg/mcmasternsbe",
          src: "/icons/discord.svg",
          hoverSrc: null as string | null,
        },
      ],
    },

  },
};