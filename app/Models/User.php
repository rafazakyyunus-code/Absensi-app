<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

use App\Models\Attendance;
use App\Models\Department;
use App\Models\Schedule;
use App\Models\LeaveRequest;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
    'name',
    'email',
    'password',
    'role',
    'employee_id',
    'department_id',
    'schedule_id',
    'position',
    'phone',
    'avatar',
    'hire_date',
    'employment_status',
    'work_type',
];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'hire_date' => 'date',
    ];

    /* =========================================
       RELATIONSHIPS
    ========================================= */

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function leaveRequests()
    {
        return $this->hasMany(LeaveRequest::class);
    }

    public function todayAttendance()
    {
        return $this->hasOne(Attendance::class)
            ->whereDate('date', today());
    }

    /* =========================================
       HELPERS
    ========================================= */

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function getInitialsAttribute(): string
    {
        $words = explode(' ', $this->name);

        return strtoupper(
            substr($words[0], 0, 1) .
            (isset($words[1])
                ? substr($words[1], 0, 1)
                : '')
        );
    }

    public function getYearsWorkedAttribute(): int
    {
        if (!$this->hire_date) {
            return 0;
        }

        return Carbon::parse($this->hire_date)
            ->diffInYears(now());
    }
}