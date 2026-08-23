import { getDbSafe } from "@/lib/mongo";
import PartnersSlider from "@/components/sections/PartnersSlider";

export default async function PartnersSliderSection() {
  const safe = await getDbSafe();
  let partners: Array<{ _id: string; name: string; category: string; logoUrl: string | null; website: string | null }> = [];

  if (safe.db) {
    partners = (await safe.db.collection("partners")
      .find({ isActive: true })
      .sort({ createdAt: 1 })
      .toArray()) as unknown as typeof partners;
  }

  if (partners.length === 0) return null;

  return <PartnersSlider partners={partners} />;
}
