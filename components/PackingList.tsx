'use client';

import { useState } from "react";
import { PackingCategory } from "@/types";
import PackingCategoryElem from "@/components/PackingCategoryElem";
import { Plus } from "lucide-react";
import PackingScore from '@/components/PackingScoreElem';

interface PackingListProps {
    initialCategories: PackingCategory[];
}

export default function PackingList({ initialCategories }: PackingListProps) {
    const [categories, setCategories] = useState<PackingCategory[]>(initialCategories);
    
    const [isAdding, setIsAdding] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState(1);
    const [selectedCategoryName, setSelectedCategoryName] = useState(categories[0]?.name || "");

    const handleTogglePacked = (id: string) => {
        setCategories((prevCategory)=>
            prevCategory.map(category => ({
                ...category,
                items: category.items.map(item =>
                    item.id===id ? {...item, packed: !item.packed} : item)
            }))
        )
    };

    const handleUpdateQuantity = (id: string, newQuantity: number) => {
        setCategories((prevCategory) =>
            prevCategory.map(category => ({
                ...category,
                items: category.items.map(item =>
                    item.id === id ?  {...item, quantity: newQuantity} : item)
            }))
        )
    };

    const handleDeleteItem = (id: string) => {
        setCategories((prevCategory) =>
            prevCategory.map(category => ({
                ...category,
                items: category.items.filter(item => item.id !== id)
            }))
        )
    };

    const handleAddItem = (e: React.SubmitEvent) =>{
        e.preventDefault();
        if (!newItemName.trim()) return;

        setCategories((prevCategory) =>
            
            prevCategory.map(category => 

                category.name === selectedCategoryName 
                    ? { ...category, items: [...category.items, 
                        {
                            id: crypto.randomUUID(),
                            name: newItemName,
                            quantity: newItemQuantity,
                            category: selectedCategoryName.toLowerCase() as any,
                            required: true,
                            packed: false,
                        }
                    ]}
                    : category
            )
        )
        
        setNewItemName("");
        setNewItemQuantity(1);
        setIsAdding(false);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-charcoal">Packing List</h2>
                
                <button
                    type="button"
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-sage/80 text-charcoal px-4 py-2 rounded-xl font-medium hover:bg-sage/90 transition-all cursor-pointer text-sm"
                >
                    <Plus size={16} /> {isAdding ? "Cancel" : "Add item"}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddItem} className="bg-white p-5 rounded-2xl border border-charcoal/10 shadow-sm flex flex-col gap-4 animate-fadeIn">
                    <h3 className="font-semibold text-charcoal">Add Custom Item</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                            type="text"
                            placeholder="Item name (e.g. Camera)"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-charcoal/20 focus:outline-none focus:border-sage text-charcoal"
                            required
                        />
                        
                        <input
                            type="number"
                            min="1"
                            value={newItemQuantity}
                            onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                            className="px-4 py-2 rounded-xl border border-charcoal/20 focus:outline-none focus:border-sage text-charcoal"
                        />

                        <select
                            value={selectedCategoryName}
                            onChange={(e) => setSelectedCategoryName(e.target.value)}
                            className="px-4 py-2 rounded-xl border border-charcoal/20 focus:outline-none focus:border-sage text-charcoal bg-white"
                        >
                            {categories.map(category =>
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            )}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="self-end bg-charcoal text-ivory px-5 py-2 rounded-xl font-medium hover:bg-charcoal/90 transition-all cursor-pointer text-sm"
                    >
                        Add to list
                    </button>
                </form>
            )}

            <div className="flex flex-col gap-6">
                {categories.map(category => (
                   <PackingCategoryElem 
                        key={category.id}
                        category={category}
                        onTogglePacked={handleTogglePacked}
                        onUpdateQuantity={handleUpdateQuantity}
                        onDeleteItem={handleDeleteItem}
                   />
                ))}
            </div>

            <PackingScore categories = {categories}/>
        </div>
    );
}