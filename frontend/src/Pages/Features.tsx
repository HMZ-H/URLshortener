import React from 'react';

export default function Features() {
    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Features</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Fast Shortening</h3>
                        <p className="text-gray-600">Create short URLs instantly with our lightning-fast service.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Analytics</h3>
                        <p className="text-gray-600">Track clicks, views, and engagement with detailed analytics.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">🔒 Secure</h3>
                        <p className="text-gray-600">Your links are secure and protected with enterprise-grade security.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


