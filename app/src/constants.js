//家事分担比率導入前のallTasks
// const allTasks = [
//     {
//         name: "朝の準備",
//         children: [
//             {name: '子供起こす', checked: false},
//             {name: '朝ごはん用意', checked: false},
//             {name: '新聞とる', checked: false},
//         ],
//     }, {
//         name: "料理",
//         children: [
//             {name: '献立決めて買い物', checked: false},
//             {name: '冷蔵庫に入れる', checked: false},
//             {name: '料理する', checked: false},
//             {name: '盛り付け', checked: false},
//             {name: 'テーブル拭く', checked: false},
//             {name: '配膳', checked: false},
//             {name: '食器片付ける', checked: false},
//             {name: '食器用洗剤の購入', checked: false},
//             {name: 'まな板除菌・漂白', checked: false},
//             {name: '包丁研く', checked: false},
//         ],
//     }, {
//         name: "洗濯",
//         children: [
//             {name: 'フィルターのホコリを取る', checked: false},
//             {name: '洗濯洗剤の購入', checked: false},
//             {name: '漂白剤、柔軟剤の購入', checked: false},
//             {name: '洗濯機の掃除', checked: false},
//             {name: '洗濯物を干す', checked: false},
//             {name: '洗濯物を取り込む', checked: false},
//             {name: '洗濯物を畳む', checked: false},
//         ],
//     }, {
//         name: "お風呂の準備",
//         children: [
//             {name: 'お風呂を入れる', checked: false},
//             {name: 'シャンプー等の買い出し', checked: false},
//             {name: 'バスタオルの回収・交換', checked: false},
//         ],
//     }, {
//         name: "掃除 (お風呂場)",
//         children: [
//             {name: '浴槽を洗う', checked: false},
//             {name: '壁ドア・鏡・手すりを洗う', checked: false},
//             {name: '床を洗う', checked: false},
//             {name: '髪の毛取ってネット交換', checked: false},
//             {name: '排水溝を洗う', checked: false},
//         ],
//     }, {
//         name: "掃除 (トイレ)",
//         children: [
//             {name: 'トイレの掃除', checked: false},
//             {name: '壁・床・棚を拭く', checked: false},
//             {name: 'トイレマットの交換', checked: false},
//             {name: 'トイレットペーパーの購入', checked: false},
//             {name: 'トイレ洗剤の購入・補充', checked: false},
//         ],
//     }, {
//         name: "掃除 (キッチン)",
//         children: [
//             {name: '食器洗う', checked: false},
//             {name: '食器を拭く', checked: false},
//             {name: 'シンクの水気を拭く', checked: false},
//             {name: '食器をしまう', checked: false},
//             {name: '調味料の量把握・補充', checked: false},
//             {name: 'キッチン台の片付け', checked: false},
//             {name: '調理器具をしまう', checked: false},
//             {name: 'ガス台・ごとくの拭き掃除', checked: false},
//             {name: '食洗機の掃除', checked: false},
//             {name: '炊飯器の掃除', checked: false},
//             {name: 'レンジ・オーブンの掃除', checked: false},
//             {name: 'トースターの掃除', checked: false},
//             {name: 'キッチン壁・床の拭き掃除', checked: false},
//             {name: '換気扇の掃除', checked: false},
//         ],
//     }, {
//         name: "掃除 (家全体)",
//         children: [
//             {name: '家中を掃除機かける', checked: false},
//             {name: '出しっ放しのものをしまう', checked: false},
//             {name: '玄関の掃除', checked: false},
//             {name: '靴を整頓', checked: false},
//             {name: '傘をしまう', checked: false},
//             {name: 'テレビ、テレビ台の掃除', checked: false},
//             {name: '床の掃除・モップかける', checked: false},
//             {name: '物の整理整頓', checked: false},
//             {name: '子供部屋の掃除', checked: false},
//         ],
//     },{
//         name: "ゴミ捨て",
//         children: [
//             {name: 'ゴミ集める・分ける', checked: false},
//             {name: 'ペットボトルフィルムはがす', checked: false},
//             {name: 'ゴミ出し', checked: false},
//             {name: 'ゴミ箱にゴミ袋装着', checked: false},
//             {name: 'ダンボールをつぶして捨てる', checked: false},
//         ],
//     },{
//         name: "家庭内の雑用",
//         children: [
//             {name: '家族のスケジュール管理', checked: false},
//             {name: '郵便物を取りに行く', checked: false},
//             {name: '郵便物の仕分け・管理', checked: false},
//             {name: '米・ビールの補充', checked: false},
//             {name: '日用品の買い足し・補充', checked: false},
//             {name: 'アイロン', checked: false},
//             {name: '植物に水やり', checked: false},
//             {name: '加湿器に水入れる', checked: false},
//         ],
//     },{
//         name: "子供・学校",
//         children: [
//             {name: '交友の把握・管理', checked: false},
//             {name: '勉強みる', checked: false},
//             {name: '行事ごとの持ち物把握', checked: false},
//             {name: 'スマホ・ゲーム時間の管理', checked: false},
//             {name: '習い事の送迎', checked: false},
//             {name: '水筒を洗う', checked: false},
//             {name: '体操服を洗う', checked: false},
//             {name: 'テストやプリントの管理', checked: false},
//             {name: '学校行事に参加', checked: false},
//             {name: '学校のPTA活動に参加', checked: false},
//             {name: '地域集会に参加', checked: false},
//             {name: '保護者会に参加', checked: false},
//             {name: '写真の整理保管', checked: false},
//         ],
//     },{
//         name: "ペット関連",
//         children: [
//             {name: '朝の散歩', checked: false},
//             {name: '夕方の散歩', checked: false},
//             {name: '餌をやる', checked: false},
//             {name: '餌の購入', checked: false},
//             {name: '遊ぶ', checked: false},
//             {name: '毛並みを整える', checked: false},
//         ],
//     },{
//         name: "介護",
//         children: [
//             {name: '訪問介護、デイケアのお迎え', checked: false},
//             {name: '食事の手伝い', checked: false},
//             {name: 'ベット周りの整理整頓', checked: false},
//             {name: 'トイレの介助', checked: false},
//             {name: '外出の介助', checked: false},
//             {name: '通院の手伝い', checked: false},
//         ],
//     }
// ];

