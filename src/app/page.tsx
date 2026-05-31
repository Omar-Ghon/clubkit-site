import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

// Header and Hero are aware of each other through @/lib/constants.
// - Transparent header: fixed, floats over the hero. Hero starts at top: 0
//   and pads its content down by HEADER_HEIGHT internally.
// - Solid header: sits in normal document flow above the hero. No offset needed.

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      {/* Rest of page sections go here */}
      <main>
        <section id="about"   style={{ minHeight: "50vh", padding: "80px 24px" }}>About</section>
        <section id="events"  style={{ minHeight: "50vh", padding: "80px 24px" }}>Events</section>
        <section id="team"    style={{ minHeight: "50vh", padding: "80px 24px" }}>Team</section>
        <section id="contact" style={{ minHeight: "50vh", padding: "80px 24px" }}>Contact</section>
      </main>
      <Footer />
    </>
  );
}