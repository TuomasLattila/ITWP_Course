//fetch data for the map
var posMigration
var negMigration
var i = 2

fetch('https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f')
    .then(posJSONPromise => posJSONPromise.json())
    .then(posJSON => {
        console.log(posJSON)
        posMigration = posJSON.dataset.value
    })

fetch('https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e')
.then(negJSONPromise => negJSONPromise.json())
.then(negJSON => {
    console.log(negJSON)
    negMigration = negJSON.dataset.value
})

fetch('https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326')
    .then(GeoJSONPromise => GeoJSONPromise.json())
    .then(GeoJSON => {
        console.log(GeoJSON)
        initMap(GeoJSON)
    })

const initMap = (data) => {
    let map = L.map('map', {
        minZoom: -3
    })

    let geoJson = L.geoJSON(data, {
        onEachFeature: getFeature,
        weight: 2
    }).addTo(map)

    let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "@ OpenStreetMap"
    }).addTo(map)

    map.fitBounds(geoJson.getBounds())
}

const getFeature = (feature, layer) => {
    if (!feature.id) return;
    const id = feature.id
    //console.log(id)
    layer.bindTooltip(feature.properties.nimi)
    layer.bindPopup(
        `<ul>
            <li>Positive migration: ${posMigration[i]}</li>
            <li>Negative migration: ${negMigration[i]}</li>
        </ul>`
    )
    i++
}