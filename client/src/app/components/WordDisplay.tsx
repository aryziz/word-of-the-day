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
      );
  }, []);

  return (
    <>
      <h3>{word}</h3>
      <ol>
        {definitions.map((definition: string, index: number) => {
          return <li key={index}>{definition}</li>;
        })}
      </ol>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </>
  );
}
