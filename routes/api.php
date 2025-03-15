<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




Route::get('/list', [RegisterController::class, 'index']);
Route::delete('/users/{id}', [RegisterController    ::class, 'destroy']);
Route::put('/users/{id}', [RegisterController::class, 'update']);
Route::get('/search/users', [RegisterController::class, 'search']);