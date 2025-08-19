<?php

namespace App\Exceptions\Operation;

use App\Exceptions\CannotBeDeletedException;

class OperationCannotBeDeletedException extends CannotBeDeletedException
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir uma operação que possui chamados de metrologia ou máquinas associadas.');
    }
}