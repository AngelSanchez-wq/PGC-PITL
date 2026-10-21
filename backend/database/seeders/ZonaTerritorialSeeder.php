<?php

namespace Database\Seeders;

use App\Models\ZonaTerritorial;
use Illuminate\Database\Seeder;

class ZonaTerritorialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $zonas = ['Urbana', 'Rural'];

        foreach ($zonas as $nombre) {
            ZonaTerritorial::firstOrCreate(
                ['nombre' => $nombre]
            );
        }
    }
}
