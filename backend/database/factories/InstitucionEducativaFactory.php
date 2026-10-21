<?php

namespace Database\Factories;

use App\Models\InstitucionEducativa;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InstitucionEducativa>
 */
class InstitucionEducativaFactory extends Factory
{
    protected $model = InstitucionEducativa::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $veredas = [
            'Centro Urbano',
            'Gachaneca',
            'Ramada Alta',
            'Ramada Baja',
            'Siatama',
            'Tibita',
            'Salitre',
            'Paunita',
            'Faracavita',
            'Chirvaneque',
            'Espinal Carrizal',
            'La Fragua',
        ];

        $vereda = fake()->randomElement($veredas);
        $esUrbana = ($vereda === 'Centro Urbano');

        $prefijo = $esUrbana
            ? fake()->randomElement(['Colegio Departamental', 'Institución Educativa', 'Liceo Municipal'])
            : fake()->randomElement(['Escuela Rural', 'Centro Educativo Rural', 'Sede Educativa Rural']);

        return [
            'nombre' => "{$prefijo} {$vereda}",
            'zona_territorial' => $esUrbana ? 'Urbana' : 'Rural',
            'numero_estudiantes' => $esUrbana ? fake()->numberBetween(250, 850) : fake()->numberBetween(15, 120),
        ];
    }
}
