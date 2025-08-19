<?php

namespace App\Exceptions\Machine;

use App\Exceptions\CannotBeDeletedException;

class MachineCannotBeDeletedException extends CannotBeDeletedException
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir uma máquina que possui chamados de metrologia associadas.');
    }
}