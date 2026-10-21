<?php

namespace App\Http\Controllers;

use App\Models\InstitucionEducativa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InstitucionEducativaController extends Controller
{
    /**
     * Retorna todas las instituciones educativas registradas.
     */
    public function index(): JsonResponse
    {
        $instituciones = InstitucionEducativa::orderBy('nombre', 'asc')->get();
        return response()->json($instituciones);
    }

    /**
     * Registra una nueva institución educativa.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'zona_territorial' => 'required|string|in:Urbana,Rural',
            'numero_estudiantes' => 'required|integer|min:0',
        ]);

        $institucion = InstitucionEducativa::create($validated);

        return response()->json([
            'mensaje' => 'Institución educativa registrada exitosamente',
            'data' => $institucion,
        ], 201);
    }

    /**
     * Obtiene el detalle de una institución educativa por ID.
     */
    public function show(int $id): JsonResponse
    {
        $institucion = InstitucionEducativa::find($id);

        if (!$institucion) {
            return response()->json(['mensaje' => 'Institución no encontrada'], 404);
        }

        return response()->json($institucion);
    }

    /**
     * Retorna métricas consolidadas para el módulo de inicio/gobernanza.
     */
    public function estadisticas(): JsonResponse
    {
        $total = InstitucionEducativa::count();
        $totalEstudiantes = InstitucionEducativa::sum('numero_estudiantes');
        $urbanas = InstitucionEducativa::where('zona_territorial', 'Urbana')->count();
        $rurales = InstitucionEducativa::where('zona_territorial', 'Rural')->count();

        return response()->json([
            'total_instituciones' => $total,
            'total_estudiantes' => (int) $totalEstudiantes,
            'distribucion_zonas' => [
                'urbana' => $urbanas,
                'rural' => $rurales,
            ],
        ]);
    }
}