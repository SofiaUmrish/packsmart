"use client";

import { useEffect, useState } from "react";

interface InspirationGalleryProps {
  destination: string;
  tripType: string;
  style: string;
  temperature: number;
  condition: string;
}

interface UnsplashPhoto {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
}

const styleQueries: Record<string, string> = {
    casual: "casual everyday comfortable outfit street style",
    minimal: "minimal neutral capsule wardrobe outfit street style",
    "smart-casual": "smart casual chic tailored outfit street style",
    sporty: "sporty casual athleisure outfit street style",
    feminine: "feminine elegant romantic outfit street style",
    classic: "classic timeless elegant outfit street style",
  };
  

const tripTypeQueries: Record<string, string> = {
  city: "city walking travel outfit",
  beach: "summer beach resort outfit",
  hiking: "outdoor hiking travel outfit",
  business: "business travel elegant outfit",
};

function getWeatherQuery(temperature: number, condition: string): string {
  const normalizedCondition = condition.toLowerCase();

  if (
    normalizedCondition.includes("rain") ||
    normalizedCondition.includes("drizzle")
  ) {
    return "rainy weather layered outfit";
  }

  if (temperature < 13) {
    return "cold weather layered outfit coat";
  }

  if (temperature < 20) {
    return "transitional weather light jacket outfit";
  }

  if (temperature <= 28) {
    return "warm weather light summer outfit";
  }

  return "hot weather breathable summer outfit";
}

export default function InspirationGallery({
  destination,
  tripType,
  style,
  temperature,
  condition,
}: InspirationGalleryProps) {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        setLoading(true);

        const styleQuery = styleQueries[style] || "stylish everyday outfit";
        const tripTypeQuery = tripTypeQueries[tripType] || "travel outfit";
        const weatherQuery = getWeatherQuery(temperature, condition);

        const queries = [
          `${styleQuery} ${weatherQuery} editorial full body`,
          `${tripTypeQuery} ${styleQuery} natural light`,
          `${destination} street style fashion`,
        ];

        const responses = await Promise.all(
          queries.map(async (query) => {
            const params = new URLSearchParams({
              query,
              per_page: "4",
              orientation: "portrait",
              content_filter: "high",
              client_id: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
            });

            const response = await fetch(
              `https://api.unsplash.com/search/photos?${params.toString()}`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch inspiration photos");
            }

            const data = await response.json();
            return data.results || [];
          })
        );

        const uniquePhotos = responses
          .flat()
          .filter(
            (photo: UnsplashPhoto, index: number, self: UnsplashPhoto[]) =>
              index === self.findIndex((item) => item.id === photo.id)
          )
          .slice(0, 4);

        setPhotos(uniquePhotos);
      } catch (error) {
        console.error("Failed to fetch inspiration photos:", error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [destination, tripType, style, temperature, condition]);

  if (loading) {
    return (
      <div className="text-sm text-charcoal/60">Loading inspiration...</div>
    );
  }

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-charcoal/10 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-charcoal">
        Inspiration Gallery
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative h-48 rounded-xl overflow-hidden bg-charcoal/5"
          >
            <img
              src={photo.urls.small}
              alt={photo.alt_description || "Outfit inspiration"}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}