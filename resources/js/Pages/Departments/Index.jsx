// resources/js/Pages/Departments/Index.jsx

import AppLayout from "@/Layouts/AppLayout";

import {
    Plus,
    Sparkles,
    TrendingDown,
    ShieldCheck,
    MonitorSmartphone,
    Palette,
    Megaphone,
    TrendingUp,
    Users,
    Pencil,
    UserRound,
} from "lucide-react";

/* =========================================================
   PAGE
========================================================= */

export default function DepartmentsIndex({
    departments = [],
}) {
    const dummyDepartments = [
        {
            name: "Engineering",
            head: "Marcus Chen",
            employees: 124,
            attendance: "96.8%",
            icon: <MonitorSmartphone size={24} />,
            color: "purple",
            trend: [35, 40, 28, 52, 44, 60],
        },

        {
            name: "Design",
            head: "Sarah Jenkins",
            employees: 42,
            attendance: "92.1%",
            icon: <Palette size={24} />,
            color: "slate",
            trend: [60, 48, 75, 40, 55, 50],
        },

        {
            name: "Marketing",
            head: "Elena Rodriguez",
            employees: 68,
            attendance: "88.5%",
            icon: <Megaphone size={24} />,
            color: "yellow",
            trend: [55, 50, 66, 35, 30, 38],
        },

        {
            name: "Sales",
            head: "James Wilson",
            employees: 95,
            attendance: "82.4%",
            icon: <TrendingUp size={24} />,
            color: "red",
            trend: [80, 74, 58, 50, 44, 42],
        },

        {
            name: "HR",
            head: "Linda Bloom",
            employees: 18,
            attendance: "98.4%",
            icon: <Users size={24} />,
            color: "green",
            trend: [25, 28, 32, 36, 35, 38],
        },
    ];

    const data =
        departments.length > 0
            ? departments
            : dummyDepartments;

    return (
        <AppLayout>
            <div className="space-y-7">
                {/* HEADER */}
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight">
                            Departments
                        </h1>

                        <p className="text-gray-400 text-lg mt-2 max-w-4xl leading-relaxed">
                            Manage organizational structure
                            and attendance analytics.
                        </p>
                    </div>

                    <button className="flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#B794F4] text-[#1B1330] font-semibold hover:opacity-90 transition shadow-lg shadow-purple-500/20">
                        <Plus size={20} />
                        <span>Create Department</span>
                    </button>
                </div>

                {/* INSIGHTS */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-[#13131F] border border-white/5 rounded-[32px] p-7">
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles
                                size={20}
                                className="text-yellow-300"
                            />

                            <h2 className="text-2xl font-bold text-yellow-200">
                                AI Operational Insights
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="rounded-[24px] border border-red-500/20 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 text-red-300 mb-4">
                                    <TrendingDown size={18} />

                                    <h3 className="font-bold tracking-wide">
                                        ATTENDANCE ALERT
                                    </h3>
                                </div>

                                <p className="text-gray-300 leading-relaxed text-lg">
                                    Sales attendance is down
                                    8% compared to last month.
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-emerald-500/20 bg-white/[0.02] p-6">
                                <div className="flex items-center gap-2 text-emerald-300 mb-4">
                                    <ShieldCheck size={18} />

                                    <h3 className="font-bold tracking-wide">
                                        HIGH CONSISTENCY
                                    </h3>
                                </div>

                                <p className="text-gray-300 leading-relaxed text-lg">
                                    HR department maintains
                                    the highest consistency
                                    rating.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* HEALTH SCORE */}
                    <div className="bg-[#241A39] border border-purple-500/10 rounded-[32px] p-7 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-semibold text-purple-100">
                                ORG HEALTH SCORE
                            </h3>

                            <h1 className="text-8xl font-black mt-6 text-[#CDB7FF]">
                                94.2%
                            </h1>

                            <p className="text-gray-300 text-lg mt-4">
                                Global attendance average.
                            </p>
                        </div>

                        <div className="mt-10">
                            <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                                <div className="w-[94%] h-full bg-[#D7C2FF] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DEPARTMENTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {data.map((department, index) => (
                        <DepartmentCard
                            key={index}
                            department={department}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

/* =========================================================
   DEPARTMENT CARD
========================================================= */

function DepartmentCard({ department }) {
    const colorStyles = {
        purple: {
            box: "bg-purple-500/10 text-purple-200",
            text: "text-purple-200",
            line: "#CDB7FF",
            border: "border-purple-500/20",
        },

        slate: {
            box: "bg-slate-500/10 text-slate-200",
            text: "text-slate-200",
            line: "#DDD6FE",
            border: "border-slate-500/20",
        },

        yellow: {
            box: "bg-yellow-500/10 text-yellow-200",
            text: "text-yellow-200",
            line: "#FDE68A",
            border: "border-yellow-500/20",
        },

        red: {
            box: "bg-red-500/10 text-red-200",
            text: "text-red-200",
            line: "#FCA5A5",
            border: "border-red-500/20",
        },

        green: {
            box: "bg-emerald-500/10 text-emerald-200",
            text: "text-emerald-200",
            line: "#6EE7B7",
            border: "border-emerald-500/20",
        },
    };

    const current =
        colorStyles[department.color];

    return (
        <div
            className={`bg-[#13131F] border ${current.border} rounded-[32px] p-7 transition-all duration-500 hover:-translate-y-2`}
        >
            {/* TOP */}
            <div className="flex items-start justify-between">
                <div
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center ${current.box}`}
                >
                    {department.icon}
                </div>

                <div className="text-right">
                    <p className="text-sm tracking-[0.2em] text-gray-400">
                        ATTENDANCE
                    </p>

                    <h3
                        className={`text-4xl font-black mt-2 ${current.text}`}
                    >
                        {department.attendance}
                    </h3>
                </div>
            </div>

            {/* CONTENT */}
            <div className="mt-10">
                <h2 className="text-5xl font-black tracking-tight">
                    {department.name}
                </h2>

                <div className="flex items-center gap-2 text-gray-400 mt-3">
                    <UserRound size={16} />

                    <span className="text-lg">
                        Head: {department.head}
                    </span>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-5 mt-10">
                <div className="bg-white/[0.02] rounded-2xl p-5">
                    <p className="text-gray-400">
                        Employees
                    </p>

                    <h2 className="text-5xl font-black mt-3">
                        {department.employees}
                    </h2>
                </div>

                <div className="bg-white/[0.02] rounded-2xl p-5">
                    <p className="text-gray-400 mb-5">
                        Trend
                    </p>

                    <MiniChart
                        points={department.trend}
                        color={current.line}
                    />
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-4 mt-8">
                <button className="flex-1 h-14 rounded-2xl bg-white/10 text-lg font-semibold">
                    View Details
                </button>

                <button className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Pencil size={18} />
                </button>
            </div>
        </div>
    );
}

/* =========================================================
   MINI CHART
========================================================= */

function MiniChart({ points, color }) {
    const width = 140;
    const height = 50;

    const max = Math.max(...points);
    const min = Math.min(...points);

    const path = points
        .map((point, index) => {
            const x =
                (index / (points.length - 1)) * width;

            const y =
                height -
                ((point - min) / (max - min || 1)) *
                    height;

            return `${index === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-[50px]"
            fill="none"
        >
            <path
                d={path}
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}