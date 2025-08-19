<?php

namespace App\Exceptions\Machine;

use App\Exceptions\AlreadyExistsException;

class MachineAlreadyExistsException extends AlreadyExistsException
{
    public function __construct()
    {
        parent::__construct('Já existe uma máquina com esse código.');
    }
}