<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::latest()->get();

        return Inertia::render('Employees', [
            'employees' => $employees,
            'stats' => [
                'total' => Employee::count(),

                'present' => Employee::where('status', 'Present')->count(),

                'late' => Employee::where('status', 'Late')->count(),

                'absent' => Employee::where('status', 'Absent')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:employees',
            'department' => 'required',
            'role' => 'required',
            'status' => 'required',
        ]);

        Employee::create($validated);

        return redirect()->back();
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->back();
    }
}