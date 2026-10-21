<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InstitucionEducativa;

class InstitucionEducativaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $instituciones = [
            [
                'nombre' => 'Institución Educativa Departamental Nacionalizado de Lenguazaque (Sede Principal)',
                'zona_territorial' => 'Urbana',
                'numero_estudiantes' => 640,
            ],
            [
                'nombre' => 'IED Técnico Comercial de Lenguazaque',
                'zona_territorial' => 'Urbana',
                'numero_estudiantes' => 480,
            ],
            [
                'nombre' => 'Colegio Departamental San Juan Bautista',
                'zona_territorial' => 'Urbana',
                'numero_estudiantes' => 310,
            ],
            [
                'nombre' => 'Escuela Rural Gachaneca',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 65,
            ],
            [
                'nombre' => 'Escuela Rural Ramada Alta',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 42,
            ],
            [
                'nombre' => 'Escuela Rural Ramada Baja',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 58,
            ],
            [
                'nombre' => 'Centro Educativo Rural Siatama',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 84,
            ],
            [
                'nombre' => 'Escuela Rural Tibita',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 51,
            ],
            [
                'nombre' => 'Escuela Rural Salitre',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 39,
            ],
            [
                'nombre' => 'Escuela Rural Paunita',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 33,
            ],
            [
                'nombre' => 'Escuela Rural Faracavita',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 47,
            ],
            [
                'nombre' => 'Centro Educativo Rural El Espinal Carrizal',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 76,
            ],
            [
                'nombre' => 'Escuela Rural Chirvaneque',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 28,
            ],
            [
                'nombre' => 'Escuela Rural La Fragua',
                'zona_territorial' => 'Rural',
                'numero_estudiantes' => 34,
            ],
        ];

        foreach ($instituciones as $inst) {
            InstitucionEducativa::updateOrCreate(
                ['nombre' => $inst['nombre']],
                [
                    'zona_territorial' => $inst['zona_territorial'],
                    'numero_estudiantes' => $inst['numero_estudiantes'],
                ]
            );
        }
    }
}