import { useForm, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Gauge,
    ShieldCheck,
    ArrowRight,
} from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}) {
    const [showPassword, setShowPassword] =
        useState(false);

    const [mousePosition, setMousePosition] =
        useState({
            x: 0,
            y: 0,
        });

    /* =====================================================
       MOUSE GLOW EFFECT
    ===================================================== */

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener(
            'mousemove',
            handleMouseMove
        );

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );
        };
    }, []);

    /* =====================================================
       FORM
    ===================================================== */

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                flex
                items-center
                justify-center
                p-6
                bg-[#070B18]
            "
        >
            {/* =====================================================
                INTERACTIVE CURSOR GLOW
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-0
                    transition-all
                    duration-300
                "
                style={{
                    background: `
                        radial-gradient(
                            600px circle at ${mousePosition.x}px ${mousePosition.y}px,
                            rgba(124,92,252,0.14),
                            transparent 40%
                        )
                    `,
                }}
            />

            {/* =====================================================
                PREMIUM CINEMATIC BACKGROUND
            ===================================================== */}

            <div className="absolute inset-0 overflow-hidden">

                {/* BASE BACKGROUND */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,92,252,0.18),transparent_35%),linear-gradient(to_bottom,#070B18,#0A0D1F,#070B18)]" />

                {/* FLOATING PURPLE */}
                <div className="absolute top-[-10%] left-[-10%] w-[520px] h-[520px] rounded-full bg-purple-500/20 blur-3xl animate-floatUltra animate-glowBreathing" />

                {/* FLOATING BLUE */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[520px] h-[520px] rounded-full bg-blue-500/20 blur-3xl animate-backgroundPulse" />

                {/* FLOATING PINK */}
                <div className="absolute top-[35%] left-[40%] w-[420px] h-[420px] rounded-full bg-pink-500/10 blur-3xl animate-floatUltra" />

                {/* GRID */}
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />

                {/* SCREEN REVEAL */}
                <div className="absolute inset-0 z-[1] bg-[#070B18] animate-screenReveal" />

                {/* LIGHT SWEEP */}
                <div className="absolute top-0 left-[-30%] w-[40%] h-full rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl animate-lightSweep" />
            </div>

            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    animate-cinematicFade
                    premium-hover
                    max-w-[1550px]
                    min-h-[880px]
                    grid
                    group
                    animate-floatingCard
                    bg-white/[0.05]
                    lg:grid-cols-2
                    overflow-hidden
                    rounded-3xl
                    border
                    border-white/10
                    bg-[#0E0F1A]/90
                    backdrop-blur-2xl
                    transition-all
                    duration-500
                    hover:border-purple-400/20
                    hover:shadow-[0_25px_120px_rgba(124,92,252,0.18)]
                "
            >

                {/* =====================================================
                    LEFT SIDE
                ===================================================== */}

                <div className="relative hidden lg:block overflow-hidden bg-[#090B16]">

                    {/* BACKGROUND FX */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(124,92,252,0.18),transparent_35%),radial-gradient(circle_at_70%_20%,rgba(255,0,150,0.12),transparent_25%),radial-gradient(circle_at_50%_60%,rgba(0,100,255,0.08),transparent_35%)]" />

                    {/* FLOATING SHAPE */}
                    <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#7C5CFC]/30 via-[#1B1D3C] to-transparent blur-2xl animate-pulse" />

                    {/* GLASS OBJECT */}
                    <div
                        className="
                            absolute
                            top-40
                            left-1/2
                            -translate-x-1/2
                            w-[420px]
                            h-[260px]
                            rounded-[100px]
                            rotate-[-15deg]
                            bg-gradient-to-r
                            from-[#1D223A]
                            via-[#2A2E4E]
                            to-[#131523]
                            shadow-[0_20px_60px_rgba(124,92,252,0.25)]
                            transition-all
                            duration-700
                            hover:scale-105
                            hover:rotate-[-10deg]
                        "
                    />

                    {/* LIGHT STREAK */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[1200px] rotate-12 bg-gradient-to-b from-transparent via-white/[0.04] to-transparent animate-[spin_18s_linear_infinite]" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-between h-full p-16">

                        {/* TITLE */}
                        <div>
                            <h1
                                className="
                                    text-5xl
                                    font-bold
                                    text-white
                                    mb-6
                                    transition-all
                                    duration-500
                                    hover:tracking-[0.08em]
                                "
                            >
                                AttendIQ
                            </h1>

                            <p className="max-w-lg text-2xl leading-relaxed text-gray-300">
                                Enterprise-grade attendance
                                tracking and workforce
                                management for
                                high-performance
                                organizations.
                            </p>
                        </div>

                        {/* UPTIME CARD */}
                        <div
                            className="
                                group
                                mb-6
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/[0.05]
                                p-8
                                backdrop-blur-2xl
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:scale-[1.03]
                                hover:border-purple-400/40
                                hover:bg-white/[0.07]
                                hover:shadow-[0_0_60px_rgba(124,92,252,0.28)]
                            "
                        >
                            <div className="flex items-center gap-6">
                                <div
                                    className="
                                        flex
                                        h-20
                                        w-20
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-[#7C5CFC]/20
                                        transition-all
                                        duration-500
                                        group-hover:scale-110
                                        group-hover:rotate-6
                                        group-hover:shadow-[0_0_30px_rgba(124,92,252,0.35)]
                                    "
                                >
                                    <Gauge className="h-10 w-10 text-[#C4B2FF]" />
                                </div>

                                <div>
                                    <h2 className="text-7xl font-bold leading-none text-[#C8B5FF] transition-all duration-500 group-hover:scale-105">
                                        99.9%
                                    </h2>

                                    <p className="mt-2 text-sm uppercase tracking-[0.35em] text-gray-400">
                                        Platform Uptime
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SECURITY CARD */}
                        <div
                            className="
                                group
                                rounded-3xl
                                border
                                border-white/10
                                bg-white/[0.04]
                                p-8
                                backdrop-blur-2xl
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:scale-[1.03]
                                hover:border-purple-400/30
                                hover:bg-white/[0.06]
                                hover:shadow-[0_0_50px_rgba(124,92,252,0.20)]
                            "
                        >
                            <div className="flex items-start gap-4">
                                <div
                                    className="
                                        flex
                                        h-14
                                        w-14
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-yellow-500/10
                                        transition-all
                                        duration-500
                                        group-hover:scale-110
                                        group-hover:rotate-6
                                    "
                                >
                                    <ShieldCheck className="h-7 w-7 text-yellow-400" />
                                </div>

                                <div>
                                    <h3 className="mb-3 text-2xl font-semibold text-white">
                                        SOC2 Type II Certified
                                    </h3>

                                    <p className="text-lg leading-relaxed text-gray-400">
                                        Our security
                                        infrastructure is built
                                        to protect the most
                                        sensitive organizational
                                        data with end-to-end
                                        encryption.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =====================================================
                    RIGHT SIDE
                ===================================================== */}

                <div className="relative flex items-center justify-center overflow-hidden bg-[#181821] px-8 py-14">

                    {/* GLOW */}
                    <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />

                    {/* LOGIN CARD */}
                    <div
                        className="
                            relative
                            z-10
                            w-full
                            max-w-[560px]
                            rounded-3xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            p-12
                            backdrop-blur-xl
                            transition-all
                            duration-500
                            hover:border-purple-400/30
                            hover:bg-white/[0.04]
                            hover:shadow-[0_0_70px_rgba(124,92,252,0.18)]
                        "
                    >
                        {/* STATUS */}
                        {status && (
                            <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
                                {status}
                            </div>
                        )}

                        {/* HEADER */}
                        <div className="mb-10">
                            <h2 className="mb-3 text-5xl font-bold text-white">
                                Welcome back
                            </h2>

                            <p className="text-lg text-gray-400">
                                Please enter your details
                                to sign in.
                            </p>
                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={submit}
                            className="space-y-7"
                        >
                            {/* EMAIL */}
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-300">
                                    Email Address
                                </label>

                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-all duration-300 group-focus-within:text-[#A98BF8]" />

                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData(
                                                'email',
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="name@company.com"
                                        autoComplete="username"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-white/[0.03]
                                            py-4
                                            pl-12
                                            pr-4
                                            text-white
                                            placeholder-gray-500
                                            transition-all
                                            duration-300
                                            hover:border-purple-400/20
                                            focus:border-[#A98BF8]
                                            focus:outline-none
                                            focus:shadow-[0_0_25px_rgba(169,139,248,0.18)]
                                        "
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="block text-sm font-medium text-gray-300">
                                        Password
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route(
                                                'password.request'
                                            )}
                                            className="text-sm text-[#C8B5FF] transition hover:text-white"
                                        >
                                            Forgot
                                            password?
                                        </Link>
                                    )}
                                </div>

                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-all duration-300 group-focus-within:text-[#A98BF8]" />

                                    <input
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={
                                            data.password
                                        }
                                        onChange={(e) =>
                                            setData(
                                                'password',
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-white/[0.03]
                                            py-4
                                            pl-12
                                            pr-14
                                            text-white
                                            placeholder-gray-500
                                            transition-all
                                            duration-300
                                            hover:border-purple-400/20
                                            focus:border-[#A98BF8]
                                            focus:outline-none
                                            focus:shadow-[0_0_25px_rgba(169,139,248,0.18)]
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-white"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>

                                {errors.password && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {
                                            errors.password
                                        }
                                    </p>
                                )}
                            </div>

                            {/* REMEMBER */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={
                                        data.remember
                                    }
                                    onChange={(e) =>
                                        setData(
                                            'remember',
                                            e.target
                                                .checked
                                        )
                                    }
                                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#A98BF8]"
                                />

                                <span className="text-sm text-gray-400">
                                    Remember me for 30
                                    days
                                </span>
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="
                                    group
                                    relative
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-xl
                                    bg-[#A98BF8]
                                    py-4
                                    text-lg
                                    font-semibold
                                    text-[#1A123B]
                                    transition-all
                                    duration-500
                                    hover:scale-[1.02]
                                    hover:shadow-[0_0_40px_rgba(169,139,248,0.55)]
                                    active:scale-[0.98]
                                    disabled:opacity-50
                                "
                            >
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                                <span className="relative z-10 flex items-center gap-2">
                                    {processing
                                        ? 'Signing in...'
                                        : 'Sign In'}

                                    {!processing && (
                                        <ArrowRight
                                            size={20}
                                        />
                                    )}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}