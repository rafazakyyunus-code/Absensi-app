// resources/js/Pages/Employees.jsx

import AppLayout from "@/Layouts/AppLayout";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import {
    Users,
    UserCheck,
    Clock3,
    BriefcaseBusiness,
    Plus,
    Filter,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

/* ===================================== */
/* DASHBOARD STAT CARD */
/* ===================================== */

const DashboardStatCard = ({
    icon,
    title,
    value,
    badge,
    color,
}) => {
    const colors = {
        purple: "bg-purple-500/10 text-purple-300",
        green: "bg-green-500/10 text-green-300",
        yellow: "bg-yellow-500/10 text-yellow-300",
        pink: "bg-pink-500/10 text-pink-300",
    };

    return (
        <div className="bg-[#13131F] border border-white/5 rounded-[28px] p-6 hover:border-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-[#181825] hover:shadow-[0_20px_60px_rgba(168,85,247,0.18)] cursor-pointer group">
            <div className="flex items-center justify-between">
                <div
    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg ${colors[color]}`}
>
                    {icon}
                </div>

                <span className="text-xs bg-white/5 px-3 py-1 rounded-lg text-gray-300">
                    {badge}
                </span>
            </div>

            <h4 className="text-gray-400 text-sm mt-6">
                {title}
            </h4>

            <h2 className="text-5xl font-bold mt-2">
                {value}
            </h2>
        </div>
    );
};

export default function Employees({ employees, stats }) {

    const [showModal, setShowModal] = useState(false);

const { data, setData, post, processing, reset } = useForm({
    name: "",
    email: "",
    department: "",
    role: "",
    status: "Present",
});
const submit = (e) => {
    e.preventDefault();

    post("/employees", {
        onSuccess: () => {
            reset();
            setShowModal(false);
        },
    });
};
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* HEADER */}
                <div className="sticky top-20 z-20 backdrop-blur-xl bg-[#0B0B14]/70 pb-5">
                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                        {/* LEFT */}
                        <div>
                            <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-[#E9D5FF] to-[#B794F4] bg-clip-text text-transparent">
                                Employee Management
                            </h1>

                            <p className="text-gray-400 mt-2 text-lg">
                                Overview and actions for your organization's
                                workforce.
                            </p>
                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]">
                                <Filter size={18} />
                                Filters
                            </button>

                            <button
    onClick={() => setShowModal(true)}
    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#CDB7FF] text-[#1B1330] font-semibold transition-all duration-300 shadow-lg shadow-purple-500/20 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(192,132,252,0.45)] active:scale-95"
>
                                Add Employee
                            </button>
                        </div>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    <DashboardStatCard
                        title="Total Employees"
                        value={stats.total}
                        icon={<Users size={20} />}
                        badge="+12%"
                        color="purple"
                    />

                    <DashboardStatCard
                        title="Present Now"
                        value={stats.present}
                        icon={<UserCheck size={20} />}
                        badge="Today"
                        color="green"
                    />

                    <DashboardStatCard
                        title="Late Arrivals"
                        value={stats.late}
                        icon={<Clock3 size={20} />}
                        badge="-3%"
                        color="yellow"
                    />

                    <DashboardStatCard
                        title="Open Roles"
                        value={stats.absent}
                        icon={<BriefcaseBusiness size={20} />}
                        badge="Open"
                        color="pink"
                    />
                </div>

                {/* TABLE */}
                <div className="bg-[#111827]/80 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-white/10 hover:shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
                    {/* TABLE HEADER */}
                    <div className="grid grid-cols-5 gap-4 px-8 py-5 border-b border-white/5 text-sm text-gray-400 font-medium bg-white/[0.03]">
                        <div>Employee Name</div>
                        <div>Department</div>
                        <div>Role</div>
                        <div>Status</div>
                        <div className="text-right">
                            Actions
                        </div>
                    </div>

                    {/* TABLE BODY */}
                    <div>
                        {employees.map((employee, index) => (
                            <EmployeeRow
                                key={index}
                                employee={employee}
                            />
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6 border-t border-white/5">
                        <p className="text-gray-400 text-sm">
                            Showing {employees.length} employees
                        </p>

                        <div className="flex items-center gap-2">
                            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:border hover:border-white/10 hover:shadow-[0_10px_25px_rgba(255,255,255,0.06)]">
                                <ChevronLeft size={18} />
                            </button>

                            <button className="w-10 h-10 rounded-xl bg-[#CDB7FF] text-black font-semibold">
                                1
                            </button>

                            <button className="w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:text-purple-300">
                                2
                            </button>

                            <button className="w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:text-purple-300">
                                3
                            </button>

                            <button className="px-2">
                                ...
                            </button>

                            <button className="w-10 h-10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:text-purple-300">
                                32
                            </button>

                            <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:border hover:border-white/10 hover:shadow-[0_10px_25px_rgba(255,255,255,0.06)]">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-2xl bg-[#13131F] border border-white/10 rounded-[32px] p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                    Add Employee
                </h2>

                <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white"
                >
                    ✕
                </button>
            </div>

            <form
                onSubmit={submit}
                className="space-y-5"
            >

                <input
                    type="text"
                    placeholder="Employee Name"
                    value={data.name}
                    onChange={(e) =>
                        setData("name", e.target.value)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(e) =>
                        setData("email", e.target.value)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400"
                />

                <input
                    type="text"
                    placeholder="Department"
                    value={data.department}
                    onChange={(e) =>
                        setData("department", e.target.value)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400"
                />

                <input
                    type="text"
                    placeholder="Role"
                    value={data.role}
                    onChange={(e) =>
                        setData("role", e.target.value)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400"
                />

                <select
                    value={data.status}
                    onChange={(e) =>
                        setData("status", e.target.value)
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-purple-400"
                >
                    <option value="Present">
                        Present
                    </option>

                    <option value="Late">
                        Late
                    </option>

                    <option value="Absent">
                        Absent
                    </option>
                </select>

                <button
                    disabled={processing}
                    className="w-full bg-[#CDB7FF] text-black font-bold py-4 rounded-2xl hover:scale-[1.02] transition-all duration-300"
                >
                    {processing
                        ? "Saving..."
                        : "Create Employee"}
                </button>

            </form>
        </div>
    </div>
)}
        </AppLayout>
    );
}

/* ===================================== */
/* EMPLOYEE ROW */
/* ===================================== */

function EmployeeRow({ employee }) {
    const statusColor = {
        Present: "text-emerald-400",
        Late: "text-yellow-400",
        Absent: "text-red-400",
    };

    const deptColor = {
        Engineering:
            "bg-purple-500/10 text-purple-300 border-purple-500/20",
        Design:
            "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
        Marketing:
            "bg-pink-500/10 text-pink-300 border-pink-500/20",
    };

    return (
        <div className="grid grid-cols-5 gap-4 items-center px-8 py-6 border-b border-white/5 hover:bg-white/[0.03] transition-all duration-300 hover:scale-[1.01] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] group cursor-pointer">
            {/* USER */}
            <div className="flex items-center gap-4">
                <img
                    src={
                        employee.image
                            ? employee.image
                            : `https://ui-avatars.com/api/?name=${employee.name}`
                    }
                    alt={employee.name}
                    className="w-14 h-14 rounded-full object-cover border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:border-purple-400/40 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
                />

                <div>
                    <h3 className="font-semibold text-lg">
                        {employee.name}
                    </h3>

                    <p className="text-gray-400 text-sm">
                        {employee.email}
                    </p>
                </div>
            </div>

            {/* DEPARTMENT */}
            <div>
                <span
                    className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${deptColor[employee.department]}`}
                >
                    {employee.department}
                </span>
            </div>

            {/* ROLE */}
            <div className="text-gray-200 text-lg">
                {employee.role}
            </div>

            {/* STATUS */}
            <div>
                <span
                    className={`font-semibold tracking-wide uppercase transition-all duration-300 group-hover:tracking-widest ${statusColor[employee.status]}`}
                >
                    ● {employee.status}
                </span>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-4">
                <button className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                    <Pencil size={18} />
                </button>

                <button
                    onClick={() => {
                        if (confirm("Delete employee?")) {
                            router.delete(`/employees/${employee.id}`);
                        }
                    }}
                    className="text-red-400 hover:text-red-300 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}