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
use App\Http\Controllers\PostController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\SupportTicketController;
use App\Http\Controllers\EnterpriseInquiryController;
use App\Http\Controllers\CommentController;



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

Route::middleware(['auth','role:Admin'])->prefix('admin')->group(function () {
    Route::get('/plans', [AdminPlanController::class, 'index'])->name('admin.plans.index');
    Route::get('/{user}/plans', [AdminPlanController::class, 'show'])->name('admin.plans.show');
});


Route::middleware(['auth','role:Admin'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::put('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.updateRole');
    Route::patch('/users/{user}/status', [UserController::class, 'toggleStatus'])->name('users.toggleStatus');
});



Route::resource('posts', PostController::class)->middleware(['auth', 'verified','role:Admin']);

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact',[]);
})->name('contact');


Route::get('/privacy', function () {
    return Inertia::render('Frontend/Privacy',[]);
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Frontend/Terms',[]);
})->name('terms');

Route::get('/cancellation', function () {
    return Inertia::render('Frontend/CancellationRefund',[]);
})->name('cancellation');

Route::get('/shipping-delivery', function () {
    return Inertia::render('Frontend/ShippingDelivery',[]);
})->name('shipping-delivery');


// Public Blog Routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{post:slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/internal/latest-posts', [BlogController::class, 'getLatestPostsJson'])
    ->name('internal.posts.latest');


Route::post('/posts/{post}/comments', [CommentController::class, 'store'])
    ->name('comments.store')
    ->middleware(['auth', 'verified']);

Route::post('/comments/{comment}/like', [CommentController::class, 'toggleLike'])
    ->middleware('auth')->name('comments.like');

Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');



//User Raise Support Ticker
Route::middleware(['auth'])->group(function () {
    Route::get('/help-support', [SupportTicketController::class, 'index'])->name('support.index');
    Route::post('/help-support', [SupportTicketController::class, 'store'])->name('support.store');
});
//Admin Support Ticket Index and Change status
Route::middleware(['auth','role:Admin'])->group(function () {
    Route::get('/admin/support', [SupportTicketController::class, 'adminIndex'])->name('admin.support.index');
    Route::patch('/admin/support/{ticket}/status', [SupportTicketController::class, 'updateStatus'])
        ->name('admin.support.updateStatus');
});

// User Send Inquiry about Enterprise Plan
Route::post('/enterprise-inquiry', [EnterpriseInquiryController::class, 'store'])
    ->name('enterprise.store');

// Admin Enterprise Plan Inquiry
Route::middleware(['auth','role:Admin'])->group(function () {
    Route::get('/admin/inquiries', [EnterpriseInquiryController::class, 'index'])->name('inquiries.index');

});


require __DIR__.'/auth.php';
