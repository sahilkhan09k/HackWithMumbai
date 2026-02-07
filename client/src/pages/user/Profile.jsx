import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Award, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';

const Profile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        resolved: 0,
        pending: 0,
        inProgress: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserStats();
    }, []);

    const fetchUserStats = async () => {
        try {
            const response = await apiService.getUserIssues();
            const issues = response.data || [];

            setStats({
                total: issues.length,
                resolved: issues.filter(i => i.status === 'Resolved').length,
                pending: issues.filter(i => i.status === 'Pending').length,
                inProgress: issues.filter(i => i.status === 'In Progress').length
            });
        } catch (err) {
            console.error('Error fetching stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const impactScore = stats.resolved * 10 + stats.inProgress * 5;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-accent-50/20">
            <Sidebar />

            <div className="flex-1 ml-64 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            My Profile
                        </h1>
                        <p className="text-gray-600 text-lg">Manage your account and view your civic impact</p>
                    </div>

                    {/* Profile Card */}
                    <div className="card-gradient mb-8">
                        <div className="flex items-start space-x-6">
                            <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <User className="h-12 w-12 text-white" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h2>
                                <div className="space-y-2 text-gray-600">
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 mr-3 text-primary-600" />
                                        {user?.email}
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="h-5 w-5 mr-3 text-primary-600" />
                                        Member since {user?.createdAt ? formatDate(user.createdAt) : 'N/A'}
                                    </div>
                                    <div className="flex items-center">
                                        <Award className="h-5 w-5 mr-3 text-primary-600" />
                                        Role: <span className="ml-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                                            {user?.role || 'User'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1 font-medium">Total Issues</p>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                                        {stats.total}
                                    </p>
                                </div>
                                <div className="bg-primary-100 p-3 rounded-xl">
                                    <TrendingUp className="h-8 w-8 text-primary-600" />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1 font-medium">Resolved</p>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-success-600 to-success-700 bg-clip-text text-transparent">
                                        {stats.resolved}
                                    </p>
                                </div>
                                <div className="bg-success-100 p-3 rounded-xl">
                                    <CheckCircle className="h-8 w-8 text-success-600" />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1 font-medium">In Progress</p>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-warning-600 to-warning-700 bg-clip-text text-transparent">
                                        {stats.inProgress}
                                    </p>
                                </div>
                                <div className="bg-warning-100 p-3 rounded-xl">
                                    <Clock className="h-8 w-8 text-warning-600" />
                                </div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm mb-1 font-medium">Pending</p>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                                        {stats.pending}
                                    </p>
                                </div>
                                <div className="bg-gray-100 p-3 rounded-xl">
                                    <TrendingUp className="h-8 w-8 text-gray-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Impact Score */}
                    <div className="card-gradient">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Civic Impact Score</h2>
                        <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-8 rounded-2xl text-white text-center">
                            <p className="text-lg mb-2">Your Total Impact</p>
                            <p className="text-6xl font-bold mb-4">{impactScore}</p>
                            <p className="text-primary-100">
                                Keep reporting issues to increase your impact score!
                            </p>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                                <p className="text-gray-600 mb-1">Resolved Issues</p>
                                <p className="text-xl font-bold text-primary-600">+10 points each</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-gray-200">
                                <p className="text-gray-600 mb-1">In Progress Issues</p>
                                <p className="text-xl font-bold text-primary-600">+5 points each</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
