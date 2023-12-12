export default function calculateBurden(effort, duration,participates){
    return (2 - effort) * (duration * participates);
}