import WordDisplay from "./components/WordDisplay";
import EmailSubscription from "./components/EmailSubscription";

export default function Home() {
  return (
    <>
      <div className="lg:container mx-auto p-6 text-gray-900 antialiased leading-tight">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
          Word of the Day
        </h1>
        <WordDisplay />
      </div>
      <EmailSubscription />
    </>
  );
}
