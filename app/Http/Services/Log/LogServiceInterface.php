<?php

namespace App\Http\Services\Log;

use Illuminate\Database\Eloquent\Collection;

interface LogServiceInterface
{
    public function getAll(): Collection;
}