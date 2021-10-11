export function firstMayus(string){
    return string[0].toUpperCase()+string.slice(1)
}
export function notEmptyStr(obj){
    return !Object.values(obj).includes('')
}
export function notMinus(obj){
    return !Object.values(obj).reduce((a,b)=>a+b).includes('-')
}
export function firstNaN(str){
    return Number.isNaN(Number(str))
}
export function notZero({weight,height,attack,speed,defense,hp}){
    let inputs = {
        weight: Number(weight),
        height: Number(height),
        attack: Number(attack),
        speed: Number(speed),
        defense:Number(defense),
        hp:Number(hp)
    }
    return !Object.values(inputs).includes(0)
}