import { useForm, Link } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen bg-[#0A0A14] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-2">
                        <div className="w-9 h-9 bg-[#7C5CFC] rounded-xl flex items-center justify-center text-white font-bold">A</div>
                        <span className="text-white font-bold text-xl">AttendIQ</span>
                    </div>
                    <p className="text-gray-500 text-sm">Create your account</p>
                </div>

                <div className="bg-[#13131F] border border-white/5 rounded-2xl p-8">
                    <form onSubmit={submit} className="space-y-5">
                        {[
                            { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe' },
                            { key: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@company.com' },
                            { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                            { key: 'password_confirmation', label: 'Confirm Password', type: 'password', placeholder: '••••••••' },
                        ].map(f => (
                            <div key={f.key}>
                                <label className="text-xs text-gray-500 mb-1.5 block">{f.label}</label>
                                <input
                                    type={f.type}
                                    value={data[f.key]}
                                    onChange={e => setData(f.key, e.target.value)}
                                    placeholder={f.placeholder}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition"
                                />
                                {errors[f.key] && <p className="text-red-400 text-xs mt-1">{errors[f.key]}</p>}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-[#7C5CFC] hover:bg-[#6B4EE0] text-white font-semibold rounded-xl transition text-sm disabled:opacity-50"
                        >
                            {processing ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-gray-600 text-sm">Sudah punya akun? </span>
                        <Link href={route('login')} className="text-purple-400 hover:text-purple-300 text-sm">Sign in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

