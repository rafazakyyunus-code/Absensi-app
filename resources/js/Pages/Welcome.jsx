import { Link } from '@inertiajs/react';

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#0A0A14] text-white font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A14]/80 backdrop-blur border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-[#7C5CFC] rounded-lg flex items-center justify-center text-xs font-bold">A</div>
                        <span className="font-bold text-white">AttendIQ</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
                        <a href="#features" className="hover:text-white transition">Features</a>
                        <a href="#about" className="hover:text-white transition">About</a>
                        <a href="#pricing" className="hover:text-white transition">Pricing</a>
                    </div>
                    <Link
                        href={route('login')}
                        className="px-4 py-2 bg-[#7C5CFC] hover:bg-[#6B4EE0] text-white text-sm font-semibold rounded-xl transition"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
                {/* BG glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 mb-8">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        V2.4 NOW LIVE: AI SMART SCHEDULING
                    </div>

                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                        Modern Attendance for the{' '}
                        <span className="text-[#7C5CFC]">High-Performance</span>{' '}
                        Workforce
                    </h1>

                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        Eliminate administrative friction with AI-powered tracking, precision geofencing, and real-time analytics designed for the modern enterprise.
                    </p>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <Link
                            href={route('register')}
                            className="px-6 py-3 bg-[#7C5CFC] hover:bg-[#6B4EE0] text-white font-semibold rounded-xl transition text-sm"
                        >
                            Start Free Trial
                        </Link>
                        <Link
                            href={route('login')}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition text-sm"
                        >
                            Book Demo
                        </Link>
                    </div>
                </div>

                {/* Dashboard preview */}
                <div className="relative max-w-4xl mx-auto mt-16">
                    <div className="bg-[#13131F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20">
                        <div className="bg-[#0E0E16] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/60"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                            </div>
                            <div className="flex-1 mx-4 bg-white/5 rounded-lg h-5 text-gray-700 text-xs flex items-center px-3">app.attendiq.com/dashboard</div>
                        </div>
                        <div className="p-6 grid grid-cols-4 gap-3 text-left">
                            {[
                                { label: 'Total Employees', value: '1,284', icon: '👥', badge: '+2.4%', color: 'text-emerald-400' },
                                { label: 'Present Today', value: '1,207', icon: '✅', badge: '94%', color: 'text-emerald-400' },
                                { label: 'Late Employees', value: '41', icon: '⏰', badge: '3.2%', color: 'text-amber-400' },
                                { label: 'Absent', value: '36', icon: '🚫', badge: '-1.5%', color: 'text-red-400' },
                            ].map((s, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-base">{s.icon}</span>
                                        <span className={`text-xs ${s.color}`}>{s.badge}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                                    <div className="text-xl font-bold text-white">{s.value}</div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 pb-6">
                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 h-24 flex items-end gap-1">
                                {[40, 65, 45, 80, 70, 90, 75].map((h, i) => (
                                    <div key={i} className="flex-1 bg-[#7C5CFC]/40 rounded-sm" style={{ height: `${h}%` }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold text-white mb-3">Architected for Precision</h2>
                        <p className="text-gray-500">Advanced tools for enterprise-level workforce management.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                            {
                                icon: '⏱',
                                title: 'Real-time Pulse',
                                desc: 'Monitor your global workforce in real-time with zero-latency updates. Visualize attendance density across time zones instantly.',
                            },
                            {
                                icon: '🔲',
                                title: 'QR Secure Scan',
                                desc: 'Dynamic, encrypted QR codes that regenerate every 30 seconds to prevent buddy-punching and ensure physical presence.',
                            },
                            {
                                icon: '📍',
                                title: 'Precision Geofencing',
                                desc: 'Custom polygon boundaries for complex sites. Auto-clock in/out based on sub-meter GPS accuracy.',
                            },
                            {
                                icon: '📊',
                                title: 'Smart Analytics',
                                desc: 'Predictive insights into absenteeism trends and labor cost forecasting using our proprietary AI model.',
                            },
                        ].map((f, i) => (
                            <div key={i} className="bg-[#13131F] border border-white/5 rounded-2xl p-6 hover:border-purple-500/20 transition">
                                <div className="w-10 h-10 bg-[#7C5CFC]/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-xl mb-4">{f.icon}</div>
                                <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scale section */}
            <section className="py-20 px-6 bg-[#0D0D1A]">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-white mb-8">Everything you need to scale</h2>
                        <div className="space-y-5">
                            {[
                                { title: 'Seamless ERP Integration', desc: 'Connect with SAP, Oracle, and Workday in minutes with our native connectors.' },
                                { title: 'Enterprise-Grade Security', desc: 'SOC2 Type II compliant with end-to-end encryption for all employee data.' },
                                { title: 'Offline Synchronization', desc: 'Record attendance without internet. Data syncs automatically once back online.' },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[#7C5CFC]/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <div className="w-2 h-2 rounded-full bg-[#7C5CFC]" />
                                    </div>
                                    <div>
                                        <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                                        <div className="text-gray-500 text-sm">{item.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/10 border border-purple-500/10 rounded-2xl p-8 text-center">
                            <div className="text-5xl font-bold text-[#7C5CFC] mb-2">99.8%</div>
                            <div className="text-white font-semibold mb-1">Uptime Verified</div>
                            <div className="text-gray-500 text-sm">Enterprise SLA guaranteed</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-4">Siap mulai sekarang?</h2>
                    <p className="text-gray-500 mb-8">Daftar gratis dan kelola absensi tim Anda dengan lebih cerdas.</p>
                    <Link
                        href={route('register')}
                        className="inline-block px-8 py-3 bg-[#7C5CFC] hover:bg-[#6B4EE0] text-white font-semibold rounded-xl transition"
                    >
                        Mulai Gratis →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-10 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 bg-[#7C5CFC] rounded-lg flex items-center justify-center text-xs font-bold">A</div>
                                <span className="font-bold text-white text-sm">AttendIQ</span>
                            </div>
                            <p className="text-gray-600 text-xs">Empowering high-performance teams with technical precision and AI-driven workforce intelligence.</p>
                        </div>
                        {[
                            { title: 'PRODUCT', links: ['Features', 'Integrations', 'Enterprise', 'Pricing'] },
                            { title: 'COMPANY', links: ['About Us', 'Careers', 'Contact', 'Security'] },
                            { title: 'SUPPORT', links: ['Documentation', 'Help Center', 'API Status'] },
                        ].map((col, i) => (
                            <div key={i}>
                                <div className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3">{col.title}</div>
                                <div className="space-y-2">
                                    {col.links.map(l => <div key={l} className="text-gray-500 text-sm hover:text-gray-300 cursor-pointer transition">{l}</div>)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-white/5 pt-6 flex justify-between text-xs text-gray-600">
                        <span>© 2024 AttendIQ Enterprise. All rights reserved.</span>
                        <div className="flex gap-4">
                            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
                            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
