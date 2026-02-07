import { useState } from 'react';
import { Upload, MapPin, Brain, CheckCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        image: null
    });
    const [aiSuggestion, setAiSuggestion] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const categories = ['roads', 'water', 'electricity', 'sanitation', 'parks', 'other'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });

            // Simulate AI analysis
            setTimeout(() => {
                setAiSuggestion({
                    category: 'roads',
                    subcategory: 'Pothole',
                    priority: 'high',
                    confidence: 92
                });
            }, 1500);
        }
    };

    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
                    setFormData({ ...formData, location });
                },
                () => {
                    alert('Unable to detect location');
                }
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    if (submitted) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 ml-64 flex items-center justify-center">
                    <div className="text-center">
                        <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-2">Issue Reported Successfully!</h2>
                        <p className="text-gray-600">Redirecting to dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
                        <p className="text-gray-600">Help improve your city by reporting civic issues</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div className="card">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Upload Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                                </label>
                                {formData.image && (
                                    <p className="mt-3 text-sm text-green-600">✓ {formData.image.name}</p>
                                )}
                            </div>
                        </div>

                        {/* AI Suggestion */}
                        {aiSuggestion && (
                            <div className="card bg-blue-50 border-2 border-blue-200">
                                <div className="flex items-start space-x-3">
                                    <Brain className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-blue-900 mb-2">AI Analysis Complete</h3>
                                        <div className="space-y-2 text-sm">
                                            <p><span className="font-medium">Detected Category:</span> {aiSuggestion.category} → {aiSuggestion.subcategory}</p>
                                            <p><span className="font-medium">Suggested Priority:</span> <span className="text-red-600 font-semibold">{aiSuggestion.priority.toUpperCase()}</span></p>
                                            <p><span className="font-medium">Confidence:</span> {aiSuggestion.confidence}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Location */}
                        <div className="card">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="input-field flex-1"
                                    placeholder="Enter location or detect automatically"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    className="btn-secondary flex items-center"
                                >
                                    <MapPin className="h-5 w-5 mr-2" />
                                    Detect
                                </button>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="card">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Issue Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Brief description of the issue"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div className="card">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="input-field"
                                required
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        {/* Description */}
                        <div className="card">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input-field"
                                rows="4"
                                placeholder="Provide detailed information about the issue"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary w-full text-lg py-3">
                            Submit Issue Report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportIssue;
