export default function calculateBurden(effort, duration){
    // ここでは一単位ごとの負担度を計算するため，回数はかけない.
    return (2 - effort) * (duration);
}