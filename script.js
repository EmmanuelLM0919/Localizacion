function obtenerDireccion() {
    const salida = document.getElementById("direccion");
    const mapa = document.getElementById("mapa");
    const mapaFrame = document.getElementById("mapaFrame");

    salida.innerHTML = "📍 Obteniendo ubicación...";
    mapa.style.display = "none";

    if (!navigator.geolocation) {
        salida.innerHTML = "❌ Geolocalización no soportada por el navegador.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;

            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                .then(response => response.json())
                .then(data => {
                    salida.innerHTML = `
                        <strong>Dirección actual:</strong><br>
                        ${data.display_name}
                    `;

                    mapaFrame.src =
                        `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.005},${lat - 0.005},${lon + 0.005},${lat + 0.005}&layer=mapnik&marker=${lat},${lon}`;

                    mapa.style.display = "block";
                })
                .catch(() => {
                    salida.innerHTML = "❌ Error al obtener la dirección.";
                });
        },
        () => {
            salida.innerHTML = "❌ Permiso de ubicación denegado.";
        }
    );
}
