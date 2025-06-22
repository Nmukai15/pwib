/* <script>
        // Adiciona um evento de clique ao botão de busca
        document.getElementById('searchBtn').addEventListener('click', function() {
            // Obtém o valor digitado no campo de busca e transforma em minúsculas
            const searchValue = document.getElementById('search').value.toLowerCase();
            // Faz uma requisição à API do Pokémon
            fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
                .then(response => {
                    // Verifica se a resposta da API é válida
                    if (!response.ok) {
                        throw new Error('Pokémon não encontrado');
                    }
                    return response.json(); // Converte a resposta em JSON
                })
                .then(data => {
                    // Mapeia os tipos do Pokémon e cria elementos HTML para cada tipo
                    const types = data.types.map(typeInfo => {
                        return `<span class="type" style="background-color: ${getTypeColor(typeInfo.type.name)};">${typeInfo.type.name}</span>`;
                    }).join('');

                    // Cria o HTML para exibir as informações do Pokémon
                    const pokemonInfo = `
                        <h2>${data.name} - ${data.id}</h2>
                        <img id="pokemonImage" src="${data.sprites.front_default}" alt="${data.name}">
                        <p>Altura: ${data.height}</p>
                        <p>Peso: ${data.weight}</p>
                        <p>Tipos: ${types}</p>
                        <button id="toggleImage">Mostrar Shiny</button>
                    `;
                    // Insere as informações do Pokémon na div correspondente
                    document.getElementById('pokemonInfo').innerHTML = pokemonInfo;

                    // Adiciona um evento de clique ao botão de alternar imagem
                    document.getElementById('toggleImage').addEventListener('click', function() {
                        const img = document.getElementById('pokemonImage');
                        // Alterna entre a imagem normal e a imagem shiny
                        if (img.src.includes('shiny')) {
                            img.src = data.sprites.front_default; // Imagem normal
                            this.textContent = 'Mostrar Shiny'; // Atualiza o texto do botão
                        } else {
                            img.src = data.sprites.front_shiny; // Imagem shiny
                            this.textContent = 'Mostrar Normal'; // Atualiza o texto do botão
                        }
                    });
                })
                .catch(error => {
                    // Exibe uma mensagem de erro se o Pokémon não for encontrado
                    document.getElementById('pokemonInfo').innerHTML = `<p>${error.message}</p>`;
                });
        });

        // Função para obter a cor correspondente a cada tipo de Pokémon
        function getTypeColor(type) {
            const typeColors = {
                fire: '#F08030',
                water: '#6890F0',
                grass: '#78C850',
                electric: '#F8D030',
                ice: '#98D8D8',
                fighting: '#C03028',
                poison: '#A040A0',
                ground: '#E0C068',
                flying: '#A890F0',
                psychic: '#F85888',
                bug: '#A8B820',
                rock: '#B8A038',
                ghost: '#705898',
                dragon: '#7038F8',
                dark: '#705848',
                steel: '#B8B8D0',
                fairy: '#F0B6BC',
                normal: '#A8A878',
                // Adicione mais tipos conforme necessário
            };
            return typeColors[type] || '#A8A8A8'; 
        }
    </script>*/ 
const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemontiponome = document.querySelector('.pokemon__tiponome');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const shinyButton = document.querySelector('.shiny'); // Botão para alternar a forma shiny

let searchPokemon = 1;
let isShiny = false; // Variável para controlar se a imagem é shiny

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

function corTipo(type) {
    const typeColors = {
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#F0B6BC',
        normal: '#A8A878',
    };
    return typeColors[type] || '#A8A8A8';
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Capitaliza o nome
        pokemonNumber.innerHTML = `#${data.id}`;
        const types = data.types.map(typeInfo => {
            const typeName = typeInfo.type.name;
            const color = corTipo(typeName);
            return `<span style="background-color: ${color}; padding: 5px; border-radius: 5px; color: white;">${typeName}</span>`;
        }).join(', ');

        pokemontiponome.innerHTML = types;
        pokemonImage.src = data.sprites.front_default;
        input.value = '';
        searchPokemon = data.id;

        shinyButton.innerHTML = 'Mostrar Shiny';
        shinyButton.onclick = () => {
            isShiny = !isShiny; 
            pokemonImage.src = isShiny ? data.sprites.front_shiny : data.sprites.front_default; // Alterna a imagem
            shinyButton.innerHTML = isShiny ? 'Mostrar Normal' : 'Mostrar Shiny'; // Atualiza o texto do botão
        };
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Pokemon não encontrado';
        pokemonNumber.innerHTML = '';
        pokemontiponome.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Renderiza o Pokémon inicial
renderPokemon(searchPokemon);
