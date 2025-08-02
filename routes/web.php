<?php

use App\Http\Controllers\MetrologyCallController;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CostCenterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\OperationController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\CheckUserRole;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(CheckUserRole::class)->group(function () {
        Route::controller(DashboardController::class)->prefix('/dashboard')->name('dashboard.')->group(function() {
            Route::get('/', 'index')->name('index');
        });

        Route::controller(MachineController::class)->prefix('/machines')->name('machines.')->group(function() {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::put('/{id}', 'update')->name('update');
            Route::delete('/{id}', 'destroy')->name('destroy');
            Route::get('/export', 'export')->name('export');
        });

        Route::controller(ClientController::class)->prefix('/clients')->name('clients.')->group(function() {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::put('/{id}', 'update')->name('update');
            Route::delete('/{id}', 'destroy')->name('destroy');
            Route::get('/export', 'export')->name('export');
        });

        Route::controller(CostCenterController::class)->prefix('/cost-centers')->name('cost-centers.')->group(function() {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::put('/{id}', 'update')->name('update');
            Route::delete('/{id}', 'destroy')->name('destroy');
            Route::get('/export', 'export')->name('export');
        });

        Route::controller(ItemController::class)->prefix('/items')->name('items.')->group(function() {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::put('/{id}', 'update')->name('update');
            Route::delete('/{id}', 'destroy')->name('destroy');
            Route::get('/export', 'export')->name('export');

            // Subgrupo para operações do item selecionado
            Route::controller(OperationController::class)->prefix('/{itemId}/operations')->name('operations.')->group(function () {
                Route::get('/', 'index')->name('index');
                Route::post('/', 'store')->name('store');
                Route::put('/{id}', 'update')->name('update'); 
                Route::delete('/{id}', 'destroy')->name('destroy');
                Route::get('/export', 'export')->name('export');
            });
        });

        Route::controller(UserController::class)->prefix('/users')->name('users.')->group(function() {
            Route::get('/', 'index')->name('index');
            Route::post('/', 'store')->name('store');
            Route::put('/{id}', 'update')->name('update');
            Route::delete('/{id}', 'destroy')->name('destroy');
            Route::get('/export', 'export')->name('export');
        });

        Route::controller(LogController::class)->prefix('/logs')->name('logs.')->group(function() {
            Route::get('/', 'index')->name('index');
        });
    });

    Route::controller(MetrologyCallController::class)->prefix('/metrology-calls')->name('metrology-calls.')->group(function() {
        Route::get('/', 'index')->name('index');
        
        // Rotas do operador
        Route::post('/', 'store')->name('store');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');

        // Rotas do administrador
        Route::get('/export', 'export')->name('export');

        // Rotas do metrologista
        Route::put('/receive-item/{id}', 'receiveItem')->name('receiveItem');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
