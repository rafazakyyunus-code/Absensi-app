import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const StatusDot = ({ status }) => {
    const map = { present: 'bg-emerald-500', late: 'bg-amber-500', absent: 'bg-red-500', leave: 'bg-blue-500' };
    return <span className={`inline-block w-2 h-2 rounded-full ${map[status] ?? map.absent}`} />;
};

function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A2E] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <h3 className="text-white font-semibold text-base">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-white text-xl">×</button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

function EmployeeForm({ data, setData, errors, isEdit }) {
    const fields = [
        { key: 'name', label: 'Nama Lengkap', type: 'text', placeholder: 'Marcus Sterling' },
        { key: 'email', label: 'Email', type: 'email', placeholder: 'marcus@company.com' },
        { key: 'employee_id', label: 'Employee ID', type: 'text', placeholder: '92834' },
        { key: 'department', label: 'Department', type: 'text', placeholder: 'Engineering' },
        { key: 'position', label: 'Posisi', type: 'text', placeholder: 'Senior Developer' },
        ...(!isEdit ? [{ key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' }] : []),
    ];

    return (
        <div className="space-y-4">
            {fields.map(f => (
                <div key={f.key}>
                    <label className="text-xs text-gray-500 mb-1 block">{f.label}</label>
                    <input
                        type={f.type}
                        value={data[f.key] ?? ''}
                        onChange={e => setData(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition"
                    />
                    {errors[f.key] && <p className="text-red-400 text-xs mt-1">{errors[f.key]}</p>}
                </div>
            ))}
            <div>
                <label className="text-xs text-gray-500 mb-1 block">Tipe Kerja</label>
                <select
                    value={data.work_type ?? 'wfo'}
                    onChange={e => setData('work_type', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500/50"
                >
                    <option value="wfo">WFO</option>
                    <option value="wfh">WFH</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>
        </div>
    );
}

export default function Employees({ employees, departments, filters }) {
    const [showAdd, setShowAdd] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);
    const [search, setSearch] = useState(filters?.search ?? '');

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '', email: '', employee_id: '', department: '',
        position: '', password: '', work_type: 'wfo',
    });

    const handleAdd = () => {
        post(route('employees.store'), {
            onSuccess: () => { setShowAdd(false); reset(); }
        });
    };

    const handleEdit = () => {
        router.put(route('employees.update', editEmployee.id), data, {
            onSuccess: () => setEditEmployee(null),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Hapus karyawan ini?')) {
            router.delete(route('employees.destroy', id));
        }
    };

    const openEdit = (emp) => {
        setData({ name: emp.name, email: emp.email, department: emp.department, position: emp.position, work_type: emp.work_type, employee_id: emp.employee_id });
        setEditEmployee(emp);
    };

    return (
        <AppLayout>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Employee Management</h1>
                    <p className="text-gray-500 text-sm mt-0.5">Kelola data karyawan perusahaan</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#7C5CFC] hover:bg-[#6B4EE0] text-white text-sm font-semibold rounded-xl transition"
                >
                    + Add Employee
                </button>
            </div>

            {/* Filters */}
            <div className="bg-[#13131F] border border-white/5 rounded-2xl p-4 mb-5 flex flex-wrap gap-3">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && router.get(route('employees.index'), { search })}
                    placeholder="Cari karyawan..."
                    className="flex-1 min-w-[200px] bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
                />
                <select
                    onChange={e => router.get(route('employees.index'), { department: e.target.value, search })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none"
                >
                    <option value="">Semua Department</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {employees.data.map(emp => (
                    <div key={emp.id} className="bg-[#13131F] border border-white/5 rounded-2xl p-5 hover:border-purple-500/20 transition group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base">
                                {emp.initials}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <StatusDot status={emp.today_status} />
                                <span className="text-xs text-gray-500 capitalize">{emp.today_status}</span>
                            </div>
                        </div>
                        <div className="text-white font-semibold text-sm mb-0.5">{emp.name}</div>
                        <div className="text-gray-500 text-xs mb-3">{emp.position}</div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">{emp.department}</span>
                            <span className="text-xs px-2 py-0.5 bg-white/5 text-gray-500 rounded-full uppercase">{emp.work_type}</span>
                        </div>
                        <div className="text-gray-600 text-xs mb-4">#{emp.employee_id}</div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                            <button
                                onClick={() => openEdit(emp)}
                                className="flex-1 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(emp.id)}
                                className="flex-1 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {employees.last_page > 1 && (
                <div className="flex justify-center mt-6 gap-1">
                    {employees.links.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => link.url && router.get(link.url)}
                            disabled={!link.url}
                            className={`px-3 py-1 text-xs rounded-lg transition ${link.active ? 'bg-[#7C5CFC] text-white' : 'bg-white/5 text-gray-400'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}

            {/* Add Modal */}
            {showAdd && (
                <Modal title="Tambah Karyawan" onClose={() => setShowAdd(false)}>
                    <EmployeeForm data={data} setData={setData} errors={errors} isEdit={false} />
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setShowAdd(false)} className="flex-1 py-2.5 bg-white/5 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition">Batal</button>
                        <button onClick={handleAdd} disabled={processing} className="flex-1 py-2.5 bg-[#7C5CFC] hover:bg-[#6B4EE0] text-white rounded-xl text-sm font-semibold transition disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </Modal>
            )}

            {/* Edit Modal */}
            {editEmployee && (
                <Modal title="Edit Karyawan" onClose={() => setEditEmployee(null)}>
                    <EmployeeForm data={data} setData={setData} errors={errors} isEdit={true} />
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setEditEmployee(null)} className="flex-1 py-2.5 bg-white/5 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition">Batal</button>
                        <button onClick={handleEdit} disabled={processing} className="flex-1 py-2.5 bg-[#7C5CFC] hover:bg-[#6B4EE0] text-white rounded-xl text-sm font-semibold transition disabled:opacity-50">
                            {processing ? 'Menyimpan...' : 'Update'}
                        </button>
                    </div>
                </Modal>
            )}
        </AppLayout>
    );
}
