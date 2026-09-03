'use client';

import { useState } from "react";
import { PackingCategory, Outfit } from "@/types";
import { generateOutfits } from "@/utils/outfitGenerator";
import OutfitCard from "@/components/OutfitCard";
import { Shirt,  RefreshCw } from "lucide-react";

interface OutfitGeneratorProps {
    categories: PackingCategory[];
}

export default function OutfitGenerator({ categories }: OutfitGeneratorProps) {
    const [outfits, setOutfits] = useState<Outfit[]>([]);

    const handleGenerate = () => {
        const generated = generateOutfits(categories, 3);
        setOutfits(generated);
    };

    return (
        <div className="flex flex-col gap-6 w-full bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-charcoal">Outfit Ideas</h3>
                    <p className="text-sm text-charcoal/60">Generated automatically from your packing list</p>
                </div>

                <button
                    type="button"
                    onClick={handleGenerate}
                    className="flex items-center gap-2 bg-charcoal text-ivory px-4 py-2 rounded-xl font-medium hover:bg-charcoal/90 transition-all cursor-pointer text-sm"
                >
                     
                    {outfits.length > 0 ? <RefreshCw size={16}/> : <Shirt size={16} />}
                    {outfits.length > 0 ? "Generate another" : "Generate outfits"}
                </button>
            </div>

            {outfits.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {outfits.map((outfit) => (
                        <OutfitCard key={outfit.id} outfit={outfit} />
                    ))}
                </div>
            )}
        </div>
    );
}