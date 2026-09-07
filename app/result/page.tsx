import Header from "@/components/Header";
import TripDetailsClient from "@/components/TripDetailsClient";

interface ResultsPageProps {
    searchParams: Promise<{
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
    }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
    const params = await searchParams;

    return (
        <main className="bg-ivory text-charcoal min-h-screen">
            <Header />
            <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
                <TripDetailsClient searchParams={params} />
            </div>
        </main>
    );
}