"use client";

import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";

interface KeyFeaturesProps {
  keyFeatures: {
    feature: string;
    description: string;
  }[];
}

export default function KeyFeatures({ keyFeatures }: KeyFeaturesProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section id="key-features" className="flex w-full flex-col gap-3 sm:gap-4">
      <div className="flex flex-row items-center gap-2.5 sm:gap-3">
        <Sparkles className="h-5 w-5 text-neutral-300 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
        <h2 className="text-base font-semibold sm:text-xl lg:text-2xl">
          Key Features
        </h2>
      </div>
      <ul className="w-full max-w-3xl rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200">
        {keyFeatures.map((keyFeature, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <li
              key={index}
              className="overflow-hidden border-b border-neutral-800 last:border-none"
            >
              <button
                type="button"
                onClick={() => toggleIndex(index)}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-800/50 sm:gap-4 sm:py-3.5"
              >
                <ChevronRight
                  className={`h-4 w-4 shrink-0 transform text-neutral-400 transition-transform duration-300 sm:h-5 sm:w-5 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
                <span className="text-sm font-medium sm:text-base">
                  {keyFeature.feature}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 pt-1 text-xs leading-relaxed text-neutral-400 sm:text-sm">
                  {keyFeature.description}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
