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
        Schema::create('ideal_divisions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('now_division_and_rating_id')->comment('今の家事分担と評価ID');
            $table->unsignedInteger('users_times')->comment('理想的な私の行う回数');
            $table->unsignedInteger('partners_times')->comment('理想的なパートナーの行う回数');

            // foreign key 制約
            $table->foreign('now_division_and_rating_id')->references('id')->on('now_division_and_ratings');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ideal_divisions');
    }
};
