const listaPokemon = document.querySelector("#listaPokemon");
const URL = "https://pokeapi.co/api/v2/pokemon/";

const pokemonIds = [
    { id: 658, descripcion: "Comprime el agua y crea estrellas ninja con las que ataca al enemigo. Cuando las hace girar a gran velocidad cortan en dos hasta el metal." },
    { id: 448, descripcion: "Dicen que, como es capaz de detectar auras, puede percibir a sus rivales aunque no los vea." },
    { id: 25, descripcion: "Cuando se enfada, este Pokémon descarga la energía que almacena en el interior de las bolsas de las mejillas." },
    { id: 643, descripcion: "Pokémon legendario capaz de abrasar el mundo con sus llamas. Ayuda a quienes persiguen un mundo veraz." },
    { id: 468, descripcion: "Este Pokémon jamás se muestra en lugares donde reine la discordia y la disensión. Últimamente apenas se avistan ejemplares." },
    { id: 478, descripcion: "Con su gélido aliento congela a todo Pokémon o humano que le llame la atención y se lo lleva a su guarida para usarlo como objeto decorativo." },
];

pokemonIds.forEach(pokemon => {
    fetch(URL + pokemon.id)
        .then(response => response.json())
        .then(data => mostrarPokemon(data, pokemon));
});

function asignarEventoPokemon(elemento, poke, config) {
    elemento.addEventListener("click", () => mostrarDetallesPokemon(poke, config));
}

function mostrarPokemon(poke, config) {
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    const div = document.createElement("div");
    div.classList.add("pokemon", "pokemon-hover");
    div.innerHTML = `
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;

    listaPokemon.append(div);

    // Asigna el evento clic al nuevo Pokémon
    asignarEventoPokemon(div, poke, config);
}

function mostrarDetallesPokemon(poke, config) {
    const modalBody = document.getElementById("pokemonModalBody");

    // Utiliza el sprite frontal del Pokémon para la imagen del modal (igual que en la tarjeta)
    const imagenModal = `<img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">`;

    // Usa la descripción proporcionada en la configuración
    const descripcion = config.descripcion || "No hay descripción disponible.";

    // Personaliza esto para mostrar la información específica del Pokémon
    const contenidoModal = `
        ${imagenModal}
        <p>Nombre: ${poke.name}</p>
        <p>Descripción: ${descripcion}</p>
        <!-- Agrega más detalles según tus necesidades -->
    `;

    modalBody.innerHTML = contenidoModal;
    $("#pokemonModal").modal("show"); // Muestra el modal
}
