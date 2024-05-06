const searchInput = document.querySelector("#poke-input");
const searchButton = document.querySelector(".btn-search");
const pokeContainer = document.querySelector(".poke-container");

const colors = {
  fire: "#FDDFDF", 
  grass: "#DEFDE0", 
  electric: "#FCF7DE", 
  water: "#DEF3FD", 
  ground: "#f4e7da", 
  rock: "#d5d5d4", 
  fairy: "#fceaff", 
  poison: "#98d7a5", 
  bug: "#f8d5a3", 
  dragon: "#97b3e6", 
  psychic: "#eaeda1", 
  flying: "#F5F5F5", 
  fighting: "#E6E0D4", 
  normal: "#F5F5F5", 
};

const pokeCount = 1001;

const initPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  createPokemonBox(data);
};


const createPokemonBox = (pokemon) => {
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const weight = pokemon.weight;
  const height = pokemon.height;
  const type = pokemon.types[0].type.name;
  const abilities = pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ");

  const color = colors[type];

  

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("poke-box");
  pokemonEl.style.backgroundColor = `${color}`;

  pokemonEl.innerHTML = `
    <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name} image">
    <h4 class="poke-name">${name}</h4>
    <p class="poke-id">Id:${id}</p>
    <p class="poke-weight">Kilosu: ${weight}Kg</p>
    <p class="poke-height">Boyu: ${height}m</p>
    <p class="poke-type">Türü: ${type}</p>
    <p class="poke-abilities">Yetenekleri: ${abilities}</p>
  `;

  pokeContainer.appendChild(pokemonEl);
};

initPokemon();

searchButton.addEventListener("click", function (e) {
  e.preventDefault();

  const pokeBoxes = document.querySelectorAll(".poke-box");
  const search = searchInput.value.trim().toLowerCase();

  pokeBoxes.forEach((pokeBox) => {
    const pokeName = pokeBox
      .querySelector(".poke-name")
      .textContent.toLowerCase();
    if (!pokeName.includes(search)) {
      pokeBox.style.display = "none";
    } else {
      pokeBox.style.display = "block";
    }
  });
});

window.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.getElementById("back-to-top-button");

  window.addEventListener("scroll", function () {
    const scrollHeight = document.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;
    const scrolled = window.scrollY;

    if (scrolled > scrollHeight - innerHeight * 1.5) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo(0, 0);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var options = {
    strings: [
      "Pokedexe Hoşgeldiniz!",
      "Pokemonlar Aranıyor..",
      "Bulbasaur Bulundu!",
      "Charmander Bulundu!",
      "Squirtle Bulundu!",
      "Pikachu Bulundu!",
      "Tüm Pokemonların Bulunması Biraz Zaman Alabilir...",
    ],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
    showCursor: false,
    onComplete: function () {
      document.querySelector(".typed-cursor").style.display = "none";
    },
  };

  var typed = new Typed("#pokedex-text", options);
});
