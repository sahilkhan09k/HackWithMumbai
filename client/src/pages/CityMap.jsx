import { useState, useEffect } from 'react';
import { Filter, MapPin, Loader2 } from 'lucide-react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import Navbar from '../components/Navbar';
import GoogleMapsWrapper from '../components/GoogleMapsWrapper';
import { apiService } from '../services/api';

const mapContainerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '12px'
};

const defaultCenter = {
    lat: 19.0760,
    lng: 72.8777
};

const CityMap = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState('all');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);

    const priorities = ['all', 'High', 'Medium', 'Low'];

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        try {
            setLoading(true);
            const response = await apiService.getAllIssues();
            setIssues(response.data);

            if (response.data.length > 0 && response.data[0].location) {
                setMapCenter({
                    lat: response.data[0].location.lat,
                    lng: response.data[0].location.lng
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch issues');
        } finally {
            setLoading(false);
        }
    };

    const filteredIssues = issues.filter(issue => {
        const priorityMatch = selectedPriority === 'all' || issue.priority === selectedPriority;
        return priorityMatch && issue.location?.lat && issue.location?.lng;
    });

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return '#ef4444';
            case 'Medium': return '#f59e0b';
            case 'Low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const getMarkerIcon = (priority) => {
        return {
            path: window.google?.maps?.SymbolPath?.CIRCLE || 0,
            fillColor: getPriorityColor(priority),
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 10,
        };
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
                                    <option key={pri} value={pri}>
                                        {pri.charAt(0).toUpperCase() + pri.slice(1)}
                                    </option>
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

                {/* Google Map */}
                <div className="card mb-6">
                    <GoogleMapsWrapper>
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={mapCenter}
                            zoom={12}
                            options={{
                                zoomControl: true,
                                streetViewControl: false,
                                mapTypeControl: false,
                                fullscreenControl: true,
                            }}
                        >
                            {filteredIssues.map(issue => (
                                <Marker
                                    key={issue._id}
                                    position={{
                                        lat: issue.location.lat,
                                        lng: issue.location.lng
                                    }}
                                    icon={getMarkerIcon(issue.priority)}
                                    onClick={() => setSelectedIssue(issue)}
                                />
                            ))}

                            {selectedIssue && (
                                <InfoWindow
                                    position={{
                                        lat: selectedIssue.location.lat,
                                        lng: selectedIssue.location.lng
                                    }}
                                    onCloseClick={() => setSelectedIssue(null)}
                                >
                                    <div className="p-2 max-w-xs">
                                        <h3 className="font-bold text-lg mb-2">{selectedIssue.title}</h3>
                                        {selectedIssue.imageUrl && (
                                            <img
                                                src={selectedIssue.imageUrl}
                                                alt={selectedIssue.title}
                                                className="w-full h-32 object-cover rounded mb-2"
                                            />
                                        )}
                                        <p className="text-sm text-gray-600 mb-2">{selectedIssue.description}</p>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className={`px-2 py-1 rounded ${selectedIssue.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                    selectedIssue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {selectedIssue.priority}
                                            </span>
                                            <span className="text-gray-600">{selectedIssue.status}</span>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                        </GoogleMap>
                    </GoogleMapsWrapper>
                </div>

                {/* Legend */}
                <div className="card">
                    <h3 className="font-semibold mb-3">Priority Legend</h3>
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-sm">High Priority ({issues.filter(i => i.priority === 'High').length})</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                            <span className="text-sm">Medium Priority ({issues.filter(i => i.priority === 'Medium').length})</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-sm">Low Priority ({issues.filter(i => i.priority === 'Low').length})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityMap;
