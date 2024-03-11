async function carga() {
  const menu_lateral = document.getElementById("menu");
  var map = L.map("map");

  map.setView([36.7213, -4.4214], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  const response = await fetch("paradas_taxis.geojson");
  const data = await response.json();
  var paradas = data.features;
  paradas.forEach((parada) => {
    var datos_coordenadas = parada.geometry.coordinates;
    var coordenadas = [datos_coordenadas[1], datos_coordenadas[0]];
    var dir = parada.properties.DIRECCION;
    var desc = parada.properties.DESCRIPCION;

    var punto = L.marker(coordenadas).addTo(map);

    punto.bindPopup("<b>" + desc + "</b><b>" + dir + "</b>");

    var item_menu = document.createElement("div");
    item_menu.classList.add("item");
    item_menu.dataset.coor1 = coordenadas[1];
    item_menu.dataset.coor2 = coordenadas[0];

    var p_descripcion = document.createElement("p");
    p_descripcion.textContent = desc;
    var span_direccion = document.createElement("span");
    span_direccion.textContent = dir;

    item_menu.appendChild(p_descripcion);
    item_menu.appendChild(span_direccion);
    var div_botones = document.createElement("div");
    div_botones.style.display = "flex";

    item_menu.addEventListener("click", (e) => {
      var c1 = e.currentTarget.dataset.coor1;
      var c2 = e.currentTarget.dataset.coor2;
      map.setView([c2, c1], 30);
    });
    if (parada.properties.ACCESOPMR == "Si") {
      var div_acceso = document.createElement("div");
      div_acceso.classList.add("acceso_item");
      div_acceso.textContent = "Accesible";
      div_botones.appendChild(div_acceso);
    }
    item_menu.appendChild(div_botones);
    var div_informacion = document.createElement("div");
    div_informacion.classList.add("info_item");
    div_informacion.textContent = "Más información";
    div_botones.appendChild(div_informacion);
    menu_lateral.appendChild(item_menu);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  carga();
});
