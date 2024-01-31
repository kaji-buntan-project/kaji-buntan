<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('now_division_and_ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('diagnosis_history_id')->comment('診断履歴ID');
            $table->unsignedBigInteger('user_id')->comment('ユーザーID');
            $table->unsignedBigInteger('mst_housework_id')->comment('家事マスタID');
            $table->unsignedBigInteger('mst_housework_category_id')->comment('家事カテゴリマスタID');
            $table->unsignedInteger('users_times')->comment('現状の私の行う回数');
            $table->unsignedSmallInteger('users_rate')->comment('私の評価(1,2,3');
            $table->unsignedInteger('users_minutes')->comment('私の家事にかかる時間');
            $table->unsignedInteger('partners_times')->comment('現状のパートナーの行う回数');
            $table->unsignedSmallInteger('partners_rate')->comment('パートナーの評価(1,2,3');
            $table->unsignedInteger('partners_minutes')->comment('パートナーの家事にかかる時間');

            // foreign key 制約
            $table->foreign('diagnosis_history_id')->references('id')->on('diagnosis_histories');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('mst_housework_id')->references('id')->on('mst_houseworks');
            $table->foreign('mst_housework_category_id')->references('id')->on('mst_housework_categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('now_division_and_ratings');
    }
};
