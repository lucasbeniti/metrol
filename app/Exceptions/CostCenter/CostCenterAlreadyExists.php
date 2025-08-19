<?php

namespace App\Exceptions\CostCenter;

use App\Exceptions\AlreadyExistsException;

class CostCenterAlreadyExistsException extends AlreadyExistsException
{
    public function __construct()
    {
        parent::__construct('Já existe um centro de custo com esse código.');
    }
}