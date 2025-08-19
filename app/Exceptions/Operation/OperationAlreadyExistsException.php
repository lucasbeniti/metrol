<?php

namespace App\Exceptions\Operation;

use App\Exceptions\AlreadyExistsException;

class OperationAlreadyExistsException extends AlreadyExistsException
{
    public function __construct()
    {
        parent::__construct('Já existe uma operação com esse código.');
    }
}