<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MstHouseworksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $houseworksSeed = [
            // 朝の準備 (Morning Preparation)
            ['name' => '子供を起こす', 'mst_housework_category_id' => 1],
            ['name' => '朝ごはん用意', 'mst_housework_category_id' => 1],
            ['name' => '新聞とる', 'mst_housework_category_id' => 1],
        
            // 料理 (Cooking)
            ['name' => '献立決めて買い物', 'mst_housework_category_id' => 2],
            ['name' => '冷蔵庫に入れる', 'mst_housework_category_id' => 2],
            ['name' => '料理する', 'mst_housework_category_id' => 2],
            ['name' => '盛り付け', 'mst_housework_category_id' => 2],
            ['name' => 'テーブル拭く', 'mst_housework_category_id' => 2],
            ['name' => '配膳', 'mst_housework_category_id' => 2],
            ['name' => '食器片付ける', 'mst_housework_category_id' => 2],
            ['name' => '食器用洗剤の購入', 'mst_housework_category_id' => 2],
            ['name' => 'まな板除菌・漂白', 'mst_housework_category_id' => 2],
        
            // 洗濯 (Laundry)
            ['name' => 'フィルターのホコリを取る', 'mst_housework_category_id' => 3],
            ['name' => '洗濯洗剤の購入', 'mst_housework_category_id' => 3],
            ['name' => '漂白剤、柔軟剤の購入', 'mst_housework_category_id' => 3],
            ['name' => '洗濯機の掃除', 'mst_housework_category_id' => 3],
            ['name' => '洗濯物を干す', 'mst_housework_category_id' => 3],
            ['name' => '洗濯物を取り込む', 'mst_housework_category_id' => 3],
            ['name' => '洗濯物を畳む', 'mst_housework_category_id' => 3],
        
            // お風呂の準備 (Bath Preparation)
            ['name' => 'お風呂を入れる', 'mst_housework_category_id' => 4],
            ['name' => 'シャンプー等の買い出し', 'mst_housework_category_id' => 4],
            ['name' => 'バスタオルの回収・交換', 'mst_housework_category_id' => 4],
        
            // 掃除 (お風呂場) (Cleaning - Bathroom)
            ['name' => '浴槽を洗う', 'mst_housework_category_id' => 5],
            ['name' => '壁ドア・鏡・手すりを洗う', 'mst_housework_category_id' => 5],
            ['name' => '床を洗う', 'mst_housework_category_id' => 5],
            ['name' => '髪の毛取ってネット交換', 'mst_housework_category_id' => 5],
            ['name' => '排水溝を洗う', 'mst_housework_category_id' => 5],
        
            // 掃除 (トイレ) (Cleaning - Toilet)
            ['name' => 'トイレの掃除', 'mst_housework_category_id' => 6],
            ['name' => '壁・床・棚を拭く', 'mst_housework_category_id' => 6],
            ['name' => 'トイレマットの交換', 'mst_housework_category_id' => 6],
            ['name' => 'トイレットペーパーの購入', 'mst_housework_category_id' => 6],
            ['name' => 'トイレ洗剤の購入・補充', 'mst_housework_category_id' => 6],
        
            // 掃除 (キッチン) (Cleaning - Kitchen)
            ['name' => '食器洗う', 'mst_housework_category_id' => 7],
            ['name' => '食器を拭く', 'mst_housework_category_id' => 7],
            ['name' => 'シンクの水気を拭く', 'mst_housework_category_id' => 7],
            ['name' => '食器をしまう', 'mst_housework_category_id' => 7],
            ['name' => '調味料の量把握・補充', 'mst_housework_category_id' => 7],
            ['name' => 'キッチン台の片付け', 'mst_housework_category_id' => 7],
            ['name' => '調理器具をしまう', 'mst_housework_category_id' => 7],
            ['name' => 'ガス台・ごとくの拭き掃除', 'mst_housework_category_id' => 7],
            ['name' => '食洗器の掃除', 'mst_housework_category_id' => 7],
            ['name' => '炊飯器の掃除', 'mst_housework_category_id' => 7],
            ['name' => 'レンジ・オーブンの掃除', 'mst_housework_category_id' => 7],
            ['name' => 'トースターの掃除', 'mst_housework_category_id' => 7],
            ['name' => 'キッチン壁・床の拭き掃除', 'mst_housework_category_id' => 7],
            ['name' => '換気扇の掃除', 'mst_housework_category_id' => 7],
        
            // 掃除 (家全体) (Cleaning - Whole House)
            ['name' => '家中を掃除機かける', 'mst_housework_category_id' => 8],
            ['name' => '出しっ放しのものをしまう', 'mst_housework_category_id' => 8],
            ['name' => '玄関の掃除', 'mst_housework_category_id' => 8],
            ['name' => '靴を整頓', 'mst_housework_category_id' => 8],
            ['name' => '傘をしまう', 'mst_housework_category_id' => 8],
            ['name' => 'テレビ、テレビ台の掃除', 'mst_housework_category_id' => 8],
            ['name' => '床の掃除・モップかける', 'mst_housework_category_id' => 8],
            ['name' => '物の整理整頓', 'mst_housework_category_id' => 8],
            ['name' => '子供部屋の掃除', 'mst_housework_category_id' => 8],
        
            // ゴミ捨て (Garbage Disposal)
            ['name' => 'ゴミ集める・分ける', 'mst_housework_category_id' => 9],
            ['name' => 'ペットボトルフィルムはがす', 'mst_housework_category_id' => 9],
            ['name' => 'ゴミ出し', 'mst_housework_category_id' => 9],
            ['name' => 'ゴミ箱にゴミ袋装着', 'mst_housework_category_id' => 9],
            ['name' => 'ダンボールをつぶして捨てる', 'mst_housework_category_id' => 9],
        
            // 家庭内の雑用 (Household Chores)
            ['name' => '家族のスケジュール管理', 'mst_housework_category_id' => 10],
            ['name' => '郵便物を取りに行く', 'mst_housework_category_id' => 10],
            ['name' => '郵便物の仕分け・管理', 'mst_housework_category_id' => 10],
            ['name' => '米・ビールの補充', 'mst_housework_category_id' => 10],
            ['name' => '日用品の買い足し・補充', 'mst_housework_category_id' => 10],
            ['name' => 'アイロン', 'mst_housework_category_id' => 10],
            ['name' => '植物に水やり', 'mst_housework_category_id' => 10],
            ['name' => '加湿器に水入れる', 'mst_housework_category_id' => 10],
        
            // 子供・学校 (Children and School)
            ['name' => '交友の把握・管理', 'mst_housework_category_id' => 11],
            ['name' => '勉強みる', 'mst_housework_category_id' => 11],
            ['name' => '行事ごとの持ち物把握', 'mst_housework_category_id' => 11],
            ['name' => 'スマホ・ゲーム時間の管理', 'mst_housework_category_id' => 11],
            ['name' => '習い事の送迎', 'mst_housework_category_id' => 11],
            ['name' => '水筒を洗う', 'mst_housework_category_id' => 11],
            ['name' => '体操服を洗う', 'mst_housework_category_id' => 11],
            ['name' => 'テストやプリントの管理', 'mst_housework_category_id' => 11],
            ['name' => '学校行事に参加', 'mst_housework_category_id' => 11],
            ['name' => '学校のPTA活動に参加', 'mst_housework_category_id' => 11],
            ['name' => '地域集会に参加', 'mst_housework_category_id' => 11],
            ['name' => '保護者会に参加', 'mst_housework_category_id' => 11],
            ['name' => '写真の整理整頓', 'mst_housework_category_id' => 11],
        
            // ペット関連 (Pet-related)
            ['name' => '朝の散歩', 'mst_housework_category_id' => 12],
            ['name' => '夕方の散歩', 'mst_housework_category_id' => 12],
            ['name' => '餌をやる', 'mst_housework_category_id' => 12],
            ['name' => '餌の購入', 'mst_housework_category_id' => 12],
            ['name' => '遊ぶ', 'mst_housework_category_id' => 12],
            ['name' => '毛並みを整える', 'mst_housework_category_id' => 12],
        
            // 介護 (Care)
            ['name' => '訪問介護・デイケアのお迎え', 'mst_housework_category_id' => 13],
            ['name' => '食事の手伝い', 'mst_housework_category_id' => 13],
            ['name' => 'ベッド周りの整理整頓', 'mst_housework_category_id' => 13],
            ['name' => 'トイレの介助', 'mst_housework_category_id' => 13],
            ['name' => '外出の介助', 'mst_housework_category_id' => 13],
            ['name' => '通院の手伝い', 'mst_housework_category_id' => 13],
        ];        

        // Insert data into the mst_houseworks table
        DB::table('mst_houseworks')->insert($houseworksSeed);
    }
}
