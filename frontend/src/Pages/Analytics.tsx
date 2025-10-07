import React, { useState, useEffect } from 'react';
import api from '../api/api';

interface AnalyticsData {
    totalClicks: number;
    uniqueVisitors: number;
    topCountry: string;
    topCountries: { country: string; clicks: number }[];
    topReferrers: { referrer: string; clicks: number }[];
    dailyClicks: { date: string; clicks: number }[];
}

export default function Analytics() {
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOverallAnalytics();
    }, []);

    const fetchOverallAnalytics = async () => {
        try {
            setLoading(true);
            const response = await api.get('/analytics/overall');
            setAnalytics(response.data);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { error?: string }; status?: number }; message?: string };
            setError(error.response?.data?.error || error.message || 'Failed to fetch analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading analytics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error: {error}</p>
                    <button 
                        onClick={fetchOverallAnalytics}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Analytics</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Link Performance */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">📈 Link Performance</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Clicks:</span>
                                <span className="font-semibold">{analytics?.totalClicks || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Unique Visitors:</span>
                                <span className="font-semibold">{analytics?.uniqueVisitors || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Top Country:</span>
                                <span className="font-semibold">{analytics?.topCountry || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Geographic Data */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">🌍 Geographic Data</h3>
                        <div className="space-y-4">
                            {analytics?.topCountries?.slice(0, 3).map((country, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="text-gray-600">{country.country}:</span>
                                    <span className="font-semibold">{country.clicks} clicks</span>
                                </div>
                            )) || (
                                <>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">US:</span>
                                        <span className="font-semibold">0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">UK:</span>
                                        <span className="font-semibold">0</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Canada:</span>
                                        <span className="font-semibold">0</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Analytics Sections */}
                {analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Top Referrers */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">🔗 Top Referrers</h3>
                            <div className="space-y-3">
                                {analytics.topReferrers?.slice(0, 5).map((referrer, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-gray-600 truncate">{referrer.referrer || 'Direct'}</span>
                                        <span className="font-semibold">{referrer.clicks}</span>
                                    </div>
                                )) || <p className="text-gray-500">No referrer data available</p>}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 Recent Activity</h3>
                            <div className="space-y-3">
                                {analytics.dailyClicks?.slice(0, 5).map((day, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span className="text-gray-600">{day.date}</span>
                                        <span className="font-semibold">{day.clicks} clicks</span>
                                    </div>
                                )) || <p className="text-gray-500">No activity data available</p>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

