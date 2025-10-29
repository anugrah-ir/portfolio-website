"use client";

import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";

interface KeyFeaturesProps {
  keyFeatures: {
    feature: string;
    description: string;
  }[];
}

export default function keyFeatures({ keyFeatures }: KeyFeaturesProps) {
    const [openIndices, setOpenIndices] = useState<number[]>([]);

    const toggleIndex = (index: number) => {
        setOpenIndices((prev) =>
        prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
        );
    };

    return (
        <section id="key-features" className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <Sparkles className="h-6 w-6 lg:h-8 lg:w-8" />
          <h2 className="text-lg font-medium lg:text-2xl">Key Features</h2>
        </div>
        <ul className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-200">
            {keyFeatures.map((keyFeature, index) => {
                const isOpen = openIndices.includes(index);
                return (
                <li
                    key={index}
                    className="overflow-hidden border-b border-neutral-800 px-4 last:border-none"
                >
                    <button
                    onClick={() => toggleIndex(index)}
                    className="flex w-full items-center gap-5 py-3"
                    >
                    <ChevronRight
                        className={`h-4 w-4 transform text-neutral-400 transition-transform duration-300 lg:h-6 lg:w-6 ${
                        isOpen ? "rotate-90" : ""
                        }`}
                    />
                    <div className="flex items-center gap-2">
                        <span className="lg:text-md text-sm font-medium">
                        {keyFeature.feature}
                        </span>
                    </div>
                    </button>

                    <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
                    }`}
                    >
                    <div className="pb-4 text-sm text-neutral-400">
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