<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register',[AuthController::class,'register'])->name('register');
Route::post('login',[AuthController::class,'login'])->name('login');



        Route::get('/pasien',[PasienController::class,'index'])->name('index');
        Route::get('/pasien/{id}',[PasienController::class,'show'])->name('show');
        Route::post('/pasien',[PasienController::class,'store'])->name('store');
        Route::put('/pasien/{id}',[PasienController::class,'update'])->name('update');
        Route::delete('/pasien/{id}',[PasienController::class,'destroy'])->name('destroy');

