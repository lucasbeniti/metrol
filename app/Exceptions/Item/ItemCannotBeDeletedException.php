<?php

namespace App\Exceptions\Item;

use App\Exceptions\CannotBeDeletedException;

class ItemCannotBeDeletedException extends CannotBeDeletedException
{
    public function __construct()
    {
        parent::__construct('Não é possível excluir um item que possui operações associadas.');
    }
}