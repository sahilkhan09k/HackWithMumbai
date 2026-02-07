import { TrendingUp, CheckCircle, Clock, Award, AlertCircle, MapPin } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const stats = {
        reported: 12,
        resolved: 8,
        avgResponseTime: '2.5 days',
        trustScore: 85
    };

    const myIssues = [
        { id: 1, title: 'Pothole on Main Street', status: 'resolved', priority: 'high', date: '2026-02-05' },
        { id: 2, title: 'Broken street light', status: 'in-progress', priority: 'medium', date: '2026-02-06' },
        { id: 3, title: 'Garbage not collected', status: 'pending', priority: 'low', date: '2026-02-07' },
    ];

    const nearbyIssues = [
        { id: 4, title: 'Water leak near park', distance: '0.5 km', priority: 'high' },
        { id: 5, title: 'Damaged sidewalk', distance: '1.2 km', priority: 'medium' },
    ];

    const trendingIssues = [
        { id: 6, title: 'Traffic signal malfunction', confirmations: 15, priority: 'high' },
        { id: 7, title: 'Park maintenance needed', confirmations: 8, priority: 'low' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's your civic impact overview</p>
                </div>

                {/* Stats Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Issues Reported</p>
                                <p className="text-3xl font-bold text-primary-600">{stats.reported}</p>
                            </div>
                            <AlertCircle className="h-12 w-12 text-primary-600 opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Issues Resolved</p>
                                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                            </div>
                            <CheckCircle className="h-12 w-12 text-green-600 opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Avg Response Time</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.avgResponseTime}</p>
                            </div>
                            <Clock className="h-12 w-12 text-orange-600 opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Trust Score</p>
                                <p className="text-3xl font-bold text-purple-600">{stats.trustScore}</p>
                            </div>
                            <Award className="h-12 w-12 text-purple-600 opacity-20" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* My Issues */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">My Issues</h2>
                            <Link to="/my-issues" className="text-primary-600 text-sm hover:underline">View All</Link>
                        </div>
                        <div className="space-y-3">
                            {myIssues.map(issue => (
                                <div key={issue.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold">{issue.title}</h3>
                                        <span className={`text-xs px-2 py-1 rounded ${issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                                                issue.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-gray-200 text-gray-700'
                                            }`}>
                                            {issue.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{issue.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Nearby Issues */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold">Nearby Issues</h2>
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="space-y-3">
                            {nearbyIssues.map(issue => (
                                <div key={issue.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold">{issue.title}</h3>
                                        <span className={`text-xs px-2 py-1 rounded ${issue.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {issue.priority}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{issue.distance} away</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trending Issues */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Trending Issues</h2>
                        <TrendingUp className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                        {trendingIssues.map(issue => (
                            <div key={issue.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-semibold mb-1">{issue.title}</h3>
                                        <p className="text-sm text-gray-600">{issue.confirmations} community confirmations</p>
                                    </div>
                                    <span className={`text-xs px-2 py-1 rounded ${issue.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                        {issue.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
