const axios = require('axios')
const URL ='https:// co/api/v2/'

/*item 1 */
/* Suma total de pokemones por tipo, debe recibir el tipo en string*/
async function pokemonTypeTotal(type){
    try{
        const {length} = await getPokemonType(type)
        return length;
    }catch(err){
        console.log(err)
        return "error";
    }

}
/*item 2 */
/*Dado 2 tipos de pokémon retornar todos los pokemones que cumplen con esos 2 tipos */
async function pokemonTotalMatch (pokemon1, pokemon2) {
    try{
        const resPokemon1 = await  getPokemon(pokemon1)
        const resPokemon2 = await  getPokemon(pokemon2)
        const pokemon1Type = resPokemon1.types[0].type.name
        const pokemon2Type = resPokemon2.types[0].type.name
        const resPokemonTypeTotal = await  getPokemonTypeTotal(pokemon1Type, pokemon2Type)
        return [...new Set(resPokemonTypeTotal.map(item => item))];
        
    }catch(err){
        console.log(err)
        return "error";
    }
}
/*item 3 */
/*Dado el nombre de un pokémon retornar el número del mismo */
async function searchPokemon(name){
    try{
        return await  getPokemonWithId(name)

    }catch(err){
        console.log(err)
        return "error";
    }
}
/*item 4 */
/*Dado el número de un pokémon retornar un objeto con sus 6 stats base */
async function searchPokemonStats(id){
    try{
        return await  getPokemonStats(id)
    }catch(err){
        console.log(err)
        return "error";
    }
}
/*item 5 */
/*Realizar una función que reciba un arreglo de números (Ids de pokémon) y un ordenador y retorne los pokémon en un arreglo con su nombre, tipo y peso ordenados según se indique por la función por uno de estos 3 indicadores */
async function  pokemonsIdSorter(data,order){
    try{
        let resPokemon = []
        for(let i = 0; i < data.length; i++){
            let{name,types,weight} =await  getPokemon(data[i])
            resPokemon.push({
                name,
                types:types.map(item => item.type.name),
                weight
            })        
        }
        resPokemon = resPokemon.sort((a,b) => a[order] > b[order] ? 1 : -1)
        console.log(resPokemon)
    }catch(err){
        console.log(err)
        return "error";
    }
}
/*item 6 */
/*Recibir un número y un tipo (de pokémon) y retornar un true o false si el pokémon de ese número posee este tipo*/
async function matchPokemonWithType(id,type){
    try{
        const resPokemon = await getPokemon(id)
        const resPokemonType = resPokemon.types.map(item => item.type.name)
        return resPokemonType.includes(type)

    }catch(err){
        console.log(err)
        return "error";
    }
}
/*utls*/
const getPokemon = async (name) => {
    const response = await axios.get(`${URL}pokemon/${name}`)
    return response.data
}
const getPokemonType = async (type) => {
    const response = await axios.get(`${URL}type/${type}`)
    return response.data.pokemon.map(pokemon => pokemon.pokemon.name)
}
const getPokemonTypeTotal= async (type1, type2) => {
    let types = []
    const response1 = await axios.get(`${URL}type/${type1}`)
    const response2 = await axios.get(`${URL}type/${type2}`)
    types.push(response1.data.pokemon.map(pokemon => pokemon.pokemon.name))
    types.push( response2.data.pokemon.map(pokemon => pokemon.pokemon.name))
    types = types.flat()
    return types;
}
const getPokemonWithId = async (name) => {
    const response = await axios.get(`${URL}pokemon/${name}`)
    return response.data.id
}
const getPokemonStats = async (id) => {
    const response = await axios.get(`${URL}pokemon/${id}`)
    return response.data.stats
}

