<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InstitucionEducativa; // Asegúrate de importar tu modelo

class InstitucionEducativaSeeder extends Seeder
{
    public function run(): void
    {
        // Puedes usar el modelo para insertar datos
        InstitucionEducativa::create([
            'nombre' => 'Institución Educativa Departamental San Juan',
            'zona_territorial' => 'Urbana',
            'numero_estudiantes' => 450,
        ]);

        InstitucionEducativa::create([
            'nombre' => 'Escuela Rural El Alto',
            'zona_territorial' => 'Rural',
            'numero_estudiantes' => 35,
        ]);
        
        // Puedes agregar más registros aquí
    }
}