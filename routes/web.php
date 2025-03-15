<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RegisterController;
use App\Models\User;
// Auth::routes();

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');

Route::post('/register', [RegisterController::class, 'store'])->name('register.store');


