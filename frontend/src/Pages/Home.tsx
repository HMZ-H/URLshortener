import api from "../api/api";
import { useState } from "react";
// import UrlResult from "../components/UrlResult";
import { Copy, BarChart2, Trash2 } from "lucide-react";

export default function Home() {
    const [url, setUrl] = useState("");
    // const [shortUrl, setShortUrl] = useState("");
    const [Links, setLinks] = useState<{
        id: number;
        shortUrl: string;
        originalUrl: string;
        clicks: number;
        status: string;
        date: string;
        code: string;
    }[]>([]);
    const [analytics, setAnalytics] = useState<{
        totalClicks: number;
        topCountries: { country: string; clicks: number }[];
        topReferrers: { referrer: string; clicks: number }[];
        dailyClicks: { date: string; clicks: number }[];
    } | null>(null);
    const [showAnalytics, setShowAnalytics] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/shorten", { originalUrl: url });
            // setShortUrl(response.data.shortUrl);

            // Extract code from shortUrl for analytics
            const code = response.data.shortUrl.split('/').pop() || '';
            
            // Add the new shortened link to the recent list
            setLinks(prev => [
                {
                    id: Date.now(),
                    shortUrl: response.data.shortUrl,
                    originalUrl: url,
                    clicks: 0,
                    status: "Active",
                    date: "Just now",
                    code: code,
                },
                ...prev,
            ]);
            setUrl("");
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string }; status?: number }; message?: string };
            alert(`Error shortening URL: ${error.response?.data?.error || error.message || 'Unknown error'}`);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    };

    const handleDelete = (id: number) => {
        setLinks(prev => prev.filter(link => link.id !== id));
    };

    const fetchAnalytics = async (code: string) => {
        try {
            const response = await api.get(`/analytics/${code}`);
            setAnalytics(response.data);
            setShowAnalytics(true);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string }; status?: number }; message?: string };
            alert(`Error fetching analytics: ${error.response?.data?.error || error.message || 'Unknown error'}`);
        }
    };

    const refreshClicks = async (code: string, linkId: number) => {
        try {
            const response = await api.get(`/clicks/${code}`);
            setLinks(prev => prev.map(link => 
                link.id === linkId 
                    ? { ...link, clicks: response.data.clicks }
                    : link
            ));
        } catch (err: unknown) {
            console.error('Error refreshing clicks:', err);
        }
    };

    return (
        <>
        {/* Top section */}
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
            <h1 className="text-4xl mt-10 ml-10 font-bold text-gray-700">
                Shorten Your URLs <span className="text-indigo-500">Instantly</span>
            </h1>
            <p className="text-gray-600 mt-4 ml-10">
                Transform long, complex URLs into short,
                shareable links. Track clicks,
                manage your links, and boost your productivity.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-center bg-white p-10 mt-10 rounded-md shadow-md w-1/2">
                <input
                    type="url"
                    placeholder="Enter your URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="flex-1 p-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5 text-white rotate-275" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l2.36 2.36c-.5.23-1.05.36-1.64.36-2.21 0-4-1.79-4-4s1.79-4 4-4c.59 0 1.14.13 1.64.36L14 10l-2.36-2.36z"/>
                    </svg>
                    <span>Shorten</span>
                </button>
            </form>

            {/* {shortUrl && <UrlResult shortUrl={shortUrl} />} */}

            {/* Recent Links Section */}
            <div className="bg-white shadow-md rounded-lg p-6 w-3/4 mx-auto mt-10 mb-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Recent Links</h2>
                <button className="text-indigo-500 hover:underline">View All</button>
            </div>

            {Links.length === 0 ? (
                <p className="text-gray-500">No links yet. Shorten one above!</p>
            ) : (
                <div className="space-y-4">
                    {Links.map(link => (
                        <div key={link.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200 hover:shadow-sm transition">
                            <div className="flex flex-col">
                                <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
                                    {link.shortUrl}
                                </a>
                                <p className="text-gray-600 text-sm truncate">{link.originalUrl}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><BarChart2 size={14}/> {link.clicks} clicks</span>
                                    <span>{link.date}</span>
                                    <span className={`px-2 py-0.5 rounded text-xs ${link.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {link.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={() => handleCopy(link.shortUrl)} className="text-gray-500 hover:text-indigo-500 transition" title="Copy URL">
                                    <Copy size={18}/>
                                </button>
                                <button onClick={() => fetchAnalytics(link.code)} className="text-gray-500 hover:text-indigo-500 transition" title="View Analytics">
                                    <BarChart2 size={18}/>
                                </button>
                                <button onClick={() => refreshClicks(link.code, link.id)} className="text-gray-500 hover:text-green-500 transition" title="Refresh Clicks">
                                    🔄
                                </button>
                                <button onClick={() => handleDelete(link.id)} className="text-gray-500 hover:text-red-500 transition" title="Delete">
                                    <Trash2 size={18}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>

        {/* Analytics Modal */}
        {showAnalytics && analytics && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold">Analytics Dashboard</h3>
                        <button onClick={() => setShowAnalytics(false)} className="text-gray-500 hover:text-gray-700">
                            ✕
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Total Clicks */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-800">Total Clicks</h4>
                            <p className="text-2xl font-bold text-blue-600">{analytics.totalClicks}</p>
                        </div>

                        {/* Top Countries */}
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2">Top Countries</h4>
                            {analytics.topCountries.map((country, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>{country.country}</span>
                                    <span className="font-semibold">{country.clicks}</span>
                                </div>
                            ))}
                        </div>

                        {/* Top Referrers */}
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-800 mb-2">Top Referrers</h4>
                            {analytics.topReferrers.map((referrer, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span className="truncate">{referrer.referrer}</span>
                                    <span className="font-semibold">{referrer.clicks}</span>
                                </div>
                            ))}
                        </div>

                        {/* Daily Clicks */}
                        <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-800 mb-2">Recent Activity</h4>
                            {analytics.dailyClicks.slice(0, 5).map((day, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                    <span>{day.date}</span>
                                    <span className="font-semibold">{day.clicks} clicks</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}
