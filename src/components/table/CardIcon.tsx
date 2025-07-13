import { brandLogos } from "@/data/mockCards";
import { CardBrand } from "@/types/card";

export const CardIcon = ({ brand }: { brand: CardBrand | "" }) => {
  if (!brand || !brandLogos[brand]) {
    return null;
  }

  return (
    <img
      alt={`${brand} logo`}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
      height={20}
      src={brandLogos[brand]}
      width={32}
    />
  );
};