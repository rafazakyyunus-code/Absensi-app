<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::latest()->get();

        return Inertia::render('Departments/Index', [
            'departments' => $departments
        ]);
    }
}
