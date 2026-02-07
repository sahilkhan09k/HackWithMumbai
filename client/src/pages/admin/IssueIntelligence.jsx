import { useState } from 'react';
import { Brain, Filter, TrendingUp } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const IssueIntelligence = () => {
    const [sortBy, setSortBy] = useState('ai-priority');
    const [filterCategory, setFilterCategory] = useState('all');

    const issues = [
        {
            id: 1,
            title: 'Traffic signal malfunction - Main & Oak',
            category: 'electricity',
            priority: 'critical',
            aiScore: 95,
            confirmations: 15,
            cluster: 'Downtown Traffic',
            estimatedImpact: 'High - 5000+ daily commuters affected',
            suggestedAction: 'Immediate dispatch required'
        },
        {
            id: 2,
            title: 'Multiple potholes on Highway 101',
            category: 'roads',
            priority: 'high',
            aiScore: 88,
            confirmations: 12,
            cluster: 'Highway Infrastructure',
            estimatedImpact: 'Medium - Safety hazard',
            suggestedAction: 'Schedule within 48 hours'
        },
        {
            id: 3,
            title: 'Water main leak cluster - North District',
            category: 'water',
            priority: 'high',
            aiScore: 85,
            confirmations: 8,
            cluster: 'North Water System',
            estimatedImpact: 'High - Water waste, property damage risk',
            suggestedAction: 'Coordinate with water dept'
        },
        {
            id: 4,
            title: 'Park maintenance - West Park',
            category: 'parks',
            priority: 'low',
            aiScore: 45,
            confirmations: 3,
            cluster: 'Parks & Recreation',
            estimatedImpact: 'Low - Aesthetic issue',
            suggestedAction: 'Add to monthly schedule'
        },
    ];

    const topActions = issues.slice(0, 5);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'bg-red-600 text-white';
            case 'high': return 'bg-red-100 text-red-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-green-100 text-green-700';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isAdmin={true} />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Issue Intelligence Panel</h1>
                    <p className="text-gray-600">AI-powered insights and prioritization</p>
                </div>

                {/* AI Insights Banner */}
                <div className="card mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <div className="flex items-center space-x-4">
                        <Brain className="h-12 w-12" />
                        <div>
                            <h2 className="text-xl font-bold mb-1">AI Recommendations</h2>
                            <p className="text-blue-100">Focus on these 5 issues today for maximum impact</p>
                        </div>
                    </div>
                </div>

                {/* Suggested Action Order */}
                <div className="card mb-6">
                    <h2 className="text-xl font-bold mb-4">Top 5 Issues to Fix Today</h2>
                    <div className="space-y-3">
                        {topActions.map((issue, index) => (
                            <div key={issue.id} className="p-4 bg-gradient-to-r from-gray-50 to-white border-l-4 border-primary-600 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg mb-1">{issue.title}</h3>
                                            <p className="text-sm text-gray-600 mb-2">{issue.suggestedAction}</p>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="text-gray-600">AI Score: <span className="font-bold text-primary-600">{issue.aiScore}</span></span>
                                                <span className="text-gray-600">Confirmations: {issue.confirmations}</span>
                                                <span className="text-gray-600">Impact: {issue.estimatedImpact}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(issue.priority)}`}>
                                        {issue.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="card mb-6">
                    <div className="flex items-center gap-6">
                        <Filter className="h-5 w-5 text-gray-600" />
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="ai-priority">AI Priority Score</option>
                                    <option value="confirmations">Community Confirmations</option>
                                    <option value="date">Date Reported</option>
                                    <option value="impact">Estimated Impact</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                    className="input-field"
                                >
                                    <option value="all">All Categories</option>
                                    <option value="roads">Roads</option>
                                    <option value="water">Water</option>
                                    <option value="electricity">Electricity</option>
                                    <option value="sanitation">Sanitation</option>
                                    <option value="parks">Parks</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Clustered Issues */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Issues Grouped by Clusters</h2>
                        <TrendingUp className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="space-y-6">
                        {['Downtown Traffic', 'Highway Infrastructure', 'North Water System', 'Parks & Recreation'].map((cluster, idx) => {
                            const clusterIssues = issues.filter(i => i.cluster === cluster);
                            return (
                                <div key={idx} className="border-l-4 border-primary-600 pl-4">
                                    <h3 className="font-semibold text-lg mb-3">{cluster} ({clusterIssues.length} issues)</h3>
                                    <div className="space-y-2">
                                        {clusterIssues.map(issue => (
                                            <div key={issue.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium">{issue.title}</p>
                                                        <p className="text-sm text-gray-600">AI Score: {issue.aiScore} | {issue.confirmations} confirmations</p>
                                                    </div>
                                                    <span className={`text-xs px-3 py-1 rounded-full ${getPriorityColor(issue.priority)}`}>
                                                        {issue.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueIntelligence;
