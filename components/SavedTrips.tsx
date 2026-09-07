"use client";

import { useState, useEffect } from "react";
import { getSavedTrips, deleteSavedTrip } from "@/utils/storage";
import { SavedTrip } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, Trash2 } from "lucide-react";

export default function SavedTrips() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const router = useRouter();

  useEffect(() => {
    setTrips(getSavedTrips());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = deleteSavedTrip(id);
    setTrips(updated);
  };

  if (trips.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-charcoal/10 text-center flex flex-col items-center gap-4">
        <p className="text-charcoal/70">You don't have any saved trips yet.</p>
        <Link
          href="/"
          className="bg-charcoal text-ivory px-6 py-3 rounded-xl font-medium hover:bg-charcoal/90 transition-colors shadow-sm"
        >
          Plan a Trip
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {trips.map((trip) => {
        const queryParams = new URLSearchParams({
          id: trip.id,
          city: trip.destination,
          start: trip.startDate,
          end: trip.endDate,
          tripType: trip.tripType,
          style: trip.style,
          temperature: String(trip.weather.temperature),
          condition: trip.weather.condition,
          description: trip.weather.description,
          icon: trip.weather.icon,
        }).toString();

        return (
          <div
            key={trip.id}
            onClick={() => router.push(`/result?id=${trip.id}`)}
            className="bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:border-charcoal/30 transition-all"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-sage">
                {trip.destination}
              </h3>
              <p className="text-sm text-charcoal/60">
                {trip.startDate} — {trip.endDate}
              </p>
              <div className="flex gap-2 mt-2 capitalize">
                <span className="text-xs px-2.5 py-1 rounded-md bg-sage/40 text-charcoal">
                  {trip.tripType}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-sage/40 text-charcoal">
                  {trip.style} style
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 text-xs text-charcoal/50 self-end">
                <Clock size={13} />
                <span>
                  Created at{" "}
                  {trip.createdAt
                    ? new Date(trip.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—"}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleDelete(e, trip.id)}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500/5 transition-colors"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}