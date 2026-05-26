<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::latest()->get();

        return Inertia::render('Attendance/Index', [
            'attendances' => $attendances
        ]);
    }
}
