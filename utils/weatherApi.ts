import { WeatherData } from "@/types";

export async function getWeatherData(city: string): Promise<WeatherData>{
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

    if(!apiKey){
        throw new Error("Weather API key is missing.");
    }

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    )

    if(!response.ok){
        if (response.status === 404) {
            throw new Error("We couldn't find this destination. Please check the city name.");
        }
        throw new Error("Something went wrong while fetching weather data.");
    }

    const data = await response.json();

    return({
        cityName: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
    })

}