import { useState } from 'react';
import { ThumbsUp, Camera, MapPin } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const VerifyIssues = () => {
    const [issues, setIssues] = useState([
        { id: 1, title: 'Water leak near park', location: '0.5 km away', confirmations: 8, verified: false, category: 'water', priority: 'high' },
        { id: 2, title: 'Damaged sidewalk', location: '1.2 km away', confirmations: 3, verified: false, category: 'roads', priority: 'medium' },
        { id: 3, title: 'Broken bench in park', location: '2.1 km away', confirmations: 5, verified: false, category: 'parks', priority: 'low' },
    ]);

    const handleVerify = (issueId) => {
        setIssues(issues.map(issue =>
            issue.id === issueId
                ? { ...issue, verified: true, confirmations: issue.confirmations + 1 }
                : issue
        ));
    };

    const handleAddEvidence = (issueId) => {
        alert('Image upload functionality - Add supporting photo');
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Community Verification</h1>
                    <p className="text-gray-600">Help verify issues reported by other citizens</p>
                </div>

                <div className="card mb-6 bg-blue-50 border-2 border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2">Why Verify Issues?</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Prevents fake reports and ensures authenticity</li>
                        <li>• Increases priority score for genuine issues</li>
                        <li>• Helps city officials make better decisions</li>
                        <li>• Earn civic impact points for your profile</li>
                    </ul>
                </div>

                <div className="space-y-6">
                    {issues.map(issue => (
                        <div key={issue.id} className="card hover:shadow-lg transition">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold">{issue.title}</h3>
                                        <span className={`text-xs px-3 py-1 rounded-full ${issue.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'
                                            }`}>
                                            {issue.priority}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                                        <span className="flex items-center">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            {issue.location}
                                        </span>
                                        <span>Category: {issue.category}</span>
                                        <span className="flex items-center">
                                            <ThumbsUp className="h-4 w-4 mr-1" />
                                            {issue.confirmations} confirmations
                                        </span>
                                    </div>

                                    <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
                                        <p className="text-gray-500">Issue Image</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                {!issue.verified ? (
                                    <>
                                        <button
                                            onClick={() => handleVerify(issue.id)}
                                            className="btn-primary flex items-center"
                                        >
                                            <ThumbsUp className="h-4 w-4 mr-2" />
                                            Confirm This Issue
                                        </button>
                                        <button
                                            onClick={() => handleAddEvidence(issue.id)}
                                            className="btn-secondary flex items-center"
                                        >
                                            <Camera className="h-4 w-4 mr-2" />
                                            Add Evidence
                                        </button>
                                    </>
                                ) : (
                                    <div className="bg-green-50 border-2 border-green-200 rounded-lg px-4 py-2 text-green-700 font-medium">
                                        ✓ You verified this issue
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {issues.filter(i => !i.verified).length === 0 && (
                    <div className="card text-center py-12">
                        <ThumbsUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">No more issues to verify</p>
                        <p className="text-sm text-gray-500 mt-2">Check back later for new reports</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyIssues;
