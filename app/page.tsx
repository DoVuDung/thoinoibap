import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ContentSection from "@/components/ContentSection";
import DetailsGrid from "@/components/DetailsGrid";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const guestName = resolvedSearchParams.name
    ? decodeURIComponent(resolvedSearchParams.name).replace(/\+/g, " ")
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
