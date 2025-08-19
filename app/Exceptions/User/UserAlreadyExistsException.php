<?php

namespace App\Exceptions\User;

use App\Exceptions\AlreadyExistsException;

class UserAlreadyExistsException extends AlreadyExistsException
{
    public function __construct()
    {
        parent::__construct('Já existe um usuário com essa identificação.');
    }
}