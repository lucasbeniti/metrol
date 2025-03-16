<?php

use App\Http\Controllers\MetrologyCallController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(MetrologyCallController::class)->prefix('/metrology-calls')->name('metrology-calls.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::get('/export', 'export')->name('export');
    });

    Route::controller(MachineController::class)->prefix('/machines')->name('machines.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::get('/export', 'export')->name('export');
    });

    Route::controller(ClientController::class)->prefix('/clients')->name('clients.')->group(function() {
        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