const allTasks = [
    {
        name: "朝の準備",
        children: [
            { name: "子供を起こす", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "朝ごはん用意", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "布団を畳む、ベッドを整える", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "新聞とる", checked: false, myDefault: 3, partnerDefault: 4 },
        ],
    }, {
        name: "料理",
        children: [
            { name: "献立を考える", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "食材の買い物", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "冷蔵庫の中の整理", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "夕食作り", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "昼食作り", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "米をとぎ、ご飯を炊く", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "盛り付け", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "テーブル拭く", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "配膳", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "調味料や油の補充", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "食後の片付け", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "食器洗い洗剤の詰替", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "ふきんの除菌・漂白", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "まな板の除菌・漂白", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "包丁とぐ", checked: false, myDefault: 4, partnerDefault: 3 },
        ],
    }, {
        name: "洗濯",
        children: [
            { name: "洗剤、柔軟剤の補充・交換", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "洗濯槽の掃除", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "洗濯機のフィルター清掃", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "寝具の洗濯、取り替え", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "洗濯物を干す", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "洗濯物を取り込む", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "洗濯物を畳む", checked: false, myDefault: 3, partnerDefault: 4 },
        ],
    }, {
        name: "お風呂の準備",
        children: [
            { name: "お風呂を入れる", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "シャンプーなどの買い出し", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "バスタオルの回収・交換", checked: false, myDefault: 4, partnerDefault: 3 },
        ],
    }, {
        name: "掃除 (お風呂場)",
        children: [
            { name: "浴槽を洗う", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "壁ドア・鏡・手すりを洗う", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "床を洗う", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "風呂の排水溝に詰まった髪の毛の掃除", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "排水溝を洗う", checked: false, myDefault: 3, partnerDefault: 4 },
        ],
    }, {
        name: "掃除 (トイレ)",
        children: [
            { name: "トイレの掃除", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "壁・床・棚を拭く", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "トイレマットの交換", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "トイレットペーパーの補充・交換", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "トイレ洗剤の購入と補充", checked: false, myDefault: 4, partnerDefault: 3 },
        ],
    }, {
        name: "掃除 (キッチン)",
        children: [
            { name: "食器洗う", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "食器を拭く", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "シンクの水気を拭く", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "食器をしまう", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "キッチン台の片付け", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "調理器具をしまう", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "ガス台・ごとくの拭き掃除", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "食洗機の掃除", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "炊飯器の掃除", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "レンジ・オーブンの掃除", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "トースターの掃除", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "キッチン壁・床の拭き掃除", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "換気扇の掃除", checked: false, myDefault: 3, partnerDefault: 4 },
        ],
    }, {
        name: "掃除 (家全体)",
        children: [
            { name: "家中を掃除機かける", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "玄関の掃除", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "靴を整頓", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "傘をしまう", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "テレビ、テレビ台の掃除", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "床の掃除", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "物の整理", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "子供部屋の掃除", checked: false, myDefault: 3, partnerDefault: 4 },
        ],
    },{
        name: "ゴミ捨て",
        children: [
            { name: "ゴミを集め分別", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "ベットボトルのフィルムはがす", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "ゴミ出し", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "ゴミ箱にゴミ袋装着", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "段ボールを潰して捨てる", checked: false, myDefault: 4, partnerDefault: 3 },
        ],
    },{
        name: "家庭内の雑用",
        children: [
            { name: "家族のスケジュール管理", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "郵便物を取りに行く", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "郵便物の仕分け・管理", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "米・ビールの補充", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "日用品の買い出し・補充", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "アイロン", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "植物に水やり", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "加湿器に水を入れる", checked: false, myDefault: 4, partnerDefault: 3 },
        ],
    },{
        name: "子供・学校",
        children: [
            { name: "子供の交友関係の把握・管理", checked: false, myDefault: 3, partnerDefault: 2 },
            { name: "子供の勉強をみる", checked: false, myDefault: 2, partnerDefault: 3 },
            { name: "子供の行事ごとの持ち物の把握", checked: false, myDefault: 3, partnerDefault: 2 },
            { name: "子供のスマホ・ゲーム時間の管理", checked: false, myDefault: 2, partnerDefault: 3 },
            { name: "子供の習い事送迎", checked: false, myDefault: 3, partnerDefault: 2 },
            { name: "子供の水筒を洗う", checked: false, myDefault: 2, partnerDefault: 3 },
            { name: "子供の体操服を洗う", checked: false, myDefault: 3, partnerDefault: 2 },
            { name: "子供のテストやプリント管理", checked: false, myDefault: 2, partnerDefault: 3 },
            { name: "子供の学校行事に参加", checked: false, myDefault: 1, partnerDefault: 0 },
            { name: "子供の学校のPTA活動に参加", checked: false, myDefault: 0, partnerDefault: 1 },
            { name: "地域集会に参加", checked: false, myDefault: 1, partnerDefault: 0 },
            { name: "保護者会に参加", checked: false, myDefault: 0, partnerDefault: 1 },
            { name: "子供の写真の整理保管", checked: false, myDefault: 3, partnerDefault: 2 },
        ],
    },{
        name: "ペット関連",
        children: [
            { name: "ペットの朝散歩", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "ペットの夕方散歩", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "ペットに餌をやる", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "ペットの餌購入", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "ペットと遊ぶ", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "ペットの毛並みを整える", checked: false, myDefault: 3, partnerDefault: 4 },
        ],
    },{
        name: "介護",
        children: [
            { name: "訪問介護デイケアのお迎え", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "食事の手伝い（介護）", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "ベット周りの整理整頓（介護）", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "トイレの介助", checked: false, myDefault: 25, partnerDefault: 25 },
            { name: "外出の介助", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "通院の手伝い", checked: false, myDefault: 4, partnerDefault: 3 },
        ],
    },{
        name: "乳幼児の世話",
        children: [
            { name: "授乳", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "哺乳瓶の洗浄", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "ミルクを作る", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "ミルクを与える", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "おむつを替える", checked: false, myDefault: 25, partnerDefault: 25 },
            { name: "おむつを捨てる", checked: false, myDefault: 25, partnerDefault: 25 },
            { name: "絵本の読み聞かせ", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "肌着・洋服を着せる", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "夜泣き対応", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "寝かしつけ", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "お出かけの持ち物用意", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "離乳食を作る", checked: false, myDefault: 10, partnerDefault: 11 },
            { name: "離乳食を食べさせる", checked: false, myDefault: 11, partnerDefault: 10 },
            { name: "赤ちゃんをお風呂に入れる", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "赤ちゃんにクリームを塗る", checked: false, myDefault: 3, partnerDefault: 4 },
            { name: "赤ちゃんの爪を切る", checked: false, myDefault: 2, partnerDefault: 2 },
            { name: "赤ちゃんの耳・鼻掃除", checked: false, myDefault: 2, partnerDefault: 2 },
            { name: "おむつ・お尻拭き・粉ミルク・離乳食の在庫確認と購入", checked: false, myDefault: 4, partnerDefault: 3 },
            { name: "児童館の交流会などのイベント参加", checked: false, myDefault: 2, partnerDefault: 2 },
            { name: "保育園のお迎え", checked: false, myDefault: 3, partnerDefault: 2 },
            { name: "保育園の見送り", checked: false, myDefault: 2, partnerDefault: 3 },
        ],
    }
];

