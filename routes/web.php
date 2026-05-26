<?php

use App\Models\Employee;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SettingController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('landing');

Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */
    Route::get('/dashboard', function () {

            $employees = Employee::latest()->take(5)->get();

            return Inertia::render('Dashboard', [

                'stats' => [
                    'total' => Employee::count(),
                    'present' => Employee::where('status', 'Present')->count(),
                    'late' => Employee::where('status', 'Late')->count(),
                    'absent' => Employee::where('status', 'Absent')->count(),
                ],

                'activities' => $employees
            ]);
        })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Employees
    |--------------------------------------------------------------------------
    */
    Route::resource('employees', EmployeeController::class);

    /*
    |--------------------------------------------------------------------------
    | Attendance
    |--------------------------------------------------------------------------
    */
    Route::get('/attendance', function () {
        return Inertia::render('Attendance/Index');
    })->name('attendance.index');

    /*
    |--------------------------------------------------------------------------
    | Departments
    |--------------------------------------------------------------------------
    */
    Route::get('/departments', function () {
        return Inertia::render('Departments/Index');
    })->name('departments.index');



    /*
    |--------------------------------------------------------------------------
    | Settings
    |--------------------------------------------------------------------------
    */
    Route::prefix('settings')->name('settings.')->middleware('auth')->group(function () {
    Route::get('/',               [SettingController::class, 'index'])               ->name('index');
    Route::post('/general',       [SettingController::class, 'updateGeneral'])       ->name('general');
    Route::post('/system',        [SettingController::class, 'updateSystem'])        ->name('system');
    Route::post('/notifications', [SettingController::class, 'updateNotifications']) ->name('notifications');
    Route::post('/security',      [SettingController::class, 'updateSecurity'])      ->name('security');
    Route::post('/api-key',       [SettingController::class, 'generateApiKey'])      ->name('api-key');
    });

    /*
    |--------------------------------------------------------------------------
    | Profile
    |--------------------------------------------------------------------------
    */
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

        
});



require __DIR__.'/auth.php';