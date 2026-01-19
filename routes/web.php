<?php


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SocialController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\GoogleDriveAuthController;
use App\Http\Controllers\UserPlanController;
use App\Http\Controllers\AdminPlanController;
use App\Http\Controllers\UserController;


Route::get('/', function () {
    return Inertia::render('Frontend/Home/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/demo', function () {
    return Inertia::render('Frontend/Demo/Index', []);
});

Route::get('/free-plan', function () {
    return Inertia::render('Frontend/FreePlan/Index', []);
});

Route::get('/paid-plan', function () {
    return Inertia::render('Frontend/PaidPlan/Index', []);
});
Route::get('/story', function () {
    return Inertia::render('Frontend/Story/Index', []);
});


Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('auth/google', [SocialController::class, 'redirectToGoogle'])->name('auth.google');
Route::get('auth/google/callback', [SocialController::class, 'handleGoogleCallback']);


Route::middleware('auth')->group(function () {

    Route::get('/pro/connect-drive', [GoogleDriveAuthController::class, 'redirect'])
        ->name('pro.connect.drive');

    Route::get('/pro/drive/callback', [GoogleDriveAuthController::class, 'callback']);
});


Route::middleware(['auth'])->group(function () {
    Route::get('/my-products', [UserPlanController::class, 'index'])->name('products.index');

});

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/plans', [AdminPlanController::class, 'index'])->name('admin.plans.index');
    Route::get('/{user}/plans', [AdminPlanController::class, 'show'])->name('admin.plans.show');
});


Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::put('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.updateRole');
    Route::patch('/users/{user}/status', [UserController::class, 'toggleStatus'])->name('users.toggleStatus');
});
require __DIR__.'/auth.php';
