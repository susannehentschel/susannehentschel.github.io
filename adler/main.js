// Skript für Adlerweg

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");


//console.log("Breite=",breite,"Länge=",laenge,"Titel=",titel);

// Karte initialisieren
let karte = L.map("map");
//console.log(karte);

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`
    }),
    geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    })
};

//openstreetmap einbauen - s= server, z= zoom, x=laenge, y=breite

//kartenLayer.osm.addTo(karte);
kartenLayer.geolandbasemap.addTo(karte);

//Positionsmarker setzen
let pin1 = L.marker(
    [breite, laenge]
).addTo(karte);

//Popup zum Pin hängen
pin1.bindPopup(titel).openPopup();

//Positionsmarker 2 setzen
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//Popup zum zweiten Pin
pin2.bindPopup(titel2).openPopup();

let blickeGruppe = L.featureGroup().addTo(karte);

for (let blick of ADLERBLICKE) {
    console.log(blick);
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
         <p>Höhe: ${blick.seehoehe} m</p>
         <em>Kunde: ${blick.kunde}</em>`
    );
}
//console.log(blickeGruppe.getBounds());
//Auf Ausschnitt zoomen
karte.fitBounds(blickeGruppe.getBounds());