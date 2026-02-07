import Sidebar from '../../components/Sidebar';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Analytics = () => {
    const categoryData = [
        { name: 'Roads', value: 45 },
        { name: 'Water', value: 28 },
        { name: 'Electricity', value: 18 },
        { name: 'Sanitation', value: 12 },
        { name: 'Parks', value: 8 },
    ];

    const areaData = [
        { area: 'Downtown', issues: 34 },
        { area: 'North', issues: 28 },
        { area: 'East', issues: 22 },
        { area: 'West', issues: 18 },
        { area: 'South', issues: 15 },
    ];

    const resolutionTrend = [
        { month: 'Jan', resolved: 45, reported: 52 },
        { month: 'Feb', resolved: 52, reported: 48 },
        { month: 'Mar', resolved: 48, reported: 55 },
        { month: 'Apr', resolved: 61, reported: 58 },
        { month: 'May', resolved: 55, reported: 50 },
        { month: 'Jun', resolved: 58, reported: 54 },
    ];

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar isAdmin={true} />

            <div className="flex-1 ml-64 p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
                    <p className="text-gray-600">Data-driven insights for better governance</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card">
                        <p className="text-gray-600 text-sm mb-1">Total Issues</p>
                        <p className="text-3xl font-bold text-primary-600 mb-2">156</p>
                        <div className="flex items-center text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>12% from last month</span>
                        </div>
                    </div>

                    <div className="card">
                        <p className="text-gray-600 text-sm mb-1">Resolution Rate</p>
                        <p className="text-3xl font-bold text-green-600 mb-2">87%</p>
                        <div className="flex items-center text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>5% improvement</span>
                        </div>
                    </div>

                    <div className="card">
                        <p className="text-gray-600 text-sm mb-1">Avg Response Time</p>
                        <p className="text-3xl font-bold text-orange-600 mb-2">3.2d</p>
                        <div className="flex items-center text-red-600 text-sm">
                            <TrendingDown className="h-4 w-4 mr-1" />
                            <span>0.5d slower</span>
                        </div>
                    </div>

                    <div className="card">
                        <p className="text-gray-600 text-sm mb-1">Citizen Satisfaction</p>
                        <p className="text-3xl font-bold text-purple-600 mb-2">4.2/5</p>
                        <div className="flex items-center text-green-600 text-sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span>0.3 points up</span>
                        </div>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Issues by Category */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Issues by Category</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Area-wise Issue Density */}
                    <div className="card">
                        <h2 className="text-xl font-bold mb-4">Area-wise Issue Density</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={areaData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="area" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="issues" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Resolution Trend */}
                <div className="card">
                    <h2 className="text-xl font-bold mb-4">Resolution Trend (6 Months)</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={resolutionTrend}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="reported" stroke="#f59e0b" strokeWidth={2} name="Reported" />
                            <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} name="Resolved" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
