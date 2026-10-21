<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('institucion_educativas', function (Blueprint $table) {
            $table->foreignId('zona_territorial_id')
                ->nullable()
                ->after('zona_territorial')
                ->constrained('zonas_territoriales')
                ->nullOnDelete();
        });

        // Asegurar que existan las zonas básicas para el relleno si no se han ejecutado los seeders aún
        $zonasBase = ['Urbana', 'Rural'];
        foreach ($zonasBase as $nombreZona) {
            if (!DB::table('zonas_territoriales')->where('nombre', $nombreZona)->exists()) {
                DB::table('zonas_territoriales')->insert([
                    'nombre' => $nombreZona,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Rellenar zona_territorial_id a partir de la columna de texto existente zona_territorial
        $zonas = DB::table('zonas_territoriales')->pluck('id', 'nombre');
        foreach ($zonas as $nombre => $id) {
            DB::table('institucion_educativas')
                ->where('zona_territorial', $nombre)
                ->update(['zona_territorial_id' => $id]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('institucion_educativas', function (Blueprint $table) {
            $table->dropForeign(['zona_territorial_id']);
            $table->dropColumn('zona_territorial_id');
        });
    }
};
