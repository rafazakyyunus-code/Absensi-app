<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Attendance extends Model
{
    protected $fillable = [
        'user_id', 'schedule_id', 'date', 'check_in_at', 'check_out_at',
        'method', 'status', 'work_type', 'location', 'latitude', 'longitude',
        'notes', 'auto_checkout',
    ];

    protected $casts = [
        'date' => 'date',
        'check_in_at' => 'datetime',
        'check_out_at' => 'datetime',
        'auto_checkout' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }

    public function getDurationAttribute(): ?string
    {
        if (!$this->check_in_at || !$this->check_out_at) return null;
        $diff = $this->check_in_at->diff($this->check_out_at);
        return sprintf('%dh %dm', $diff->h, $diff->i);
    }

    public function getCheckInEarlyAttribute(): ?string
    {
        if (!$this->check_in_at || !$this->schedule) return null;
        $scheduled = Carbon::parse($this->date->toDateString() . ' ' . $this->schedule->check_in_end);
        if ($this->check_in_at->lt($scheduled)) {
            $mins = $this->check_in_at->diffInMinutes($scheduled);
            return $mins . 'm early';
        }
        return null;
    }

    public function scopeToday($query)
    {
        return $query->whereDate('date', today());
    }

    public function scopeThisWeek($query)
    {
        return $query->whereBetween('date', [now()->startOfWeek(), now()->endOfWeek()]);
    }
}
