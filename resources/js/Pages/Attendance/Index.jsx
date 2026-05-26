// resources/js/Pages/Attendance/Index.jsx

import AppLayout from "@/Layouts/AppLayout";
import { useEffect, useRef, useState } from "react";
import {
    Html5Qrcode,
    Html5QrcodeSupportedFormats,
} from "html5-qrcode";

import {
    Clock3,
    LogIn,
    LogOut,
    MapPin,
    Wifi,
    SunMedium,
    Timer,
    ArrowRight,
    TriangleAlert,
    ShieldCheck,
    ScanLine,
    CheckCircle2,
    Sparkles,
} from "lucide-react";

/* =========================================================
   PAGE
========================================================= */

export default function Attendance() {

    const [time, setTime] = useState(new Date());

    const [scanResult, setScanResult] = useState(null);

    const [isScanning, setIsScanning] = useState(true);

    const scannerRef = useRef(null);

    /* =====================================================
       LIVE CLOCK
    ===================================================== */

    useEffect(() => {

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    /* =====================================================
       QR SCANNER
    ===================================================== */

    useEffect(() => {

    const html5QrCode = new Html5Qrcode("reader");

    scannerRef.current = html5QrCode;

    const startScanner = async () => {

        try {

            await html5QrCode.start(
                {
                    facingMode: "environment",
                },

                {
                    fps: 10,

                    qrbox: {
                        width: 250,
                        height: 250,
                    },

                    aspectRatio: 1,

                    /*
                    =====================================
                    SUPPORT QR + BARCODE
                    =====================================
                    */

                    formatsToSupport: [

                        // QR
                        Html5QrcodeSupportedFormats.QR_CODE,

                        // BARCODE
                        Html5QrcodeSupportedFormats.CODE_128,
                        Html5QrcodeSupportedFormats.CODE_39,
                        Html5QrcodeSupportedFormats.CODE_93,
                        Html5QrcodeSupportedFormats.CODABAR,

                        // PRODUCT BARCODE
                        Html5QrcodeSupportedFormats.EAN_13,
                        Html5QrcodeSupportedFormats.EAN_8,
                        Html5QrcodeSupportedFormats.UPC_A,
                        Html5QrcodeSupportedFormats.UPC_E,

                        // OTHERS
                        Html5QrcodeSupportedFormats.ITF,
                        Html5QrcodeSupportedFormats.DATA_MATRIX,
                        Html5QrcodeSupportedFormats.PDF_417,
                    ],
                },

                async (decodedText, decodedResult) => {

                    console.log(decodedResult);

                    setScanResult(decodedText);

                    setIsScanning(false);

                    await html5QrCode.stop();

                    /*
                    =====================================
                    AUTO REDIRECT
                    =====================================
                    */

                    setTimeout(() => {
                        window.location.href =
                            `/check-in-check-out/${decodedText}`;
                    }, 1800);
                },

                () => {}
            );

        } catch (err) {
            console.log(err);
        }
    };

    startScanner();

    return () => {

        if (
            scannerRef.current &&
            scannerRef.current.isScanning
        ) {

            scannerRef.current
                .stop()
                .catch(() => {});
        }
    };

}, []);

    /* =====================================================
       ACTIVITY DATA
    ===================================================== */

    const activities = [
        {
            icon: <LogOut size={20} />,
            title: "Check Out",
            subtitle: "Central Park West Office - Gate 04",
            time: "18:02",
            date: "Yesterday",
            color: "purple",
        },

        {
            icon: <LogIn size={20} />,
            title: "Check In",
            subtitle: "Remote - VPN Verified",
            time: "08:55",
            date: "Yesterday",
            color: "emerald",
        },

        {
            icon: <TriangleAlert size={20} />,
            title: "Late Check In",
            subtitle: "Traffic Delay Noted",
            time: "09:15",
            date: "Oct 22",
            color: "red",
        },
    ];

    return (
        <AppLayout>

            <div className="space-y-8">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                    <div>

                        <h1
                            className="
                                text-5xl
                                font-black
                                tracking-tight
                                bg-gradient-to-r
                                from-purple-200
                                via-purple-400
                                to-purple-300
                                bg-clip-text
                                text-transparent
                            "
                        >
                            Attendance
                        </h1>

                        <p className="text-gray-400 mt-3 text-lg">
                            Smart attendance tracking & workforce monitoring.
                        </p>

                    </div>

                    <div
                        className="
                            hidden md:flex
                            items-center gap-3
                            px-5 py-3
                            rounded-2xl
                            bg-emerald-500/10
                            border border-emerald-500/20
                            backdrop-blur-xl
                            transition-all duration-500
                            hover:scale-105
                            hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]
                        "
                    >

                        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

                        <span className="text-sm text-emerald-300 font-medium">
                            System Active
                        </span>

                    </div>
                </div>

                {/* =================================================
                    HERO SECTION
                ================================================= */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-7">

                    {/* =================================================
                        LEFT CARD
                    ================================================= */}

                    <div
                        className="
                            xl:col-span-2
                            relative
                            overflow-hidden
                            rounded-[36px]
                            border border-white/5
                            bg-[#13131F]
                            p-10
                            transition-all duration-700
                            hover:border-purple-500/20
                            hover:-translate-y-1
                            hover:shadow-[0_25px_80px_rgba(168,85,247,0.15)]
                        "
                    >

                        {/* GLOW */}
                        <div
                            className="
                                absolute
                                top-[-150px]
                                left-1/2
                                -translate-x-1/2
                                w-[500px]
                                h-[500px]
                                rounded-full
                                bg-purple-500/10
                                blur-[140px]
                                pointer-events-none
                            "
                        />

                        <div className="relative z-10">

                            {/* LABEL */}
                            <p className="uppercase text-xs tracking-[0.4em] text-purple-200 font-semibold">
                                Current Local Time
                            </p>

                            {/* TIME */}
                            <h1 className="text-[120px] leading-none font-black mt-4 tracking-tight">
                                {time.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </h1>

                            {/* DATE */}
                            <p className="text-2xl text-gray-400 mt-5">
                                {time.toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>

                            {/* BUTTONS */}
                            <div className="flex flex-col md:flex-row gap-5 mt-12">

                                {/* CHECK IN */}
                                <button
                                    className="
                                        group
                                        flex items-center justify-center gap-3
                                        px-10 py-5
                                        rounded-3xl
                                        bg-gradient-to-r
                                        from-[#8B5CF6]
                                        to-[#C4B5FD]
                                        text-black
                                        text-lg
                                        font-bold
                                        transition-all duration-500
                                        hover:scale-[1.03]
                                        hover:-translate-y-1
                                        hover:shadow-[0_25px_60px_rgba(139,92,246,0.45)]
                                        active:scale-[0.98]
                                    "
                                >

                                    <LogIn
                                        size={24}
                                        className="
                                            transition-transform duration-500
                                            group-hover:-translate-x-1
                                        "
                                    />

                                    Check In

                                </button>

                                {/* CHECK OUT */}
                                <button
                                    className="
                                        group
                                        flex items-center justify-center gap-3
                                        px-10 py-5
                                        rounded-3xl
                                        bg-white/[0.03]
                                        border border-white/10
                                        text-white
                                        text-lg
                                        font-bold
                                        transition-all duration-500
                                        hover:bg-white/[0.06]
                                        hover:scale-[1.03]
                                        hover:-translate-y-1
                                        hover:border-white/20
                                        hover:shadow-[0_25px_60px_rgba(255,255,255,0.08)]
                                        active:scale-[0.98]
                                    "
                                >

                                    <LogOut
                                        size={24}
                                        className="
                                            transition-transform duration-500
                                            group-hover:translate-x-1
                                        "
                                    />

                                    Check Out

                                </button>

                            </div>

                            {/* MINI INFO */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-12">

                                <MiniInfoCard
                                    icon={<MapPin size={20} />}
                                    title="GEOLOCATION"
                                    value="HQ - Office A"
                                    color="emerald"
                                />

                                <MiniInfoCard
                                    icon={<Wifi size={20} />}
                                    title="CONNECTION"
                                    value="Secure Wi-Fi"
                                    color="cyan"
                                />

                                <MiniInfoCard
                                    icon={<SunMedium size={20} />}
                                    title="SHIFT"
                                    value="Morning (09-18)"
                                    color="yellow"
                                />

                                <MiniInfoCard
                                    icon={<Timer size={20} />}
                                    title="WORKED TODAY"
                                    value="0h 42m"
                                    color="purple"
                                />

                            </div>
                        </div>
                    </div>

                    {/* =================================================
                        QR CARD
                    ================================================= */}

                    <div
                        className="
                            group
                            relative
                            overflow-hidden
                            rounded-[36px]
                            border border-white/5
                            bg-[#13131F]
                            p-7
                            transition-all duration-700
                            hover:border-purple-500/20
                            hover:-translate-y-1
                            hover:shadow-[0_25px_80px_rgba(168,85,247,0.18)]
                        "
                    >

                        {/* BACKGROUND GLOW */}
                        <div
                            className="
                                absolute
                                inset-0
                                bg-gradient-to-b
                                from-purple-500/[0.03]
                                to-transparent
                                pointer-events-none
                            "
                        />

                        {/* SCAN HEADER */}
                        <div className="flex items-center justify-between mb-6 relative z-10">

                            <div>
                                <p className="text-xs tracking-[0.3em] text-purple-300 uppercase">
                                    Smart Scanner
                                </p>

                                <h3 className="text-2xl font-black mt-2">
                                     QR & Barcode Verification
                                </h3>
                            </div>

                            <div
                                className="
                                    w-14 h-14
                                    rounded-2xl
                                    bg-purple-500/10
                                    border border-purple-500/20
                                    flex items-center justify-center
                                    text-purple-300
                                    transition-all duration-500
                                    group-hover:rotate-12
                                    group-hover:scale-110
                                "
                            >
                                <ScanLine size={26} />
                            </div>
                        </div>

                        {/* SCANNER */}
                        <div
                            className="
                                relative
                                overflow-hidden
                                rounded-[28px]
                                border border-white/5
                                bg-[#0F0F18]
                                p-4
                                transition-all duration-500
                                hover:border-purple-500/20
                            "
                        >

                            {/* SCAN EFFECT */}
                            {isScanning && (
                                <div
                                    className="
                                        absolute
                                        left-0
                                        right-0
                                        top-0
                                        h-1
                                        bg-gradient-to-r
                                        from-transparent
                                        via-purple-400
                                        to-transparent
                                        animate-pulse
                                        z-20
                                    "
                                />
                            )}

                            <div
                                id="reader"
                                className="
                                    rounded-2xl
                                    overflow-hidden
                                "
                            />

                        </div>

                        {/* RESULT */}
                        <div className="mt-8 text-center relative z-10">

                            {!scanResult ? (

                                <>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        Scan employee QR code or barcode to verify attendance identity.
                                    </p>

                                    {/* ANALYSIS STATUS */}
                                    <div
                                        className="
                                            mt-8
                                            rounded-3xl
                                            border border-white/5
                                            bg-white/[0.03]
                                            p-5
                                            text-left
                                            transition-all duration-500
                                            hover:bg-white/[0.05]
                                        "
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="relative">

                                                <div className="w-3 h-3 rounded-full bg-purple-400 animate-ping absolute" />

                                                <div className="w-3 h-3 rounded-full bg-purple-400 relative" />

                                            </div>

                                            <span className="text-purple-300 font-semibold">
                                                AI Scanner Analysis
                                            </span>

                                        </div>

                                        <div className="mt-5 space-y-3 text-sm">

                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400">
                                                    Camera Detection
                                                </span>

                                                <span className="text-emerald-300">
                                                    Active
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400">
                                                    QR Recognition
                                                </span>

                                                <span className="text-yellow-300">
                                                    Waiting
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-400">
                                                    Security Validation
                                                </span>

                                                <span className="text-cyan-300">
                                                    Ready
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </>

                            ) : (

                                <div
                                    className="
                                        rounded-3xl
                                        border border-emerald-500/20
                                        bg-emerald-500/10
                                        p-6
                                        animate-pulse
                                        shadow-[0_0_40px_rgba(16,185,129,0.15)]
                                    "
                                >

                                    <div className="flex items-center justify-center gap-3">

                                        <CheckCircle2
                                            size={30}
                                            className="text-emerald-300"
                                        />

                                        <h3 className="text-2xl font-bold text-emerald-300">
                                            QR Detected
                                        </h3>

                                    </div>

                                    <p className="text-emerald-200 mt-5 break-all">
                                        Employee ID: {scanResult}
                                    </p>

                                    <div
                                        className="
                                            mt-6
                                            rounded-2xl
                                            bg-black/20
                                            border border-white/10
                                            p-4
                                        "
                                    >

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-gray-300">
                                                Identity Match
                                            </span>

                                            <span className="text-emerald-300">
                                                99.8%
                                            </span>

                                        </div>

                                        <div className="w-full h-2 rounded-full bg-white/10 mt-3 overflow-hidden">

                                            <div
                                                className="
                                                    h-full
                                                    w-[99%]
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    from-emerald-400
                                                    to-green-300
                                                "
                                            />

                                        </div>
                                    </div>

                                    <div
                                        className="
                                            mt-6
                                            flex items-center justify-center gap-2
                                            text-black
                                            bg-emerald-400
                                            py-4
                                            rounded-2xl
                                            font-bold
                                        "
                                    >

                                        <Sparkles size={18} />

                                        Redirecting To Attendance...

                                    </div>

                                </div>

                            )}
                        </div>
                    </div>
                </div>

                {/* =================================================
                    RECENT ACTIVITY
                ================================================= */}

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[36px]
                        border border-white/5
                        bg-[#13131F]
                        p-8
                        transition-all duration-500
                        hover:border-purple-500/20
                        hover:shadow-[0_25px_80px_rgba(168,85,247,0.08)]
                    "
                >

                    {/* GLOW */}
                    <div
                        className="
                            absolute
                            bottom-[-150px]
                            right-[-150px]
                            w-[400px]
                            h-[400px]
                            rounded-full
                            bg-purple-500/10
                            blur-[140px]
                        "
                    />

                    <div className="relative z-10">

                        {/* HEADER */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                            <div>

                                <h2 className="text-5xl font-black tracking-tight">
                                    Recent Activity
                                </h2>

                                <p className="text-gray-400 text-lg mt-2">
                                    Your log history for the last 48 hours
                                </p>

                            </div>

                            <button
                                className="
                                    inline-flex items-center gap-2
                                    text-xl
                                    font-semibold
                                    text-purple-300
                                    transition-all duration-300
                                    hover:gap-3
                                "
                            >
                                View full history

                                <ArrowRight size={22} />
                            </button>
                        </div>

                        {/* LIST */}
                        <div className="mt-12 space-y-8">

                            {activities.map((activity, index) => (
                                <ActivityItem
                                    key={index}
                                    activity={activity}
                                />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

/* =========================================================
   MINI INFO CARD
========================================================= */

function MiniInfoCard({
    icon,
    title,
    value,
    color,
}) {

    const colors = {
        emerald:
            "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

        cyan:
            "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",

        yellow:
            "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",

        purple:
            "bg-purple-500/10 text-purple-300 border-purple-500/20",
    };

    return (
        <div
            className="
                group
                rounded-[28px]
                border border-white/5
                bg-white/[0.03]
                p-5
                transition-all duration-500
                hover:bg-white/[0.05]
                hover:-translate-y-1
                hover:border-purple-500/20
                hover:shadow-[0_15px_40px_rgba(168,85,247,0.10)]
            "
        >

            <div
                className={`
                    w-12 h-12
                    rounded-2xl
                    border
                    flex items-center justify-center
                    transition-all duration-500
                    group-hover:scale-110
                    group-hover:rotate-6
                    ${colors[color]}
                `}
            >
                {icon}
            </div>

            <p className="text-xs tracking-[0.25em] text-gray-500 mt-5">
                {title}
            </p>

            <h3 className="text-xl font-bold mt-2">
                {value}
            </h3>
        </div>
    );
}

/* =========================================================
   ACTIVITY ITEM
========================================================= */

function ActivityItem({ activity }) {

    const styles = {
        purple:
            "bg-purple-500/10 text-purple-300 border-purple-500/20",

        emerald:
            "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",

        red:
            "bg-red-500/10 text-red-300 border-red-500/20",
    };

    return (
        <div
            className="
                group
                flex items-center justify-between
                gap-6
                rounded-[28px]
                border border-white/5
                bg-white/[0.02]
                p-6
                transition-all duration-500
                hover:bg-white/[0.04]
                hover:border-purple-500/10
                hover:translate-x-1
                hover:shadow-[0_15px_40px_rgba(168,85,247,0.08)]
            "
        >

            {/* LEFT */}
            <div className="flex items-center gap-5">

                <div
                    className={`
                        w-16 h-16
                        rounded-2xl
                        border
                        flex items-center justify-center
                        transition-all duration-500
                        group-hover:scale-110
                        group-hover:rotate-6
                        ${styles[activity.color]}
                    `}
                >
                    {activity.icon}
                </div>

                <div>

                    <h3 className="text-2xl font-bold">
                        {activity.title}
                    </h3>

                    <p className="text-gray-400 text-lg mt-1">
                        {activity.subtitle}
                    </p>

                </div>
            </div>

            {/* RIGHT */}
            <div className="text-right">

                <h4 className="text-3xl font-black">
                    {activity.time}
                </h4>

                <p className="text-gray-400 text-lg mt-1">
                    {activity.date}
                </p>

            </div>
        </div>
    );
}