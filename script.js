async function fetchPokemonType() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/type");
    const data = await response.json();
    const types = data.results;

    //Select dropdown menu
    let dropdown = document.querySelector("#types");
    //For each type
    types.forEach((type) => {
      //Create dropdown option
      const option = document.createElement("option");
      option.value = type.name;
      option.text = upperCase(type.name);
      //Add to dropdown menu
      dropdown.appendChild(option);
    });

    //If there is a change in the dropdown menu
    dropdown.addEventListener("change", () => {
      const selectedType = dropdown.value;
      //Fetch the pokemon where change occurs
      fetchPokemonByType(selectedType);
    });
  } catch (error) {
    console.log("Error fetching types: ", error);
  }
}

async function fetchPokemonByType(selectedType) {
  try {
    //First fetch for the complete list of pokemon
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon/?limit=151"
    );
    const data = await response.json();
    const listOfPokemon = data.results;

    //Empty array of pokeMatches
    const pokeMatches = [];
    for (const pokemon of listOfPokemon) {
      //Fetch the data inside the the specific pokemon URL
      const pokeResponse = await fetch(pokemon.url);
      //Parse the data
      const pokeDetails = await pokeResponse.json();
      //Extract the type from the data
      const primaryType = pokeDetails.types[0].type.name;
      if (primaryType === selectedType) {
        pokeMatches.push(pokeDetails);
      }
    }
    displayCards(pokeMatches);
  } catch (error) {
    console.error("Error fetching Pokémon of selected type:", error);
    return [];
  }
}

async function fetchAllPokemon() {
  const noOfPokemon = 151;
  let ID = 1;
  let pokemonData = [];

  try {
    for (let ID = 1; ID <= noOfPokemon; ID++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
      const data = await response.json();
      pokemonData.push(data);
    }
    displayCards(pokemonData);
  } catch (error) {
    console.log("Error fetching Pokémon", error);
  }
}

