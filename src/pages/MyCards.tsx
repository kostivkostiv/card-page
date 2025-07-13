import { useEffect, useState } from "react";
import { mockCards } from "@/data/mockCards";
import type { Card } from "@/types/card";
import { CardFilter } from "@/components/table/CardFilter";
import { DataTable } from "@/components/table/DataTable";
import { CardFormDialog } from "@/components/table/CardFormDialog";

const MyCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCards(mockCards);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    setFilteredCards(
      cards.filter(
        (card) =>
          card.brand.toLowerCase().includes(lowerSearch) ||
          card.last4.includes(lowerSearch)
      )
    );
  }, [search, cards]);

  return (
    <div className=" p-6 max-w-5xl mx-auto flex flex-col gap-6">
      <div className="dark:bg-color-gray-900 flex justify-between items-center flex-wrap gap-4">
        <CardFilter value={search} onChange={setSearch} />
      </div>

      {isLoading && <p>Loading...</p>}
      {!isLoading && filteredCards.length === 0 && <p>No cards found</p>}
      {!isLoading && filteredCards.length > 0 && (
        <DataTable data={filteredCards} setData={setCards} />
      )}
      
      <CardFormDialog onCreate={(card) => setCards((prev) => [...prev, card])} />
    </div>
  );
};

export default MyCards;
