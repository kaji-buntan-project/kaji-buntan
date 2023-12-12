export default function calculateBurden(effort, duration,participates){
    return (3 - effort) * (duration * participates);
}