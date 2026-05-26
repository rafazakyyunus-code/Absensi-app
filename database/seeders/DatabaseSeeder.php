<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Attendance;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Departments
        $departments = [
            ['name' => 'Engineering', 'code' => 'ENG', 'head_name' => 'Budi Santoso', 'employee_count' => 42],
            ['name' => 'Marketing', 'code' => 'MKT', 'head_name' => 'Siti Rahayu', 'employee_count' => 28],
            ['name' => 'Finance', 'code' => 'FIN', 'head_name' => 'Ahmad Fauzi', 'employee_count' => 15],
            ['name' => 'HR', 'code' => 'HRD', 'head_name' => 'Diana Putri', 'employee_count' => 10],
            ['name' => 'Operations', 'code' => 'OPS', 'head_name' => 'Reza Pratama', 'employee_count' => 35],
        ];
        DB::table('departments')->insert($departments);

        // Schedules
        DB::table('schedules')->insert([
            ['name' => 'Full Time', 'check_in_start' => '07:00:00', 'check_in_end' => '10:00:00', 'check_out_time' => '17:00:00'],
            ['name' => 'Half Day AM', 'check_in_start' => '07:00:00', 'check_in_end' => '09:00:00', 'check_out_time' => '13:00:00'],
        ]);

        // Admin user
        $admin = User::create([
            'name' => 'Jane Doe',
            'email' => 'admin@attendiq.com',
            'password' => Hash::make('password'),
            'employee_id' => 'ADM001',
            'department' => 'HR',
            'role' => 'admin',
            'position' => 'Admin Account',
            'work_type' => 'wfo',
        ]);

        // Sample employees
        $employees = [
            ['name' => 'Marcus Sterling', 'email' => 'marcus@attendiq.com', 'employee_id' => '92834', 'department' => 'Engineering', 'position' => 'Senior Developer'],
            ['name' => 'Elena Rodriguez', 'email' => 'elena@attendiq.com', 'employee_id' => '92835', 'department' => 'Marketing', 'position' => 'Marketing Lead'],
            ['name' => 'Adi Nugroho', 'email' => 'adi@attendiq.com', 'employee_id' => '92836', 'department' => 'Engineering', 'position' => 'Backend Developer'],
            ['name' => 'Sari Dewi', 'email' => 'sari@attendiq.com', 'employee_id' => '92837', 'department' => 'Finance', 'position' => 'Accountant'],
            ['name' => 'Budi Pratama', 'email' => 'budi@attendiq.com', 'employee_id' => '92838', 'department' => 'Operations', 'position' => 'Ops Manager'],
        ];

        $userIds = [];
        foreach ($employees as $emp) {
            $user = User::create(array_merge($emp, [
                'password' => Hash::make('password'),
                'role' => 'employee',
                'work_type' => 'wfo',
            ]));
            $userIds[] = $user->id;
        }

        // Generate attendance for past 7 days
        $allUserIds = array_merge([$admin->id], $userIds);
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            if ($date->isWeekend()) continue;

            foreach ($allUserIds as $uid) {
                $isLate = rand(0, 5) === 0;
                $checkIn = $date->copy()->setHour(rand(8, 9))->setMinute(rand(0, 59));
                $checkOut = $date->copy()->setHour(17)->setMinute(rand(0, 30));

                DB::table('attendances')->insertOrIgnore([
                    'user_id' => $uid,
                    'schedule_id' => 1,
                    'date' => $date->toDateString(),
                    'check_in_at' => $checkIn,
                    'check_out_at' => $i === 0 ? null : $checkOut,
                    'method' => collect(['biometric', 'qr_code', 'remote'])->random(),
                    'status' => $isLate ? 'late' : 'present',
                    'work_type' => 'wfo',
                    'location' => 'PT. Spero Mahakarya Nusantara',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
