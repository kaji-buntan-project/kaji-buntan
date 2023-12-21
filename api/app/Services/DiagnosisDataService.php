<?php

// app/Services/DiagnosisDataService.php

namespace App\Services;

use App\Models\DiagnosisHistory;
use App\Models\NowDivisionAndRating;
use App\Models\MstHousework;
use App\Models\MstHouseworkCategory;
use App\Models\IdealDivision;
use App\Models\LittleIdealDivision;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class DiagnosisDataService
{
    /**
     * Store diagnosis data in the database.
     *
     * @param array $data The diagnosis data to be stored.
     * @param string $appId The application ID associated with the user.
     * @return bool True if the data was successfully stored, false otherwise.
     */
    public function storeDiagnosisData(array $data, string $appId)
    {
        try {
            // Get or create the user based on the app ID
            $user = $this->getUser($appId);

            // Create a new diagnosis history record
            $diagnosisHistory = $this->createDiagnosisHistory($user);

            // Store housework data for each entry in the 'houseworks' array
            foreach ($data['houseworks'] as $houseworkData) {
                $this->storeHouseworkData($houseworkData, $user, $diagnosisHistory);
            }

            return true;
        } catch (\Exception $e) {
            Log::error($e);
            return false;
        }
    }

    /**
     * Get or create a user based on the app ID.
     *
     * @param string $appId The application ID associated with the user.
     * @return User The user instance.
     */
    private function getUser(string $appId)
    {
        return User::firstOrCreate(['app_id' => $appId]);
    }

    /**
     * Create a new diagnosis history record.
     *
     * @param User $user The user associated with the diagnosis history.
     * @return DiagnosisHistory The created diagnosis history instance.
     */
    private function createDiagnosisHistory(User $user)
    {
        $diagnosisHistory = new DiagnosisHistory();
        $diagnosisHistory->user_id = $user->id;
        $diagnosisHistory->diagnosis_times = $this->getNextDiagnosisTimes($user->id);
        $diagnosisHistory->save();

        return $diagnosisHistory;
    }

    /**
     * Store housework data in the database.
     *
     * @param array $houseworkData The housework data to be stored.
     * @param User $user The user associated with the housework data.
     * @param DiagnosisHistory $diagnosisHistory The diagnosis history associated with the housework data.
     */
    private function storeHouseworkData(array $houseworkData, User $user, DiagnosisHistory $diagnosisHistory)
    {
        // Get or create housework and category records
        $category = MstHouseworkCategory::where(['name' => $houseworkData['category']])->first();
        if (!$category) {
            throw new \Exception("Housework Category is not exist");
        }
        
        $housework = MstHousework::where(['mst_housework_category_id' => $category->id, 'name' => $houseworkData['name']])->first();
        if (!$housework) {
            throw new \Exception("Housework is not exist");
        }
        // Save the current division and rating
        $nowDivisionAndRating = NowDivisionAndRating::create([
            'diagnosis_history_id' => $diagnosisHistory->id,
            'user_id' => $user->id,
            'mst_housework_id' => $housework->id,
            'mst_housework_category_id' => $category->id,

            'users_times' => $houseworkData['myNowParticipates'],
            'users_rate' => $houseworkData['myEffort'],
            'users_minutes' => $houseworkData['myDuration'],

            'partners_times' => $houseworkData['partnerNowParticipates'],
            'partners_rate' => $houseworkData['partnerEffort'],
            'partners_minutes' => $houseworkData['partnerDuration'],
        ]);

        // Insert ideal divisions based on now divisions and ratings.
        $idealDivisionData = [
            'now_division_and_rating_id' => $nowDivisionAndRating->id,
            'users_times' =>  $houseworkData['myAdjustedRepartitionParticipates'],
            'partners_times' => $houseworkData['partnerAdjustedRepartitionParticipates'],
        ];
        IdealDivision::create($idealDivisionData);

        // Insert ideal divisions based on now divisions and ratings.
        $littleIdealDivisionData = [
            'now_division_and_rating_id' => $nowDivisionAndRating->id,
            'users_times' =>  $houseworkData['myLeastRepartitionParticipates'],
            'partners_times' => $houseworkData['partnerLeastRepartitionParticipates'],
        ];
        LittleIdealDivision::create($littleIdealDivisionData);
    }

    /**
     * Get the next diagnosis times for a user.
     *
     * @param int $userId The user ID.
     * @return int The next diagnosis times.
     */
    private function getNextDiagnosisTimes($userId)
    {
        // Get the latest diagnosis times for the user and increment by 1
        $latestDiagnosis = DiagnosisHistory::where('user_id', $userId)->latest('diagnosis_times')->first();
        return $latestDiagnosis ? $latestDiagnosis->diagnosis_times + 1 : 1;
    }
}