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

function drawCircle(long1, lat1) {
  const cityCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: citymap[city].center,
    radius: distance(long1, lat1, LONG, LAT),
  });
}

const LAT = 41.837051344348865;
const LONG = -87.62709580663449;
const button = document.querySelector("input");
const map = document.querySelector("iframe");

button.addEventListener("click", (event) => {
  window.navigator.geolocation.getCurrentPosition((pos) => {
    const center = `${pos.coords.latitude} ${pos.coords.longitude}`;

    let srcReal = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBEH3B2zirpgJAX4bkbsR80-dqgI7wvRYE&center=${center}&zoom=10`;
    map.setAttribute("src", srcReal);
  });
});
