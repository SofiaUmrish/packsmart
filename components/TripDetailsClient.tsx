"use client";

import { useState, useEffect } from "react";
import WeatherCard from "@/components/WeatherCard";
import PackingList from "@/components/PackingList";
import SaveTripButton from "@/components/SaveTripButton";
import InspirationGallery from "@/components/InspirationGallery";
import { generatePackingList } from "@/utils/packingCalculator";
import { getSavedTrips } from "@/utils/storage";
import { PackingCategory, SavedTrip, WeatherData } from "@/types";

interface TripDetailsClientProps {
    searchParams: {
        id?: string;
        city?: string;
        start?: string;
        end?: string;
        tripType?: string;
        style?: string;
        temperature?: string;
        condition?: string;
        description?: string;
        icon?: string;
    };
}

export default function TripDetailsClient({ searchParams }: TripDetailsClientProps) {
    const id = searchParams.id;
    
    const [existingTrip, setExistingTrip] = useState<SavedTrip | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [packingCategories, setPackingCategories] = useState<PackingCategory[]>([]);
    
    const [tripInfo, setTripInfo] = useState<{
        city: string;
        start: string;
        end: string;
        tripType: string;
        style: string;
        weather: WeatherData;
    } | null>(null);

    useEffect(() => {
        const savedTrips = getSavedTrips();

        console.log("URL id:", id);
        console.log("Saved trips:", savedTrips);

        const found = id ? savedTrips.find((t) => t.id === id) : null;

        console.log("Found trip:", found);

        setExistingTrip(found || null);

        if (found) {
            setTripInfo({
                city: found.destination,
                start: found.startDate,
                end: found.endDate,
                tripType: found.tripType,
                style: found.style,
                weather: found.weather,
            });
            setPackingCategories(found.packingList);
        } else {
            const city = searchParams.city || "";
            const start = searchParams.start || "";
            const end = searchParams.end || "";
            const tripType = searchParams.tripType || "";
            const style = searchParams.style || "";

            const temp = Number(searchParams.temperature || 20);
            const cond = searchParams.condition || "Clear";

            setTripInfo({
                city,
                start,
                end,
                tripType,
                style,
                weather: {
                    cityName: city,
                    temperature: temp,
                    condition: cond,
                    description: searchParams.description || "Clear sky",
                    icon: searchParams.icon || "01d",
                },
            });

            if (start && end && city && tripType && style) {
                const generated = generatePackingList({
                    startDate: start,
                    endDate: end,
                    temperature: temp,
                    condition: cond,
                    tripType: tripType,
                    style: style,
                });
                setPackingCategories(generated);
            }
        }
        setIsLoading(false);
    }, [id, searchParams]);

    if (isLoading || !tripInfo) {
        return (
            <div className="h-100 bg-white rounded-2xl border border-charcoal/10 shadow-sm flex items-center justify-center p-12">
                <p className="text-charcoal/70">Loading trip details...</p>
            </div>
        );
    }

    const { city, start, end, tripType, style, weather } = tripInfo;

    if (!city || !start || !end || !tripType || !style) {
        return (
            <div className="h-100 bg-white rounded-2xl border border-charcoal/10 shadow-sm">
                <h1 className="h-100 w-full flex items-center justify-center text-center text-charcoal">Trip information is missing.</h1>
            </div>
        );
    }

    const tripDataForSave = {
        id: existingTrip?.id,
        destination: city,
        startDate: start,
        endDate: end,
        tripType: tripType,
        style: style,
        weather: weather,
        packingList: packingCategories,
    };

    return (
        <>
            <div>
                <h1 className="text-3xl font-semibold mb-1">
                    {existingTrip ? "Edit Trip Plan" : "Your Trip Plan"}
                </h1>
                <p className="text-charcoal/70">
                    {start} — {end} • <span className="capitalize">{tripType}</span> • <span className="capitalize">{style}</span> style
                </p>
            </div>

            <WeatherCard {...weather} />
            
            <PackingList 
                initialCategories={packingCategories} 
                onCategoriesChange={setPackingCategories} 
            />

            <InspirationGallery 
                destination={city}
                tripType={tripType} 
                style={style}
                temperature={weather.temperature}
                condition={weather.condition}
            />

            <div className="flex justify-center pt-4 border-t border-charcoal/10">
                <SaveTripButton tripData={tripDataForSave} />
            </div>
        </>
    );
}