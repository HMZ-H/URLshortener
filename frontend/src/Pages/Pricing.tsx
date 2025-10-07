import React from 'react';

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Pricing</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Free</h3>
                        <p className="text-3xl font-bold text-purple-600 mb-4">$0</p>
                        <ul className="space-y-2 text-gray-600">
                            <li>✓ 100 short links/month</li>
                            <li>✓ Basic analytics</li>
                            <li>✓ Custom domains</li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md border-2 border-purple-600">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Pro</h3>
                        <p className="text-3xl font-bold text-purple-600 mb-4">$9</p>
                        <ul className="space-y-2 text-gray-600">
                            <li>✓ 10,000 short links/month</li>
                            <li>✓ Advanced analytics</li>
                            <li>✓ Custom branding</li>
                            <li>✓ API access</li>
                        </ul>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Enterprise</h3>
                        <p className="text-3xl font-bold text-purple-600 mb-4">$29</p>
                        <ul className="space-y-2 text-gray-600">
                            <li>✓ Unlimited links</li>
                            <li>✓ White-label solution</li>
                            <li>✓ Priority support</li>
                            <li>✓ Custom integrations</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}


