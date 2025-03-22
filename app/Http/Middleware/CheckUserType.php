<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(\Illuminate\Support\Facades\Auth::check() && \Illuminate\Support\Facades\Auth::user()->type !== 'admin'){
            return redirect()->route('metrology-calls.index');
        }
        return $next($request);
    }
}
