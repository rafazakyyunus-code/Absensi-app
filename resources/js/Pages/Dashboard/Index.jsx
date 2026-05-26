import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StatCard = ({ icon, label, value, sub, badge, badgeColor }) => (
    <div
    className="
        group
        bg-[#13131F]
        border border-white/5
        rounded-2xl
        p-5
        flex-1
        min-w-0
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-purple-500/20
        hover:bg-[#171726]
        hover:shadow-[0_0_40px_rgba(124,92,252,0.15)]
    "
>
        <div className="flex items-start justify-between mb-3">
            <div
    className="
        w-10 h-10 rounded-xl
        bg-white/5
        flex items-center justify-center
        text-xl
        transition-all duration-500
        group-hover:scale-110
        group-hover:bg-purple-500/20
    "
>{icon}</div>
            {badge && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
            )}
        </div>
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</div>
        <div
    className="
        text-3xl font-bold text-white mb-1
        transition-all duration-300
        group-hover:text-purple-300
    "
>{value?.toLocaleString()}</div>
        <div className="text-xs text-gray-500">{sub}</div>
    </div>
);

const StatusBadge = ({ status }) => {
    const map = {
        present: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
        late: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
        absent: 'bg-red-500/20 text-red-400 border border-red-500/30',
        leave: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    };
    return (
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${map[status] || map.absent}`}>
            ● {status}
        </span>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className="bg-[#1E1E2E] border border-white/10 rounded-xl px-4 py-3 text-xs">
                <p className="text-gray-400 mb-2">{label}</p>
                {payload.map(p => (
                    <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value}</p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Dashboard({ stats, weeklyTrend, departments, recentActivity, myAttendance }) {
    const { auth } = usePage().props;
    const [checkingIn, setCheckingIn] = useState(false);
    const [checkingOut, setCheckingOut] = useState(false);
    const [filter, setFilter] = useState('All');

    const handleCheckIn = () => {
        setCheckingIn(true);
        router.post(route('attendance.checkin'), { method: 'manual', work_type: 'wfo' }, {
            onFinish: () => setCheckingIn(false),
        });
    };

    const handleCheckOut = () => {
        setCheckingOut(true);
        router.post(route('attendance.checkout'), {}, {
            onFinish: () => setCheckingOut(false),
        });
    };

    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const filteredActivity = (recentActivity ?? []).filter(a =>
    filter === 'All' ? true : a.status === filter.toLowerCase()
);

    return (
        <AppLayout>
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Real-time attendance insights for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Check In / Out buttons */}
                    {!myAttendance?.check_in_at ? (
                        <button
                            onClick={handleCheckIn}
                            disabled={checkingIn}
                            className="
    px-4 py-2
    bg-emerald-500
    hover:bg-emerald-600
    text-white text-sm font-semibold
    rounded-xl
    transition-all duration-300
    hover:scale-[1.03]
    hover:shadow-[0_0_30px_rgba(16,185,129,0.35)]
    active:scale-[0.98]
    disabled:opacity-50
"
                        >
                            {checkingIn ? '...' : '✓ Check In'}
                        </button>
                    ) : !myAttendance?.check_out_at ? (
                        <button
                            onClick={handleCheckOut}
                            disabled={checkingOut}
                            className="
    px-4 py-2
    bg-amber-500
    hover:bg-amber-600
    text-white text-sm font-semibold
    rounded-xl
    transition-all duration-300
    hover:scale-[1.03]
    hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]
    active:scale-[0.98]
    disabled:opacity-50
"
                        >
                            {checkingOut ? '...' : '⏎ Check Out'}
                        </button>
                    ) : (
                        <span className="px-4 py-2 bg-white/5 text-gray-400 text-sm rounded-xl">
                            ✓ Done today
                        </span>
                    )}
                    {myAttendance?.check_in_at && (
                        <div className="text-xs text-gray-500">
                            In: <span className="text-white">{myAttendance.check_in_at}</span>
                            {myAttendance.check_out_at && <> · Out: <span className="text-white">{myAttendance.check_out_at}</span></>}
                        </div>
                    )}
                    <button
    className="
        flex items-center gap-2
        px-4 py-2
        bg-[#7C5CFC]
        hover:bg-[#6B4EE0]
        text-white text-sm font-semibold
        rounded-xl
        transition-all duration-300
        hover:scale-[1.03]
        hover:shadow-[0_0_30px_rgba(124,92,252,0.45)]
        active:scale-[0.98]
    "
>
                        ↓ Export Report
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4 mb-6 flex-wrap">
                <StatCard icon="👥" label="Total Employees" value={stats?.totalEmployees ?? 0} sub="Active across 12 departments" badge="+2.4%" badgeColor="bg-emerald-500/20 text-emerald-400" />
                <StatCard icon="✅" label="Present Today"value={stats?.presentToday ?? 0} sub="32 checked in via Remote" badge={`${stats?.presentPercent ?? 0}%`} badgeColor="bg-emerald-500/20 text-emerald-400" />
                <StatCard icon="⏰" label="Late Employees" value={stats?.lateToday ?? 0} sub="Avg. delay: 14 mins" badge={`${stats?.latePercent ?? 0}%`} badgeColor="bg-amber-500/20 text-amber-400" />
                <StatCard icon="🚫" label="Absent" value={stats?.absentToday ?? 0} sub="18 Approved leaves" badge={`-${stats?.absentPercent ?? 0}%`} badgeColor="bg-red-500/20 text-red-400" />
            </div>

            {/* Charts + Quick Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
                {/* Trend Chart */}
                <div
    className="
        xl:col-span-2
        bg-[#13131F]
        border border-white/5
        rounded-2xl
        p-6
        transition-all
        duration-500
        hover:border-purple-500/20
        hover:bg-[#171726]
        hover:shadow-[0_0_50px_rgba(124,92,252,0.12)]
    "
>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-white font-semibold text-base">Attendance Trends</h2>
                            <p className="text-gray-500 text-xs mt-0.5">Weekly performance analysis</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={weeklyTrend} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                            <XAxis dataKey="day" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                formatter={(value) => <span style={{ color: '#9CA3AF', fontSize: 11 }}>{value}</span>}
                            />
                            <Line type="monotone" dataKey="present" name="Present" stroke="#7C5CFC" strokeWidth={2.5} dot={false} />
                            <Line type="monotone" dataKey="late" name="Late" stroke="#F59E0B" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Stats */}
                <div
    className="
        bg-[#13131F]
        border border-white/5
        rounded-2xl
        p-5
        flex flex-col gap-4
        transition-all duration-500
        hover:border-purple-500/20
        hover:bg-[#171726]
        hover:shadow-[0_0_50px_rgba(124,92,252,0.10)]
    "
>
                    <div className="flex items-center justify-between">
                        <h2 className="text-white font-semibold text-base">Quick Stats</h2>
                        <button className="text-xs text-purple-400 hover:text-purple-300">View All</button>
                    </div>

                    <div className="space-y-3">
                        {[
                            { icon: '⏱', label: 'Peak Entry Time', sub: '08:45 AM - 09:15 AM', value: '82%', color: 'text-white' },
                            { icon: '📉', label: 'Late Pattern', sub: 'Mostly Engineering Dept.', value: '+12%', color: 'text-amber-400' },
                            { icon: '💼', label: 'Remote Work', sub: 'Increasing trend', value: stats.remoteToday, color: 'text-emerald-400' },
                        ].map((item, i) => (
                            <div
    key={i}
    className="
        group
        flex items-center gap-3
        p-3
        bg-white/[0.03]
        rounded-xl
        transition-all duration-300
        hover:bg-white/[0.06]
        hover:scale-[1.02]
        hover:border hover:border-white/5
    "
>
                                <div
    className="
        w-9 h-9
        bg-white/5
        rounded-lg
        flex items-center justify-center
        text-base
        flex-shrink-0
        transition-all duration-300
        group-hover:bg-purple-500/20
        group-hover:scale-110
    "
>{item.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-white text-sm font-medium">{item.label}</div>
                                    <div className="text-gray-500 text-xs">{item.sub}</div>
                                </div>
                                <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white text-sm font-medium">Department Load</span>
                        </div>
                        <div className="space-y-3">
                            {departments.map((dept, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-400">{dept.name}</span>
                                        <span className="text-gray-300">{dept.load}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all"
                                            style={{ width: `${dept.load}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-[#13131F] border border-white/5 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-white font-semibold text-base">Recent Activity</h2>
                    <div className="flex gap-1.5">
                        {['All', 'Late', 'Absent'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`
    px-3 py-1 text-xs font-medium rounded-lg
    transition-all duration-300
    hover:scale-105
    ${
        filter === f
            ? 'bg-[#7C5CFC] text-white shadow-lg shadow-purple-500/30'
            : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
    }
`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-white/5">
                                {['Employee', 'Department', 'Check-in Time', 'Method', 'Status', 'Actions'].map(h => (
                                    <th key={h} className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pr-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.04]">
                            {filteredActivity.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-gray-600 text-sm">
                                        No activity today
                                    </td>
                                </tr>
                            ) : filteredActivity.map((row, i) => (
                                <tr
    key={i}
    className="
        group
        hover:bg-gradient-to-r
        hover:from-white/[0.03]
        hover:to-purple-500/[0.04]
        transition-all duration-300
    "
>
                                    <td className="py-3 pr-4">
                                        <div className="flex items-center gap-3">
                                            <div
    className="
        w-8 h-8 rounded-full
        bg-gradient-to-br
        from-purple-500 to-indigo-600
        flex items-center justify-center
        text-white text-xs font-bold
        flex-shrink-0
        transition-all duration-300
        group-hover:scale-110
        group-hover:shadow-lg
        group-hover:shadow-purple-500/30
    "
>
                                                {row.initials}
                                            </div>
                                            <div>
                                                <div className="text-white font-medium text-sm">{row.employee}</div>
                                                <div className="text-gray-600 text-xs">Emp ID: #{row.employee_id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="text-xs px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">{row.department}</span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <div className="text-white font-medium">{row.check_in_time}</div>
                                        {row.check_in_early && <div className="text-emerald-400 text-xs">{row.check_in_early}</div>}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="text-gray-400 text-sm">◉ {row.method}</span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <StatusBadge status={row.status} />
                                    </td>
                                    <td className="py-3">
                                        <button
    className="
        w-8 h-8
        rounded-lg
        flex items-center justify-center
        text-gray-600
        hover:text-white
        hover:bg-white/10
        transition-all duration-300
        hover:scale-110
    "
>⋮</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

