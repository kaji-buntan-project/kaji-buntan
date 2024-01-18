<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\ApiException;
use App\OpenApi\RequestBodies\PostDiagnosisDataRequestBody;
use App\Http\Controllers\Controller;
use Vyuldashev\LaravelOpenApi\Attributes as OpenApi;

use App\Services\DiagnosisDataService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

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
        try {
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error("Validation error for API URL: {$request->url()}.\n Errors: " . json_encode($e->errors(), JSON_UNESCAPED_UNICODE) . ".\n Request Parameters:: " . json_encode($request->all(), JSON_UNESCAPED_UNICODE));
            return response()->json(['errors' => $e->errors()], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        try {
            DB::beginTransaction();

            // Get the authenticated user's app ID from the cookie
            $appId = Cookie::get('cookie_id');
            if (!$appId) {
                throw new ApiException("The App ID is null.", 400);
            }
            // Use the DiagnosisDataService to store diagnosis data
            if ($this->diagnosisDataService->storeDiagnosisData($data, $appId)) {
                DB::commit();
                return response()->json(['message' => 'Diagnosis saved successfully'], 201);
            } else {
                DB::rollBack();
                throw new ApiException("Error saving diagnosis", 500);
            }
        }
        catch (ApiException $e) {
            DB::rollBack();
            Log::error("Error for API URL: {$request->url()}.\n Errors: " . json_encode($e->getMessage(), JSON_UNESCAPED_UNICODE) . ".\n Request Parameters:: " . json_encode($request->all()));
            return response()->json(['error' => 'Error saving diagnosis'], 500);
            throw $e;
        }
        catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error for API URL: {$request->url()}.\n Request Parameters:: " . json_encode($request->all(), JSON_UNESCAPED_UNICODE) . ".\n" . $e->__toString());
            return response()->json(['error' => 'Error saving diagnosis'], 500);
        }
        catch (\Throwable $e) {
            DB::rollBack();
            Log::error("Error for API URL: {$request->url()}.\n Request Parameters:: " . json_encode($request->all(), JSON_UNESCAPED_UNICODE) . ".\n" . $e->__toString());
            return response()->json(['error' => 'Error saving diagnosis'], 500);
        }
    }
}