import { WeatherData } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeatherData(city: string): Promise<WeatherData>{

    if(!API_KEY){
        throw new Error("Weather API key is missing.");
    }

    const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
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

export async function getForecastData(city: string, startDate: string, endDate: string): Promise<WeatherData>{
   
    if(!API_KEY){
        throw new Error("Weather API key is missing.");
    }

    const response = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
    
    if(!response.ok){
        if (response.status === 404) {
            throw new Error("We couldn't find this destination. Please check the city name.");
        }
        throw new Error("Something went wrong while fetching forecast data.");
    }

    const data = await response.json();

    const tripForecasts = data.list.filter((item: any) => {
        const itemDate = item.dt_txt.split(" ")[0];
        return itemDate >= startDate && itemDate <= endDate;
    });

    const totalTemp = tripForecasts.reduce((acc: number, item: any) => acc + item.main.temp, 0);
    const avgTemp = Math.round(totalTemp / tripForecasts.length);

    const conditionCounts = tripForecasts.reduce((acc: any, item: any) => {
        const cond = item.weather[0].main;
        acc[cond] = (acc[cond] || 0) + 1;
        return acc;
    }, {});

    const mostFrequentCondition = Object.keys(conditionCounts).reduce((a, b) => 
        conditionCounts[a] > conditionCounts[b] ? a : b
    );

    const representativeForecast = tripForecasts.find((item: any) => item.weather[0].main === mostFrequentCondition) || tripForecasts[0];


    return({
        cityName: data.city.name,
        temperature: avgTemp,
        condition: representativeForecast.weather[0].main,
        description: representativeForecast.weather[0].description,
        icon: representativeForecast.weather[0].icon,
    })

}