import { PackingCategory } from "@/types";

interface ScoreResult {
    score: number;
    feedback: { text: string; type: "success" | "warning" }[];
}

export function calculatePackingScore(categories: PackingCategory[]): ScoreResult {
    const allItems = categories.flatMap(category => category.items);

    let clothingScore = 30;
    let weatherScore = 30;
    let specificScore = 20;
    let footwearScore = 10;
    let accessoriesScore = 10;

    const feedback: { text: string; type: "success" | "warning" }[] = [];

    const clothingCategory = categories.find(category => category.id === "clothing");
    const totalClothingCount = clothingCategory 
        ? clothingCategory.items.reduce((sum, item) => sum + item.quantity, 0) 
        : 0;

    if(totalClothingCount < 5){
        clothingScore = 10;
        feedback.push({ text: "⚠ You might need more clothing items for your trip", type: "warning" });
    }else{
        feedback.push({ text: "✓ Enough clothes for your trip", type: "success" });
    }

    const shoesCategory = categories.find(category => category.id === "shoes");
    const hasShoes = shoesCategory ? shoesCategory.items.length > 0 : false;
        
    if(!hasShoes){
        footwearScore = 0;
        feedback.push({ text: "⚠ Appropriate footwear is missing", type: "warning" });
    }else{
        feedback.push({ text: "✓ Suitable footwear", type: "success" });
    }

    const hasAccessories = allItems.some(item => 
       {
        const name = item.name.toLowerCase();
        return name.includes("sunglasses") || name.includes("hat") 
        || name.includes("bag") || name.includes("belt")
        || name.includes("earrings") || name.includes("necklace")
        || name.includes("cap") || name.includes("gloves");
       });
        
    if(!hasAccessories){
        accessoriesScore = 4;
        feedback.push({ text: "⚠ Consider adding essential accessories", type: "warning" });
    }else{
        feedback.push({ text: "✓ Essential accessories included", type: "success" });
    }

    const hasWeatherProtection = allItems.some(item => 
        {
         const name = item.name.toLowerCase();
         return name.includes("jacket") || name.includes("umbrella") 
         || name.includes("coat") || name.includes("sweater")
         || name.includes("sunglasses") || name.includes("hat")
         || name.includes("sunscreen") || name.includes("gloves");
        });
         
    if(!hasWeatherProtection){
        weatherScore = 10;
        feedback.push({ text: "⚠ Weather protection or layers might be missing", type: "warning" });
    }else{
        feedback.push({ text: "✓ Weather protection included", type: "success" });
    }
 


    if (allItems.length < 6) {
        specificScore = 5;
        feedback.push({ text: "⚠ Add more items specific to your trip type", type: "warning" });
    } else {
        feedback.push({ text: "✓ Trip-specific items included", type: "success" });
    }


    const totalScore = Math.min(100, Math.max(0, clothingScore + weatherScore + specificScore + footwearScore + accessoriesScore));

    return {
        score: totalScore,
        feedback
    };
}