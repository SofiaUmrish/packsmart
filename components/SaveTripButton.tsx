"use client";

import { useRouter } from "next/navigation";
import {saveTrip, NewTripInput } from "@/utils/storage";

interface SaveTripButtonProps {
  tripData: NewTripInput;
}

export default function SaveTripButton({ tripData }: SaveTripButtonProps) {
  const router = useRouter();

  const isEditing = Boolean(tripData.id);

  const handleSave = () => {
    saveTrip(tripData);
    router.push("/trips");
  };

  return (
    <button
      onClick={handleSave}
      className="bg-sage/90 text-charcoal/90 px-6 py-3 rounded-xl text-md font-semibold hover:bg-sage/80 transition-colors shadow-sm"
    >
      {isEditing ? "Save Changes" : "Save Trip"}
    </button>
  );
}