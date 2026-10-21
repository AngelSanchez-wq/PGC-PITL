<?php

namespace Tests\Feature;

use App\Models\SolicitudGobernanza;
use App\Models\ZonaTerritorial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SolicitudGobernanzaTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Prueba 1: POST válido -> Retorna 201 y persiste el registro en la base de datos.
     */
    public function test_post_solicitud_valida_retorna_201_y_queda_en_bd(): void
    {
        $zona = ZonaTerritorial::create(['nombre' => 'Rural']);

        $payload = [
            'zona_territorial_id' => $zona->id,
            'asunto' => '[Ejemplo] Mantenimiento preventivo de vía veredal',
            'descripcion' => '[Ejemplo] Se solicita nivelación de la calzada para el paso seguro de rutas escolares.',
            'estado' => 'Pendiente',
        ];

        $response = $this->postJson('/api/solicitudes', $payload);

        $response->assertStatus(201)
            ->assertJsonPath('mensaje', 'Solicitud de gobernanza registrada exitosamente')
            ->assertJsonPath('data.asunto', $payload['asunto'])
            ->assertJsonPath('data.zona_territorial.nombre', 'Rural');

        $this->assertDatabaseHas('solicitudes_gobernanza', [
            'zona_territorial_id' => $zona->id,
            'asunto' => $payload['asunto'],
            'estado' => 'Pendiente',
        ]);
    }

    /**
     * Prueba 2: POST sin campos obligatorios -> Retorna 422 con errores de validación.
     */
    public function test_post_sin_campos_obligatorios_retorna_422(): void
    {
        $response = $this->postJson('/api/solicitudes', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['zona_territorial_id', 'asunto', 'descripcion']);
    }

    /**
     * Prueba 3: POST con zona_territorial_id inexistente -> Retorna 422 por clave foránea inválida.
     */
    public function test_post_con_zona_inexistente_retorna_422(): void
    {
        $payload = [
            'zona_territorial_id' => 99999, // Zona inexistente
            'asunto' => '[Ejemplo] Solicitud de alumbrado',
            'descripcion' => '[Ejemplo] Detalle de prueba',
        ];

        $response = $this->postJson('/api/solicitudes', $payload);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['zona_territorial_id']);
    }

    /**
     * Prueba 4: GET /api/solicitudes -> Lista las solicitudes registradas con código 200.
     */
    public function test_get_lista_las_solicitudes(): void
    {
        $zona = ZonaTerritorial::create(['nombre' => 'Urbana']);

        SolicitudGobernanza::create([
            'zona_territorial_id' => $zona->id,
            'asunto' => '[Ejemplo] Solicitud de prueba 1',
            'descripcion' => '[Ejemplo] Descripción de prueba 1',
            'estado' => 'Pendiente',
        ]);

        SolicitudGobernanza::create([
            'zona_territorial_id' => $zona->id,
            'asunto' => '[Ejemplo] Solicitud de prueba 2',
            'descripcion' => '[Ejemplo] Descripción de prueba 2',
            'estado' => 'En Revisión',
        ]);

        $response = $this->getJson('/api/solicitudes');

        $response->assertStatus(200)
            ->assertJsonCount(2)
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'zona_territorial_id',
                    'asunto',
                    'descripcion',
                    'estado',
                    'created_at',
                    'updated_at',
                    'zona_territorial' => [
                        'id',
                        'nombre',
                    ],
                ],
            ]);
    }
}
