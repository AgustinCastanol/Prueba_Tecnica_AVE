const inquirer = require('inquirer');
require('colors');
const pokeApi = require('./api.js');
const acciones = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Obtener el total de Pokemones por tipo`
            },
            {
                value: '2',
                name: `${'2.'.green} Obtener todos los Pokemones que cumplen con 2 tipos`
            },
            {
                value: '3',
                name: `${'3.'.green} Obtener el número de un Pokemon`
            },
            {
                value: '4',
                name: `${'4.'.green} Obtener los stats base de un Pokemon`
            },
            {
                value: '5',
                name: `${'5.'.green} Obtener los Pokemones ordenados por nombre, tipo o peso`
            },
            {
                value: '6',
                name: `${'6.'.green} Comparar si el número de un Pokemon y un tipo coinciden`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
]
const inquirerMenu = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('   Seleccione una opción'.magenta);
    console.log('==========================\n'.green);

    const { option } = await inquirer.prompt(acciones)
    return option;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);
}
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;
}


const main = async () => {
    let opt='';
    do{
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const pokemonType = await leerInput('Ingrese el tipo de Pokemon');
                console.log(pokemonType);
                let pokemons = await pokeApi.pokemonTypeTotal(pokemonType);
                console.log("Resultado: ",pokemons);
                break
            case '2':
                const pokemonType1 = await leerInput('Ingrese el primer tipo de Pokemon');
                const pokemonType2 = await leerInput('Ingrese el segundo tipo de Pokemon');
                let matchTypes = await pokeApi.getPokemonByTwoTypes(pokemonType1, pokemonType2);
                console.log("Resultado: ",matchTypes);
                break
            case '3':
                const pokemonName = await leerInput('Ingrese el nombre del Pokemon');
                let idByName = await pokeApi.searchPokemon(pokemonName);
                console.log(`El numero del pokemon ${pokemonName} es :`,idByName);
                break
            case '4':
                const pokemonName2 = await leerInput('Ingrese el nombre del Pokemon');
                let stats = pokeApi.searchPokemonStats(pokemonName2);
                console.log(`Los stats del pokemon ${pokemonName2} son :`,stats);
                break
            case '5':
                const pokemonArrayID = await leerInput('Ingrese el array de ID de Pokemones');
                const pokemonSortOption = await leerInput('Ingrese el tipo de ordenamiento (name, type o weight)');
                let sortedPokemons = await pokeApi.getPokemonSorted(pokemonArrayID, pokemonSortOption);
                console.log("Resultado:")
                sortedPokemons.forEach(pokemon => {
                    console.log('------------------------')
                    console.log("Nombre: ",pokemon.name," Tipo: ",pokemon.type," Peso: ",pokemon.weight);
                });
                break
            case '6':
                const pokemonID = await leerInput('Ingrese el ID del Pokemon');
                const pokemonType3 = await leerInput('Ingrese el tipo de Pokemon');
                let match = await pokeApi.comparePokemonType(pokemonID, pokemonType3);
                console.log("Si el resultado es verdadero, el ID y el tipo coinciden")
                console.log("Resultado: ",match);

                break;
        }
        await pausa();
    }while(opt !== '0');

    process.exit(0);
}

main();