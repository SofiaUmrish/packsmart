import { Outfit } from "@/types";

interface OutfitCardProps {
    outfit: Outfit;
}

export default function OutfitCard({ outfit }: OutfitCardProps) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-charcoal/10 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <h4 className="font-semibold text-charcoal">{outfit.name}</h4>
            </div>

            <ul className="flex flex-col gap-1.5 text-sm text-charcoal/80">
                {outfit.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                        <span>{item.name}</span>
                        <span className="text-xs text-charcoal/50">({item.quantity})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}