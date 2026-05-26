<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            if (!Schema::hasColumn('users', 'department_id')) {
    $table->foreignId('department_id')->nullable()->after('email');
}

           if (!Schema::hasColumn('users', 'department_id')) {
    $table->foreignId('department_id')->nullable()->after('email');
}
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropForeign([
                'department_id'
            ]);

            $table->dropForeign([
                'schedule_id'
            ]);

            $table->dropColumn([
                'department_id',
                'schedule_id'
            ]);
        });
    }
};