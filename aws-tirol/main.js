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
    const windgeschwindigkeitLayer = L.featureGroup();

    const farbPaletteWG = [
        [11,"#00b900"],
        [28,"#10cd24"],
        [38,"#72d475"],
        [49,"#fed6d3"],
        [61,"#ff9e9a"],
        [74,"#ff8281"],
        [88,"#ff6160"],
        [102,"#ff453c"],
        [117,"#ff200e"],
    ];

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

    // Windgeschwindigkeit
    L.geoJson(stations, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.WG) {
                let color = 'blue';
                for(let i=0; i<farbPaletteWG.length; i++){
                    console.log(farbPaletteWG[i], feature.properties.WG);
                    if (feature.properties.WG < farbPaletteWG[i][0]){
                        color = farbPaletteWG[i][1];
                        break;
                    }
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html:  `<div  class="windgeschwindigkeitLabel" style="background-color:${color}" >${feature.properties.WG}</div>`
                    })
                });
            }
        }
    }).addTo(windgeschwindigkeitLayer)
    layerControl.addOverlay(windgeschwindigkeitLayer, "Windgeschwindigkeit");
    windgeschwindigkeitLayer.addTo(karte);

    //featureGroup für den Temperaturlayer, damit diese ein und ausgeschalten werden können
    const temperaturLayer = L.featureGroup();
    const farbPalette = [
      [-28,"#646664"], //name oder raute und rgb wert also fff um farge zu bestimmen
      [-26,"#8c8a8c"],
      [-24,"#006391"],
      [-22,"#cccecc"],
      [-20,"#e4e6e4"],
      [-18,"#772d76"],
      [-16,"#b123b0"],
      [-14,"#d219d1"],
      [-12,"#f0f"],
      [-10,"#ff94ff"],
      [-8,"#006391"],
      [-6,"#325afe"],
      [-4,"#2695ff"],
      [-2,"#00cdff"],
      [0,"#00fffe"],
      [2,"#007800"],
      [4,"#009d00"],
      [6,"#00bc02"],
      [8,"#00e200"],
      [10,"#0f0"],
      [12,"#fcff00"],
      [14,"#fdf200"],
      [16,"#fde100"],
      [18,"#ffd100"],
      [20,"#ffbd00"],
      [22,"#ffad00"],
      [24,"#ff9c00"],
      [26,"#ff7800"],
      [28,"red"],
      [30,"#f30102"],
      [32,"#d20000"],
      [34,"#c10000"],
      [36,"#b10000"],
      [38,"#a10000"],
      [40,"#900000"],
      [42,"#770100"],
      [44,"#5f0100"],
      [46,"#460101"],
      [48,"#2e0203"],
    ];

    //Dartsellung der Temperatur
    L.geoJson(stations, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.LT) {
                let color = 'blue';
                for(let i=0; i<farbPalette.length; i++){
                    console.log(farbPalette[i], feature.properties.LT);
                    if (feature.properties.LT < farbPalette[i][0]){
                        color = farbPalette[i][1];
                        break;
                    }
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html:  `<div  class="temperaturLabel" style="background-color:${color}" >${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(temperaturLayer)
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte);

//featureGroup für den relFeuchteLayer, damit diese ein und ausgeschalten werden können
const relFeuchteLayer = L.featureGroup();
const farbPaletteFeuchte = [
    [30,"rgb(238, 238, 238)"],
    [40,"rgb(221, 221, 221)"],
    [50,"rgb(198, 201, 206)"],
    [60,"rgb(187, 187, 187)"],
    [70,"rgb(170, 170, 204)"],
    [80,"rgb(153, 152, 221)"],
    [90,"rgb(135, 136, 238)"],
    [100,"rgb(118, 119, 225)"],
];

    //Darstellung der relativen Feuchte
    L.geoJson(stations, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.RH) {
                let color = 'blue';
                for(let i=0; i<farbPaletteFeuchte.length; i++){
                    console.log(farbPaletteFeuchte[i], feature.properties.RH);
                    if (feature.properties.RH < farbPaletteFeuchte[i][0]){
                        color = farbPaletteFeuchte[i][1];
                        break;
                    }
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html:  `<div  class="relFeuchteLabel" style="background-color:${color}" >${feature.properties.RH}</div>`
                    })
                });
            }
        }
    }).addTo(relFeuchteLayer)
    layerControl.addOverlay(relFeuchteLayer, "relative Feuchte");
    relFeuchteLayer.addTo(karte);

}
loadStations();