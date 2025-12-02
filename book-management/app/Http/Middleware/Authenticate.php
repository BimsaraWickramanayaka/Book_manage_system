<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Authenticate extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]  ...$guards
     * @return mixed
     */
    public function handle($request, $next, ...$guards)
    {
        // For API requests, catch JWT exceptions and return JSON
        if ($request->expectsJson()) {
            try {
                // Check if user is authenticated for any of the guards
                if (!$this->authenticate($request, $guards)) {
                    return response()->json(['message' => 'Unauthenticated'], 401);
                }
            } catch (TokenBlacklistedException $e) {
                return response()->json(['message' => 'Token blacklisted'], 401);
            } catch (TokenExpiredException $e) {
                return response()->json(['message' => 'Token expired'], 401);
            } catch (TokenInvalidException $e) {
                return response()->json(['message' => 'Token invalid'], 401);
            } catch (JWTException $e) {
                return response()->json(['message' => 'Invalid token'], 401);
            } catch (\Illuminate\Auth\AuthenticationException $e) {
                return response()->json(['message' => 'Unauthenticated'], 401);
            }

            return $next($request);
        }

        // For web requests, use default behavior
        return parent::handle($request, $next, ...$guards);
    }

    /**
     * Determine if the user is logged in to any of the given guards.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return bool
     */
    protected function authenticate($request, array $guards)
    {
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if ($this->auth->guard($guard)->check()) {
                return $this->auth->shouldUse($guard);
            }
        }

        return false;
    }
}
