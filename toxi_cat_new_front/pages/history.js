import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function History() {
  // État pour stocker l'historique récupéré de l'API
  const [searchHistory, setSearchHistory] = useState([]);
  // État pour gérer le chargement
  const [isLoading, setIsLoading] = useState(true);
  // État pour gérer les erreurs
  const [error, setError] = useState(null);

  const getAllHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/history");

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const history = await response.json();
      console.log("Historique récupéré:", history);
      setSearchHistory(history);
      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'historique:", error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllHistory();
  }, []);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Déterminer si une plante est toxique ou non basé sur le message
  // const isToxic = (message) => {
  //   return message.toLowerCase().includes("toxic");
  // };

  // Fonction améliorée pour déterminer si une plante est toxique
  const isToxic = (message) => {
    const lowerMessage = message.toLowerCase();

    // Mots indiquant qu'une plante est toxique
    const toxicKeywords = [
      "toxique",
      "toxic",
      "poison",
      "nocif",
      "dangereux",
      "danger",
      "empoisonnement",
      "intoxication",
      "néfaste",
      "risque",
    ];

    // Recherche de mots indiquant la toxicité
    for (const keyword of toxicKeywords) {
      if (lowerMessage.includes(keyword)) {
        // Vérifier que ce n'est pas une négation
        const negationKeywords = [
          "pas toxique",
          "non toxique",
          "sans danger",
          "n'est pas toxique",
        ];
        for (const negation of negationKeywords) {
          if (lowerMessage.includes(negation)) {
            return false;
          }
        }
        return true;
      }
    }

    // Mots indiquant qu'une plante est sûre
    const safeKeywords = [
      "sûr",
      "safe",
      "sans danger",
      "non toxique",
      "pas toxique",
      "sécuritaire",
    ];
    for (const keyword of safeKeywords) {
      if (lowerMessage.includes(keyword)) {
        return false;
      }
    }

    // Par défaut, considérer comme toxique pour être du côté prudent
    return true;
  };

  return (
    <div className="min-h-screen bg-nature-100">
      <div className="container mx-auto px-4 py-12">
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-nature-600 mb-6">
            Historique des recherches
          </h1>
          <Link
            href="/"
            className="inline-flex items-center text-nature-600 hover:text-nature-500 transition-colors"
          >
            ← Retour à la recherche
          </Link>
        </motion.header>

        <motion.div
          className="max-w-2xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLoading ? (
            <p className="text-center text-gray-500">
              Chargement de l'historique...
            </p>
          ) : error ? (
            <p className="text-center text-red-500">Erreur: {error}</p>
          ) : searchHistory.length === 0 ? (
            <p className="text-center text-gray-500">
              Aucun historique trouvé.
            </p>
          ) : (
            searchHistory.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {item.plante_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDate(item.created_at)}
                      </p>
                      {item.user && (
                        <p className="text-xs text-gray-400">
                          Recherché par:{" "}
                          {item.user.username || `Utilisateur #${item.user.id}`}
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        isToxic(item.message)
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {isToxic(item.message) ? "Toxique" : "Sans danger"}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.message}</p>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
