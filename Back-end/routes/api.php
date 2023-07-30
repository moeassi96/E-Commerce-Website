<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartItemController;
use Illuminate\Support\Facades\DB;



Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});


Route::post('/add-cart/{user_id}', [CartController::class, 'addCart']);
Route::get('/get-cart-id/{user_id}', [CartController::class, 'getCartId']);


Route::post('/add-to-cart', [CartItemController::class, 'addItemToCart']);
Route::get('/cart-items/{cart_id}', [CartItemController::class, 'getCartItems']);
Route::delete('/delete-cart-item/{cart_id}/{product_id}', [CartItemController::class, 'deleteCartItem']);
Route::delete('/reset-cart-items/{cart_id}', [CartItemController::class, 'deleteMyCartItems']);


Route::get('/getallproducts', [ProductController::class, 'allProducts']);
Route::get('/getallproducts-cat', [ProductController::class, 'allProductsWithCategory']);
Route::delete('/deleteproduct/{product_id}', [ProductController::class, 'deleteProduct']);
Route::post('/addProduct', [ProductController::class, 'addProduct']);




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



