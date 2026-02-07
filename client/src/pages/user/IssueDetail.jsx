import { MapPin, Calendar, AlertCircle, CheckCircle, Clock, ThumbsUp } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useParams } from 'react-router-dom';

const IssueDetail = () => {
    const { id } = useParams();

    const issue = {
        id: id,
        title: 'Pothole on Main Street',
        description: 'Large pothole causing traffic issues and potential vehicle damage. Located near the intersection with Oak Avenue.',
        category: 'roads',
        priority: 'high',
        status: 'in-progress',
        location: '40.7128, -74.0060',
        reportedDate: '2026-02-05',
        acknowledgedDate: '2026-02-05',
        inProgressDate: '2026-02-06',
        resolvedDate: null,
        confirmations: 12,
        image: null
    };

    const timeline = [
        { status: 'Reported', date: issue.reportedDate, completed: true },
        { status: 'Acknowledged', date: issue.acknowledgedDate, completed: true },
        { status: 'In Progress', date: issue.inProgressDate, completed: true },
        { status: 'Resolved', date: issue.resolvedDate, completed: false },
    ];

    const aiExplanation = {
        category: 'Detected as road infrastructure issue based on image analysis',
        priority: 'Classified as HIGH priority due to: traffic safety risk, potential vehicle damage, high traffic area'
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">{issue.title}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm ${issue.priority === 'high' ? 'bg-red-100 text-red-700' :
                                    issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-green-100 text-green-700'
                                }`}>
                                {issue.priority.toUpperCase()} PRIORITY
                            </span>
                        </div>
                        <p className="text-gray-600">Issue #{issue.id}</p>
                    </div>

                    {/* Image */}
                    <div className="card mb-6">
                        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                            <p className="text-gray-500">Issue Image Placeholder</p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="card">
                            <h2 className="text-xl font-bold mb-4">Issue Details</h2>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Category</p>
                                        <p className="font-medium">{issue.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Location</p>
                                        <p className="font-medium">{issue.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Reported Date</p>
                                        <p className="font-medium">{issue.reportedDate}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <ThumbsUp className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-600">Community Confirmations</p>
                                        <p className="font-medium">{issue.confirmations} people confirmed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h2 className="text-xl font-bold mb-4">Description</h2>
                            <p className="text-gray-700">{issue.description}</p>
                        </div>
                    </div>

                    {/* AI Explanation */}
                    <div className="card mb-6 bg-blue-50 border-2 border-blue-200">
                        <h2 className="text-xl font-bold mb-4 text-blue-900">AI Priority Explanation</h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm font-medium text-blue-900 mb-1">Category Detection:</p>
                                <p className="text-sm text-blue-800">{aiExplanation.category}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-900 mb-1">Priority Reasoning:</p>
                                <p className="text-sm text-blue-800">{aiExplanation.priority}</p>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-6">Resolution Timeline</h2>
                        <div className="space-y-6">
                            {timeline.map((item, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="flex flex-col items-center mr-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.completed ? 'bg-green-500' : 'bg-gray-300'
                                            }`}>
                                            {item.completed ? (
                                                <CheckCircle className="h-6 w-6 text-white" />
                                            ) : (
                                                <Clock className="h-6 w-6 text-gray-500" />
                                            )}
                                        </div>
                                        {index < timeline.length - 1 && (
                                            <div className={`w-0.5 h-12 ${item.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        )}
                                    </div>
                                    <div className="flex-1 pb-8">
                                        <h3 className="font-semibold text-lg mb-1">{item.status}</h3>
                                        <p className="text-sm text-gray-600">
                                            {item.date ? item.date : 'Pending'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueDetail;
