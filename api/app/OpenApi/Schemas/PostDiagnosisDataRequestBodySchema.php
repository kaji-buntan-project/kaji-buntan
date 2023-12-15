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
                Schema::string('houseworkName')
                    ->description('家事の名前')
                    ->example('洗濯'),
                Schema::integer('nowUsersTimes')
                    ->description('現状の私の行う回数')
                    ->example(3),
                Schema::integer('nowPartnersTimes')
                    ->description('現状のパートナーの行う回数')
                    ->example(4),
                Schema::integer('usersRate')
                    ->description('私の評価')
                    ->enum(1,2,3)
                    ->example(1),
                Schema::integer('partnersRate')
                    ->description('パートナーの評価')
                    ->enum(1,2,3)
                    ->example(1),
                Schema::integer('usersMinutes')
                    ->description('私の家事にかかる時間')
                    ->example(30),
                Schema::integer('partnersMinutes')
                    ->description('パートナーの家事にかかる時間')
                    ->example(30),
                Schema::integer('usersLittleIdealDivisionTimes')
                    ->description('私の少し理想的な家事を行う回数')
                    ->example(4),
                Schema::integer('partnersLittleIdealDivisionTimes')
                    ->description('パートナーの少し理想的な家事を行う回数')
                    ->example(4),
                Schema::integer('usersIdealDivisionTimes')
                    ->description('私の理想的な家事を行う回数')
                    ->example(4),
                Schema::integer('partnersIdealDivisionTimes')
                    ->description('パートナーの理想的な家事を行う回数')
                    ->example(4),
            );
    }
}