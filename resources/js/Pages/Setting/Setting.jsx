// resources/js/Pages/Settings/Index.jsx
import { useState, useRef } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import {
    User, Settings2, Bell, ShieldCheck, CreditCard,
    MapPin, Fingerprint, Clock, RefreshCw, Eye, EyeOff,
    Plus, Zap, CheckCircle2, AlertCircle, Copy, Check,
    ChevronRight, Building2, Mail, FileText, Save,
    Wifi, WifiOff, Key, Timer, Users, LogIn,
} from "lucide-react";

// ── Design tokens ────────────────────────────────────────────────────────────
// Semua warna & spacing terpusat di sini
const C = {
    bg:         "#0B0B14",
    surface:    "#111120",
    surfaceAlt: "#16162A",
    border:     "rgba(255,255,255,0.07)",
    borderHover:"rgba(139,92,246,0.4)",
    purple:     "#8B5CF6",
    purpleLight:"#A78BFA",
    purpleDim:  "rgba(139,92,246,0.15)",
    text:       "#F1F0FF",
    muted:      "#6B6B8A",
    success:    "#10B981",
    warning:    "#F59E0B",
    danger:     "#EF4444",
};

// ── Reusable primitives ───────────────────────────────────────────────────────

function Toggle({ checked, onChange, disabled = false }) {
    return (
        <button
            type="button"
            onClick={() => !disabled && onChange(!checked)}
            disabled={disabled}
            className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-all duration-300 focus:outline-none"
            style={{
                background: checked
                    ? "linear-gradient(135deg, #7C3AED, #8B5CF6)"
                    : "rgba(255,255,255,0.08)",
                boxShadow: checked ? "0 0 16px rgba(139,92,246,0.45)" : "none",
                border: `1px solid ${checked ? "#8B5CF6" : "rgba(255,255,255,0.12)"}`,
            }}
        >
            <span
                className="inline-block h-4 w-4 rounded-full transition-all duration-300 shadow-md"
                style={{
                    background: checked ? "#fff" : "rgba(255,255,255,0.45)",
                    transform: `translateX(${checked ? "22px" : "2px"}) translateY(0)`,
                    marginTop: "3px",
                }}
            />
        </button>
    );
}

