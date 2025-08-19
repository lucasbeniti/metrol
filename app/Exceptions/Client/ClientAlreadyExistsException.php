<?php

namespace App\Exceptions\Client;

use App\Exceptions\AlreadyExistsException;

class ClientAlreadyExistsException extends AlreadyExistsException
{
    public function __construct()
    {
        parent::__construct('Já existe um cliente com esse código.');
    }
}