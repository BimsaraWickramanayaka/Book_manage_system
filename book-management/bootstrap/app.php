<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Replace the default Authenticate middleware with our custom one that handles JSON API responses
        $middleware->replace(
            \Illuminate\Auth\Middleware\Authenticate::class,
            \App\Http\Middleware\Authenticate::class,
        );
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Handle JWT token expired
        $exceptions->render(function (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e, $request) {
            return response()->json(['message' => 'Token expired'], 401);
        });

        // Handle JWT token invalid
        $exceptions->render(function (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e, $request) {
            return response()->json(['message' => 'Token invalid'], 401);
        });

        // Handle JWT token blacklisted (after logout)
        $exceptions->render(function (\Tymon\JWTAuth\Exceptions\TokenBlacklistedException $e, $request) {
            return response()->json(['message' => 'Token blacklisted'], 401);
        });

        // Fallback for Laravel guard failures
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        });
    })->create();
