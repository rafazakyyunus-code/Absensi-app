<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::latest()->get();

        return Inertia::render('Schedules/Index', [
            'schedules' => $schedules
        ]);
    }
}
