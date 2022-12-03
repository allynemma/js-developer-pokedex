const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 15;
let limit = 5;
let offset = 0;

function homeLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            
            
            <div class="detail">
            <img src="${pokemon.photo}"
            alt="${pokemon.name}">
            </div>
        </li>
        
    `
} 

function convertPokemonToLi(pokemon) {
    return `
    
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <ol class="textos">
                <span class="height">Height: ${pokemon.height}dm</span><br>
                <span class="weight">Weight: ${pokemon.weight}hg</span><br>
                </ol>
                <div = "img">
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    
    `
}

function loadPokemonItensHome(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(homeLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemoncaracteristics.innerHTML += newHtml
    })
}

loadPokemonItensHome(offset, limit)

//BOTÃO DE DETALHES
const testeDiv = document.getElementById ("teste");
const eachPokemonButton = document.createElement("button");
testeDiv.appendChild(eachPokemonButton);
eachPokemonButton.innerHTML = "Details";
eachPokemonButton.addEventListener('click', () => {
    const oldOffset = offset;
    const oldLimit = limit;
    offset = prompt("Número do pokemon: ");
    offset--;
    limit = 1;
    loadPokemonItens(offset, limit);
    offset = oldOffset;
    limit = oldLimit;
})


loadMoreButton.onclick = function() {console.log("clickou")};


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItensHome(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItensHome(offset, limit)
    }
})