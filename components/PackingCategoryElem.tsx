'use client'

import { PackingCategory } from "@/types";
import PackingItemElem from "@/components/PackingItemElem";

interface PackingCategoryProps {
    category: PackingCategory;
    onTogglePacked: (id: string) => void;
    onUpdateQuantity: (id: string, newQuantity: number) => void;
    onDeleteItem: (id: string) => void;
}

export default function PackingCategoryElem({category, onTogglePacked, onUpdateQuantity, onDeleteItem} :PackingCategoryProps) {
   
    if(category.items.length===0){
        return null
    }
    
    return (
        <div className="bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm flex flex-col gap-4">
            <h3 className="text-xl font-semibold capitalize text-charcoal border-b border-charcoal/10 pb-3">
                {category.name}
            </h3>
            
            <div className="flex flex-col gap-2">
                {
                  category.items.map((item)=>
                    <PackingItemElem 
                        key={item.id}  
                        item={item} 
                        onTogglePacked = {onTogglePacked} 
                        onUpdateQuantity = {onUpdateQuantity}  
                        onDeleteItem = {onDeleteItem} />
                  )
                }
            </div>
        </div>
    );
}