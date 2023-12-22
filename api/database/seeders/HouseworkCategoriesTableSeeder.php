<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HouseworkCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            '朝の準備',
            '料理',
            '洗濯',
            'お風呂の準備',
            '掃除 (お風呂場)',
            '掃除 (トイレ)',
            '掃除 (キッチン)',
            '掃除 (家全体)',
            'ゴミ捨て',
            '家庭内の雑用',
            '子供・学校',
            'ペット関連',
            '介護',
        ];

        foreach ($categories as $category) {
            DB::table('mst_housework_categories')->insert([
                'name' => $category,
            ]);
        }
    }
}
