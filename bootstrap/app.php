<?php

use App\Exceptions\AlreadyExistsException;
use App\Exceptions\CannotBeDeletedException;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AlreadyExistsException $e, Request $request) {
            return redirect()
                ->back()
                ->withErrors(['error' => $e->getMessage()])
                ->withInput();
        });

        $exceptions->render(function (CannotBeDeletedException $e, Request $request) {
            return redirect()
                ->back()
                ->withErrors(['error' => $e->getMessage()]);
        });

        $exceptions->render(function (Throwable $e, Request $request) {
            return redirect()
                ->back()
                ->withErrors(['error' => 'Erro interno do servidor. Tente novamente mais tarde']);
        });
    })->create();
