import Header from "@/components/header";
import EventsHero from "@/components/events-hero";
import Footer from "@/components/footer";

export default function EventsPage() {
  return (
    <>
      <Header />
      <EventsHero />
      <section style={{ minHeight: "150vh" }} />
      <Footer />
    </>
  );
}