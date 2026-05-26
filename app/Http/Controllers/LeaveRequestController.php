<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class LeaveRequestController extends Controller
{
    public function index()
    {
        return Inertia::render('LeaveRequests/Index');
    }
}
