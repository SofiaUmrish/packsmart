'use client';

import { PackingCategory } from "@/types";
import { calculatePackingScore } from "@/utils/packingScore";

interface PackingScoreProps {
    initialCategories: PackingCategory[];
    currentCategories: PackingCategory[];
}

export default function PackingScoreElem({ initialCategories, currentCategories }: PackingScoreProps) {
  
    const { score, feedback } = calculatePackingScore(initialCategories, currentCategories);

    const allCurrentItems = currentCategories.flatMap(cat => cat.items);
    const totalItemsCount = allCurrentItems.length;
    const packedItemsCount = allCurrentItems.filter(item => item.packed).length;
    const progressPercent = totalItemsCount === 0 ? 0 : Math.round((packedItemsCount / totalItemsCount) * 100);

    return (
        <div className="bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-charcoal">Packing Readiness</h3>
                    <div className="text-xl font-bold text-charcoal">
                        {score} <span className="text-sm font-normal text-charcoal/60">/ 100</span>
                    </div>
                </div>

                <div className="w-full bg-sage-light h-2.5 rounded-xl overflow-hidden">
                    <div 
                        className="bg-sage h-full transition-all duration-500 rounded-xl"
                        style={{ width: `${score}%` }}
                    />
                </div>
            </div>

            <ul className="flex flex-col gap-1.5 text-sm pt-2 border-t border-charcoal/5">
                {feedback.map((item, index)=>(
                    <li
                        key={index}
                        className={`flex items-center gap-2 ${
                            item.type === "success" ? "text-charcoal/80" : "text-red-600/80 font-medium"
                        }`}>
                        {item.text}
                    </li>
                ))}
            </ul>

            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-charcoal/80">Packed Progress</span>
                    <span className="text-sm font-bold text-charcoal">{progressPercent}%</span>
                </div>

                <div className="w-full bg-sage-light h-2.5 rounded-xl overflow-hidden">
                    <div 
                        className="bg-charcoal/80 h-full transition-all duration-500 rounded-xl"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>
        </div>
    );
}