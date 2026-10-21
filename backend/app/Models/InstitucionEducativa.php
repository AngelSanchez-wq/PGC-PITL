<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InstitucionEducativa extends Model
{
    protected $fillable = [
        'nombre',
        'zona_territorial',
        'zona_territorial_id',
        'numero_estudiantes',
    ];

    /**
     * Zona territorial a la que pertenece la institución.
     */
    public function zonaTerritorial(): BelongsTo
    {
        return $this->belongsTo(ZonaTerritorial::class, 'zona_territorial_id');
    }
}
