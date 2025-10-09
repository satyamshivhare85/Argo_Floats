import React, { useState, useEffect } from 'react';

// --- Reusable Components ---

const Spinner = () => (
    <div className="flex justify-center items-center h-full">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-cyan-500 rounded-full animate-spin"></div>
    </div>
);

const NewsCard = ({ article, onExplain }) => (
    <div className="news-card bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col transition-transform duration-300 hover:-translate-y-1">
        <a href={article.url} target="_blank" rel="noopener noreferrer">
            <img 
                src={article.image || 'https://placehold.co/600x400/1E293B/94A3B8?text=No+Image'} 
                alt={article.title}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/1E293B/FFFFFF?text=Image+Error'; }}
            />
        </a>
        <div className="p-6 flex flex-col flex-grow">
            <span className="text-sm font-semibold text-cyan-400 mb-2">{article.source.name}</span>
            <h3 className="mb-2 text-xl font-bold text-white">{article.title}</h3>
            <p className="text-gray-400 text-base flex-grow mb-4">{article.description}</p>
            <div className="mt-auto pt-4 border-t border-gray-700 flex justify-between items-center">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-semibold hover:underline">
                    Read More &rarr;
                </a>
                <button 
                    onClick={() => onExplain(article)}
                    className="bg-purple-900/50 text-purple-300 text-sm font-semibold px-3 py-1 rounded-full transition-colors hover:bg-purple-800/60"
                >
                    ✨ Explain
                </button>
            </div>
        </div>
    </div>
);

const GeminiModal = ({ isOpen, onClose, title, content }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 scale-95" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-xl font-bold text-white">✨ {title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700 text-gray-300">✖</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {content ? <div className="text-lg leading-relaxed text-gray-300" dangerouslySetInnerHTML={{ __html: content }}></div> : <Spinner />}
                </div>
            </div>
        </div>
    );
};

// --- Main News Component ---

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    // --- Static News Data ---
    // FIX: Replaced image URLs with a different, more reliable source (pexels)
    const oceanNews = [
        {
            title: "Hurricane Humberto grows to Category 5, could affect East Coast",
            description: "Hurricane Humberto has grown into a top-strength Category 5 storm and could affect the United States' East Coast, bringing life-threatening surf.",
            url: "#",
            image: 'https://tse2.mm.bing.net/th/id/OIP._gVGZNnvtOBwEShCHAj7SQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 
            source: { name: "NBC News" }
        },
        {
            title: "Ocean Park International ETF Trading 0.1% Higher",
            description: "A look at the recent market performance for the Ocean Park International Exchange-Traded Fund following the latest dividend announcement.",
            url: "#",
            image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            source: { name: "ETF Daily News" }
        },
        {
            title: "New Study Reveals Impact of Microplastics on Marine Food Webs",
            description: "Researchers have published a new study detailing the widespread contamination of microplastics in plankton, threatening the entire ocean food web.",
            url: "#",
            image: 'https://www.bioxcellerator.com/wp-content/uploads/2024/04/Microplastics-A-Hidden-Hazard-02-min-scaled-1-2048x1360.jpg',
            source: { name: "Oceanographic Journal" }
        }
    ];

    const argoNews = [
        {
            title: "Global Array of Argo Floats Surpasses 4000 Units",
            description: "The international Argo program now has over 4,000 active robotic floats monitoring the world's oceans in real-time.",
            url: "#",
            image: 'https://niwa.co.nz/sites/default/files/styles/landscape/public/sites/default/files/images/argo_float_deployment.png?itok=kx8_C7ns',
            source: { name: "Argo HQ Press" }
        },
        {
            title: "Argo Floats Equipped with Advanced Biogeochemical Sensors",
            description: "The next generation of Argo floats includes new sensors to measure oxygen, nitrate, pH, and other critical ocean health indicators.",
            url: "#",
            image: 'https://2.bp.blogspot.com/-87pvnMTbigw/VrPxGSyvubI/AAAAAAAADuc/h6isYRMQ7V4/s1600/DSC_1360.jpg',
            source: { name: "Ocean Tech Monthly" }
        },
        {
            title: "Data from Argo Floats Crucial for New Climate Models",
            description: "Climate scientists are heavily relying on the vast dataset provided by Argo floats to improve the accuracy of future climate change predictions.",
            url: "#",
            image: 'https://tse1.mm.bing.net/th/id/OIP.QxWPMYNJUBhYqETyJl9IGwHaFj?w=864&h=648&rs=1&pid=ImgDetMain&o=7&rm=3',
            source: { name: "Climate Watch Report" }
        }
    ];

    // For the AI features to work, you must replace "YOUR_GEMINI_API_KEY_HERE" with your actual key.
    const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";

    useEffect(() => {
        if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
             console.warn("--- Gemini API Key is not set. 'Explain' and 'Summarize' features will not work until you add your key. ---");
        } else {
             console.log("--- Gemini API Key Loaded ---");
        }
    }, []);

    const callGeminiAPI = async (prompt) => {
        if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
            console.error("CRITICAL: Gemini API Key is not configured.");
            return "Error: The Google AI API Key is not configured. Please add your key to the `dashboard.jsx` file to enable this feature.";
        }
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });
            if (!response.ok) {
                const errorBody = await response.json();
                console.error("API Error Response:", errorBody);
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const data = await response.json();
            return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No content was returned from the AI.";
        } catch (error) {
            console.error("Gemini API call failed:", error);
            return "Sorry, the AI call failed. Please check the console for more details.";
        }
    };

    const handleExplain = async (article) => {
        setModalTitle(`Explaining: ${article.title}`);
        setModalContent(''); // Clear previous content and show spinner
        setIsModalOpen(true);
        const prompt = `Explain this news headline and its description in a simple, easy-to-understand way. Headline: "${article.title}". Description: "${article.description}". Make it about 3-4 sentences long.`;
        const explanation = await callGeminiAPI(prompt);
        setModalContent(explanation.replace(/\n/g, '<br />'));
    };

    const handleSummarize = async () => {
        setModalTitle("Today's Ocean News Summary");
        setModalContent('');
        setIsModalOpen(true);
        const allTitles = [...oceanNews, ...argoNews].map(a => a.title).join(', ');
        const prompt = `Summarize the key themes from these news headlines in a single, concise paragraph: ${allTitles}.`;
        const summary = await callGeminiAPI(prompt);
        setModalContent(summary.replace(/\n/g, '<br />'));
    };

    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen">
            <GeminiModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalTitle}
                content={modalContent}
            />

            <main className="container mx-auto px-6 py-8">
                <div className="mb-12 text-center">
                    <button 
                        onClick={handleSummarize}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:shadow-purple-500/50"
                    >
                        ✨ Get Today's News Summary
                    </button>
                </div>

                <section id="ocean-news-section">
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-4">Latest Ocean & Seas News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {oceanNews.map((article, index) => <NewsCard key={`ocean-${index}`} article={article} onExplain={handleExplain} />)}
                    </div>
                </section>

                <section id="argo-news-section" className="mt-16">
                    <h2 className="text-3xl font-bold mb-6 border-l-4 border-teal-500 pl-4">Argo Floats News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {argoNews.map((article, index) => <NewsCard key={`argo-${index}`} article={article} onExplain={handleExplain} />)}
                    </div>
                </section>
            </main>
        </div>
    );
};

