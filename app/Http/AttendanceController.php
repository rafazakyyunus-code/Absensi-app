<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    // Check-in
    public function checkIn(Request $request)
    {
        $request->validate([
            'method' => 'required|in:biometric,qr_code,manual,remote',
            'location' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'work_type' => 'nullable|in:wfo,wfh',
        ]);

        $user = auth()->user();
        $today = today();

        $existing = Attendance::where('user_id', $user->id)->whereDate('date', $today)->first();
        if ($existing) {
            return back()->withErrors(['message' => 'Anda sudah check in hari ini.']);
        }

        $checkInTime = now();
        $scheduleEnd = Carbon::parse($today->toDateString() . ' 10:00:00');
        $status = $checkInTime->gt($scheduleEnd) ? 'late' : 'present';

        Attendance::create([
            'user_id' => $user->id,
            'schedule_id' => 1,
            'date' => $today,
            'check_in_at' => $checkInTime,
            'method' => $request->method,
            'status' => $status,
            'work_type' => $request->work_type ?? $user->work_type,
            'location' => $request->location ?? 'PT. Spero Mahakarya Nusantara',
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return back()->with('success', 'Check in berhasil! ' . $checkInTime->format('H:i'));
    }

    // Check-out
    public function checkOut(Request $request)
    {
        $user = auth()->user();
        $attendance = Attendance::where('user_id', $user->id)->whereDate('date', today())->first();

        if (!$attendance) {
            return back()->withErrors(['message' => 'Anda belum check in hari ini.']);
        }
        if ($attendance->check_out_at) {
            return back()->withErrors(['message' => 'Anda sudah check out hari ini.']);
        }

        $attendance->update(['check_out_at' => now()]);

        return back()->with('success', 'Check out berhasil! ' . now()->format('H:i'));
    }

    // Admin: History / all attendance
    public function history(Request $request)
    {
        $query = Attendance::with('user')
            ->when($request->date, fn($q) => $q->whereDate('date', $request->date))
            ->when($request->status, fn($q) => $q->where('status', $request->status))
            ->when($request->department, fn($q) => $q->whereHas('user', fn($u) => $u->where('department', $request->department)))
            ->when($request->search, fn($q) => $q->whereHas('user', fn($u) => $u->where('name', 'like', "%{$request->search}%")))
            ->latest('date')
            ->paginate(15);

        return Inertia::render('Attendance/History', [
            'attendances' => $query->through(fn($a) => [
                'id' => $a->id,
                'employee' => $a->user->name,
                'email' => $a->user->email,
                'initials' => $a->user->initials,
                'department' => $a->user->department,
                'date' => $a->date->format('d M Y'),
                'check_in' => $a->check_in_at ? $a->check_in_at->format('H:i') : '-',
                'check_out' => $a->check_out_at ? $a->check_out_at->format('H:i') : '-',
                'duration' => $a->duration ?? '-',
                'method' => ucfirst(str_replace('_', ' ', $a->method)),
                'work_type' => strtoupper($a->work_type),
                'status' => $a->status,
                'location' => $a->location,
            ]),
            'filters' => $request->only(['date', 'status', 'department', 'search']),
        ]);
    }

    // Employee: my attendance
    public function myAttendance(Request $request)
    {
        $user = auth()->user();
        $attendances = Attendance::where('user_id', $user->id)
            ->latest('date')
            ->paginate(20);

        // Monthly summary
        $thisMonth = Attendance::where('user_id', $user->id)
            ->whereMonth('date', now()->month)
            ->get();

        $summary = [
            'present' => $thisMonth->where('status', 'present')->count(),
            'late' => $thisMonth->where('status', 'late')->count(),
            'absent' => $thisMonth->where('status', 'absent')->count(),
            'leave' => $thisMonth->where('status', 'leave')->count(),
        ];

        return Inertia::render('Attendance/MyAttendance', [
            'attendances' => $attendances->through(fn($a) => [
                'id' => $a->id,
                'date' => $a->date->format('d M Y'),
                'day' => $a->date->format('l'),
                'check_in' => $a->check_in_at ? $a->check_in_at->format('H:i') : '-',
                'check_out' => $a->check_out_at ? $a->check_out_at->format('H:i') : '-',
                'duration' => $a->duration ?? '-',
                'status' => $a->status,
                'work_type' => strtoupper($a->work_type),
                'location' => $a->location,
            ]),
            'summary' => $summary,
            'todayAttendance' => Attendance::where('user_id', $user->id)->today()->first() ? [
                'check_in_at' => Attendance::where('user_id', $user->id)->today()->first()->check_in_at?->format('H:i'),
                'check_out_at' => Attendance::where('user_id', $user->id)->today()->first()->check_out_at?->format('H:i'),
                'status' => Attendance::where('user_id', $user->id)->today()->first()->status,
            ] : null,
        ]);
    }
}
