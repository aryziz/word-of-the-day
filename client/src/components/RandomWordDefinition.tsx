import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

function RandomWord() {
    const [randomWord, setRandomWord] = useState("");
    const [wordDefinition, setWordDefinition] = useState("");

    useEffect(() => {
        async function fetchRandomWord() {
            try {
                const response = await axios.get("/api/v1/latest-word");
                const { data } = response.data;
                const { word, definitions } = data;
                console.log(word, definitions);
                setRandomWord(word[0].charAt(0).toUpperCase() + word[0].slice(1));
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
        </>
    );
}

export default RandomWord;
