<?php

namespace App\Enums;

enum UserType: string
{
    case PRODUCTION = 'production';
    case METROLOGIST = 'metrologist';
    case ADMIN = 'admin';
}