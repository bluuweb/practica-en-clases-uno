$(() => {
    const resultadoPaises = $("#resultadoPaises");
    const seleccionContinente = $("#seleccionContinente");
    const inputTexto = $("#inputTexto");

    let arrayPaises = [];

    $.ajax({
        url: "paises.json",
        type: "GET",
        dataType: "JSON",
        success(data) {
            // arrayPaises.push(...data);
            arrayPaises = data;
            pintarPaises(data);
        },
        error(e) {
            console.log(e);
        },
    });

    const pintarPaises = (paises) => {
        // console.log(paises);
        resultadoPaises.html("");
        paises.forEach((pais) => {
            resultadoPaises.append(`
            <article class="col-12 col-md-3 mb-2">
                <div class="card">
                    <img height="100px" src="${pais.flags.png}" alt="" class="card-img-top">
                    <div class="card-body">
                        <h6>${pais.name}</h6>
                        <p>Population: ${pais.population}</p>
                        <p>Region: ${pais.region}</p>
                        <p>Capital: ${pais.capital}</p>
                    </div>
                </div>
            </article>
            `);
        });
    };

    inputTexto.on("keyup", () => {
        // console.log("esta escribiendo...");
        // console.log(inputTexto.val());
        const textoUser = inputTexto.val().toLowerCase();
        // console.log(textoUser);
        const arrayFiltradoBusqueda = arrayPaises.filter((pais) => {
            const nombrePais = pais.name.toLowerCase();
            if (nombrePais.indexOf(textoUser) !== -1) {
                return pais;
            }
        });

        pintarPaises(arrayFiltradoBusqueda);
    });

    seleccionContinente.on("change", () => {
        // console.log(seleccionContinente.val());
        // console.log(arrayPaises);

        if (seleccionContinente.val() === "todos") {
            return pintarPaises(arrayPaises);
        }

        const arrayFiltrado = arrayPaises.filter((pais) => {
            if (pais.region === seleccionContinente.val()) {
                return pais;
            }
        });
        // console.log(arrayFiltrado);
        pintarPaises(arrayFiltrado);
    });
});
