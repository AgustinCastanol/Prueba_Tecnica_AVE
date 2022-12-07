const got = require('got');
const URL = 'https://pokeapi.co/api/v2/';
/*item 1 */
/* Suma total de pokemones por tipo, debe recibir el tipo en string*/
async function pokemonTypeTotal(type) {
    try {
        const bufferData = await got(`${URL}type/${type}`)
        const data = JSON.parse(bufferData.body)
        return data.pokemon.length;
    } catch (err) {
        console.log(err)
        return "error";
    }

}
/*item2 */
/*Dado 2 tipos de pokémon retornar todos los pokemones que cumplen con esos 2 tipos */
const getPokemonByTwoTypes = async (type1, type2) => {
    try {
        const bufferData = await got(`${URL}type/${type1}`)
        const data = JSON.parse(bufferData.body)
        const bufferData2 = await got(`${URL}type/${type2}`)
        const data2 = JSON.parse(bufferData2.body)
        const pokemon1 = data.pokemon.map(pokemon => pokemon.pokemon.name)
        const pokemon2 = data2.pokemon.map(pokemon => pokemon.pokemon.name)
        const pokemonMatch = pokemon1.filter(pokemon => pokemon2.includes(pokemon))
        return pokemonMatch
    } catch (error) {
        console.log(error)
        return "error";
    }
}
/*item 3 */
/*Dado el nombre de un pokémon retornar el número del mismo */
async function searchPokemon(name) {
    try {
        const bufferData = await got(`${URL}pokemon/${name}`)
        const data = JSON.parse(bufferData.body)
        return data.id
    } catch (err) {
        return "error";
    }
}
/*item 4 */
/*Dado el número de un pokémon retornar un objeto con sus 6 stats base */
async function searchPokemonStats(id) {
    try {
        const bufferData = await got(`${URL}pokemon/${id}`)
        const data = JSON.parse(bufferData.body)
        const stats = data.stats.map(stat => stat.base_stat)
        return stats
    } catch (err) {
        return "error";
    }
}
/*item 5 */
/*Realizar una función que reciba un arreglo de números (Ids de pokémon) y un ordenador y retorne los pokémon en un arreglo con su nombre, 
tipo y peso ordenados según se indique por la función por uno de estos 3 indicadores */
async function getPokemonSorted(pokemonArrayID, order) {
    try {
        if(!pokemonArrayID || !order) return "error, no se ingreso un parametro"
        if(order !== "name" && order !== "type" && order !== "weight") return "error, no se ingreso un orden valido"
        if(pokemonArrayID.length === 0) return "error, no se ingreso un arreglo de ids"
        let resPokemon = []
        let aux = pokemonArrayID.split(" ")
        for (let i = 0; i < aux.length; i++) {
            if(isNaN(aux[i])) return "error, no se ingreso un arreglo de ids valido";
            const bufferData = await got(`${URL}pokemon/${aux[i]}`)
            const data = JSON.parse(bufferData.body)
            const pokemon = {
                name: data.name,
                type: data.types[0].type.name,
                weight: data.weight
            }
            resPokemon.push(pokemon)
        }
        if (order === "name") {
            resPokemon.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            })
        }
        if (order === "type") {
            resPokemon.sort((a, b) => {
                if (a.type > b.type) {
                    return 1;
                }
                if (a.type < b.type) {
                    return -1;
                }
                return 0;
            })
        }
        if (order === "weight") {
            resPokemon.sort((a, b) => {
                if (a.weight > b.weight) {
                    return 1;
                }
                if (a.weight < b.weight) {
                    return -1;
                }
                return 0;
            })
        } 
        return resPokemon
    } catch (err) {
        console.log(err)
        return "error";
    }
}
/*item 6 */
/*Recibir un número y un tipo (de pokémon) y retornar un true o false si el pokémon de ese número posee este tipo*/
async function comparePokemonType(id, type) {
    try {
        if(isNaN(id)) return "error, no se ingreso un id valido";
        const bufferData = await got(`${URL}pokemon/${id}`)
        const data = JSON.parse(bufferData.body)
        const pokemonType = data.types.map(type => type.type.name)
        return pokemonType.includes(type)
    } catch (err) {
        return "error";
    }
}

module.exports = { pokemonTypeTotal, getPokemonByTwoTypes, searchPokemon, searchPokemonStats,getPokemonSorted,comparePokemonType }
