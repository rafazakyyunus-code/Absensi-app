<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = ['key', 'value', 'type'];

    // ── Static helpers ─────────────────────────────────────────────────

    /** Ambil satu nilai */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();
        if (! $setting) return $default;

        return match ($setting->type) {
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'integer' => (int) $setting->value,
            'float'   => (float) $setting->value,
            default   => $setting->value,
        };
    }

    /** Set satu nilai */
    public static function set(string $key, mixed $value): void
    {
        $type = match (true) {
            is_bool($value)  => 'boolean',
            is_int($value)   => 'integer',
            is_float($value) => 'float',
            default          => 'string',
        };

        static::updateOrCreate(
            ['key' => $key],
            ['value' => (string) $value, 'type' => $type]
        );
    }

    /** Set banyak nilai sekaligus */
    public static function setMany(array $data): void
    {
        foreach ($data as $key => $value) {
            static::set($key, $value ?? '');
        }
    }

    /**
     * Ambil semua setting, dikelompokkan per section.
     * Return array siap kirim ke React.
     */
    public static function getAllGrouped(): array
    {
        $all = Cache::remember('app_settings', 3600, fn() =>
            static::all()->pluck('value', 'key')->toArray()
        );

        $bool = fn(string $k, bool $d = false) =>
            filter_var($all[$k] ?? $d, FILTER_VALIDATE_BOOLEAN);

        return [
            'general' => [
                'company_name'  => $all['company_name']  ?? 'AttendIQ Enterprise Solutions',
                'support_email' => $all['support_email'] ?? 'admin@attendiq.tech',
                'bio'           => $all['bio']           ?? '',
                'logo'          => $all['logo']          ?? null,
            ],
            'system' => [
                'grace_period'          => (int) ($all['grace_period']       ?? 15),
                'work_start'            => $all['work_start']                ?? '09:00',
                'work_end'              => $all['work_end']                  ?? '18:00',
                'geofencing_enabled'    => $bool('geofencing_enabled'),
                'biometric_enabled'     => $bool('biometric_enabled'),
                'office_latitude'       => $all['office_latitude']           ?? '',
                'office_longitude'      => $all['office_longitude']          ?? '',
                'geofencing_radius'     => (int) ($all['geofencing_radius']  ?? 200),
                'auto_checkout'         => $bool('auto_checkout'),
                'auto_checkout_time'    => $all['auto_checkout_time']        ?? '20:00',
            ],
            'notifications' => [
                'notify_late_checkin'   => $bool('notify_late_checkin',   true),
                'notify_absent'         => $bool('notify_absent',         true),
                'notify_leave_request'  => $bool('notify_leave_request',  true),
                'notify_leave_approved' => $bool('notify_leave_approved', true),
                'notify_via_email'      => $bool('notify_via_email',      true),
                'notify_via_whatsapp'   => $bool('notify_via_whatsapp'),
                'notify_digest_daily'   => $bool('notify_digest_daily'),
            ],
            'security' => [
                'two_factor_enabled'      => $bool('two_factor_enabled'),
                'session_timeout_minutes' => (int) ($all['session_timeout_minutes'] ?? 120),
                'max_login_attempts'      => (int) ($all['max_login_attempts']      ?? 5),
                'password_expiry_days'    => (int) ($all['password_expiry_days']    ?? 90),
                'ip_whitelist'            => $all['ip_whitelist']                   ?? '',
                'api_key'                 => $all['api_key']                        ?? null,
            ],
            'integrations' => [
                [
                    'id'     => 'slack',
                    'name'   => 'Slack Integration',
                    'label'  => 'ACTIVE • WEBHOOK V2',
                    'status' => 'active',
                    'color'  => '#4A154B',
                    'icon'   => 'S',
                ],
                [
                    'id'     => 'jira',
                    'name'   => 'Jira Worklogs',
                    'label'  => 'DISCONNECTED',
                    'status' => 'disconnected',
                    'color'  => '#0052CC',
                    'icon'   => 'J',
                ],
            ],
        ];
    }
}