function FieldInput({ label, icon: Icon, error, className = "", hint, ...props }) {
    return (
        <div className={`group space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-xs font-semibold uppercase tracking-widest"
                    style={{ color: C.muted }}>
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <Icon
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200"
                        style={{ color: C.muted }}
                    />
                )}
                <input
                    className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-200"
                    style={{
                        paddingLeft: Icon ? "2.5rem" : "1rem",
                        background: C.surfaceAlt,
                        border: `1px solid ${error ? C.danger : C.border}`,
                        color: C.text,
                    }}
                    onFocus={e => {
                        e.target.style.border = `1px solid ${C.purple}`;
                        e.target.style.boxShadow = `0 0 0 3px ${C.purpleDim}`;
                    }}
                    onBlur={e => {
                        e.target.style.border = `1px solid ${error ? C.danger : C.border}`;
                        e.target.style.boxShadow = "none";
                    }}
                    {...props}
                />
            </div>
            {hint && <p className="text-xs" style={{ color: C.muted }}>{hint}</p>}
            {error && <p className="text-xs" style={{ color: C.danger }}>{error}</p>}
        </div>
    );
}

function FieldTextarea({ label, error, className = "", hint, ...props }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label className="block text-xs font-semibold uppercase tracking-widest"
                    style={{ color: C.muted }}>
                    {label}
                </label>
            )}
            <textarea
                rows={4}
                className="w-full rounded-xl px-4 py-3 text-sm font-medium outline-none resize-none transition-all duration-200"
                style={{
                    background: C.surfaceAlt,
                    border: `1px solid ${error ? C.danger : C.border}`,
                    color: C.text,
                }}
                onFocus={e => {
                    e.target.style.border = `1px solid ${C.purple}`;
                    e.target.style.boxShadow = `0 0 0 3px ${C.purpleDim}`;
                }}
                onBlur={e => {
                    e.target.style.border = `1px solid ${error ? C.danger : C.border}`;
                    e.target.style.boxShadow = "none";
                }}
                {...props}
            />
            {hint && <p className="text-xs" style={{ color: C.muted }}>{hint}</p>}
            {error && <p className="text-xs" style={{ color: C.danger }}>{error}</p>}
        </div>
    );
}

function SaveButton({ processing, dirty, label = "Save All Changes" }) {
    return (
        <button
            type="submit"
            disabled={processing}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 disabled:opacity-60"
            style={{
                background: dirty
                    ? "linear-gradient(135deg, #7C3AED, #8B5CF6)"
                    : "rgba(139,92,246,0.15)",
                color: dirty ? "#fff" : C.purpleLight,
                border: `1px solid ${dirty ? "transparent" : "rgba(139,92,246,0.25)"}`,
                boxShadow: dirty ? "0 8px 32px rgba(139,92,246,0.35)" : "none",
            }}
            onMouseEnter={e => {
                if (!processing) e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
            }}
        >
            {processing ? (
                <RefreshCw size={15} className="animate-spin" />
            ) : (
                <Save size={15} />
            )}
            {processing ? "Menyimpan..." : label}
            {dirty && !processing && (
                <span className="ml-1 px-2 py-0.5 rounded-md text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    Unsaved changes
                </span>
            )}
        </button>
    );
}

function SectionCard({ children, className = "" }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className={`rounded-2xl p-7 transition-all duration-300 ${className}`}
            style={{
                background: C.surface,
                border: `1px solid ${hovered ? "rgba(139,92,246,0.2)" : C.border}`,
                boxShadow: hovered ? "0 8px 40px rgba(139,92,246,0.08)" : "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {children}
        </div>
    );
}

function SectionTitle({ title, subtitle }) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold" style={{ color: C.text }}>{title}</h2>
            <p className="text-sm mt-0.5" style={{ color: C.muted }}>{subtitle}</p>
        </div>
    );
}

function ToggleRow({ icon: Icon, title, sub, checked, onChange }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className="flex items-center justify-between rounded-xl px-4 py-4 transition-all duration-200 cursor-pointer"
            style={{
                background: hovered ? "rgba(139,92,246,0.05)" : "transparent",
                border: `1px solid ${hovered ? "rgba(139,92,246,0.15)" : "transparent"}`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onChange(!checked)}
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                        background: hovered ? C.purpleDim : "rgba(255,255,255,0.04)",
                        color: hovered ? C.purpleLight : C.muted,
                    }}>
                    <Icon size={18} />
                </div>
                <div>
                    <p className="text-sm font-semibold" style={{ color: C.text }}>{title}</p>
                    <p className="text-xs mt-0.5" style={{ color: C.muted }}>{sub}</p>
                </div>
            </div>
            <Toggle checked={checked} onChange={onChange} />
        </div>
    );
}

// ── NAV TABS ─────────────────────────────────────────────────────────────────

const TABS = [
    { id: "general",       label: "General Profile",  icon: User },
    { id: "system",        label: "System Config",    icon: Settings2 },
    { id: "notifications", label: "Notifications",    icon: Bell },
    { id: "security",      label: "Security & 2FA",   icon: ShieldCheck },
    { id: "billing",       label: "Billing & Plan",   icon: CreditCard },
];

function NavTabs({ active, onChange }) {
    return (
        <nav className="space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => {
                const isActive = active === id;
                return (
                    <button
                        key={id}
                        onClick={() => onChange(id)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group"
                        style={{
                            background: isActive ? C.purpleDim : "transparent",
                            color: isActive ? C.purpleLight : C.muted,
                            border: `1px solid ${isActive ? "rgba(139,92,246,0.3)" : "transparent"}`,
                        }}
                        onMouseEnter={e => {
                            if (!isActive) {
                                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                                e.currentTarget.style.color = C.text;
                            }
                        }}
                        onMouseLeave={e => {
                            if (!isActive) {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = C.muted;
                            }
                        }}
                    >
                        <Icon size={17} />
                        {label}
                        {isActive && (
                            <ChevronRight size={14} className="ml-auto opacity-60" />
                        )}
                    </button>
                );
            })}
        </nav>
    );
}

// ── SECTION: General Profile ──────────────────────────────────────────────────

function GeneralSection({ settings }) {
    const { data, setData, post, processing, errors, isDirty } = useForm({
        company_name:  settings.company_name,
        support_email: settings.support_email,
        bio:           settings.bio,
    });

    return (
        <form onSubmit={e => { e.preventDefault(); post(route("settings.general")); }}
            className="space-y-5">

            {/* Org Profile Header */}
            <SectionCard>
                <div className="flex items-center gap-5 mb-7">
                    {/* Logo */}
                    <div className="relative group cursor-pointer">
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black transition-all duration-300 group-hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, #1e1e3a, #2d1f5e)",
                                border: `2px solid rgba(139,92,246,0.3)`,
                                color: C.purpleLight,
                                boxShadow: "0 8px 32px rgba(139,92,246,0.2)",
                            }}
                        >
                            🏢
                        </div>
                        <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ background: "rgba(0,0,0,0.6)" }}>
                            <span className="text-xs font-semibold text-white">Change</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold" style={{ color: C.text }}>
                            Organization Profile
                        </h3>
                        <p className="text-sm mt-1" style={{ color: C.muted }}>
                            Public identity of your corporate entity on AttendIQ.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FieldInput
                        label="Company Name"
                        icon={Building2}
                        value={data.company_name}
                        onChange={e => setData("company_name", e.target.value)}
                        error={errors.company_name}
                        placeholder="e.g. AttendIQ Enterprise Solutions"
                    />
                    <FieldInput
                        label="Support Email"
                        icon={Mail}
                        type="email"
                        value={data.support_email}
                        onChange={e => setData("support_email", e.target.value)}
                        error={errors.support_email}
                        placeholder="admin@company.com"
                    />
                    <FieldTextarea
                        label="Bio / Description"
                        value={data.bio}
                        onChange={e => setData("bio", e.target.value)}
                        error={errors.bio}
                        placeholder="Describe your organization..."
                        className="md:col-span-2"
                    />
                </div>
            </SectionCard>

            <div className="flex justify-end">
                <SaveButton processing={processing} dirty={isDirty} />
            </div>
        </form>
    );
}

// ── SECTION: System Config ────────────────────────────────────────────────────

function SystemSection({ settings }) {
    const { data, setData, post, processing, errors, isDirty } = useForm({ ...settings });
    const [sliderHover, setSliderHover] = useState(false);

    return (
        <form onSubmit={e => { e.preventDefault(); post(route("settings.system")); }}
            className="space-y-5">

            <SectionCard>
                <SectionTitle
                    title="System Configuration"
                    subtitle="Define core attendance parameters and logic."
                />

                {/* Grace Period + Work Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                    {/* Grace Period Slider */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold" style={{ color: C.text }}>
                                    Grace Period
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: C.muted }}>
                                    Threshold before marked as "Late"
                                </p>
                            </div>
                            <span
                                className="px-3 py-1.5 rounded-lg text-xs font-black tracking-wide"
                                style={{
                                    background: C.purpleDim,
                                    color: C.purpleLight,
                                    border: `1px solid rgba(139,92,246,0.3)`,
                                }}
                            >
                                {data.grace_period} MIN
                            </span>
                        </div>

                        <div className="space-y-1"
                            onMouseEnter={() => setSliderHover(true)}
                            onMouseLeave={() => setSliderHover(false)}>
                            <style>{`
                                .grace-slider::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    width: 20px; height: 20px;
                                    border-radius: 50%;
                                    background: linear-gradient(135deg, #7C3AED, #8B5CF6);
                                    cursor: pointer;
                                    box-shadow: 0 0 12px rgba(139,92,246,0.6);
                                    border: 2px solid rgba(255,255,255,0.3);
                                    transition: transform 0.15s;
                                }
                                .grace-slider::-webkit-slider-thumb:hover {
                                    transform: scale(1.2);
                                }
                                .grace-slider::-webkit-slider-runnable-track {
                                    height: 6px;
                                    border-radius: 99px;
                                    background: rgba(255,255,255,0.08);
                                }
                            `}</style>
                            <input
                                type="range"
                                min={0} max={60} step={5}
                                value={data.grace_period}
                                onChange={e => setData("grace_period", +e.target.value)}
                                className="grace-slider w-full h-6 cursor-pointer"
                                style={{
                                    appearance: "none",
                                    background: `linear-gradient(to right, #8B5CF6 ${(data.grace_period / 60) * 100}%, rgba(255,255,255,0.08) 0%)`,
                                    borderRadius: "99px",
                                    height: "6px",
                                    outline: "none",
                                }}
                            />
                            <div className="flex justify-between text-xs" style={{ color: C.muted }}>
                                <span>0 MIN</span>
                                <span>60 MIN</span>
                            </div>
                        </div>
                    </div>

                    {/* Core Work Hours */}
                    <div className="space-y-4">
                        <p className="text-sm font-bold" style={{ color: C.text }}>
                            Core Work Hours
                        </p>
                        <div className="flex items-center gap-3">
                            <FieldInput
                                type="time"
                                value={data.work_start}
                                onChange={e => setData("work_start", e.target.value)}
                                className="flex-1"
                            />
                            <span className="text-sm font-semibold shrink-0" style={{ color: C.muted }}>to</span>
                            <FieldInput
                                type="time"
                                value={data.work_end}
                                onChange={e => setData("work_end", e.target.value)}
                                className="flex-1"
                            />
                        </div>
                        <p className="text-xs" style={{ color: C.muted }}>
                            Check-ins outside this window may be flagged.
                        </p>
                    </div>
                </div>

                {/* Toggles */}
                <div className="space-y-2">
                    <ToggleRow
                        icon={MapPin}
                        title="Geofencing Validation"
                        sub="Require GPS check-in at office location"
                        checked={data.geofencing_enabled}
                        onChange={v => setData("geofencing_enabled", v)}
                    />

                    {data.geofencing_enabled && (
                        <div className="ml-4 pl-4 py-4 space-y-3 rounded-xl"
                            style={{ borderLeft: `2px solid rgba(139,92,246,0.3)`, background: C.purpleDim }}>
                            <div className="grid grid-cols-2 gap-3">
                                <FieldInput
                                    label="Office Latitude"
                                    type="number"
                                    step="any"
                                    value={data.office_latitude}
                                    onChange={e => setData("office_latitude", e.target.value)}
                                    placeholder="-6.2088"
                                />
                                <FieldInput
                                    label="Office Longitude"
                                    type="number"
                                    step="any"
                                    value={data.office_longitude}
                                    onChange={e => setData("office_longitude", e.target.value)}
                                    placeholder="106.8456"
                                />
                            </div>
                            <FieldInput
                                label="Radius (meters)"
                                type="number"
                                value={data.geofencing_radius}
                                onChange={e => setData("geofencing_radius", +e.target.value)}
                                hint="Recommended: 100–500m"
                            />
                        </div>
                    )}

                    <ToggleRow
                        icon={Fingerprint}
                        title="Biometric Verification"
                        sub="Enable facial recognition for high-security sites"
                        checked={data.biometric_enabled}
                        onChange={v => setData("biometric_enabled", v)}
                    />

                    <ToggleRow
                        icon={Clock}
                        title="Auto Checkout"
                        sub="Automatically check out employees at end of day"
                        checked={data.auto_checkout}
                        onChange={v => setData("auto_checkout", v)}
                    />

                    {data.auto_checkout && (
                        <div className="ml-4 pl-4 py-4 rounded-xl"
                            style={{ borderLeft: `2px solid rgba(139,92,246,0.3)`, background: C.purpleDim }}>
                            <FieldInput
                                label="Auto Checkout Time"
                                type="time"
                                value={data.auto_checkout_time}
                                onChange={e => setData("auto_checkout_time", e.target.value)}
                                className="max-w-xs"
                            />
                        </div>
                    )}
                </div>
            </SectionCard>

            <div className="flex justify-end">
                <SaveButton processing={processing} dirty={isDirty} />
            </div>
        </form>
    );
}

