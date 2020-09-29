import React,{useEffect,useState } from "react";
import { Map, TileLayer } from "react-leaflet"; //Marker, Popup,
//import { Icon } from "leaflet";

export default function Maps() {
  const [longitud, setlongitud] = useState(0)
  const [latitude, setlatitude] = useState(0)
  
  useEffect(() => {
    if (navigator.geolocation && !latitude && !longitud) {
      navigator.geolocation.watchPosition(function(position) {
       // console.log("Latitude is :", position.coords.latitude);
        setlatitude(position.coords.latitude)
        setlongitud(position.coords.longitude)
       // console.log("Longitude is :", position.coords.longitude);
      });
    }
  })
  
  return (
    <Map center={[latitude, longitud]} zoom={15}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  );
}