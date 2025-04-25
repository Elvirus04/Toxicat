import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [cats, setCats] = useState([]);

  const suggestions = [
    "Lys",
    "Orchidée",
    "Aloe Vera",
    "Monstera",
    "Sansevière",
  ];

  const getAllUsers = async () => {
    const reponse = await fetch("http://localhost:8000/user");
    const users = await reponse.json();

    console.log(users);
  };

  console.log("hello1");
  const getAllCats = async () => {
    const reponse = await fetch("http://localhost:8000/cat");
    const cats = await reponse.json();
    console.log(cats);
    setCats(cats);
  };
  console.log("hello2");

  useEffect(() => {
    getAllUsers();
    getAllCats();
  }, []);

  const handleSearch = async () => {
    // if (!searchQuery.trim()) return;
    // setIsLoading(true);
    // setResult(null);
    // // Simulated API call
    // await new Promise((resolve) => setTimeout(resolve, 1500));
    // setResult({
    //   plant: searchQuery,
    //   toxic: Math.random() > 0.5,
    //   details:
    //     "This is a placeholder result. The actual OpenAI integration will provide real data.",
    // });
    // setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
  };

  return (
    <div className="min-h-screen bg-nature-100">
      {/* {cats.map((cat, index) => (
        <div>{cat.name}</div>
      ))} */}
      <div className="container mx-auto px-4 py-12">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-nature-600 mb-6">ToxiCat</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Assurez la sécurité de votre ami félin en vérifiant si les plantes
            sont toxiques pour les chats.
          </p>
        </motion.header>

        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Entrez le nom de la plante..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 border border-nature-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-nature-500 bg-white/80 backdrop-blur-sm"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <div className="relative flex-1">
              <button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim()}
                className={`px-8 py-4 rounded-lg transition-all transform hover:scale-105 ${
                  isLoading || !searchQuery.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-nature-500 hover:bg-nature-600 text-white"
                }`}
              >
                {isLoading ? "Vérification..." : "Vérifier"}
              </button>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-2 mb-8">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 text-sm bg-white/50 hover:bg-white text-nature-600 rounded-full border border-nature-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{result.plant}</h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      result.toxic
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {result.toxic
                      ? "Toxique pour les chats"
                      : "Sans danger pour les chats"}
                  </span>
                </div>
                <p className="text-gray-600">{result.details}</p>
              </motion.div>
            )}
          </div>

          <Link
            href="/history"
            className="block text-center bg-white/80 backdrop-blur-sm text-nature-600 px-6 py-4 rounded-lg border border-nature-500 hover:bg-nature-100 transition-all transform hover:scale-105"
          >
            Voir l'historique de recherche
          </Link>
        </div>
      </div>
    </div>
  );
}
