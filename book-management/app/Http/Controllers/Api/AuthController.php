<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Login admin user and return JWT token
     */
    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => auth('api')->user()
        ], 200);
    }

    /**
     * Get currently authenticated user
     */
    public function me()
    {
        return response()->json(auth('api')->user());
    }

    /**
     * Logout user (invalidate token)
     */
    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
