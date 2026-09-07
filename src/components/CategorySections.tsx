import BagsSection from "@/components/BagsSection";
import PartyHillsSection from "@/components/PartyHillsSection";

export default function CategorySections() {
  return (
    <div className="bg-[#0a0a0a]">
      <BagsSection key="bags" />
      <PartyHillsSection key="party hills" />
    </div>
  );
}