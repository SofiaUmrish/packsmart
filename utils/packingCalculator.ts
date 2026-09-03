import { PackingCategory, PackingItem } from "@/types";

interface CalculateParams {
    startDate: string;
    endDate: string;
    temperature: number;
    condition: string;
    tripType: string;
    style: string;
}

export function generatePackingList(params: CalculateParams): PackingCategory[] {
    const { startDate, endDate, temperature, condition, tripType, style } = params;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const tripDays = Math.max(1, Math.ceil(diffTime / (24 * 60 * 60 * 1000)) + 1);

    const clothingItems: PackingItem[] = [
        { id: crypto.randomUUID(), name: "Underwear", quantity: tripDays + 1, category: "clothing", required: true, packed: false },
        { id: crypto.randomUUID(), name: "Socks", quantity: tripDays + 1, category: "clothing", required: true, packed: false },
        { id: crypto.randomUUID(), name: "T-shirts / Tops", quantity: tripDays, category: "clothing", outfitType: "top", required: true, packed: false },
    ];

    const shoesItems: PackingItem[] = [
        { id: crypto.randomUUID(), name: "Comfortable Sneakers", quantity: 1, category: "shoes", outfitType: "shoes", required: true, packed: false },
    ];

    const essentialsItems: PackingItem[] = [
        { id: crypto.randomUUID(), name: "Toothbrush & Toothpaste", quantity: 1, category: "essentials", required: true, packed: false },
        { id: crypto.randomUUID(), name: "Deodorant", quantity: 1, category: "essentials", required: true, packed: false },
        { id: crypto.randomUUID(), name: "Phone Charger", quantity: 1, category: "essentials", required: true, packed: false },
        { id: crypto.randomUUID(), name: "Documents & ID", quantity: 1, category: "essentials", required: true, packed: false },
    ];

    const specificItems: PackingItem[] = [];

    if (temperature < 13) {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Warm Sweater / Hoodie", quantity: Math.ceil(tripDays / 2), category: "clothing", outfitType: "top", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Warm Jacket / Coat", quantity: 1, category: "clothing", outfitType: "outerwear", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Long Pants / Jeans", quantity: Math.max(2, Math.ceil(tripDays / 2)), category: "clothing", outfitType: "bottom", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Warm Thermal Socks", quantity: Math.ceil(tripDays / 2), category: "clothing", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Winter Hat & Gloves", quantity: 1, category: "essentials", required: true, packed: false }
        );
        shoesItems.push(
            { id: crypto.randomUUID(), name: "Insulated / Waterproof Boots", quantity: 1, category: "shoes", outfitType: "shoes", required: true, packed: false }
        );
    } else if (temperature >= 13 && temperature < 20) {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Light Jacket / Trench", quantity: 1, category: "clothing", outfitType: "outerwear", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Long Sleeve / Cardigan", quantity: Math.ceil(tripDays / 2), category: "clothing", outfitType: "top", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Jeans / Trousers", quantity: Math.max(2, Math.ceil(tripDays / 2)), category: "clothing", outfitType: "bottom", required: true, packed: false }
        );
    } else if (temperature >= 20 && temperature <= 28) {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Light Trousers / Shorts", quantity: Math.ceil(tripDays / 2), category: "clothing", outfitType: "bottom", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Light Cardigan (for evenings)", quantity: 1, category: "clothing", outfitType: "outerwear", required: false, packed: false }
        );
        shoesItems.push(
            { id: crypto.randomUUID(), name: "Light Sandals / Loafers", quantity: 1, category: "shoes", outfitType: "shoes", required: false, packed: false }
        );
    } else {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Shorts", quantity: Math.ceil(tripDays / 2), category: "clothing", outfitType: "bottom", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Light Tank Tops", quantity: tripDays, category: "clothing", outfitType: "top", required: true, packed: false }
        );
        essentialsItems.push(
            { id: crypto.randomUUID(), name: "Sunglasses", quantity: 1, category: "essentials", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Sunscreen & Hat", quantity: 1, category: "essentials", required: true, packed: false }
        );
        shoesItems.push(
            { id: crypto.randomUUID(), name: "Open Sandals", quantity: 1, category: "shoes", outfitType: "shoes", required: true, packed: false }
        );
    }

    if (condition.toLowerCase().includes("rain") || condition.toLowerCase().includes("drizzle")) {
        essentialsItems.push(
            { id: crypto.randomUUID(), name: "Umbrella", quantity: 1, category: "essentials", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Waterproof Rain Jacket", quantity: 1, category: "clothing", outfitType: "outerwear", required: true, packed: false }
        );
    }

    if (tripType === "beach") {
        specificItems.push(
            { id: crypto.randomUUID(), name: "Swimsuit / Trunks", quantity: 2, category: "specific", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Beach Towel", quantity: 1, category: "specific", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Beach Bag", quantity: 1, category: "specific", required: false, packed: false }
        );
    } else if (tripType === "hiking") {
        specificItems.push(
            { id: crypto.randomUUID(), name: "Backpack", quantity: 1, category: "specific", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Water Bottle", quantity: 1, category: "specific", required: true, packed: false },
            { id: crypto.randomUUID(), name: "First Aid Kit", quantity: 1, category: "specific", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Trail Mix / Snacks", quantity: 1, category: "specific", required: false, packed: false }
        );
        shoesItems.push(
            { id: crypto.randomUUID(), name: "Hiking Boots", quantity: 1, category: "shoes", outfitType: "shoes", required: true, packed: false }
        );
    } else if (tripType === "business") {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Formal Dress Shirt / Blouse", quantity: Math.ceil(tripDays / 2), category: "clothing", outfitType: "top", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Blazer / Suit Jacket", quantity: 1, category: "clothing", outfitType: "outerwear", required: true, packed: false },
            { id: crypto.randomUUID(), name: "Formal Trousers / Skirt", quantity: 1, category: "clothing", outfitType: "bottom", required: true, packed: false }
        );
        shoesItems.push(
            { id: crypto.randomUUID(), name: "Formal Dress Shoes", quantity: 1, category: "shoes", outfitType: "shoes", required: true, packed: false }
        );
        specificItems.push(
            { id: crypto.randomUUID(), name: "Laptop & Charger", quantity: 1, category: "specific", required: true, packed: false }
        );
    } else if (tripType === "city") {
        specificItems.push(
            { id: crypto.randomUUID(), name: "Crossbody / Day Bag", quantity: 1, category: "specific", required: false, packed: false },
            { id: crypto.randomUUID(), name: "Guidebook / Map", quantity: 1, category: "specific", required: false, packed: false }
        );
    }

    if (style === "feminine") {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Casual Dress / Skirt", quantity: Math.max(1, Math.ceil(tripDays / 3)), category: "clothing", outfitType: "dress", required: false, packed: false }
        );
    } else if (style === "sporty") {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Joggers / Sports Leggings", quantity: 1, category: "clothing", outfitType: "bottom", required: false, packed: false },
            { id: crypto.randomUUID(), name: "Sport Hoodie", quantity: 1, category: "clothing", outfitType: "top", required: false, packed: false }
        );
    } else if (style === "classic" || style === "smart casual") {
        clothingItems.push(
            { id: crypto.randomUUID(), name: "Classic Button-down Shirt", quantity: 1, category: "clothing", outfitType: "top", required: false, packed: false }
        );
    } else if (style === "minimal") {
     
    }

    return [
        { id: "clothing", name: "Clothing", items: clothingItems },
        { id: "shoes", name: "Shoes", items: shoesItems },
        { id: "essentials", name: "Essentials", items: essentialsItems },
        { id: "specific", name: "Trip-Specific Gear", items: specificItems },
    ];
}