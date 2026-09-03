import { PackingCategory } from "@/types";

interface ScoreResult {
    score: number;
    feedback: { text: string; type: "success" | "warning" }[];
}

export function calculatePackingScore(
    initialCategories: PackingCategory[],
    currentCategories: PackingCategory[]
): ScoreResult {

    const initialItems = initialCategories.flatMap(category => category.items);
    const currentItems = currentCategories.flatMap(category => category.items);

    const initialRequiredItems = initialItems.filter(item => item.required);

    let totalRecommendedQuantity = 0;
    let totalCurrentQuantity = 0;

    const feedback: { text: string; type: "success" | "warning" }[] = [];

    initialRequiredItems.forEach(initialItem => {
        const currentItem = currentItems.find(item => item.id===initialItem.id)
        const recommendedQuantity = initialItem.quantity;
        totalRecommendedQuantity += recommendedQuantity;

        if(!currentItem){

            feedback.push({
                text: `⚠ ${initialItem.name} was removed`,
                type: "warning",
            });

            return
        }

        const currentQuantity = currentItem.quantity;
        totalCurrentQuantity += Math.min(currentQuantity, recommendedQuantity);

        if(currentQuantity < recommendedQuantity){

            feedback.push({
                text: `⚠ ${initialItem.name}: ${recommendedQuantity} recommended`,
                type: "warning",
              });
        }


    })

    let score = totalRecommendedQuantity === 0 
    ? 100 
    : Math.round((totalCurrentQuantity / totalRecommendedQuantity) * 100);

    if(score===100){
        feedback.push({
            text: "✓ Your packing list is complete",
            type: "success",
          });
    }
    
    return {
        score: Math.min(100, Math.max(0, score)),
        feedback
    };
}