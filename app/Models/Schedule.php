<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = ['name', 'check_in_start', 'check_in_end', 'check_out_time'];

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}
