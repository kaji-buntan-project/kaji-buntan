use wasm_bindgen::prelude::*;
use rand::Rng;
use wasm_bindgen::JsValue;

// #[wasm_bindgen]
// pub struct ResultAllocation {
//     pub alice: Vec<i32>,
//     pub bob: Vec<i32>,
// }

// #[wasm_bindgen]
// impl MyResult {
//     pub fn new(alice: Vec<i32>, bob: Vec<i32>) -> MyResult {
//         MyResult { alice, bob }
//     }
// }

/// 与えられた2つのベクトルの内積を計算.
pub fn dot_product(vec1: &Vec<i32>, vec2: &Vec<i32>) -> i32 {

    vec1.iter().zip(vec2.iter()).map(|(&x, &y)| x * y).sum()
}

/// burden_listの中で，同じindexのallocation_listの要素が0ではないものの中で，最大のものを出力
pub fn find_max_burden_among_nonzero(burden_list: &Vec<i32>, allocation_list: &Vec<i32>) -> i32 {

    // allocation_list が全て0のとき, max_burdenは0にする
    if allocation_list.iter().all(|&x| x == 0) {
        0
    } else {
        burden_list.iter()
            .zip(allocation_list.iter())
            .filter(|&(_burden, &allocation)| allocation > 0)
            .map(|(&burden, _)| burden)
            .max()
            .unwrap_or(0) // この行は実際には必要ないかもしれないが、リストが空の場合に備えている
    }
}

/// aliceもbobもEF1を満たすかどうかを判定する関数
pub fn is_efone(alice_burden_list: &Vec<i32>, bob_burden_list: &Vec<i32>, new_alice_allocation: &Vec<i32>, new_bob_allocation: &Vec<i32>) -> bool {

    let alice_utility_for_alice_bundle: i32 = dot_product(&new_alice_allocation, &alice_burden_list);
    let bob_utility_for_bob_bundle: i32 = dot_product(&new_bob_allocation, &bob_burden_list);

    let alice_utility_for_bob_bundle: i32 = dot_product(&new_bob_allocation, &alice_burden_list);
    let bob_utility_for_alice_bundle: i32 = dot_product(&new_alice_allocation, &bob_burden_list);

    // new_alice_allocation が全て0のとき, alice_max_burdenは0にする
    let alice_max_burden = find_max_burden_among_nonzero(&alice_burden_list, &new_alice_allocation);
    // new_bob_allocation が全て0のとき, bob_max_burdenは0にする
    let bob_max_burden = find_max_burden_among_nonzero(&bob_burden_list, &new_bob_allocation);

    println!("new_alice_allocation:{:?}", new_alice_allocation);
    println!("alice_burden_list:{:?}",alice_burden_list);

    println!("new_bob_allocation:{:?}", new_bob_allocation);
    println!("bob_burden_list:{:?}",bob_burden_list);

    println!("alice_utility_for_alice_bundle:{}", alice_utility_for_alice_bundle);
    println!("alice_max_burden:{}", alice_max_burden);
    println!("alice_utility_for_bob_bundle:{}", alice_utility_for_bob_bundle);

    println!("bob_utility_for_bob_bundle:{}", bob_utility_for_bob_bundle);
    println!("bob_max_burden:{}", bob_max_burden);
    println!("bob_utility_for_alice_bundle:{}", bob_utility_for_alice_bundle);
    
    (alice_utility_for_alice_bundle - alice_max_burden <= alice_utility_for_bob_bundle) && (bob_utility_for_bob_bundle - bob_max_burden <= bob_utility_for_alice_bundle)
}


pub fn is_ef_for_bob(alice_burden_list: &Vec<i32>, bob_burden_list: &Vec<i32>, new_alice_allocation: &Vec<i32>, new_bob_allocation: &Vec<i32>, index: usize) -> bool {
    // bobのみ着目しEFを満たすかどうかを判定する関数
    // update後と前とで，どれだけ差が生まれかも，判定する

    let mut updated_new_alice_allocation: Vec<i32> = new_alice_allocation.clone();
    let mut updated_new_bob_allocation: Vec<i32> = new_alice_allocation.clone();

    updated_new_alice_allocation[index] -= 1;
    updated_new_bob_allocation[index] += 1;


    // update後の効用
    let updated_alice_utility_for_alice_bundle: i32 = dot_product(&updated_new_alice_allocation, &alice_burden_list);
    let updated_bob_utility_for_bob_bundle: i32 = dot_product(&updated_new_bob_allocation, &bob_burden_list);
    let updated_bob_utility_for_alice_bundle: i32 = dot_product(&updated_new_alice_allocation, &bob_burden_list);

    // update前の効用
    let alice_utility_for_alice_bundle: i32 = dot_product(&new_alice_allocation, &alice_burden_list);
    let bob_utility_for_bob_bundle: i32 = dot_product(&new_bob_allocation, &bob_burden_list);

    // 負担度の合計
    let sum_alice_burden: f32 = alice_burden_list.iter().map(|&x| x as f32).sum();
    let sum_bob_burden: f32 = bob_burden_list.iter().map(|&x| x as f32).sum();

    (updated_bob_utility_for_bob_bundle > updated_bob_utility_for_alice_bundle) || ((updated_bob_utility_for_bob_bundle as f32 / sum_bob_burden - updated_alice_utility_for_alice_bundle as f32 / sum_alice_burden).abs() >= (bob_utility_for_bob_bundle as f32 / sum_bob_burden - alice_utility_for_alice_bundle as f32 / sum_alice_burden).abs())
}



