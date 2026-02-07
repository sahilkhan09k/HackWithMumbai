import { useState } from 'react';
import { Search, Edit, CheckCircle, Upload } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const ManageIssues = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const issues = [
        { id: 1, title: 'Pothole on Main Street', status: 'pending', priority: 'high', category: 'roads', date: '2026-02-07' },
        { id: 2, title: 'Water leak near park', status: 'in-progress', priority: 'high', category: 'water', date: '2026-02-06' },
        { id: 3, title: 'Broken street light', status: 'acknowledged', priority: 'medium', category: 'electricity', date: '2026-02-05' },
        { id: 4, title: 'Garbage not collected', status: 'pending', priority: 'low', category: 'sanitation', date: '2026-02-07' },
    ];

    const handleUpdateIssue = (issue) => {
        setSelectedIssue(issue);
        setShowModal(true);
    };

    const handleSaveUpdate = () => {
        // Save logic here
        setShowModal(false);
        setSelectedIssue(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved': return 'bg-green-100 text-green-700';
            case 'in-progress': return 'bg-blue-100 text-blue-700';
            case 'acknowledged': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-200 text-gray-700';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isAdmin={true} />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Manage Issues</h1>
                    <p className="text-gray-600">Update status and manage reported issues</p>
                </div>

                {/* Search */}
                <div className="card mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                            placeholder="Search issues by title, category, or ID..."
                        />
                    </div>
                </div>

                {/* Issues Table */}
                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {issues.map(issue => (
                                    <tr key={issue.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{issue.id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{issue.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-xs px-2 py-1 rounded ${issue.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                    issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {issue.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(issue.status)}`}>
                                                {issue.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{issue.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleUpdateIssue(issue)}
                                                className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Update Modal */}
                {showModal && selectedIssue && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                            <h2 className="text-2xl font-bold mb-6">Update Issue #{selectedIssue.id}</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select className="input-field">
                                        <option value="pending">Pending</option>
                                        <option value="acknowledged">Acknowledged</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Remarks</label>
                                    <textarea
                                        className="input-field"
                                        rows="4"
                                        placeholder="Add notes about the resolution process..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Image (Optional)</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Upload before/after image</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button onClick={handleSaveUpdate} className="btn-primary flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Save Update
                                    </button>
                                    <button onClick={() => setShowModal(false)} className="btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageIssues;
