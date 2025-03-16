<?php

use App\Http\Controllers\Settings\AppearanceController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('settings/appearance', [AppearanceController::class, 'index'])->name('settings.appearance');
});
