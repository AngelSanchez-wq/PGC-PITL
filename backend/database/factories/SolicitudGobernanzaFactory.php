<?php

namespace Database\Factories;

use App\Models\SolicitudGobernanza;
use App\Models\ZonaTerritorial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SolicitudGobernanza>
 */
class SolicitudGobernanzaFactory extends Factory
{
    protected $model = SolicitudGobernanza::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'zona_territorial_id' => ZonaTerritorial::firstOrCreate(['nombre' => 'Rural'])->id,
            'asunto' => '[Ejemplo] ' . fake()->sentence(4),
            'descripcion' => '[Ejemplo] Descripción de prueba para verificación del sistema.',
            'estado' => 'Pendiente',
        ];
    }
}
