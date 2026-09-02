'use client'

import Image from "next/image";

interface WeatherCardProps {
    cityName: string;
    temperature: number;
    condition: string;
    description: string;
    icon: string;
}

export default function WeatherCard({
    cityName,
    temperature,
    condition,
    description,
    icon,
}: WeatherCardProps) {
    const getRecommendation = (temp: number) => {
        if (temp < 13) return "Pack warm layers, a heavy jacket, and winter accessories.";
        if (temp < 20) return "Light layers, a trench coat, or a cardigan are recommended.";
        if (temp <= 28) return "Comfortable light clothing and a light layer for evenings.";
        return "Hot weather! Bring light summer clothes, sunglasses, and sunscreen.";
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm flex flex-row items-center justify-between gap-1 text-charcoal">
            <div className="flex items-center gap-4">
                {icon && (
                    <div className="relative w-16 h-16 bg-sage/60 rounded-2xl flex items-center justify-center">
                        <Image
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt={condition || "Weather icon"}
                            width={64}
                            height={64}
                            unoptimized
                        />
                    </div>
                )}
                <div>
                    <h2 className="text-2xl font-semibold">{cityName}</h2>
                    <p className="text-charcoal/70 capitalize text-sm">
                        {description || condition}
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end text-right">
                <span className="text-4xl font-bold tracking-tight">
                    {Math.round(temperature)}°C
                </span>
                <p className="text-xs text-sage font-medium max-w-[220px] mt-1">
                    {getRecommendation(temperature)}
                </p>
            </div>
        </div>
    );
}