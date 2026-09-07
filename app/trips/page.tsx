import Header from "@/components/Header";
import SavedTrips from "@/components/SavedTrips";

export default async function TripsPage(){
    return(
        <main className="bg-ivory text-charcoal min-h-screen">
            <Header />
            <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
                <div>
                    <h1 className="text-3xl font-semibold mb-1">Saved Trips</h1>
                    <p className="text-charcoal/70">
                        Manage your planned adventures and quick access to packing lists.
                    </p>
                </div>
                <SavedTrips />
            </div>
        </main>
    )
}