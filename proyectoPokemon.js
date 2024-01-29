function buscarPokemon() {
  const inputElement = document.getElementById("pokemon-input");
  const pokemonName = inputElement.value.toLowerCase();
  const imagen = document.getElementById("mostrarImagen");


  imagen.innerHTML = "";

  // Mostrar imagen de carga mientras se realiza la solicitud
  const loadingImage = document.createElement("img");
  loadingImage.src = "pokeball-pokemon.gif";
  imagen.appendChild(loadingImage);

  // Simular una espera con setTimeout
  setTimeout(() => {
      // Llamada a la PokeAPI utilizando Axios
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
          .then(response => {
              mostrarResultado(response.data);
          })
          .catch(error => {
              console.error('Error al buscar el Pokémon:', error);
              mostrarResultado(null);
          });
  }, 2000);
}

function mostrarResultado(pokemon) {
  const imagen = document.getElementById("mostrarImagen");

  // Limpiar resultados anteriores
  imagen.innerHTML = "";

  if (pokemon) {
      // Crear elementos HTML para mostrar la información del Pokémon
      const pokemonImage = document.createElement("img");
      // Configurar la URL de la imagen del Pokémon
      pokemonImage.src = pokemon.sprites.front_default;
      // Añadir la imagen al contenedor de resultados
      imagen.appendChild(pokemonImage);

      // Crear un elemento para el nombre del Pokémon
      const pokemonNameElement = document.createElement("p");
      pokemonNameElement.textContent = `Nombre: ${pokemon.name}`;
      // Añadir el nombre al contenedor de resultados
      imagen.appendChild(pokemonNameElement);

      // Crear un elemento para las habilidades del Pokémon
      const pokemonAbilitiesElement = document.createElement("p");
      const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
      pokemonAbilitiesElement.textContent = `Habilidades: ${abilities}`;
      // Añadir las habilidades al contenedor de resultados
      imagen.appendChild(pokemonAbilitiesElement);
  } else {
      // Mostrar un mensaje si no se encuentra el Pokémon
      const errorMessageElement = document.createElement("p");
      errorMessageElement.textContent = "Pokémon no encontrado.";
      imagen.appendChild(errorMessageElement);
  }
}
