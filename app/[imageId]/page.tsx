"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImagePage({ params }: { params: { imageId: string } }) {
  const { imageId } = params;
  const [image, setImage] = useState<any>(null);
  const [clicked, setClicked] = useState(false);

  const handleDownload = async () => {
    setClicked(true);
    const response = await fetch(image.largeImageURL);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${image.id}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setClicked(false);
  };

  async function fetchImages() {
    const url = `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&id=${imageId}`;

    const response = await axios.get(url);
    setImage(response.data.hits[0]);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  if (image === null) {
    return <div> no image </div>;
  } else {
    return (
      <div className="p-10 flex items-center justify-center">
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            <Image
              src={image.largeImageURL}
              alt="image"
              width={1000}
              height={1000}
            />
          </div>
          <div className="p-4">
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
              Author: {image.user}
            </h6>
          </div>
          <div className="px-4 pb-4 pt-0 mt-2">
            <button
              onClick={handleDownload}
              disabled={clicked}
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Download
            </button>
          </div>
        </div>
      </div>
    );
  }
}
