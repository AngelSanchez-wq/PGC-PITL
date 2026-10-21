<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SolicitudGobernanza extends Model
{
    use HasFactory;

    protected $table = 'solicitudes_gobernanza';

    // TODO: Pendiente autenticación JWT y asociación con usuario funcionario/ciudadano autenticado.
    protected $fillable = [
        'zona_territorial_id',
        'asunto',
        'descripcion',
        'estado',
    ];

    /**
     * Relación con la zona territorial de la solicitud.
     */
    public function zonaTerritorial(): BelongsTo
    {
        return $this->belongsTo(ZonaTerritorial::class, 'zona_territorial_id');
    }
}
