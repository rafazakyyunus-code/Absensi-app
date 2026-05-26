<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string('employee_id')
                ->unique()
                ->nullable();

            $table->string('name');

            $table->string('email')
                ->unique();

            /*
            |--------------------------------------------------------------------------
            | RELATION IDS ONLY
            |--------------------------------------------------------------------------
            */

            $table->unsignedBigInteger('department_id')
                ->nullable();

            $table->unsignedBigInteger('schedule_id')
                ->nullable();

            /*
            |--------------------------------------------------------------------------
            | USER INFO
            |--------------------------------------------------------------------------
            */

            $table->enum('role', [
                'admin',
                'employee',
                'hr'
            ])->default('employee');

            $table->string('position')
                ->nullable();

            $table->string('phone')
                ->nullable();

            $table->string('avatar')
                ->nullable();

            $table->date('hire_date')
                ->nullable();

            $table->enum('employment_status', [
                'active',
                'inactive',
                'terminated'
            ])->default('active');

            $table->enum('work_type', [
                'wfo',
                'wfh',
                'hybrid'
            ])->default('wfo');

            /*
            |--------------------------------------------------------------------------
            | AUTH
            |--------------------------------------------------------------------------
            */

            $table->timestamp('email_verified_at')
                ->nullable();

            $table->string('password');

            $table->rememberToken();

            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();

            $table->foreignId('user_id')
                ->nullable()
                ->index();

            $table->string('ip_address', 45)
                ->nullable();

            $table->text('user_agent')
                ->nullable();

            $table->longText('payload');

            $table->integer('last_activity')
                ->index();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};