const backgroundColorList = {
    '朝の準備' : 'rgba(255, 99, 132, 0.2)',
    '洗濯' : 'rgba(75, 192, 192, 0.2)',
    '掃除 (洗面所)' : 'rgba(54, 162, 235, 0.2)',
    '掃除 (お風呂場)' : 'rgba(153, 102, 255, 0.2)',
    '掃除 (トイレ)' : 'rgba(255, 255, 0, 0.2)',
    '掃除 (キッチン)' : 'rgba(139, 0, 139, 0.2)',
    '料理' : 'rgba(2, 203, 2, 0.2)',
    'お風呂の準備' : 'rgba(0, 0, 207, 0.2)',
    '掃除 (家全体)' : 'rgba(210 ,180 ,140, 0.2)',
    '家庭内の雑用' : 'rgba(201, 201, 20, 0.2)',
    '子供・学校' : 'rgba(210 ,180 ,140, 0.2)',
    'ゴミ捨て' : 'rgba(139, 30, 139, 0.2)',
    'ペット関連' : 'rgba(201, 20, 20, 0.2)',
    '介護' : 'rgba(0, 0, 207, 0.2)',
}
const borderColorList = {
    '朝の準備' : 'rgba(255, 99, 132)',
    '洗濯' : 'rgba(75, 192, 192)',
    '掃除 (洗面所)' : 'rgba(54, 162, 235)',
    '掃除 (お風呂場)' : 'rgba(153, 102, 255)',
    '掃除 (トイレ)' : 'rgba(255, 255, 0)',
    '掃除 (キッチン)' : 'rgba(139, 0, 139)',
    '料理' : 'rgba(2, 203, 2)',
    'お風呂の準備' : 'rgba(0, 0, 207)',
    '掃除 (家全体)' : 'rgba(210 ,180 ,140)',
    '家庭内の雑用' : 'rgba(201, 201, 20)',
    '子供・学校' : 'rgba(210 ,180 ,140)',
    'ゴミ捨て' : 'rgba(139, 30, 139)',
    'ペット関連' : 'rgba(201, 20, 20)',
    '介護' : 'rgba(0, 0, 207)',
}

const myBackColor = 'rgba(255, 138, 128 ,0.3)'
const myBackColorBorder = 'rgba(255, 138, 128)'

const partnerBackColor = 'rgba(140, 158, 255, 0.3)'
const partnerBackColorBorder = 'rgba(140, 158, 255)'

export default { allTasks, backgroundColorList, borderColorList, myBackColor, partnerBackColor, myBackColorBorder, partnerBackColorBorder};

