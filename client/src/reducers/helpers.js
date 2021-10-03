export function sortByName(array,tipo){
    let copy = [...array]
    if(tipo==='A-Z'){
        return copy.sort((a,b) => {
            return a.name>b.name ? 1 : -1
        })
    }else{
        return copy.sort((a,b) => {
            return a.name<b.name ? 1 : -1
        })
    }
}

export function sortByFuerza(array,tipo){
    let copy = [...array]
    if(tipo==='^'){
        return copy.sort((a,b) => Number(a.hp)-Number(b.hp))
    }else{
        return copy.sort((a,b) => Number(b.hp)-Number(a.hp))
    }
}

export function filterTypes(arr,tipos){
    return arr.filter(p=>{
        for(let tipo of p.types){
            if(tipos.includes(tipo.id)) return true
        }
        return false
    })
}