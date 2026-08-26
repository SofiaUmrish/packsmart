import Header from "@/components/Header"
import TripForm from "@/components/TripForm"

export default function PlannerPage(){
    return(
        <main className="bg-ivory text-charcoal min-h-screen">
            <Header />
            <div className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold mb-8">Plan your trip</h1>
                <TripForm />
            </div>
        </main>
    )

}