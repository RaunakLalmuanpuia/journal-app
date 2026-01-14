<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SocialController;

Route::get('/', function () {
    return Inertia::render('Frontend/Home/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Backend/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/demo', function () {
    return Inertia::render('Frontend/Demo/Index', [

    ]);
});

Route::get('/free-plan', function () {
    return Inertia::render('Frontend/FreePlan/Index', [

    ]);
});

Route::get('/paid-plan', function () {
    return Inertia::render('Frontend/PaidPlan/Index', [

    ]);
});
Route::get('/story', function () {
    return Inertia::render('Frontend/Story/Index', [

    ]);
});


Route::get('auth/google', [SocialController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [SocialController::class, 'handleGoogleCallback']);

require __DIR__.'/auth.php';