pub fn compute_new_alice_bob_allocation_using_aw(alice_burden_list: Vec<i32>, bob_burden_list: Vec<i32>, task_total_num_list: Vec<i32>) -> (Vec<i32>, Vec<i32>) {

    let mut new_alice_allocation: Vec<i32> = vec![0; task_total_num_list.len()];
    let mut new_bob_allocation: Vec<i32> = vec![0; task_total_num_list.len()];

    // 初期は全てaliceに. bobは全て0.
    println!("{:?}",task_total_num_list);
    for (i, &value) in task_total_num_list.iter().enumerate() {
        new_alice_allocation[i] = value;
        new_bob_allocation[i] = 0;
    }
    println!("{:?}",new_alice_allocation);
    println!("{:?}",new_bob_allocation);

    // Adjueted Winner algoにおける分数の比較のためのリスト
    let mut fractional_list: Vec<(usize, f32)> = Vec::new();
    for i in 0..task_total_num_list.len() {
        let index = i as usize; // i32型からusize型へのキャスト
        println!("{}",index);
        fractional_list.push((index, bob_burden_list[index] as f32 / alice_burden_list[index] as f32));
    }

    // 2番目の要素でソート. 評価値0があった場合, NaNが発生.
    // example: [(0, 3.0), (1, 1.0), (2, 4.0)] -> [(1, 1.0), (0, 3.0), (2, 4.0)]
    fractional_list.sort_by(|a, b| match (a.1.is_nan(), b.1.is_nan()) {
        (true, true) => std::cmp::Ordering::Equal,
        (true, false) => std::cmp::Ordering::Greater,
        (false, true) => std::cmp::Ordering::Less,
        (false, false) => a.1.partial_cmp(&b.1).unwrap(),
    });

    let mut t:usize = 0;

    let mut break_outer_loop = false;
    for i in 0..fractional_list.len() {
        let index:usize = fractional_list[i].0;
        while new_alice_allocation[index] > 0 {
            println!("{:?}, {:?}", new_alice_allocation, new_bob_allocation);
            println!("{:?}",fractional_list);
            println!("{}",is_efone(&alice_burden_list, &bob_burden_list, &new_alice_allocation, &new_bob_allocation));
            if is_efone(&alice_burden_list, &bob_burden_list, &new_alice_allocation, &new_bob_allocation) {
                break_outer_loop = true;
                break;
            }
            new_alice_allocation[index] -= 1;
            new_bob_allocation[index] += 1;
        }
        if break_outer_loop {
            break;
        }
        t += 1;
    }

    let mut break_outer_loop_2 = false;
    for i in t..fractional_list.len() {
        let index:usize = fractional_list[i].0;
        while new_alice_allocation[index] > 0 {
            if is_ef_for_bob(&alice_burden_list, &bob_burden_list, &new_alice_allocation, &new_bob_allocation, index.clone()) {
                break_outer_loop_2 = true;
                break;
            }
            new_alice_allocation[index] -= 1;
            new_bob_allocation[index] += 1;
        }
        if break_outer_loop_2 {
            break;
        }
    }
    (new_alice_allocation, new_bob_allocation)
}


// task_total_num_array = [7,7,7,7] 
// alice_burden_array = [10,30,40]
// bob_burden_array = [10,30,40]

#[wasm_bindgen]
// pub fn improved_adjusted_winner(task_total_num_array: JsValue, alice_burden_array: JsValue, bob_burden_array: JsValue) -> (JsValue, JsValue) {

//     let task_total_num_list: Vec<i32> = task_total_num_array.into_serde().map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;
//     let alice_burden_list: Vec<i32> = alice_burden_array.into_serde().map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;
//     let bob_burden_list: Vec<i32> = alice_burden_array.into_serde().map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;
pub fn improved_adjusted_winner(task_total_num_list: Vec<i32>, alice_burden_list: Vec<i32>, bob_burden_list: Vec<i32>) -> JsValue {


    let mut rng = rand::thread_rng(); 
    if rng.gen() { // trueかfalseをランダムに生成. 確率1/2でtrue, 1/2でfalse
        println!("1: Alice is me and bob is partner");
        let (new_alice_allocation, new_bob_allocation) = compute_new_alice_bob_allocation_using_aw(alice_burden_list, bob_burden_list, task_total_num_list);
        JsValue::from_serde(&(new_alice_allocation, new_bob_allocation)).unwrap()
    } else {
        println!("2: Alice is partner and bob is me");
        let (new_alice_allocation, new_bob_allocation) = compute_new_alice_bob_allocation_using_aw(bob_burden_list, alice_burden_list, task_total_num_list);
        JsValue::from_serde(&(new_bob_allocation, new_alice_allocation)).unwrap()
    }
}



#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_compute_new_alice_bob_allocation_using_aw() {
        let task_total_num_list = vec![7,7,7,7,7];
        let alice_burden_list = vec![5,10,5,10,15];
        let bob_burden_list = vec![1,2,3,4,5];
        let (alice_allocation, bob_allocation) = compute_new_alice_bob_allocation_using_aw(alice_burden_list, bob_burden_list, task_total_num_list);
        assert_eq!((alice_allocation, bob_allocation),(vec![0, 0, 7, 7, 4], vec![7, 7, 0, 0, 3]));
    }
}
