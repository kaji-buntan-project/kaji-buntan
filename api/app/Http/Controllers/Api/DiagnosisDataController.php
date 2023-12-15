<?php

namespace App\Http\Controllers\Api;

use App\OpenApi\RequestBodies\PostDiagnosisDataRequestBody;
use App\Http\Controllers\Controller;
use Vyuldashev\LaravelOpenApi\Attributes as OpenApi;

#[OpenApi\PathItem]
#[OpenApi\Collection(['default'])]
class DiagnosisDataController extends Controller
{
    /**
     * 診断データを保存する
     */
    #[OpenApi\Operation(tags: ['DiagnosisData'])]
    #[OpenApi\RequestBody(factory: PostDiagnosisDataRequestBody::class)]
    public function store()
    {
    }
}