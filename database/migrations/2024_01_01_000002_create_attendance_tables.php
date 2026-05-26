<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | DEPARTMENTS
        |--------------------------------------------------------------------------
        */

        Schema::create('departments', function (Blueprint $table) {
            $table->id();

            $table->string('name')->unique();
            $table->string('code')->unique();

            $table->string('head_name')
                ->nullable();

            $table->integer('employee_count')
                ->default(0);

            $table->timestamps();
        });

        /*
        |--------------------------------------------------------------------------
        | SCHEDULES
        |--------------------------------------------------------------------------
        */

        Schema::create('schedules', function (Blueprint $table) {
            $table->id();

            $table->string('name');

            $table->time('check_in_start');

            $table->time('check_in_end');

            $table->time('check_out_time');

            $table->timestamps();
        });

        /*
        |--------------------------------------------------------------------------
        | ADD FOREIGN KEY TO USERS
        |--------------------------------------------------------------------------
        */

        Schema::table('users', function (Blueprint $table) {

            $table->foreign('department_id')
                ->references('id')
                ->on('departments')
                ->nullOnDelete();

            $table->foreign('schedule_id')
                ->references('id')
                ->on('schedules')
                ->nullOnDelete();
        });

        /*
        |--------------------------------------------------------------------------
        | ATTENDANCES
        |--------------------------------------------------------------------------
        */

        Schema::create('attendances', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('schedule_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->date('date');

            $table->timestamp('check_in_at')
                ->nullable();

            $table->timestamp('check_out_at')
                ->nullable();

            $table->enum('method', [
                'biometric',
                'qr_code',
                'manual',
                'remote'
            ])->default('manual');

            $table->enum('status', [
                'present',
                'late',
                'absent',
                'leave',
                'sick'
            ])->default('present');

            $table->enum('work_type', [
                'wfo',
                'wfh'
            ])->default('wfo');

            $table->string('location')
                ->nullable();

            $table->decimal('latitude', 10, 8)
                ->nullable();

            $table->decimal('longitude', 11, 8)
                ->nullable();

            $table->text('notes')
                ->nullable();

            $table->boolean('auto_checkout')
                ->default(false);

            $table->timestamps();

            $table->unique(['user_id', 'date']);
        });

        /*
        |--------------------------------------------------------------------------
        | LEAVE REQUESTS
        |--------------------------------------------------------------------------
        */

        Schema::create('leave_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->date('start_date');

            $table->date('end_date');

            $table->enum('type', [
                'annual',
                'sick',
                'personal',
                'maternity',
                'other'
            ]);

            $table->text('reason');

            $table->enum('status', [
                'pending',
                'approved',
                'rejected'
            ])->default('pending');

            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamp('approved_at')
                ->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
        Schema::dropIfExists('attendances');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('departments');
    }
};