function displayCards(pokemonData) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  pokemonData.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("div");
    title.className = "title";

    const name = document.createElement("div");
    name.className = "name";
    name.innerHTML = `<h1>${upperCase(pokemon.name)}</h1>`;
    title.appendChild(name);

    const hp = document.createElement("div");
    hp.className = "hp";
    hp.innerHTML = `<h1>${pokemon.stats[0].base_stat} HP</h1>`;
    title.appendChild(hp);

    card.appendChild(title);

    const img = document.createElement("img");
    img.src = pokemon.sprites.other.showdown.front_default;
    img.alt = pokemon.name;

    const horizontalLine = document.createElement("hr");

    const abilityInfo = document.createElement("div");
    abilityInfo.id = "abilityInfo";

    const abilities = document.createElement("h3");
    abilities.className = "abilities";
    abilities.innerText = upperCase(pokemon.abilities[0].ability.name + " - ");

    const abilityDescription = document.createElement("p");
    abilityDescription.className = "abilityDescription";
    fetchAbilityDescription(pokemon)
      .then((ability) => {
        abilityDescription.innerText = ability;
      })
      .catch((error) => {
        console.error(error);
      });

    card.appendChild(img);
    card.appendChild(horizontalLine);
    abilityInfo.appendChild(abilities);
    abilityInfo.appendChild(abilityDescription);
    card.appendChild(abilityInfo);

    if (pokemon.types[0].type.name === "water") {
      card.style.backgroundColor = "#539AE2";
      hp.style.color = "rgb(0, 124, 201)";
    } else if (pokemon.types[0].type.name === "fire") {
      card.style.backgroundColor = "#EA7A3C";
      hp.style.color = "rgb(200, 64, 15)";
    } else if (pokemon.types[0].type.name === "grass") {
      card.style.backgroundColor = "#71C558";
      hp.style.color = "#3e9424";
    } else if (pokemon.types[0].type.name === "poison") {
      card.style.backgroundColor = "#B468B7";
      hp.style.color = "#824a84";
    } else if (pokemon.types[0].type.name === "bug") {
      card.style.backgroundColor = "#94BC4A";
      hp.style.color = "#4f6722";
    } else if (pokemon.types[0].type.name === "dark") {
      card.style.backgroundColor = "#736C75";
      hp.style.color = "#5a565b";
    } else if (pokemon.types[0].type.name === "electric") {
      card.style.backgroundColor = "#E5C531";
      hp.style.color = "#ad9424";
    } else if (pokemon.types[0].type.name === "fairy") {
      card.style.backgroundColor = "#E397D1";
      hp.style.color = "#af5e9c";
    } else if (pokemon.types[0].type.name === "fighting") {
      card.style.backgroundColor = "#CB5F48";
      hp.style.color = "#8e3c2a";
    } else if (pokemon.types[0].type.name === "flying") {
      card.style.backgroundColor = "#7DA6DE";
      hp.style.color = "#607ba0";
    } else if (pokemon.types[0].type.name === "ghost") {
      card.style.backgroundColor = "#846AB6";
      hp.style.color = "#5d4884";
    } else if (pokemon.types[0].type.name === "ground") {
      card.style.backgroundColor = "#CC9F4F";
      hp.style.color = "#987537";
    } else if (pokemon.types[0].type.name === "ice") {
      card.style.backgroundColor = "#70CBD4";
      hp.style.color = "#55a7af";
    } else if (pokemon.types[0].type.name === "ground") {
      card.style.backgroundColor = "#CC9F4F";
      hp.style.color = "#94743b";
    } else if (pokemon.types[0].type.name === "normal") {
      card.style.backgroundColor = "#AAB09F";
      hp.style.color = "#70746a";
    } else if (pokemon.types[0].type.name === "psychic") {
      card.style.backgroundColor = "#E5709B";
      hp.style.color = "#8e415d";
    } else if (pokemon.types[0].type.name === "rock") {
      card.style.backgroundColor = "#B2A061";
      hp.style.color = "#7a6d3f";
    } else if (pokemon.types[0].type.name === "steel") {
      card.style.backgroundColor = "#89A1B0";
      hp.style.color = "#6c818e";
    } else if (pokemon.types[0].type.name === "dragon") {
      card.style.backgroundColor = "#6A7BAF";
      hp.style.color = "#47598e";
    }

    container.appendChild(card);
  });
}

function upperCase(name) {
  return name[0].toUpperCase() + name.slice(1).toLowerCase();
}

window.addEventListener("scroll", function () {
  var backToTopButton = document.getElementById("back");
  // Calculate the threshold as 95% of the scroll height
  var threshold = 0.85 * document.documentElement.scrollHeight;
  if (window.scrollY + window.innerHeight >= threshold) {
    backToTopButton.style.display = "block"; // Display the button when scrolling reaches 95% of the scroll height
  } else {
    backToTopButton.style.display = "none"; // Hide the button otherwise
  }
});

function fetchAbilityDescription(pokemon) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(pokemon.abilities[0].ability.url);
      const data = await response.json();
      const englishEntry = data.effect_entries.find(
        (entry) => entry.language.name === "en"
      );
      // If English entry is found, return its effect, otherwise return an empty string
      const effect = englishEntry
        ? englishEntry.short_effect
        : data.effect_entries[0].short_effect;
      resolve(effect);
    } catch (error) {
      reject("Unable to fetch ability: " + error);
    }
  });
}

window.onload = fetchStarterPokemon();

async function fetchStarterPokemon() {
  const starterPokemon = [1, 4, 7];
  try {
    const pokemonData = [];

    for (let i = 0; i < starterPokemon.length; i++) {
      const ID = starterPokemon[i];
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${ID}`);
      const data = await response.json();
      pokemonData.push(data);
    }

    displayCards(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}

fetchPokemonType();
