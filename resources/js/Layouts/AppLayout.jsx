import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

import {
    LayoutDashboard,
    Users,
    CalendarCheck,
    Building2,
    Settings,
    Bell,
    Search,
    Menu,
    X,
    LogOut,
} from "lucide-react";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const url = usePage().url ?? "";

    const [open, setOpen] = useState(false);

    const isAdmin = user?.role === "admin";

    const nav = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={18} />,
        },

        ...(isAdmin
            ? [
                  {
                      href: "/employees",
                      label: "Employee Management",
                      icon: <Users size={18} />,
                  },
              ]
            : []),

        {
            href: "/attendance",
            label: "Attendance History",
            icon: <CalendarCheck size={18} />,
        },

        {
            href: "/departments",
            label: "Departments",
            icon: <Building2 size={18} />,
        },

        {
            href: "/settings",
            label: "Settings",
            icon: <Settings size={18} />,
        },
    ];

    return (
        <div className="min-h-screen bg-[#0B0B14] text-white overflow-x-hidden relative">
            {/* BACKGROUND */}
            <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-purple-500/20 blur-[120px] rounded-full animate-pulse" />

            <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-purple-400/10 blur-[120px] rounded-full animate-pulse" />

            {/* MOBILE OVERLAY */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`
                    fixed top-0 left-0 z-50
                    h-screen w-[260px]
                    bg-[#12121C]/95 backdrop-blur-xl
                    border-r border-white/5
                    transition-all duration-500 ease-out
                    flex flex-col
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* LOGO */}
                <div className="p-6 border-b border-white/5">
                    <h1
                        className="
                            text-2xl font-bold
                            transition-all duration-500
                            hover:tracking-wide
                            hover:text-purple-300
                        "
                    >
                        Attend
                        <span className="text-purple-400">IQ</span>
                    </h1>

                    <p className="text-xs text-gray-400 mt-1">
                        Enterprise SAAS
                    </p>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 p-4 space-y-2">
                    {nav.map((item, index) => {
                        const active =
                            item.href === "/dashboard"
                                ? url === "/dashboard"
                                : url.startsWith(item.href);

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`
                                    group relative overflow-hidden
                                    flex items-center gap-3
                                    px-4 py-3 rounded-2xl
                                    text-sm font-medium
                                    transition-all duration-500 ease-out

                                    before:absolute before:inset-0
                                    before:bg-gradient-to-r
                                    before:from-transparent
                                    before:via-purple-500/10
                                    before:to-transparent
                                    before:translate-x-[-120%]
                                    before:transition-transform
                                    before:duration-700

                                    hover:before:translate-x-[120%]
                                    hover:scale-[1.02]
                                    hover:shadow-lg hover:shadow-purple-500/10

                                    ${
                                        active
                                            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }
                                `}
                            >
                                <div className="relative z-10 group-hover:scale-110 transition duration-300">
                                    {item.icon}
                                </div>

                                <span className="relative z-10">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* USER */}
                <div className="p-4 border-t border-white/5">
                    <div
                        className="
                            group
                            bg-white/5
                            border border-white/5
                            rounded-2xl
                            p-3
                            flex items-center gap-3
                            transition-all duration-500
                            hover:bg-white/10
                            hover:border-purple-500/20
                            hover:shadow-lg hover:shadow-purple-500/10
                            hover:scale-[1.02]
                        "
                    >
                        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold">
                            {user?.name?.charAt(0) || "U"}
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <h4 className="text-sm font-semibold truncate">
                                {user?.name || "User"}
                            </h4>

                            <p className="text-xs text-gray-400">
                                {isAdmin
                                    ? "Admin Account"
                                    : "Employee Account"}
                            </p>
                        </div>
                    </div>

                    {/* LOGOUT */}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="
                            group relative overflow-hidden
                            mt-3
                            w-full
                            flex items-center justify-center gap-2
                            bg-red-500/10
                            border border-red-500/20
                            text-red-400
                            py-3
                            rounded-2xl
                            text-sm
                            font-medium
                            transition-all duration-500

                            before:absolute before:inset-0
                            before:bg-gradient-to-r
                            before:from-transparent
                            before:via-red-500/10
                            before:to-transparent
                            before:translate-x-[-120%]
                            before:transition-transform
                            before:duration-700

                            hover:before:translate-x-[120%]
                            hover:bg-red-500/20
                            hover:border-red-400/30
                            hover:shadow-lg hover:shadow-red-500/20
                            hover:scale-[1.02]
                        "
                    >
                        <LogOut
                            size={16}
                            className="relative z-10 group-hover:scale-110 transition"
                        />
                        <span className="relative z-10">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* MAIN */}
            <div className="lg:ml-[260px] flex flex-col min-h-screen relative z-10">
                {/* TOPBAR */}
                <header className="sticky top-0 z-40 h-20 border-b border-white/5 bg-[#12121C]/80 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8">
                    {/* LEFT */}
                    <div className="flex items-center gap-4 w-full max-w-xl">
                        <button
                            className="lg:hidden"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <div
                            className="
                                group
                                flex items-center
                                bg-white/5
                                border border-white/5
                                rounded-2xl
                                px-4 py-3
                                flex-1
                                transition-all duration-500
                                hover:bg-white/10
                                hover:border-purple-500/20
                                hover:shadow-lg hover:shadow-purple-500/10
                                focus-within:border-purple-500/40
                                focus-within:shadow-xl focus-within:shadow-purple-500/20
                            "
                        >
                            <Search
                                size={18}
                                className="text-gray-400 group-hover:text-purple-400 transition duration-300"
                            />

                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none border-none text-sm ml-3 w-full text-white placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-4">
                        <button
                            className="
                                group
                                w-10 h-10
                                rounded-2xl
                                bg-white/5
                                flex items-center justify-center
                                transition-all duration-500
                                hover:bg-purple-500/10
                                hover:border hover:border-purple-500/20
                                hover:shadow-lg hover:shadow-purple-500/20
                                hover:scale-110
                            "
                        >
                            <Bell
                                size={18}
                                className="group-hover:scale-110 transition"
                            />
                        </button>

                        <img
                            src={`https://ui-avatars.com/api/?name=${
                                user?.name || "User"
                            }&background=7c3aed&color=fff`}
                            alt="profile"
                            className="
                                w-10 h-10 rounded-full
                                border border-white/10
                                transition-all duration-500
                                hover:scale-110
                                hover:border-purple-400
                                hover:shadow-lg hover:shadow-purple-500/20
                            "
                        />
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <AnimatePresence mode="wait">
    <motion.main
        key={url}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
        }}
        className="flex-1 p-4 lg:p-8 pb-10"
    >
        {children}
    </motion.main>
</AnimatePresence>
            </div>
        </div>
    );
}