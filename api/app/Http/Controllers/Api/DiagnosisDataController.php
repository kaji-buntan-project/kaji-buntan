<?php

namespace App\Http\Controllers\Api;

use App\OpenApi\RequestBodies\PostDiagnosisDataRequestBody;
use App\Http\Controllers\Controller;
use Vyuldashev\LaravelOpenApi\Attributes as OpenApi;

use App\Services\DiagnosisDataService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

#[OpenApi\PathItem]
#[OpenApi\Collection(['default'])]
class DiagnosisDataController extends Controller
{
    private $diagnosisDataService;

    public function __construct(DiagnosisDataService $diagnosisDataService)
    {
        $this->diagnosisDataService = $diagnosisDataService;
    }
    /**
     * 診断データを保存する
     */
    #[OpenApi\Operation(tags: ['DiagnosisData'])]
    #[OpenApi\RequestBody(factory: PostDiagnosisDataRequestBody::class)]
    public function store(Request $request)
    {
        // Validate the incoming JSON data
        $data = $request->validate([
            'houseworks' => 'required|array',
            'houseworks.*.name' => 'required|string',
            'houseworks.*.category' => 'required|string',
            'houseworks.*.myEffort' => 'required|integer',
            'houseworks.*.myDuration' => 'required|integer',
            'houseworks.*.partnerEffort' => 'required|integer',
            'houseworks.*.partnerDuration' => 'required|integer',
            'houseworks.*.myNowParticipates' => 'required|integer',
            'houseworks.*.partnerNowParticipates' => 'required|integer',
            'houseworks.*.myLeastRepartitionParticipates' => 'required|integer',
            'houseworks.*.partnerLeastRepartitionParticipates' => 'required|integer',
            'houseworks.*.myAdjustedRepartitionParticipates' => 'required|integer',
            'houseworks.*.partnerAdjustedRepartitionParticipates' => 'required|integer',
        ]);

        try {
            DB::beginTransaction();

            // Get the authenticated user's app ID from the cookie
            $appId = Cookie::get('cookie_id');

            // Use the DiagnosisDataService to store diagnosis data
            if ($this->diagnosisDataService->storeDiagnosisData($data, $appId)) {
                DB::commit();
                return response()->json(['message' => 'Diagnosis saved successfully'], 201);
            } else {
                DB::rollBack();
                return response()->json(['error' => 'Error saving diagnosis'], 500);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error($e);
            // Handle the exception, log or respond with an error message
            return response()->json(['error' => 'Error saving diagnosis'], 500);
        }
    }
}