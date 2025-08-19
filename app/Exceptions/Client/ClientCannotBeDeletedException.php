<?php

namespace App\Exceptions\Client;

use App\Exceptions\CannotBeDeletedException;

class ClientCannotBeDeletedException extends CannotBeDeletedException
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir um cliente que possui centros de custo associados.');
    }
}