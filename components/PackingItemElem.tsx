'use client';

import { PackingItem } from "@/types";
import { Trash2, Plus, Minus } from "lucide-react";

interface PackingItemProps {
    item: PackingItem;
    onTogglePacked: (id: string) => void;
    onUpdateQuantity: (id: string, newQuantity: number) => void;
    onDeleteItem: (id: string) => void;
}

export default function PackingItemElem({ item, onTogglePacked, onUpdateQuantity, onDeleteItem }: PackingItemProps) {
    return (
        <div className="w-full flex items-center justify-between py-3 px-4 rounded-xl border border-charcoal/10 bg-white hover:border-sage/40 transition-all text-charcoal">
            
            <div className="flex items-center gap-3">
                <input
                    id={`item-${item.id}`}
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => {onTogglePacked(item.id)}}
                    className="w-5 h-5 accent-sage cursor-pointer rounded border-charcoal/20"
                />
                
                <label 
                    htmlFor={`item-${item.id}`}
                    className={`font-medium cursor-pointer transition-colors ${item.packed ? "line-through text-charcoal/40" : "text-charcoal"}`}
                >
                    {item.name}
                </label>
            </div>

            <div className="flex items-center gap-4">
                
                <div className="flex items-center gap-2 bg-sage-light/20 px-2 py-1 rounded-lg border border-sage/20">
                    <button
                        type="button"
                        onClick={() => {onUpdateQuantity(item.id, Math.max(1, item.quantity-1))}}
                        className="text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                    >
                        <Minus size={14} />
                    </button>
                    
                    <span className="text-sm font-semibold w-5 text-center">
                        {item.quantity}
                    </span>
                    
                    <button
                        type="button"
                        onClick={() => {onUpdateQuantity(item.id, item.quantity + 1)}}
                        className="text-charcoal/70 hover:text-charcoal transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => {onDeleteItem(item.id)}}
                    className="text-red-500/70 hover:text-red-600 transition-colors cursor-pointer p-1"
                    aria-label="Delete item"
                >
                    <Trash2 size={16} />
                </button>

            </div>
        </div>
    );
}