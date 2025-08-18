<?php

namespace App\Enums;

class MetrologyCallTypesEnum
{
    public const SETUP = 1;
    public const PRODUCTION = 2; 
    public const ADJUSTMENT = 3;

    public static function label(int $value): string
    {
        return match($value) {
            self::SETUP => 'Setup',
            self::PRODUCTION => 'Produção',
            self::ADJUSTMENT => 'Ajuste',
            default => 'Desconhecido',
        };
    }
}