// ── SECTION: Notifications ────────────────────────────────────────────────────

function NotificationsSection({ settings }) {
    const { data, setData, post, processing, isDirty } = useForm({ ...settings });

    const events = [
        { key: "notify_late_checkin",   icon: Clock,        title: "Late Check-in Alert",     sub: "Notify when employee checks in late" },
        { key: "notify_absent",         icon: Users,        title: "Absence Notification",    sub: "Alert when employee doesn't check in" },
        { key: "notify_leave_request",  icon: FileText,     title: "Leave Request",           sub: "New leave request submitted" },
        { key: "notify_leave_approved", icon: CheckCircle2, title: "Leave Approved/Rejected", sub: "Leave decision notification" },
    ];

    const channels = [
        { key: "notify_via_email",      icon: Mail,  title: "Email Notifications",   sub: "Send alerts to support email" },
        { key: "notify_via_whatsapp",   icon: Zap,   title: "WhatsApp Notifications", sub: "Send via WhatsApp Business API" },
        { key: "notify_digest_daily",   icon: Timer, title: "Daily Digest",           sub: "Summary report every morning at 08:00" },
    ];

    return (
        <form onSubmit={e => { e.preventDefault(); post(route("settings.notifications")); }}
            className="space-y-5">

            <SectionCard>
                <SectionTitle title="Notification Events" subtitle="Choose which events trigger a notification." />
                <div className="space-y-2">
                    {events.map(ev => (
                        <ToggleRow
                            key={ev.key}
                            icon={ev.icon}
                            title={ev.title}
                            sub={ev.sub}
                            checked={data[ev.key]}
                            onChange={v => setData(ev.key, v)}
                        />
                    ))}
                </div>
            </SectionCard>

            <SectionCard>
                <SectionTitle title="Notification Channels" subtitle="How you want to receive notifications." />
                <div className="space-y-2">
                    {channels.map(ch => (
                        <ToggleRow
                            key={ch.key}
                            icon={ch.icon}
                            title={ch.title}
                            sub={ch.sub}
                            checked={data[ch.key]}
                            onChange={v => setData(ch.key, v)}
                        />
                    ))}
                </div>
            </SectionCard>

            <div className="flex justify-end">
                <SaveButton processing={processing} dirty={isDirty} />
            </div>
        </form>
    );
}

