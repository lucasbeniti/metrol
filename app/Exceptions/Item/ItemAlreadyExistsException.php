<?php

namespace App\Exceptions\Item;

use App\Exceptions\AlreadyExistsException;

class ItemAlreadyExistsException extends AlreadyExistsException
{
    public function __construct()
    {
        parent::__construct('Já existe um item com esse código.');
    }
}