<?php
// app/Exceptions/ApiException.php

namespace App\Exceptions;

use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ApiException extends Exception
{
    public function report()
    {
        return false;
    }
    public function render($request)
    {
        return response()->json(['error' => $this->getMessage()], $this->getCode());
    }
}
