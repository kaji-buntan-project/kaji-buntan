export default function calculateBurden(effort, duration){
    // ここでは一単位ごとの負担度を計算する.
    return (2 - effort) * (duration);
}