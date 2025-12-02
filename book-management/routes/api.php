<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BookCategoryController;
use App\Http\Controllers\Api\BorrowController;

// Public auth route (no authentication required)
Route::post('login', [AuthController::class, 'login']);

// Protected routes (authentication required)
Route::middleware('auth:api')->group(function () {
    // Auth endpoints
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Book Management
    Route::get('categories', [BookCategoryController::class, 'index']);
    Route::apiResource('books', BookController::class);

    // Borrow/Return System
    Route::post('borrow', [BorrowController::class, 'borrow']);
    Route::post('return', [BorrowController::class, 'returnBook']);
    Route::get('borrow-records', [BorrowController::class, 'index']);

    // Users
    Route::get('users', function () {
        return \App\Models\User::all();
    });
});