// ── SECTION: Security ─────────────────────────────────────────────────────────

function SecuritySection({ settings }) {
    const { data, setData, post, processing, errors, isDirty } = useForm({ ...settings });
    const [showKey, setShowKey]     = useState(false);
    const [copied, setCopied]       = useState(false);
    const [genLoading, setGenLoading] = useState(false);

    function copyKey() {
        navigator.clipboard.writeText(data.api_key ?? "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function generateKey(e) {
        e.preventDefault();
        setGenLoading(true);
        router.post(route("settings.api-key"), {}, {
            onFinish: () => setGenLoading(false),
        });
    }

    return (
        <form onSubmit={e => { e.preventDefault(); post(route("settings.security")); }}
            className="space-y-5">

            {/* 2FA */}
            <SectionCard>
                <SectionTitle title="Authentication" subtitle="Control how users authenticate into the system." />
                <div className="space-y-2">
                    <ToggleRow
                        icon={ShieldCheck}
                        title="Two-Factor Authentication (2FA)"
                        sub="Require OTP on every login for all admins"
                        checked={data.two_factor_enabled}
                        onChange={v => setData("two_factor_enabled", v)}
                    />
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                    <FieldInput
                        label="Session Timeout"
                        type="number"
                        value={data.session_timeout_minutes}
                        onChange={e => setData("session_timeout_minutes", +e.target.value)}
                        hint="Minutes of inactivity"
                        error={errors.session_timeout_minutes}
                        icon={Timer}
                    />
                    <FieldInput
                        label="Max Login Attempts"
                        type="number"
                        value={data.max_login_attempts}
                        onChange={e => setData("max_login_attempts", +e.target.value)}
                        hint="Before temporary lockout"
                        error={errors.max_login_attempts}
                        icon={LogIn}
                    />
                    <FieldInput
                        label="Password Expiry (days)"
                        type="number"
                        value={data.password_expiry_days}
                        onChange={e => setData("password_expiry_days", +e.target.value)}
                        hint="0 = never expires"
                        icon={Key}
                    />
                </div>

                <div className="mt-5">
                    <FieldInput
                        label="IP Whitelist"
                        value={data.ip_whitelist}
                        onChange={e => setData("ip_whitelist", e.target.value)}
                        placeholder="192.168.1.1, 10.0.0.0/24"
                        hint="Comma-separated. Leave empty to allow all."
                    />
                </div>
            </SectionCard>

            {/* API Keys */}
            <SectionCard>
                <div className="flex items-center justify-between mb-6">
                    <SectionTitle
                        title="API & Integrations"
                        subtitle="Connect AttendIQ to your existing tech stack."
                    />
                    <button
                        onClick={generateKey}
                        disabled={genLoading}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                        style={{
                            background: C.purpleDim,
                            color: C.purpleLight,
                            border: `1px solid rgba(139,92,246,0.3)`,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(139,92,246,0.25)"}
                        onMouseLeave={e => e.currentTarget.style.background = C.purpleDim}
                    >
                        {genLoading ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                        Generate Key
                    </button>
                </div>

                {/* Current API Key */}
                {data.api_key && (
                    <div className="mb-6 rounded-xl p-4"
                        style={{ background: C.surfaceAlt, border: `1px solid ${C.border}` }}>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-2"
                            style={{ color: C.muted }}>Current API Key</p>
                        <div className="flex items-center gap-3">
                            <code
                                className="flex-1 text-sm font-mono rounded-lg px-3 py-2"
                                style={{
                                    background: "rgba(0,0,0,0.3)",
                                    color: C.purpleLight,
                                    letterSpacing: "0.05em",
                                }}
                            >
                                {showKey ? data.api_key : "attiq_" + "•".repeat(24)}
                            </code>
                            <button type="button" onClick={() => setShowKey(!showKey)}
                                className="p-2 rounded-lg transition-colors"
                                style={{ color: C.muted }}
                                onMouseEnter={e => e.currentTarget.style.color = C.text}
                                onMouseLeave={e => e.currentTarget.style.color = C.muted}>
                                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button type="button" onClick={copyKey}
                                className="p-2 rounded-lg transition-all duration-200"
                                style={{ color: copied ? C.success : C.muted }}
                                onMouseEnter={e => !copied && (e.currentTarget.style.color = C.text)}
                                onMouseLeave={e => !copied && (e.currentTarget.style.color = C.muted)}>
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                )}

                {/* Integrations List */}
                <div className="space-y-3">
                    {[
                        { icon: "S", name: "Slack Integration",  label: "ACTIVE • WEBHOOK V2",  status: "active",        color: "#4A154B" },
                        { icon: "J", name: "Jira Worklogs",      label: "DISCONNECTED",          status: "disconnected",  color: "#0052CC" },
                        { icon: "G", name: "Google Calendar",    label: "DISCONNECTED",          status: "disconnected",  color: "#4285F4" },
                    ].map((item, i) => {
                        const [rowHovered, setRowHovered] = useState(false);
                        const isActive = item.status === "active";
                        return (
                            <div
                                key={i}
                                className="flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200 cursor-pointer"
                                style={{
                                    background: rowHovered ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.2)",
                                    border: `1px solid ${rowHovered ? C.borderHover : C.border}`,
                                }}
                                onMouseEnter={() => setRowHovered(true)}
                                onMouseLeave={() => setRowHovered(false)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white"
                                        style={{ background: item.color }}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold" style={{ color: C.text }}>
                                            {item.name}
                                        </p>
                                        <p className="text-xs font-bold mt-0.5"
                                            style={{ color: isActive ? C.success : C.muted }}>
                                            {item.label}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200"
                                    style={{
                                        background: isActive ? "rgba(16,185,129,0.1)" : C.purpleDim,
                                        color: isActive ? C.success : C.purpleLight,
                                        border: `1px solid ${isActive ? "rgba(16,185,129,0.25)" : "rgba(139,92,246,0.25)"}`,
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = "scale(1.05)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    {isActive ? "⚙ Configure" : "Connect"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </SectionCard>

            <div className="flex justify-end">
                <SaveButton processing={processing} dirty={isDirty} />
            </div>
        </form>
    );
}

// ── SECTION: Billing (placeholder) ───────────────────────────────────────────

function BillingSection() {
    return (
        <SectionCard>
            <SectionTitle title="Billing & Plan" subtitle="Manage your subscription and payment methods." />
            <div className="py-12 flex flex-col items-center justify-center gap-4 opacity-50">
                <CreditCard size={40} style={{ color: C.muted }} />
                <p className="text-sm" style={{ color: C.muted }}>Billing management coming soon.</p>
            </div>
        </SectionCard>
    );
}

// ── Flash Message ─────────────────────────────────────────────────────────────

function FlashMessage() {
    const { props } = usePage();
    const flash = props.flash ?? {};
    const [visible, setVisible] = useState(true);

    if (!visible || (!flash.success && !flash.error)) return null;

    const isSuccess = !!flash.success;
    return (
        <div
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold shadow-2xl transition-all duration-300"
            style={{
                background: isSuccess ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
                border: `1px solid ${isSuccess ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)"}`,
                color: isSuccess ? C.success : C.danger,
                backdropFilter: "blur(12px)",
            }}
        >
            {isSuccess
                ? <CheckCircle2 size={18} />
                : <AlertCircle size={18} />
            }
            {flash.success ?? flash.error}
            <button onClick={() => setVisible(false)}
                className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
                ✕
            </button>
        </div>
    );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function SettingsIndex({ settings }) {
    const [activeTab, setActiveTab] = useState("general");

    const sections = {
        general:       <GeneralSection       settings={settings.general}       />,
        system:        <SystemSection        settings={settings.system}        />,
        notifications: <NotificationsSection settings={settings.notifications} />,
        security:      <SecuritySection      settings={settings.security}      />,
        billing:       <BillingSection />,
    };

    return (
        <AppLayout>
            <FlashMessage />

            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-black tracking-tight" style={{ color: C.text }}>
                    Settings
                </h1>
                <p className="mt-1.5 text-base" style={{ color: C.muted }}>
                    Configure your organization's environment and security preferences.
                </p>
            </div>

            <div className="flex gap-7">
                {/* Left Nav */}
                <aside className="w-56 shrink-0">
                    <div
                        className="rounded-2xl p-3 sticky top-24"
                        style={{
                            background: C.surface,
                            border: `1px solid ${C.border}`,
                        }}
                    >
                        <NavTabs active={activeTab} onChange={setActiveTab} />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {sections[activeTab]}
                </div>
            </div>
        </AppLayout>
    );
}

