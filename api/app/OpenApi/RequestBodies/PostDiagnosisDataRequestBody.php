<?php

declare(strict_types=1);

namespace App\OpenApi\RequestBodies;

use App\OpenApi\Schemas\PostDiagnosisDataRequestBodySchema;
use GoldSpecDigital\ObjectOrientedOAS\Objects\MediaType;
use GoldSpecDigital\ObjectOrientedOAS\Objects\RequestBody;
use Vyuldashev\LaravelOpenApi\Factories\RequestBodyFactory;

class PostDiagnosisDataRequestBody extends RequestBodyFactory
{
    public function build(): RequestBody
    {
        return RequestBody::create()
            ->content(
                MediaType::json()
                    ->schema(PostDiagnosisDataRequestBodySchema::ref())
            );
    }
}