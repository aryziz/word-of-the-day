import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

function RandomWord() {
  const [randomWord, setRandomWord] = useState<string>("");
  const [wordDefinition, setWordDefinition] = useState<string[]>([]);

  useEffect(() => {
    async function fetchRandomWord() {
      try {
        const response: AxiosResponse = await axios.get("/api/v1/latest-word");
        const { data } = response;
        const { word, definitions } = data;
        console.log(word, definitions);
        setWordDefinition(definitions);
        setRandomWord(word);
      } catch (error: any) {
        console.error(`Error: ${error}\nDescription: ${error.message}`);
      }
    }
    fetchRandomWord();
  }, []);
  return (
    <>
      <h3>Word of the day:</h3>
      <p>{randomWord}</p>
      <ol>
        {wordDefinition.map((definition: string, index: number) => {
          return <li key={index}>{definition}</li>;
        })}
      </ol>
    </>
  );
}

export default RandomWord;
