"use client";

import ImageCard from "@/components/imageCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<any>(null);

  async function fetchImages() {
    const url = `https://pixabay.com/api/?key=${
      process.env.NEXT_PUBLIC_PIXABAY_API_KEY
    }&q=${encodeURIComponent(search)}`;

    const response = await axios.get(url);
    setImages(response.data.hits);
  }

  useEffect(() => {
    fetchImages();
  }, [search]);

  if (images === null) {
    return <div> no images </div>;
  } else {
    return (
      <div className="p-5 flex flex-col items-center justify-center">
        <label
          htmlFor="default-search"
          className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
        >
          Search
        </label>
        <input
          id="default-search"
          type="text"
          value={search}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search For Images"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="p-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image: any) => {
            return <ImageCard key={image.id} image={image} />;
          })}
        </div>
      </div>
    );
  }
}
