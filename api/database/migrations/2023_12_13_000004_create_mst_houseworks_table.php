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
        Schema::create('mst_houseworks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mst_housework_category_id')->comment('家事カテゴリマスタID');
            $table->string('name')->comment('家事名');

            // foreign key 制約
            $table->foreign('mst_housework_category_id')->references('id')->on('mst_housework_categories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_houseworks');
    }
};
