import React,{useEffect,useState } from "react";
import { Map, TileLayer,Marker } from "react-leaflet"; //Marker, Popup,
//import { Icon } from "leaflet";
import * as parkData from "./data.json";
export default function Maps(props) {
  const [longitud, setlongitud] = useState(0)
  const [latitude, setlatitude] = useState(0)
  const [activePark, setActivePark] = useState(null);
  console.log(activePark)
  
  useEffect(() => {
    if (navigator.geolocation && !latitude && !longitud) {
      navigator.geolocation.watchPosition(function(position) {
       // console.log("Latitude is :", position.coords.latitude);
        setlatitude(position.coords.latitude)
        setlongitud(position.coords.longitude)
        props.user.setLocation(position.coords.latitude,position.coords.longitude)  
       // console.log("Longitude is :", position.coords.longitude);
      });
    }
  })
  
  return (
    <Map center={[latitude,longitud]} zoom={12}>
            <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0]
          ]}
          onClick={() => {
            setActivePark(park);
          }}
        />
      ))}
    </Map>
  );
}