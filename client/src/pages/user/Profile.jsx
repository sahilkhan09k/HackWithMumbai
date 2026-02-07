import { Award, TrendingUp, CheckCircle, AlertCircle, Users } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
    const { user } = useAuth();

    const stats = {
        totalReported: 12,
        totalResolved: 8,
        communityContributions: 24,
        civicImpactScore: 850
    };

    const achievements = [
        { title: 'First Reporter', description: 'Reported your first issue', earned: true },
        { title: 'Community Helper', description: 'Verified 10 issues', earned: true },
        { title: 'Civic Champion', description: 'Reported 10 issues', earned: true },
        { title: 'Problem Solver', description: 'All your issues resolved', earned: false },
    ];

    const recentActivity = [
        { action: 'Reported', issue: 'Pothole on Main Street', date: '2026-02-07' },
        { action: 'Verified', issue: 'Water leak near park', date: '2026-02-06' },
        { action: 'Resolved', issue: 'Broken street light', date: '2026-02-05' },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
                        <p className="text-gray-600">Track your civic impact and contributions</p>
                    </div>

                    {/* Profile Header */}
                    <div className="card mb-8">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-1">{user?.name || 'User'}</h2>
                                <p className="text-gray-600 mb-3">{user?.email}</p>
                                <div className="flex items-center space-x-2">
                                    <Award className="h-5 w-5 text-yellow-500" />
                                    <span className="font-semibold text-lg">Civic Impact Score: {stats.civicImpactScore}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="card text-center">
                            <AlertCircle className="h-10 w-10 text-primary-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-primary-600 mb-1">{stats.totalReported}</div>
                            <div className="text-sm text-gray-600">Total Issues Reported</div>
                        </div>

                        <div className="card text-center">
                            <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-green-600 mb-1">{stats.totalResolved}</div>
                            <div className="text-sm text-gray-600">Issues Resolved</div>
                        </div>

                        <div className="card text-center">
                            <Users className="h-10 w-10 text-orange-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-orange-600 mb-1">{stats.communityContributions}</div>
                            <div className="text-sm text-gray-600">Community Contributions</div>
                        </div>

                        <div className="card text-center">
                            <TrendingUp className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                            <div className="text-3xl font-bold text-purple-600 mb-1">{Math.round((stats.totalResolved / stats.totalReported) * 100)}%</div>
                            <div className="text-sm text-gray-600">Resolution Rate</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Achievements */}
                        <div className="card">
                            <h2 className="text-xl font-bold mb-4">Achievements</h2>
                            <div className="space-y-3">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border-2 ${achievement.earned
                                                ? 'bg-yellow-50 border-yellow-200'
                                                : 'bg-gray-50 border-gray-200 opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Award className={`h-8 w-8 ${achievement.earned ? 'text-yellow-500' : 'text-gray-400'}`} />
                                            <div>
                                                <h3 className="font-semibold">{achievement.title}</h3>
                                                <p className="text-sm text-gray-600">{achievement.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="card">
                            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-start space-x-3 pb-4 border-b last:border-b-0">
                                        <div className={`w-2 h-2 rounded-full mt-2 ${activity.action === 'Resolved' ? 'bg-green-500' :
                                                activity.action === 'Verified' ? 'bg-blue-500' :
                                                    'bg-orange-500'
                                            }`}></div>
                                        <div className="flex-1">
                                            <p className="font-medium">{activity.action}: {activity.issue}</p>
                                            <p className="text-sm text-gray-600">{activity.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Impact Breakdown */}
                    <div className="card mt-6">
                        <h2 className="text-xl font-bold mb-4">Civic Impact Breakdown</h2>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Issue Reporting</span>
                                    <span className="text-sm text-gray-600">400 points</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: '47%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Community Verification</span>
                                    <span className="text-sm text-gray-600">300 points</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium">Resolution Quality</span>
                                    <span className="text-sm text-gray-600">150 points</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '18%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
