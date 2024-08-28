"use client";

import { useState, useEffect } from "react";

export default function WordDisplay() {
  const [word, setWord] = useState("");
  const [definitions, setDefinitions] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/v1/latest-word")
      .then((res) => res.json())
      .then(
        (data: { word: string; definitions: string[]; createdAt: Date }) => {
          setWord(data.word.charAt(0).toUpperCase() + data.word.slice(1));
          setDefinitions(data.definitions);
        },
      )
      .catch((error) => {
        console.error(`[client] Error fetching data from server. ${error}`);
        return <p>Something went wrong...</p>;
      });
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:transition-shadow duration-500">
      <h3 className="text-2xl font-bold text-slate-600 mb-4 text-center">
        {word ? word.split(":")[0] : "An error occurred"}
      </h3>
      <ol className="list-decimal list-inside space-y-2">
        {definitions.map((definition: string, index: number) => (
          <li key={index} className="text-gray-700 text-lg">
            {definition}
          </li>
        ))}
      </ol>
    </div>
  );
}
