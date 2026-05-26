<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $employees = User::where('role', 'employee')
            ->when($request->search, fn($q) => $q->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%"))
            ->when($request->department, fn($q) => $q->where('department', $request->department))
            ->paginate(15)
            ->through(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'employee_id' => $u->employee_id,
                'department' => $u->department,
                'position' => $u->position,
                'work_type' => $u->work_type,
                'initials' => $u->initials,
                'today_status' => optional(Attendance::where('user_id', $u->id)->today()->first())->status ?? 'absent',
            ]);

        $departments = User::where('role', 'employee')->distinct()->pluck('department')->filter()->values();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'departments' => $departments,
            'filters' => $request->only(['search', 'department']),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'employee_id' => 'required|unique:users',
            'department' => 'required|string',
            'position' => 'nullable|string',
            'work_type' => 'required|in:wfo,wfh,hybrid',
            'password' => 'required|min:8',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'employee_id' => $request->employee_id,
            'department' => $request->department,
            'position' => $request->position,
            'work_type' => $request->work_type,
            'role' => 'employee',
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Karyawan berhasil ditambahkan.');
    }

    public function update(Request $request, User $employee)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $employee->id,
            'department' => 'required|string',
            'position' => 'nullable|string',
            'work_type' => 'required|in:wfo,wfh,hybrid',
        ]);

        $employee->update($request->only(['name', 'email', 'department', 'position', 'work_type']));

        return back()->with('success', 'Data karyawan berhasil diperbarui.');
    }

    public function destroy(User $employee)
    {
        $employee->delete();
        return back()->with('success', 'Karyawan berhasil dihapus.');
    }
}
