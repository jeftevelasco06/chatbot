async function obtenerClima(ciudad) {
    const apiKey = "268db8f1965b5cd42821d4050a195c3f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.cod !== 200) return "No encontré esa ciudad 😢";

        return `🌤 Clima en <b>${ciudad}</b>: ${datos.main.temp}°C, ${datos.weather[0].description}.`;
    } catch (error) {
        return "Hubo un error al obtener el clima 😢";
    }
}

async function obtenerPrecioAccion(simbolo) {
    const url = `https://financialmodelingprep.com/api/v3/quote/${simbolo}?apikey=demo`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();

        if (datos.length === 0) return "No encontré esa acción 😢";

        const precio = datos[0].price;

        return `💹 Precio actual de <b>${simbolo}</b>: $${precio} USD.`;
    } catch (error) {
        return "Hubo un error al obtener el precio de la acción 😢";
    }
}

document.getElementById("boton").addEventListener("click", async () => {
    const pregunta = document.getElementById("input").value.toLowerCase();
    const respuestaHTML = document.getElementById("respuesta");

    if (pregunta.includes("clima")) {
        const partes = pregunta.split("en ");
        const ciudad = partes[1] || "mexico";
        const clima = await obtenerClima(ciudad.trim());
        respuestaHTML.innerHTML = clima;
        return;
    }

    if (pregunta.includes("acción") || pregunta.includes("precio")) {
        const partes = pregunta.split("de ");
        const simbolo = partes[1]?.toUpperCase() || "AAPL";
        const precio = await obtenerPrecioAccion(simbolo.trim());
        respuestaHTML.innerHTML = precio;
        return;
    }

    respuestaHTML.innerHTML = `
        No entendí 🤖<br><br>
        Puedes preguntar:<br>
        - clima en Monterrey<br>
        - precio de AAPL
    `;
});
