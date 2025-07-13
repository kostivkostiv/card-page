/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useMemo } from "react";
import type { Card, CardBrand } from "@/types/card";
import { mockCards } from "@/data/mockCards"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { ShieldAlert } from "lucide-react";
import { CardIcon } from "./CardIcon";


type Props = {
  onCreate: (card: Card) => void;
};

export const CardFormDialog = ({ onCreate }: Props) => {
  const [brand, setBrand] = useState<CardBrand | "">("");
  const [isOpen, setIsOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [CVC, setCVC] = useState("");
  const [month, setMonth] = useState("0");
  const [year, setYear] = useState("0");
  const [cardError, setCardError] = useState("");

  const cardLength = brand === "amex" ? 15 : 16;
  const cvcLength = brand === "amex" ? 4 : 3;

  const isValid = useMemo(() => {
    return (
      brand &&
      cardNumber.length === cardLength &&
      CVC.length === cvcLength &&
      year !== "0" &&
      month !== "0" &&
      !cardError
    );
  }, [brand, cardNumber, CVC, month, year, cardError, cardLength, cvcLength]);

	const getCardBrand = (cardNumber: string): CardBrand | "" => {
		if (cardNumber.startsWith("4")) return "visa";
		if (/^5[1-5]/.test(cardNumber)) return "mastercard";
		if (/^3[47]/.test(cardNumber)) return "amex";
		return "";
	};

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    
    const newCardNumber = value.slice(0, cardLength);
    setCardNumber(newCardNumber);

    const detectedBrand = getCardBrand(newCardNumber);
    setBrand(detectedBrand);
    
    if (newCardNumber.length >= 4 && !detectedBrand) {
        setCardError("Неправильний номер картки. Підтримуються Visa, Mastercard, Amex.");
    } else {
        setCardError("");
    }
  };
  
  const handleCvcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    setCVC(value);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const lastId = Math.max(...mockCards.map((card) => Number(card.id)));

		if (!brand) return;

		const newCard: Card = {
			id: String(lastId + 1),
			brand,
			last4: cardNumber.slice(-4),
			isDefault: false,
		};

    onCreate(newCard);
    setBrand("");
    setCardNumber("");
    setCVC("");
    setMonth("0");
    setYear("0");
    setCardError("");
    setIsOpen(false);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="flex ">Create New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                maxLength={cardLength}
                onChange={handleCardNumberChange}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                value={cardNumber}
                className={cardError ? "border-red-500" : ""}
              />
              <CardIcon brand={brand} />
            </div>
            {cardError && (
                 <p className="text-sm text-red-500 flex items-center gap-1">
                    <ShieldAlert size={16} /> {cardError}
                 </p>
            )}
          </div>

          <Label>Expiration Date</Label>
          <div className="flex gap-2">
            <Select onValueChange={(value) => setMonth(value)} value={month === "0" ? "" : month}>
              <SelectTrigger className="w-[175px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const twelveMonth = (i + 1).toString().padStart(2, "0");
                  return (
                    <SelectItem key={twelveMonth} value={twelveMonth}>
                      {twelveMonth}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => {setYear(value)}} value={year === "0" ? "" : year}>
              <SelectTrigger className="w-[175px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, index) => {
                  const years = new Date().getFullYear() + index;
                  return (
                    <SelectItem key={years} value={years.toString()}>
                      {years}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="cvc">CVС</Label>
            <Input
              id="cvc"
              maxLength={cvcLength}
              onChange={handleCvcChange}
              placeholder={brand === "amex" ? "4 numbers" : "3 numbers"}
              value={CVC}
            />
          </div>

          <Button disabled={!isValid} onClick={handleSubmit}>
            Add Card
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};