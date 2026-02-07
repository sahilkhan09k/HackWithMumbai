import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const FeedbackMetrics = () => {
    const [selectedIssue, setSelectedIssue] = useState(null);

    const resolvedIssues = [
        {
            id: 1,
            title: 'Pothole on Main Street',
            resolvedDate: '2026-02-05',
            rating: 5,
            feedback: 'Excellent work! Fixed quickly and professionally.',
            userName: 'John Doe',
            trustImpact: '+10'
        },
        {
            id: 2,
            title: 'Broken street light',
            resolvedDate: '2026-02-04',
            rating: 4,
            feedback: 'Good job, but took a bit longer than expected.',
            userName: 'Jane Smith',
            trustImpact: '+7'
        },
        {
            id: 3,
            title: 'Water leak near park',
            resolvedDate: '2026-02-03',
            rating: 3,
            feedback: 'Fixed but the area still needs cleanup.',
            userName: 'Mike Johnson',
            trustImpact: '+3'
        },
        {
            id: 4,
            title: 'Garbage collection issue',
            resolvedDate: '2026-02-02',
            rating: 5,
            feedback: 'Perfect! Very responsive team.',
            userName: 'Sarah Williams',
            trustImpact: '+10'
        },
    ];

    const trustMetrics = {
        overallScore: 4.2,
        totalFeedback: 156,
        positiveRate: 87,
        avgResolutionQuality: 4.1,
        citizenTrustIndex: 85
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`h-5 w-5 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isAdmin={true} />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Feedback & Trust Metrics</h1>
                    <p className="text-gray-600">Accountability and citizen satisfaction tracking</p>
                </div>

                {/* Trust Metrics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="card text-center">
                        <Star className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-yellow-600 mb-1">{trustMetrics.overallScore}</p>
                        <p className="text-sm text-gray-600">Overall Score</p>
                    </div>

                    <div className="card text-center">
                        <MessageSquare className="h-10 w-10 text-blue-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-blue-600 mb-1">{trustMetrics.totalFeedback}</p>
                        <p className="text-sm text-gray-600">Total Feedback</p>
                    </div>

                    <div className="card text-center">
                        <ThumbsUp className="h-10 w-10 text-green-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-green-600 mb-1">{trustMetrics.positiveRate}%</p>
                        <p className="text-sm text-gray-600">Positive Rate</p>
                    </div>

                    <div className="card text-center">
                        <Star className="h-10 w-10 text-purple-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-purple-600 mb-1">{trustMetrics.avgResolutionQuality}</p>
                        <p className="text-sm text-gray-600">Avg Quality</p>
                    </div>

                    <div className="card text-center">
                        <ThumbsUp className="h-10 w-10 text-primary-500 mx-auto mb-2" />
                        <p className="text-3xl font-bold text-primary-600 mb-1">{trustMetrics.citizenTrustIndex}</p>
                        <p className="text-sm text-gray-600">Trust Index</p>
                    </div>
                </div>

                {/* Rating Distribution */}
                <div className="card mb-8">
                    <h2 className="text-xl font-bold mb-4">Rating Distribution</h2>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(rating => {
                            const percentage = rating === 5 ? 45 : rating === 4 ? 30 : rating === 3 ? 15 : rating === 2 ? 7 : 3;
                            return (
                                <div key={rating} className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 w-24">
                                        {renderStars(rating)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-full bg-gray-200 rounded-full h-4">
                                            <div
                                                className="bg-yellow-500 h-4 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Feedback */}
                <div className="card">
                    <h2 className="text-xl font-bold mb-4">Recent Citizen Feedback</h2>
                    <div className="space-y-4">
                        {resolvedIssues.map(issue => (
                            <div key={issue.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg mb-1">{issue.title}</h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Resolved on {issue.resolvedDate} • Reported by {issue.userName}
                                        </p>
                                        <div className="flex items-center gap-2 mb-2">
                                            {renderStars(issue.rating)}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${parseInt(issue.trustImpact) >= 8 ? 'bg-green-100 text-green-700' :
                                                parseInt(issue.trustImpact) >= 5 ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            Trust {issue.trustImpact}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-white p-3 rounded border-l-4 border-primary-600">
                                    <p className="text-gray-700 italic">"{issue.feedback}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trust Score Explanation */}
                <div className="card mt-6 bg-blue-50 border-2 border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3">How Trust Score Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                        <div>
                            <p className="font-medium mb-1">5-Star Rating: +10 points</p>
                            <p>Excellent resolution quality</p>
                        </div>
                        <div>
                            <p className="font-medium mb-1">4-Star Rating: +7 points</p>
                            <p>Good resolution quality</p>
                        </div>
                        <div>
                            <p className="font-medium mb-1">3-Star or below: +3 points</p>
                            <p>Needs improvement</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackMetrics;
