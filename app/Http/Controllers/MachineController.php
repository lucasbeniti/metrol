<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Machine;

class MachineController extends Controller
{
    public function index () {
        return Inertia::render('machines', [
            'machines' => Machine::with('operation')->get()
        ]);
    }
}
