import React, { useEffect, useState } from "react";

import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';
import L from 'leaflet';

import mapMarkerImg from '../images/icon.svg';

import '../styles/Place.css';
import Sidebar from '../components/Sidebar'
import api from "../services/api";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Place {
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  howToArrive: string,
  open_on_weekends: string
  images: Array<{
    id: number
    url: string
  }>
}
interface PlaceParams {
  id: string
}

export default function Orphanage() {
  const REACT_TOKEN = "pk.eyJ1IjoiZ3VzdGF2b3NvdXphMTIiLCJhIjoiY2tnOW13NTdnMDJjdTJwbnkzeWF2eXM4bSJ9.bSDbva2eQ5em_TTlOQ66Eg"
  const params = useParams<PlaceParams>()

  const [place, setPlace] = useState<Place>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
      api.get(`placesToDate/${params.id}`).then(response =>{
           setPlace(response.data)
      })          
  }, [params.id])

  if(!place){
    return <p>Carregando...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar/>

      <main>
        <div className="orphanage-details">
          <img src={place.images[activeImageIndex].url} alt={place.name} />

          <div className="images">
           
            {place.images.map((image, index) =>{
              return (
                <button key={image.id}
                 className={activeImageIndex === index ? 'active' : ''}
                 type="button"
                 onClick={() => {
                   setActiveImageIndex(index)
                 }}
                 >
                     <img src={image.url} alt={place.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{place.name}</h1>
            <p>{place.about}</p>

            <div className="map-container">
              <Map 
                center={[place.latitude, place.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${REACT_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[place.latitude, place.longitude]} />
              </Map>

              <footer>
                <a target="_blank" href={`https://www.google.com/maps/dir/?api=&destination=${place.latitude},${place.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Como chegar</h2>
            <p>{place.howToArrive}</p>

            <div className="open-on-weekends">
              <FiInfo size={32} color="#39CC83" />
              Atendemos <br />
              fim de semana
            </div>
               
            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}