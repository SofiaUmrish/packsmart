import { SavedTrip, WeatherData, PackingCategory, TripData } from "@/types";

export interface NewTripInput extends TripData {
    id?: string;
    weather: WeatherData;
    packingList: PackingCategory[];
    createdAt?: string;
}

const STORAGE_KEY = "packsmart_saved_trips";


export function getSavedTrips(): SavedTrip[] {
  if (typeof window === "undefined"){
    return []
  }

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}


export function saveTrip(tripData: NewTripInput): SavedTrip{
  
  if (typeof window === "undefined"){
    return tripData as SavedTrip;
  }

    const existingData = localStorage.getItem(STORAGE_KEY);
    let existingTrips: SavedTrip[] = existingData ? JSON.parse(existingData) : [];

    const existingIndex = tripData.id 
    ? existingTrips.findIndex((trip) => trip.id === tripData.id)
    : -1;

    let savedTrip: SavedTrip;

    if (existingIndex !== -1) {
       
        savedTrip = {
          ...existingTrips[existingIndex],
          ...tripData,
        };
        existingTrips[existingIndex] = savedTrip;

      } else {

        savedTrip = {
          ...tripData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        } as SavedTrip;

        existingTrips = [savedTrip, ...existingTrips];
      }
      
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingTrips));


    return savedTrip;
}

export function deleteSavedTrip(id: string): SavedTrip[] {
  if (typeof window === "undefined"){
    return []
  }

    const existingData = localStorage.getItem(STORAGE_KEY);
    const existingTrips: SavedTrip[] = existingData ? JSON.parse(existingData) : [];

    const updatedTrips = existingTrips.filter((trip)=> trip.id !== id);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    
    return updatedTrips;
}