import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContentSection from "@/components/ContentSection";
import DetailsGrid from "@/components/DetailsGrid";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; clientname?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  
  // Support both 'name' and 'clientname' parameters
  const rawName = resolvedSearchParams.clientname || resolvedSearchParams.name;
  
  // Clean up the name: remove quotes and decode URI
  const guestName = rawName
    ? decodeURIComponent(rawName).replace(/"/g, "").replace(/\+/g, " ").trim()
    : "Gia Đình";

  return (
    <div className="container max-w-[480px] mx-auto px-6 py-10">
      <Header />
      <Hero />
      <ContentSection />
      <DetailsGrid />
      <Gallery />
      <RSVPForm guestName={guestName} />
      <footer className="text-center py-25 px-0 text-[9px] tracking-[4px] opacity-50 uppercase mt-20">
        <p>Gia đình Đỗ Trần trân trọng cảm ơn</p>
        <p>Danang — Viet Nam</p>
      </footer>
    </div>
  );
}
