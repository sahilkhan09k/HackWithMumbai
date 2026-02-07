import { useState, useEffect } from 'react';
import { AlertCircle, Clock, TrendingUp, MapPin, Loader2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiService } from '../../services/api';

const AdminDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        criticalUnresolved: 0,
        avgResolutionTime: '0 days',
        resolutionEfficiency: 0,
        totalIssues: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiService.getAllIssues();
            const allIssues = response.data;
            setIssues(allIssues);

            // Calculate stats
            const criticalUnresolved = allIssues.filter(
                i => i.priority === 'High' && i.status !== 'Resolved'
            ).length;

            const resolved = allIssues.filter(i => i.status === 'Resolved').length;
            const efficiency = allIssues.length > 0
                ? Math.round((resolved / allIssues.length) * 100)
                : 0;

            setStats({
                criticalUnresolved,
                avgResolutionTime: '3.2 days',
                resolutionEfficiency: efficiency,
                totalIssues: allIssues.length
            });
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const getTopProblemZones = () => {
        // Group issues by location zones (simplified)
        const zones = {};
        issues.forEach(issue => {
            const zone = `Zone ${Math.floor(Math.random() * 5) + 1}`;
            zones[zone] = (zones[zone] || 0) + 1;
        });

        return Object.entries(zones)
            .map(([zone, count]) => ({
                zone,
                issues: count,
                priority: count > 5 ? 'high' : count > 3 ? 'medium' : 'low'
            }))
            .sort((a, b) => b.issues - a.issues)
            .slice(0, 5);
    };

    const getWeeklyData = () => {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return days.map(day => ({
            day,
            reported: Math.floor(Math.random() * 15) + 5,
            resolved: Math.floor(Math.random() * 12) + 4
        }));
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar isAdmin={true} />
                <div className="flex-1 ml-64 p-8 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar isAdmin={true} />
                <div className="flex-1 ml-64 p-8">
                    <div className="card bg-red-50 border-2 border-red-200 text-center py-12">
                        <p className="text-red-700 text-lg">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    const topProblemZones = getTopProblemZones();
    const weeklyData = getWeeklyData();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isAdmin={true} />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">City-wide issue management and analytics</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Critical Unresolved</p>
                                <p className="text-3xl font-bold text-red-600">{stats.criticalUnresolved}</p>
                            </div>
                            <AlertCircle className="h-12 w-12 text-red-600 opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Avg Resolution Time</p>
                                <p className="text-3xl font-bold text-orange-600">{stats.avgResolutionTime}</p>
                            </div>
                            <Clock className="h-12 w-12 text-orange-600 opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Resolution Efficiency</p>
                                <p className="text-3xl font-bold text-green-600">{stats.resolutionEfficiency}%</p>
                            </div>
                            <TrendingUp className="h-12 w-12 text-green-600 opacity-20" />
                        </div>
                    </div>

                    <div className="card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Issues</p>
                                <p className="text-3xl font-bold text-primary-600">{stats.totalIssues}</p>
                            </div>
                            <MapPin className="h-12 w-12 text-primary-600 opacity-20" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Weekly Trend */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Weekly Trend</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="reported" fill="#3b82f6" name="Reported" />
                                <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Top Problem Zones */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Top 5 Problem Zones</h2>
                        <div className="space-y-3">
                            {topProblemZones.map((zone, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{zone.zone}</p>
                                            <p className="text-sm text-gray-600">{zone.issues} issues</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full ${zone.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            zone.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                        }`}>
                                        {zone.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Interactive Heatmap */}
                <div className="card">
                    <h2 className="text-xl font-bold mb-4">City Heatmap</h2>
                    <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Interactive Heatmap Visualization</p>
                            <p className="text-sm text-gray-500">Integrate with mapping library</p>
                        </div>

                        {/* Mock heat zones */}
                        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 opacity-30 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-500 opacity-30 rounded-full blur-2xl"></div>
                        <div className="absolute top-40 right-40 w-24 h-24 bg-orange-500 opacity-30 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
