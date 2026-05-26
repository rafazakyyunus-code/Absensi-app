<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = today();
        $user = auth()->user();

        // Overview stats
        $totalEmployees = User::where('role', 'employee')->count();
        $presentToday = Attendance::today()->where('status', 'present')->count();
        $lateToday = Attendance::today()->where('status', 'late')->count();
        $absentToday = $totalEmployees - Attendance::today()->whereIn('status', ['present', 'late'])->count();
        $remoteToday = Attendance::today()->where('work_type', 'wfh')->count();

        $presentPercent = $totalEmployees > 0 ? round(($presentToday / $totalEmployees) * 100, 1) : 0;
        $latePercent = $totalEmployees > 0 ? round(($lateToday / $totalEmployees) * 100, 1) : 0;
        $absentPercent = $totalEmployees > 0 ? round(($absentToday / $totalEmployees) * 100, 1) : 0;

        // Weekly trend data
        $weekDays = collect(range(6, 0))->map(function ($i) {
            $date = today()->subDays($i);
            $present = Attendance::whereDate('date', $date)->whereIn('status', ['present'])->count();
            $late = Attendance::whereDate('date', $date)->where('status', 'late')->count();
            return [
                'day' => $date->format('D'),
                'date' => $date->toDateString(),
                'present' => $present,
                'late' => $late,
            ];
        });

        // Department load
        $departments = [
            ['name' => 'Engineering', 'load' => 92],
            ['name' => 'Marketing', 'load' => 78],
            ['name' => 'Finance', 'load' => 85],
            ['name' => 'Operations', 'load' => 70],
        ];

        // Recent activity
        $recentActivity = Attendance::with('user')
            ->today()
            ->latest('check_in_at')
            ->take(10)
            ->get()
            ->map(fn($a) => [
                'id' => $a->id,
                'employee' => $a->user->name,
                'employee_id' => $a->user->employee_id,
                'initials' => $a->user->initials,
                'department' => $a->user->department,
                'check_in_time' => $a->check_in_at ? $a->check_in_at->format('h:i A') : '-',
                'check_in_early' => $a->checkInEarly,
                'method' => ucfirst(str_replace('_', ' ', $a->method)),
                'status' => $a->status,
                'work_type' => strtoupper($a->work_type),
            ]);

        // Today's attendance for logged in user
        $myAttendance = Attendance::where('user_id', $user->id)->today()->first();

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'totalEmployees' => $totalEmployees,
                'presentToday' => $presentToday,
                'lateToday' => $lateToday,
                'absentToday' => $absentToday,
                'remoteToday' => $remoteToday,
                'presentPercent' => $presentPercent,
                'latePercent' => $latePercent,
                'absentPercent' => $absentPercent,
            ],
            'weeklyTrend' => $weekDays,
            'departments' => $departments,
            'recentActivity' => $recentActivity,
            'myAttendance' => $myAttendance ? [
                'check_in_at' => $myAttendance->check_in_at?->format('H:i'),
                'check_out_at' => $myAttendance->check_out_at?->format('H:i'),
                'status' => $myAttendance->status,
            ] : null,
        ]);
    }
}
