// resources/js/Pages/Dashboard.jsx

import AppLayout from "@/Layouts/AppLayout";
import {
    Users,
    UserCheck,
    Clock3,
    CircleAlert,
    CalendarDays,
    Download,
    MoreVertical,
    Fingerprint,
    Smartphone,
    TimerReset,
    TrendingUp,
    BriefcaseBusiness,
} from "lucide-react";

/* =========================================
   DASHBOARD PAGE
========================================= */

export default function Dashboard({
        stats,
        activities
    }) {

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">
                            Dashboard Overview
                        </h1>

                        <p className="text-gray-400 mt-2 text-lg">
                            Real-time attendance insights for Oct 24, 2023
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
                            <CalendarDays size={18} />
                            Today
                        </button>

                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#B794F4] text-[#1B1330] font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20 hover:scale-105 hover:shadow-[0_15px_40px_rgba(183,148,244,0.45)] hover:-translate-y-1 active:scale-95">
                            <Download size={18} />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* STATS */}
                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    <DashboardStatCard
                        title="TOTAL EMPLOYEES"
                        value={stats.total}
                        sub="All registered employees"
                        icon={<Users size={20} />}
                        color="purple"
                        badge="Realtime"
                    />

                    <DashboardStatCard
                        title="PRESENT TODAY"
                        value={stats.present}
                        sub="Employees checked in"
                        icon={<UserCheck size={20} />}
                        color="green"
                        badge="Live"
                    />

                    <DashboardStatCard
                        title="LATE EMPLOYEES"
                        value={stats.late}
                        sub="Employees late today"
                        icon={<Clock3 size={20} />}
                        color="yellow"
                        badge="Today"
                    />

                    <DashboardStatCard
                        title="ABSENT"
                        value={stats.absent}
                        sub="Employees absent today"
                        icon={<CircleAlert size={20} />}
                        color="red"
                        badge="Realtime"
                    />
                </div>

                {/* CHART + QUICK STATS */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* CHART */}
                    <div className="xl:col-span-2 bg-[#13131F] border border-white/5 rounded-[32px] p-7 transition-all duration-500 hover:border-purple-400/20 hover:shadow-[0_20px_80px_rgba(124,92,252,0.18)] hover:bg-[#171724]">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold">
                                    Attendance Trends
                                </h2>

                                <p className="text-gray-400 mt-1">
                                    Weekly performance analysis
                                </p>
                            </div>

                            <div className="flex items-center gap-5 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-purple-300"></span>
                                    Present
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-yellow-300"></span>
                                    Late
                                </div>
                            </div>
                        </div>

                        {/* FAKE CHART */}
                        <div className="relative h-[400px] rounded-3xl bg-gradient-to-b from-white/[0.03] to-transparent overflow-hidden border border-white/5">
                            <svg
                                viewBox="0 0 800 300"
                                className="absolute inset-0 w-full h-full"
                                fill="none"
                            >
                                <path
                                    d="M0 220 C120 200, 180 80, 300 120 S500 300, 650 80 S780 50, 800 90"
                                    stroke="#C4B5FD"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                />

                                <path
                                    d="M0 260 C150 240, 220 200, 320 220 S520 260, 640 200 S760 180, 800 210"
                                    stroke="#FDE68A"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <div className="absolute bottom-5 left-0 right-0 flex justify-around text-xs text-gray-500 font-medium">
                                <span>MON</span>
                                <span>TUE</span>
                                <span>WED</span>
                                <span>THU</span>
                                <span>FRI</span>
                                <span>SAT</span>
                                <span>SUN</span>
                            </div>
                        </div>
                    </div>

                    {/* QUICK STATS */}
                    <div className="bg-[#13131F] border border-white/5 rounded-[32px] p-7 transition-all duration-500 hover:border-white/10 hover:bg-[#171723] hover:shadow-[0_15px_60px_rgba(255,255,255,0.05)]">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold">
                                Quick Stats
                            </h2>

                            <button className="text-sm text-purple-300 hover:text-white transition">
                                View All
                            </button>
                        </div>

                        <div className="space-y-5">
                            <QuickStat
                                title="Peak Entry Time"
                                sub="08:45 AM - 09:15 AM"
                                value={stats.total}
                                icon={<TimerReset size={20} />}
                            />

                            <QuickStat
                                title="Late Pattern"
                                sub="Mostly Engineering Dept."
                                value={stats.total}
                                icon={<TrendingUp size={20} />}
                            />

                            <QuickStat
                                title="Remote Work"
                                sub="Increasing trend"
                                value={stats.total}
                                icon={<BriefcaseBusiness size={20} />}
                            />
                        </div>

                        {/* LOAD */}
                        <div className="mt-10 space-y-5">
                            <h4 className="font-semibold text-lg">
                                Department Load
                            </h4>

                            <DepartmentLoad
                                title="Engineering"
                                value="92%"
                            />

                            <DepartmentLoad
                                title="Marketing"
                                value="78%"
                            />
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-[#13131F] border border-white/5 rounded-[32px] overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                    {/* HEADER */}
                    <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
                        <h2 className="text-3xl font-bold">
                            Recent Activity
                        </h2>

                        <div className="flex items-center gap-2">
                            <button className="px-5 py-2 rounded-xl bg-[#CDB7FF] text-black font-semibold">
                                All
                            </button>

                            <button className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition">
                                Late
                            </button>

                            <button className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition">
                                Absent
                            </button>
                        </div>
                    </div>

                    {/* TABLE HEAD */}
                    <div className="grid grid-cols-6 gap-4 px-8 py-5 text-sm text-gray-400 font-semibold border-b border-white/5 bg-white/[0.02]">
                        <div>EMPLOYEE</div>
                        <div>DEPARTMENT</div>
                        <div>CHECK-IN TIME</div>
                        <div>METHOD</div>
                        <div>STATUS</div>
                        <div className="text-right">
                            ACTIONS
                        </div>
                    </div>

                    {/* ROWS */}
                    <div>
                        {activities.map((item, index) => (
                            <ActivityRow
                                key={index}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

/* =========================================
   STAT CARD
========================================= */

function DashboardStatCard({
    title,
    value,
    sub,
    icon,
    badge,
    color,
}) {
    const colors = {
        purple:
            "bg-purple-500/10 text-purple-300 border-purple-500/20",
        green:
            "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
        yellow:
            "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
        red:
            "bg-red-500/10 text-red-300 border-red-500/20",
    };

    return (
    <div
        className={`
            bg-[#13131F]
            border
            rounded-[28px]
            p-6
            transition-all
            duration-500
            hover:-translate-y-2
            hover:scale-[1.02]
            hover:shadow-[0_20px_60px_rgba(139,92,246,0.25)]
            hover:border-white/20
            hover:bg-[#181825]
            group
            cursor-pointer
            ${colors[color]}
        `}
    >
            <div className="flex items-center justify-between p-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:translate-x-1 cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-white/10">
                    {icon}
                </div>

                <span className="text-xs bg-white/5 px-3 py-1 rounded-lg">
                    {badge}
                </span>
            </div>

            <h4 className="text-gray-400 text-sm mt-7 tracking-wide">
                {title}
            </h4>

            <h2 className="text-6xl font-black mt-2">
                {value}
            </h2>

            <p className="text-gray-500 text-sm mt-3">
                {sub}
            </p>
        </div>
    );
}

/* =========================================
   QUICK STAT
========================================= */

function QuickStat({ title, sub, value, icon }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:translate-x-1 cursor-pointer group">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-purple-300 transition-all duration-500 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                    {icon}
                </div>

                <div>
                    <h4 className="font-semibold">
                        {title}
                    </h4>

                    <p className="text-sm text-gray-400">
                        {sub}
                    </p>
                </div>
            </div>

            <span className="text-3xl font-bold text-[#CDB7FF]">
                {value}
            </span>
        </div>
    );
}

/* =========================================
   DEPARTMENT LOAD
========================================= */

function DepartmentLoad({ title, value }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span>{title}</span>
                <span>{value}</span>
            </div>

            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
    className="h-full bg-[#CDB7FF] transition-all duration-700 hover:brightness-125 hover:shadow-[0_0_20px_rgba(205,183,255,0.7)]"
    style={{ width: value }}
></div>
            </div>
        </div>
    );
}

/* =========================================
   ACTIVITY ROW
========================================= */

function ActivityRow({ item }) {
    const deptColor = {
        Engineering:
            "bg-purple-500/10 text-purple-300 border-purple-500/20",
        Design:
            "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
        Marketing:
            "bg-pink-500/10 text-pink-300 border-pink-500/20",
    };

    const statusColor = {
        Present:
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        Late:
            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        Absent:
            "bg-red-500/10 text-red-400 border-red-500/20",
    };

    return (
        <div className="grid grid-cols-6 gap-4 items-center px-8 py-6 border-b border-white/5 hover:bg-white/[0.03] transition-all duration-300 hover:scale-[1.01] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] group cursor-pointer">
            {/* USER */}
            <div className="flex items-center gap-4">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-purple-400/40 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                />

                <div>
                    <h3 className="font-semibold text-lg">
                        {item.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                        Emp ID: {item.id}
                    </p>
                </div>
            </div>

            {/* DEPARTMENT */}
            <div>
                <span
                    className={`px-4 py-2 rounded-full text-sm border ${deptColor[item.department]}`}
                >
                    {item.department}
                </span>
            </div>

            {/* TIME */}
            <div>
                <h4 className="font-semibold text-lg">
                    {item.time}
                </h4>

                <p className="text-emerald-400 text-sm">
                    {item.early}
                </p>
            </div>

            {/* METHOD */}
            <div className="flex items-center gap-2 text-gray-300">
                {item.status === "Present" ? (
                    <Fingerprint size={18} />
                ) : (
                    <Smartphone size={18} />
                )}

                {item.method}
            </div>

            {/* STATUS */}
            <div>
                <span
                    className={`px-4 py-2 rounded-full text-sm border font-medium ${statusColor[item.status]}`}
                >
                    ● {item.status}
                </span>
            </div>

            {/* ACTION */}
            <div className="flex justify-end">
                <button className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:rotate-90 hover:scale-110 hover:text-purple-300">
                    <MoreVertical size={18} />
                </button>
            </div>
        </div>
    );
}