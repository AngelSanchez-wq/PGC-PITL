<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstitucionEducativa extends Model
{
    protected $fillable = ['nombre', 'zona_territorial', 'numero_estudiantes'];
}
