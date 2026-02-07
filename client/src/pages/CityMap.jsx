import { useState, useEffect } from 'react';
import { Filter, MapPin, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import { apiService } from '../services/api';

const CityMap = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('all');

    const priorities = ['all', 'High', 'Medium', 'Low'];

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const response = await apiService.getAllIssues();
            setIssues(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch issues');
        } finally {
            setLoading(false);
        }
    };

    const filteredIssues = issues.filter(issue => {
        const priorityMatch = selectedPriority === 'all' || issue.priority === selectedPriority;
        return priorityMatch;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="card bg-red-50 border-2 border-red-200 text-center py-12">
                        <p className="text-red-700 text-lg">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">City Live Map</h1>
                    <p className="text-gray-600">Real-time transparency of all reported issues</p>
                </div>

                {/* Filters */}
                <div className="card mb-6">
                    <div className="flex items-center mb-4">
                        <Filter className="h-5 w-5 mr-2 text-gray-600" />
                        <h2 className="text-lg font-semibold">Filters</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                value={selectedPriority}
                                onChange={(e) => setSelectedPriority(e.target.value)}
                                className="input-field"
                            >
                                {priorities.map(pri => (
                                    <option key={pri} value={pri}>{pri.charAt(0).toUpperCase() + pri.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Issues</label>
                            <div className="input-field bg-gray-50 flex items-center">
                                <span className="font-semibold text-primary-600">{filteredIssues.length}</span>
                                <span className="ml-2 text-gray-600">issues found</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="card mb-6">
                    <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                        <div className="text-center">
                            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Interactive Map View</p>
                            <p className="text-sm text-gray-500">Integrate with Google Maps or Mapbox</p>
                        </div>

                        {/* Mock markers */}
                        {filteredIssues.slice(0, 10).map((issue, idx) => (
                            <div
                                key={issue._id}
                                className={`absolute ${getPriorityColor(issue.priority)} w-4 h-4 rounded-full border-2 border-white shadow-lg`}
                                style={{
                                    left: `${20 + idx * 8}%`,
                                    top: `${30 + (idx % 3) * 20}%`
                                }}
                                title={issue.title}
                            />
                        ))}
                    </div>
                </div>

                {/* Issue List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIssues.map(issue => (
                        <div key={issue._id} className="card hover:shadow-lg transition-shadow cursor-pointer">
                            {issue.imageUrl && (
                                <img
                                    src={issue.imageUrl}
                                    alt={issue.title}
                                    className="rounded-lg h-40 w-full object-cover mb-3"
                                />
                            )}
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-lg">{issue.title}</h3>
                                <span className={`${getPriorityColor(issue.priority)} text-white text-xs px-2 py-1 rounded`}>
                                    {issue.priority}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Status: {issue.status}</p>
                            <p className="text-sm text-gray-600 mb-2">Score: {issue.priorityScore}</p>
                            <p className="text-sm text-gray-500">Location: {issue.location?.lat?.toFixed(4)}, {issue.location?.lng?.toFixed(4)}</p>
                        </div>
                    ))}
                </div>

                {filteredIssues.length === 0 && (
                    <div className="card text-center py-12">
                        <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">No issues found</p>
                        <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
                    </div>
                )}

                {/* Legend */}
                <div className="card mt-6">
                    <h3 className="font-semibold mb-3">Priority Legend</h3>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm">High Priority</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm">Medium Priority</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm">Low Priority</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityMap;
