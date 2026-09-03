import { PackingCategory, PackingItem, Outfit } from "@/types";

export function generateOutfits(categories: PackingCategory[], count = 3): Outfit[] {
    const allItems = categories.flatMap(cat => cat.items);
    
    const outfitItems = allItems.filter(item => item.outfitType);

    const tops = outfitItems.filter(item => item.outfitType === "top");
    const bottoms = outfitItems.filter(item => item.outfitType === "bottom");
    const dresses = outfitItems.filter(item => item.outfitType === "dress");
    const outerwear = outfitItems.filter(item => item.outfitType === "outerwear");
    const shoes = outfitItems.filter(item => item.outfitType === "shoes");

    const outfits: Outfit[] = [];
    const getRandom = <T>(arr: T[]): T | undefined => arr[Math.floor(Math.random() * arr.length)];

    for (let i = 0; i < count; i++) {
        const selectedShoes = getRandom(shoes);
        if (!selectedShoes) continue;

        const outfitItemsList: PackingItem[] = [];

        const useDress = Math.random() > 0.5 && dresses.length > 0;
        if (useDress) {
            const dress = getRandom(dresses);
            if (dress) outfitItemsList.push(dress);
        } else {
            const top = getRandom(tops);
            const bottom = getRandom(bottoms);
            if (top && bottom) {
                outfitItemsList.push(top, bottom);
            } else if (tops.length > 0 && bottoms.length > 0) {
                const top = getRandom(tops);
                const bottom = getRandom(bottoms);
                if (top) outfitItemsList.push(top);
                if (bottom) outfitItemsList.push(bottom);
            }
        }

        if (outfitItemsList.length === 0) continue;

        outfitItemsList.push(selectedShoes);

        if (outerwear.length > 0 && Math.random() > 0.4) {
            const out = getRandom(outerwear);
            if (out) outfitItemsList.push(out);
        }

        outfits.push({
            id: crypto.randomUUID(),
            name: `Outfit #${i + 1}`,
            items: outfitItemsList,
        });
    }

    return outfits;
}