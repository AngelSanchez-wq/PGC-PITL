<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ZonaTerritorial extends Model
{
    protected $table = 'zonas_territoriales';

    protected $fillable = [
        'nombre',
    ];

    /**
     * Instituciones educativas pertenecientes a esta zona territorial.
     */
    public function institucionesEducativas(): HasMany
    {
        return $this->hasMany(InstitucionEducativa::class, 'zona_territorial_id');
    }

    /**
     * Solicitudes de gobernanza radicadas en esta zona territorial.
     */
    public function solicitudesGobernanza(): HasMany
    {
        return $this->hasMany(SolicitudGobernanza::class, 'zona_territorial_id');
    }
}
