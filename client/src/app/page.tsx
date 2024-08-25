import WordDisplay from "./components/WordDisplay";

export default function Home() {
  return (
    <>
      <div className="lg:container text-gray-900 antialiased leading-tight">
        <h1>Word of the day</h1>
        <WordDisplay />
      </div>
    </>
  );
}
