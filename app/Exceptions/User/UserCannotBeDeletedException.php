<?php

namespace App\Exceptions\User;

use App\Exceptions\CannotBeDeletedException;

class UserCannotBeDeletedException extends CannotBeDeletedException
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir um usuário que possui registros de logs ou chamados de metrologia.');
    }
}