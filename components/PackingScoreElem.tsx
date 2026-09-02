'use client';

import { PackingCategory } from "@/types";
import { calculatePackingScore } from "@/utils/packingScore";

interface PackingScoreProps {
    categories: PackingCategory[];
}

export default function PackingScoreElem({ categories }: PackingScoreProps) {
  
    const { score, feedback } = calculatePackingScore(categories);

    return (
        <div className="bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-charcoal">Packing Readiness</h3>
                <div className="text-2xl font-bold text-charcoal">
                    {score} <span className="text-sm font-normal text-charcoal/60">/ 100</span>
                </div>
            </div>

            <div className="w-full bg-sage-light h-3 rounded-xl overflow-hidden">
                <div 
                    className="bg-sage h-full transition-all duration-500 rounded-xl"
                    style={{ width: `${score}%` }}
                />
            </div>
            <ul className="flex flex-col gap-2 text-sm mt-2">
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
        </div>
    );
}