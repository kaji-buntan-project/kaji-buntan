<?php

namespace App\OpenApi\Schemas;

use GoldSpecDigital\ObjectOrientedOAS\Contracts\SchemaContract;
use GoldSpecDigital\ObjectOrientedOAS\Objects\Schema;
use Vyuldashev\LaravelOpenApi\Contracts\Reusable;
use Vyuldashev\LaravelOpenApi\Factories\SchemaFactory;

class PostDiagnosisDataRequestBodySchema extends SchemaFactory implements Reusable
{
    public function build(): SchemaContract
    {
        return Schema::object('PostDiagnosisDataRequestBodySchema')
            ->properties(
                Schema::array('houseworks')
                    ->description('診断データ')
                    ->items($this->housework())
            );
    }

    private function housework(): SchemaContract
    {
        return Schema::object()
            ->properties(
                Schema::string('name')
                    ->description('家事の名前')
                    ->example('朝ごはん用意'),
                Schema::string('category')
                    ->description('家事の分類')
                    ->example('朝の準備'),
                Schema::integer('myEffort')
                    ->description('私のその家事の評価')
                    ->enum(1, 2, 3)
                    ->example(3),
                Schema::integer('myDuration')
                    ->description('私のその家事にかかる時間')
                    ->example(30),
                Schema::integer('partnerEffort')
                    ->description('パートナーのその家事の評価')
                    ->enum(1, 2, 3)
                    ->example(1),
                Schema::integer('partnerDuration')
                    ->description('パートナーがその家事にかかる時間')
                    ->example(20),
                Schema::integer('myNowParticipates')
                    ->description('今の私の分担回数')
                    ->example(4),
                Schema::integer('partnerNowParticipates')
                    ->description('今のパートナーの分担回数')
                    ->example(2),
                Schema::integer('myLeastRepartitionParticipates')
                    ->description('私の少し理想的な分担回数')
                    ->example(3),
                Schema::integer('partnerLeastRepartitionParticipates')
                    ->description('パートナーの少し理想的な分担回数')
                    ->example(3),
                Schema::integer('myAdjustedRepartitionParticipates')
                    ->description('私の理想的な分担回数')
                    ->example(3),
                Schema::integer('partnerAdjustedRepartitionParticipates')
                    ->description('パートナーの理想的な分担回数')
                    ->example(3),
            );
    }
}