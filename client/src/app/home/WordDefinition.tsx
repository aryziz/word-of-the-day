"use client";

import { useState, useEffect } from "react";

export default function WordDefinition() {
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
      <h1>{word}</h1>
      <ol>
        {definitions.map((definition: string, index: number) => {
          return <li key={index}>{definition}</li>;
        })}
      </ol>
    </>
  );
}
