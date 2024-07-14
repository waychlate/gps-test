function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
  var dLon = (lon2 - lon1).toRad();
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) *
      Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRad === "undefined") {
  Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
  };
}

const LAT = 41.837051344348865;
const LONG = -87.62709580663449;

const button = document.querySelector("input");

var map = L.map("map");

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

button.addEventListener("click", (event) => {
  window.navigator.geolocation.getCurrentPosition((pos) => {
    let radiusCircle = distance(
      pos.coords.longitude,
      pos.coords.latitude,
      LONG,
      LAT
    );
    map.setView(new L.LatLng(pos.coords.latitude, pos.coords.longitude), 17);

    console.log(radiusCircle);

    L.circle([pos.coords.latitude, pos.coords.longitude], {
      radius: radiusCircle * 1000,
    }).addTo(map);
  });
});
