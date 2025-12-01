<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BookCategoryController;
use App\Http\Controllers\Api\BorrowController;

Route::get('categories', [BookCategoryController::class, 'index']);
Route::apiResource('books', BookController::class);

Route::post('borrow', [BorrowController::class, 'borrow']);
Route::post('return', [BorrowController::class, 'returnBook']);
Route::get('borrow-records', [BorrowController::class, 'index']);
