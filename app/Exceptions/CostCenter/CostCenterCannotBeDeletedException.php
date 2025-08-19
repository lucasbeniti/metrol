<?php

namespace App\Exceptions\CostCenter;

use App\Exceptions\CannotBeDeletedException;

class CostCenterCannotBeDeletedException extends CannotBeDeletedException
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir um centro de custo que possui items associados.');
    }
}