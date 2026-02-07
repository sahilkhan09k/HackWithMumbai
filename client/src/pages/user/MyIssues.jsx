import { useState } from 'react';
import { Eye, Filter } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { Link } from 'react-router-dom';

const MyIssues = () => {
    const [filter, setFilter] = useState('all');

    const issues = [
        { id: 1, title: 'Pothole on Main Street', status: 'resolved', priority: 'high', date: '2026-02-05', category: 'roads', image: null },
        { id: 2, title: 'Broken street light', status: 'in-progress', priority: 'medium', date: '2026-02-06', category: 'electricity', image: null },
        { id: 3, title: 'Garbage not collected', status: 'pending', priority: 'low', date: '2026-02-07', category: 'sanitation', image: null },
        { id: 4, title: 'Water leak near park', status: 'acknowledged', priority: 'high', date: '2026-02-04', category: 'water', image: null },
        { id: 5, title: 'Park bench damaged', status: 'resolved', priority: 'low', date: '2026-02-03', category: 'parks', image: null },
    ];

    const filteredIssues = filter === 'all' ? issues : issues.filter(issue => issue.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'bg-green-100 text-green-700';
            case 'in-progress': return 'bg-blue-100 text-blue-700';
            case 'acknowledged': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-200 text-gray-700';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            default: return 'text-green-600';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Issues</h1>
                    <p className="text-gray-600">Track all your reported issues</p>
                </div>

                {/* Filter */}
                <div className="card mb-6">
                    <div className="flex items-center gap-4">
                        <Filter className="h-5 w-5 text-gray-600" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="input-field max-w-xs"
                        >
                            <option value="all">All Issues</option>
                            <option value="pending">Pending</option>
                            <option value="acknowledged">Acknowledged</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>

                {/* Issues List */}
                <div className="space-y-4">
                    {filteredIssues.map(issue => (
                        <div key={issue.id} className="card hover:shadow-lg transition">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold">{issue.title}</h3>
                                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(issue.status)}`}>
                                            {issue.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                                        <span>Category: <span className="font-medium">{issue.category}</span></span>
                                        <span>Priority: <span className={`font-medium ${getPriorityColor(issue.priority)}`}>{issue.priority}</span></span>
                                        <span>Reported: {issue.date}</span>
                                    </div>

                                    {/* Timeline */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className={`w-3 h-3 rounded-full ${issue.status === 'pending' ? 'bg-gray-400' : 'bg-green-500'}`}></div>
                                        <span className="text-gray-600">Reported</span>
                                        <div className="w-8 h-0.5 bg-gray-300"></div>
                                        <div className={`w-3 h-3 rounded-full ${['acknowledged', 'in-progress', 'resolved'].includes(issue.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-600">Acknowledged</span>
                                        <div className="w-8 h-0.5 bg-gray-300"></div>
                                        <div className={`w-3 h-3 rounded-full ${['in-progress', 'resolved'].includes(issue.status) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-600">In Progress</span>
                                        <div className="w-8 h-0.5 bg-gray-300"></div>
                                        <div className={`w-3 h-3 rounded-full ${issue.status === 'resolved' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <span className="text-gray-600">Resolved</span>
                                    </div>
                                </div>

                                <Link to={`/issue/${issue.id}`} className="btn-secondary flex items-center">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredIssues.length === 0 && (
                    <div className="card text-center py-12">
                        <p className="text-gray-600">No issues found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyIssues;
