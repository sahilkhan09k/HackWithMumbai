import { useState } from 'react';
import { Filter, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';

const CityMap = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedPriority, setSelectedPriority] = useState('all');

    const categories = ['all', 'roads', 'water', 'electricity', 'sanitation', 'parks'];
    const priorities = ['all', 'high', 'medium', 'low'];

    const mockIssues = [
        { id: 1, lat: 40.7128, lng: -74.0060, category: 'roads', priority: 'high', title: 'Pothole on Main St' },
        { id: 2, lat: 40.7580, lng: -73.9855, category: 'water', priority: 'medium', title: 'Water leak' },
        { id: 3, lat: 40.7489, lng: -73.9680, category: 'electricity', priority: 'high', title: 'Street light out' },
    ];

    const filteredIssues = mockIssues.filter(issue => {
        const categoryMatch = selectedCategory === 'all' || issue.category === selectedCategory;
        const priorityMatch = selectedPriority === 'all' || issue.priority === selectedPriority;
        return categoryMatch && priorityMatch;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="input-field"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                        </div>
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
                        {filteredIssues.map((issue, idx) => (
                            <div
                                key={issue.id}
                                className={`absolute ${getPriorityColor(issue.priority)} w-4 h-4 rounded-full border-2 border-white shadow-lg`}
                                style={{
                                    left: `${20 + idx * 25}%`,
                                    top: `${30 + idx * 15}%`
                                }}
                                title={issue.title}
                            />
                        ))}
                    </div>
                </div>

                {/* Issue List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIssues.map(issue => (
                        <div key={issue.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-semibold text-lg">{issue.title}</h3>
                                <span className={`${getPriorityColor(issue.priority)} text-white text-xs px-2 py-1 rounded`}>
                                    {issue.priority}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Category: {issue.category}</p>
                            <p className="text-sm text-gray-500">Location: {issue.lat.toFixed(4)}, {issue.lng.toFixed(4)}</p>
                        </div>
                    ))}
                </div>

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
