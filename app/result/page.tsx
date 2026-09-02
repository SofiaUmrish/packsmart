import Header from "@/components/Header";
import { generatePackingList } from "@/utils/packingCalculator";
import WeatherCard from "@/components/WeatherCard";
import PackingList from '@/components/PackingList';

interface ResultsPageProps {
    searchParams: Promise<{
        city?: string;
        start?: string;
        end?: string;
        tripType?: string;
        style?: string;
        temperature?: string;
        condition?: string;
        description?: string;
        icon?: string;
    }>;
}

export default async function ResultsPage({
    searchParams,
}: ResultsPageProps) {

    const params = await searchParams;

    if (
        !params.city ||
        !params.start ||
        !params.end ||
        !params.tripType ||
        !params.style ||
        !params.temperature ||
        !params.condition ||
        !params.description ||
        !params.icon
    ) {
        return (
            <main>
                <h1>Trip information is missing.</h1>
            </main>
        );
    }

    const weatherData = {
        cityName: params.city,
        temperature: Number(params.temperature),
        condition: params.condition,
        description: params.description,
        icon: params.icon,
    };

    const packingCategories = generatePackingList({
        startDate: params.start,
        endDate: params.end,
        temperature: weatherData.temperature,
        condition: weatherData.condition,
        tripType: params.tripType,
        style: params.style,
    });

    return (
        <main className="bg-ivory text-charcoal min-h-screen">
            <Header />

            <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-semibold mb-1">Your Trip Plan</h1>
                    <p className="text-charcoal/70">
                        {params.start} — {params.end} • <span className="capitalize">{params.tripType}</span> • <span className="capitalize">{params.style}</span> style
                    </p>
                </div>

                <WeatherCard {...weatherData} />
                <PackingList initialCategories = {packingCategories} />

            </div>
        </main>
    );
}