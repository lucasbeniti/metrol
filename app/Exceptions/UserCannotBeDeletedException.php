<?php

namespace App\Exceptions;

use Exception;

class UserCannotBeDeletedException extends Exception
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir um usuário que possui registros de logs ou chamados de metrologia.');
    }
}