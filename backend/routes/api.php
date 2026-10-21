<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InstitucionEducativaController;
use App\Http\Controllers\SolicitudGobernanzaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoints de Instituciones Educativas (Capacidad 1)
Route::get('/instituciones', [InstitucionEducativaController::class, 'index']);
Route::post('/instituciones', [InstitucionEducativaController::class, 'store']);
Route::get('/instituciones/estadisticas', [InstitucionEducativaController::class, 'estadisticas']);
Route::get('/instituciones/{id}', [InstitucionEducativaController::class, 'show']);

// Endpoints de Gobernanza Territorial (Capacidad 2 - HU-09)
// TODO: Pendiente autenticación JWT para proteger rutas de radicación y consulta.
Route::get('/zonas', [SolicitudGobernanzaController::class, 'zonas']);
Route::get('/solicitudes', [SolicitudGobernanzaController::class, 'index']);
Route::post('/solicitudes', [SolicitudGobernanzaController::class, 'store']);
Route::get('/solicitudes/{id}', [SolicitudGobernanzaController::class, 'show']);