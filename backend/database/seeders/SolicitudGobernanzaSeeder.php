<?php

namespace Database\Seeders;

use App\Models\SolicitudGobernanza;
use App\Models\ZonaTerritorial;
use Illuminate\Database\Seeder;

class SolicitudGobernanzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $urbana = ZonaTerritorial::firstOrCreate(['nombre' => 'Urbana']);
        $rural = ZonaTerritorial::firstOrCreate(['nombre' => 'Rural']);

        $ejemplos = [
            [
                'zona_territorial_id' => $rural->id,
                'asunto' => '[Ejemplo] Solicitud de adecuación de vía veredal',
                'descripcion' => '[Ejemplo] Se requiere nivelación de terreno y mantenimiento de cunetas para transporte escolar.',
                'estado' => 'Pendiente',
            ],
            [
                'zona_territorial_id' => $urbana->id,
                'asunto' => '[Ejemplo] Revisión de alumbrado público comunal',
                'descripcion' => '[Ejemplo] Mantenimiento preventivo de luminarias en el perímetro del parque principal.',
                'estado' => 'En Revisión',
            ],
            [
                'zona_territorial_id' => $rural->id,
                'asunto' => '[Ejemplo] Apoyo para transporte escolar en temporada de lluvias',
                'descripcion' => '[Ejemplo] Articulación de ruta veredal de apoyo para sedes rurales.',
                'estado' => 'Pendiente',
            ],
        ];

        foreach ($ejemplos as $item) {
            SolicitudGobernanza::firstOrCreate(
                ['asunto' => $item['asunto']],
                $item
            );
        }
    }
}
