export interface TripData {
    destination: string;
    startDate: string;
    endDate: string;
    tripType: string;
    style: string;
}
export interface WeatherData {
    cityName: string;
    temperature: number;
    condition: string;
    description: string;
    icon: string;
}

export interface PackingItem {
    id: string;
    name: string;
    quantity: number;
    category: "clothing" | "shoes" | "essentials" | "specific";
    required: boolean;
    packed: boolean;
}
export interface PackingCategory {
    id: string;
    name: string;
    items: PackingItem[];
}
export interface Outfit {
    id: string;
    name: string;
    items: PackingItem[];
    description?: string;
}
export interface SavedTrip extends TripData{
    id: string;
    weather: WeatherData;
    packingList: PackingCategory[];
    createdAt: string;
}
