<?php

namespace App\Http\Controllers;

use App\Models\SolicitudGobernanza;
use App\Models\ZonaTerritorial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SolicitudGobernanzaController extends Controller
{
    /**
     * Lista todas las solicitudes de gobernanza registradas.
     */
    public function index(): JsonResponse
    {
        $solicitudes = SolicitudGobernanza::with('zonaTerritorial')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($solicitudes, 200);
    }

    /**
     * Registra una nueva solicitud de gobernanza.
     * HU-09: Registrar solicitud de gobernanza de punta a punta.
     */
    public function store(Request $request): JsonResponse
    {
        // TODO: Pendiente autenticación JWT y vincular usuario solicitante.

        $validated = $request->validate([
            'zona_territorial_id' => 'required|integer|exists:zonas_territoriales,id',
            'asunto' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'estado' => 'nullable|string|max:50',
        ], [
            'zona_territorial_id.required' => 'La zona territorial es obligatoria.',
            'zona_territorial_id.exists' => 'La zona territorial seleccionada no existe.',
            'asunto.required' => 'El asunto de la solicitud es obligatorio.',
            'descripcion.required' => 'La descripción de la solicitud es obligatoria.',
        ]);

        if (empty($validated['estado'])) {
            $validated['estado'] = 'Pendiente';
        }

        $solicitud = SolicitudGobernanza::create($validated);
        $solicitud->load('zonaTerritorial');

        return response()->json([
            'mensaje' => 'Solicitud de gobernanza registrada exitosamente',
            'data' => $solicitud,
        ], 201);
    }

    /**
     * Consulta el detalle de una solicitud de gobernanza.
     */
    public function show(int $id): JsonResponse
    {
        $solicitud = SolicitudGobernanza::with('zonaTerritorial')->find($id);

        if (!$solicitud) {
            return response()->json([
                'mensaje' => 'Solicitud de gobernanza no encontrada',
            ], 404);
        }

        return response()->json($solicitud, 200);
    }

    /**
     * Retorna el catálogo de zonas territoriales disponibles.
     */
    public function zonas(): JsonResponse
    {
        $zonas = ZonaTerritorial::orderBy('nombre', 'asc')->get();
        return response()->json($zonas, 200);
    }
}
