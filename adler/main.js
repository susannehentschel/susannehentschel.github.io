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
// console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);

//openstreetmap einbauen - s= server, z= zoom, x=laenge, y=breite
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

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

const adlerblicke = [
    {
        kunde: "Wilder Kaiser",
        standort: "Gruttenhütte",
        seehoehe: 1640,
        lat: 47.55564,
        lng: 12.31467
    },
    {
        kunde: "Bergbahn Scheffau",
        standort: "Brandstadl",
        seehoehe: 1640,
        lat: 47.4912,
        lng: 12.248
    },
    {
        kunde: "Lechtal Toursimus",
        standort: "Sonnalm Jöchelspitze",
        seehoehe: 1786,
        lat: 47.41028,
        lng: 10.60083
    }
    
];
for (let blick of adlerblicke) {
    console.log(blick);
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(karte);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
         <p>Höhe: ${blick.seehoehe} m</p>
         <em>Kunde: ${blick.kunde}</em>`
    );
}