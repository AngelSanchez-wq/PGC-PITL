<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('solicitudes_gobernanza', function (Blueprint $table) {
            $table->id();
            $table->foreignId('zona_territorial_id')
                ->constrained('zonas_territoriales')
                ->cascadeOnDelete();
            $table->string('asunto');
            $table->text('descripcion');
            $table->string('estado', 50)->default('Pendiente');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('solicitudes_gobernanza');
    }
};
