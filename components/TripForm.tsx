'use client'
import { useState } from "react"
import { TripData } from "@/types";
import {getWeatherData} from "@/utils/weatherApi";
import LoadingScreen from "@/components/LoadingScreen";

export default function TripForm() {
    const radioLabel = {
        primary: "flex items-center gap-2 p-3 rounded-xl border border-sage/20 bg-white cursor-pointer hover:bg-sage-light/30 transition-all text-charcoal",
        selected: "flex items-center gap-2 p-3 rounded-xl border border-charcoal/60 bg-sage-light/50 cursor-pointer transition-all text-charcoal"
    }

    const tripTypeButton = {
        primary: "p-4 rounded-xl border border-charcoal/15 bg-white font-medium text-charcoal hover:border-sage hover:bg-sage-light/20 transition-all text-left",
        selected: "p-4 rounded-xl border border-sage bg-sage-light/40 font-medium text-charcoal transition-all text-left"
    }

    const [formData, setFormData] = useState<TripData>({
        destination: "",
        startDate: "",
        endDate: "",
        tripType: "",
        style: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTripTypeSelect = (type: string) => {
        setFormData((prev) => ({
            ...prev,
            tripType: type,
        }))
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setError("")

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            setError("Start date cannot be in the past.")
            return
        }

        if (end < start) {
            setError("End date cannot be earlier than start date.")
            return
        }

        try {
            setIsLoading(true);
            const weather = await getWeatherData(formData.destination);
            console.log("Weather fetched successfully:", weather);
            
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        isLoading ? (
            <LoadingScreen message="Checking the weather and preparing your trip..." />
        ):(

            <form className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-charcoal/10 text-charcoal flex flex-col gap-6 shadow-sm"
            onSubmit={handleSubmit}>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-medium text-charcoal"
                        htmlFor="destination"
                    >
                        Where are you going?
                    </label>
                    <input
                        className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-white focus:outline-none focus:border-sage transition-colors text-charcoal"
                        id="destination"
                        name="destination"
                        type="text"
                        placeholder="ex. Rome"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </div>
            
                <div>
                    <p className="font-medium mb-2 text-charcoal" aria-labelledby="trip-dates">When?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="trip-dates">
                        <div className="flex flex-col">
                            <label className="text-sage text-sm mb-1 ml-1 font-medium" htmlFor="start-date">From</label>
                            <input
                                className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-white focus:outline-none focus:border-sage transition-colors text-charcoal"
                                id="start-date"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sage text-sm mb-1 ml-1 font-medium" htmlFor="end-date">To</label>
                            <input
                                className="w-full px-4 py-3 rounded-xl border border-charcoal/20 bg-white focus:outline-none focus:border-sage transition-colors text-charcoal"
                                id="end-date"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                
                <div>
                    <p className="font-medium mb-3 text-charcoal" aria-labelledby="trip-type">What&apos;s the trip like?</p>
                    <div id="trip-type" className="grid grid-cols-2 gap-3">
                        <button 
                            type="button" 
                            className={formData.tripType === "beach" ? tripTypeButton.selected : tripTypeButton.primary} 
                            onClick={() => { handleTripTypeSelect("beach") }}
                        >
                            Beach vacation
                        </button>

                        <button 
                            type="button" 
                            className={formData.tripType === "city" ? tripTypeButton.selected : tripTypeButton.primary} 
                            onClick={() => { handleTripTypeSelect("city") }}
                        >
                            City break
                        </button>

                        <button 
                            type="button" 
                            className={formData.tripType === "business" ? tripTypeButton.selected : tripTypeButton.primary} 
                            onClick={() => { handleTripTypeSelect("business") }}
                        >
                            Business trip
                        </button>

                        <button 
                            type="button" 
                            className={formData.tripType === "hiking" ? tripTypeButton.selected : tripTypeButton.primary} 
                            onClick={() => { handleTripTypeSelect("hiking") }}
                        >
                            Hiking
                        </button>
                    </div>
                </div>

                <div>
                    <p className="font-medium mb-2 text-charcoal" aria-labelledby="wardrobe-style">Your style</p>
                    <div id="wardrobe-style" className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <label className={formData.style === 'casual' ? radioLabel.selected : radioLabel.primary}>
                            <input type="radio" name="style" value="casual" className="accent-sage" onChange={handleChange} /> Casual
                        </label>
                        <label className={formData.style === 'minimal' ? radioLabel.selected : radioLabel.primary}>
                            <input type="radio" name="style" value="minimal" className="accent-sage" onChange={handleChange} /> Minimal
                        </label>
                        <label className={formData.style === 'smart-casual' ? radioLabel.selected : radioLabel.primary}>
                            <input type="radio" name="style" value="smart-casual" className="accent-sage" onChange={handleChange} /> Smart casual
                        </label>
                        <label className={formData.style === 'sporty' ? radioLabel.selected : radioLabel.primary}>
                            <input type="radio" name="style" value="sporty" className="accent-sage" onChange={handleChange}/> Sporty
                        </label>
                        <label className={formData.style === 'feminine' ? radioLabel.selected : radioLabel.primary}>
                            <input type="radio" name="style" value="feminine" className="accent-sage" onChange={handleChange} /> Feminine
                        </label>
                        <label className={formData.style === 'classic' ? radioLabel.selected : radioLabel.primary}>
                            <input type="radio" name="style" value="classic" className="accent-sage" onChange={handleChange} /> Classic
                        </label>
                    </div>
                </div>

                {error && 
                    <p 
                        role="alert" 
                        className="text-red-600/80 text-sm rounded-xl border border-red-600/60 p-2 text-center bg-ivory"
                    >{error}</p>}
                
                <button 
                    className="w-full py-4 rounded-xl bg-charcoal text-ivory font-medium hover:bg-charcoal/90 transition-all shadow-md cursor-pointer" 
                    type="submit"
                >
                    Generate my list
                </button>
                
            </form>
        )
    )
}