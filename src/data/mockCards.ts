import type { Card } from "@/types/card";
import visaCard from '@/assets/cards_logo/visa.svg';
import masterCard from '@/assets/cards_logo/mastercard.svg';
import amexCard from '@/assets/cards_logo/amex.svg';

export const brandLogos = {
  visa: visaCard,
  mastercard: masterCard,
  amex: amexCard,
}


export const mockCards: Card[] = [
  {
    id: "1",
    brand: "visa",
    last4: "4242",
    isDefault: true,
  },
  {
    id: "2",
    brand: "mastercard",
    last4: "6789",
    isDefault: false,
  },
  {
    id: "3",
    brand: "amex",
    last4: "1122",
    isDefault: false,
  },
]