<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Halaman utama settings — kirim semua config ke React.
     */
    public function index(): Response
    {
        return Inertia::render('Settings/Index', [
            'settings' => Setting::getAllGrouped(),
        ]);
    }

    /**
     * Simpan General Profile (nama perusahaan, email, bio).
     */
    public function updateGeneral(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'company_name'  => 'required|string|max:100',
            'support_email' => 'required|email',
            'bio'           => 'nullable|string|max:500',
            'logo'          => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }

        Setting::setMany([
            'company_name'  => $data['company_name'],
            'support_email' => $data['support_email'],
            'bio'           => $data['bio'] ?? '',
            'logo'          => $data['logo'] ?? Setting::get('logo'),
        ]);

        Cache::forget('app_settings');

        return back()->with('success', 'Profil organisasi berhasil disimpan.');
    }

    /**
     * Simpan System Config (grace period, jam kerja, geofencing, biometric).
     */
    public function updateSystem(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'grace_period'         => 'required|integer|min:0|max:60',
            'work_start'           => 'required|date_format:H:i',
            'work_end'             => 'required|date_format:H:i',
            'geofencing_enabled'   => 'boolean',
            'biometric_enabled'    => 'boolean',
            'office_latitude'      => 'nullable|numeric',
            'office_longitude'     => 'nullable|numeric',
            'geofencing_radius'    => 'nullable|integer|min:50|max:5000',
            'auto_checkout'        => 'boolean',
            'auto_checkout_time'   => 'nullable|date_format:H:i',
        ]);

        Setting::setMany($data);
        Cache::forget('app_settings');

        return back()->with('success', 'Konfigurasi sistem berhasil disimpan.');
    }

    /**
     * Simpan Notification preferences.
     */
    public function updateNotifications(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'notify_late_checkin'   => 'boolean',
            'notify_absent'         => 'boolean',
            'notify_leave_request'  => 'boolean',
            'notify_leave_approved' => 'boolean',
            'notify_via_email'      => 'boolean',
            'notify_via_whatsapp'   => 'boolean',
            'notify_digest_daily'   => 'boolean',
        ]);

        Setting::setMany($data);

        return back()->with('success', 'Preferensi notifikasi berhasil disimpan.');
    }

    /**
     * Simpan Security & 2FA.
     */
    public function updateSecurity(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'two_factor_enabled'      => 'boolean',
            'session_timeout_minutes' => 'required|integer|min:5|max:1440',
            'max_login_attempts'      => 'required|integer|min:3|max:20',
            'password_expiry_days'    => 'nullable|integer|min:0|max:365',
            'ip_whitelist'            => 'nullable|string',
        ]);

        Setting::setMany($data);

        return back()->with('success', 'Pengaturan keamanan berhasil disimpan.');
    }

    /**
     * Generate API key baru.
     */
    public function generateApiKey(): RedirectResponse
    {
        $key = 'attiq_' . bin2hex(random_bytes(24));
        Setting::set('api_key', $key);

        return back()->with('api_key', $key);
    }
}
