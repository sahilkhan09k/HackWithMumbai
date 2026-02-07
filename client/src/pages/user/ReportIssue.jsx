import { useState } from 'react';
import { Upload, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
        lat: '',
        lng: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('Image size should be less than 10MB');
                return;
            }
            setFormData({ ...formData, image: file });
            setError('');
        }
    };

    const detectLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData({
                        ...formData,
                        lat: position.coords.latitude.toString(),
                        lng: position.coords.longitude.toString()
                    });
                    setLoading(false);
                },
                (error) => {
                    setError('Unable to detect location. Please enter manually.');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by your browser');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate required fields
            if (!formData.title || !formData.description || !formData.image || !formData.lat || !formData.lng) {
                throw new Error('All fields are required');
            }

            // Create FormData for file upload
            const submitData = new FormData();
            submitData.append('title', formData.title);
            submitData.append('description', formData.description);
            submitData.append('imageUrl', formData.image);
            submitData.append('lat', formData.lat);
            submitData.append('lng', formData.lng);

            // Submit to API
            const response = await apiService.createIssue(submitData);

            console.log('Issue created:', response);
            setSubmitted(true);

            setTimeout(() => {
                navigate('/my-issues');
            }, 2000);
        } catch (err) {
            console.error('Submit error:', err);
            setError(err.message || 'Failed to submit issue. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-accent-50/20">
                <Sidebar />
                <div className="flex-1 ml-64 flex items-center justify-center">
                    <div className="text-center">
                        <div className="bg-gradient-to-br from-success-500 to-success-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                        <h2 className="text-4xl font-bold mb-3 text-gray-900">Issue Reported Successfully!</h2>
                        <p className="text-gray-600 text-lg">AI is analyzing your report...</p>
                        <p className="text-sm text-gray-500 mt-2">Redirecting to your issues...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-accent-50/20">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            Report an Issue
                        </h1>
                        <p className="text-gray-600 text-lg">Help improve your city by reporting civic issues</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div className="card-gradient">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Upload Image *</label>
                            <div className="border-2 border-dashed border-primary-300 rounded-xl p-8 text-center hover:border-primary-500 hover:bg-primary-50/50 transition cursor-pointer">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                    required
                                />
                                <label htmlFor="image-upload" className="cursor-pointer">
                                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Upload className="h-8 w-8 text-primary-600" />
                                    </div>
                                    <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                                </label>
                                {formData.image && (
                                    <div className="mt-4 p-3 bg-success-50 rounded-lg inline-block">
                                        <p className="text-sm text-success-700 font-medium">✓ {formData.image.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="card-gradient">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Location *</label>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <input
                                    type="number"
                                    step="any"
                                    name="lat"
                                    value={formData.lat}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Latitude"
                                    required
                                />
                                <input
                                    type="number"
                                    step="any"
                                    name="lng"
                                    value={formData.lng}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="Longitude"
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                onClick={detectLocation}
                                disabled={loading}
                                className="btn-secondary w-full flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <Loader className="h-5 w-5 mr-2 animate-spin" />
                                        Detecting...
                                    </>
                                ) : (
                                    <>
                                        <MapPin className="h-5 w-5 mr-2" />
                                        Auto-Detect Location
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Title */}
                        <div className="card-gradient">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Issue Title *</label>
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

                        {/* Description */}
                        <div className="card-gradient">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input-field"
                                rows="5"
                                placeholder="Provide detailed information about the issue (location landmarks, severity, etc.)"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                💡 Tip: Mention nearby landmarks (hospital, school, market) for better AI prioritization
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                                    Submitting...
                                </span>
                            ) : (
                                'Submit Issue Report'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportIssue;
