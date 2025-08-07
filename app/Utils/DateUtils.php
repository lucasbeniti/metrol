<?php

namespace App\Utils;

use Carbon\Carbon;

class DateUtils
{
    public static function formatDate($date, string $format = 'd/m/Y H:i:s')
    {
        if (!$date) {
            return 'N/A';
        }

        return Carbon::parse($date)->format($format);
    }
}