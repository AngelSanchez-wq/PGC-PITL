<?php

namespace App\Http\Controllers;

use App\Models\InstitucionEducativa;

class InstitucionEducativaController extends Controller
{
    public function index()
    {
        return InstitucionEducativa::all();
    }
}