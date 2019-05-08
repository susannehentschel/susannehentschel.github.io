//Skript für Innsbruck
const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

//Karte initialisieren
let karte = L.map("map");

//Kartenlayer hinzufügen
const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps2", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https:////stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),
};

//Auswahlmenü hinzufügen
const layerControl = L.control.layers({
    "Geoland basemap": kartenLayer.geolandbasemap,
    "Geoland basemap grau": kartenLayer.bmapgrau,
    "OpenStreetMap": kartenLayer.osm,
    "Geoland basemap overlay": kartenLayer.bmapoverlay,
    "Geoland basemap high DPI": kartenLayer.bmaphidpi,
    "Geoland basemap Orthofoto 30cm": kartenLayer.bmaporthofoto30cm,
    "Geoland basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

//OpenStreetMap zur Karte hinzufügen und anzeigen lassen
kartenLayer.geolandbasemap.addTo(karte);

//Auf Auschnitt zoomen
karte.setView(
    [47.267222, 11.392778], 15
);

//AWS Daten zur Karte hinzufügen

//Live Daten einbinden
async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    //Neue featureGroup awsTirol
    const awsTirol = L.featureGroup();

    //Marker setzen und Popup hinzufügen mit Inhalt "Hallo"
    L.geoJson(stations)
        //Funktion hinzufügen, damit verschiedene Atrribute des Popup eingebunden werden
        .bindPopup(function (layer) {
            //console.log("Layer:", layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum:", date);
            return `<h4>${layer.feature.properties.name}</h4>
            Höhe: ${layer.feature.geometry.coordinates[2]} m <br>
            Temperatur: ${layer.feature.properties.LT} °C <br>
            Datum: ${date.toLocaleDateString("de-AT")}
            ${date.toLocaleTimeString("de-AT")} <br>
            Windgeschwindigkeit:${layer.feature.properties.WG ? layer.feature.properties.WG + ' km/h' : ' keine Daten'}
            <hr>
            <footer>Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a></footer>
            `;
        }) //Windgeschwindigkeit mit if abfrage, wenn keine Daten vorhanden sind
        .addTo(awsTirol);

    //Ausschnitt auf featureGroup (alle feature werden angezeigt --> perfekter zoom)
    karte.fitBounds(awsTirol.getBounds());

    //Marker ein und ausschalten --> vorher aber Konstante bei L.control hinzufügen als const layerControl = 
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

    //featureGroup für die Windlayer, damit diese ein und ausgeschalten werden können
    const windLayer = L.featureGroup();

    //Dartsellung der Windrichtung über style deg kann der Pfiel um 360° je nach Windrichtung rotieren
    L.geoJson(stations, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.WR) {
                let color = 'black';
                if (feature.properties.WG > 20) {
                    color = 'red';
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html:  `<i style="color: ${color};transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-3x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer)
    layerControl.addOverlay(windLayer, "Windrichtung");
    windLayer.addTo(karte);

    //featureGroup für den Temperaturlayer, damit diese ein und ausgeschalten werden können
    const temperaturLayer = L.featureGroup();

    //Dartsellung der Windrichtung über style deg kann der Pfiel um 360° je nach Windrichtung rotieren
    L.geoJson(stations, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.LT) {
                let color = 'blue';
                if (feature.properties.LT > 0) {
                    color = 'red';
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html:  `<div style= "color:${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(temperaturLayer)
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte);

}
loadStations();