import React, { useEffect, useState } from "react";

import { FaWhatsapp, FaStore } from "react-icons/fa";
import { FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import IconLocation from '../images/LocationHearth.svg'


import '../styles/Place.css';
import Sidebar from '../components/Sidebar'
import api from "../services/api";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const happyMapIcon = L.icon({
  iconUrl: IconLocation,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Place {
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  whatsapp: string,
  howToArrive: string,
  open_on_weekends: string,
  
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
  console.log(place)

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
    <div id="page-place">
      <Sidebar/>

      <main>
        <div className="place-details" data-aos="fade-up" data-aos-duration="1000">
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
          
          <div className="place-details-content">
            <h1><FaStore/> {place.name}</h1>
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
                  url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${REACT_TOKEN}`}
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
          
            <div className="open-details">
              { place.open_on_weekends ? (
                <div className="open-on-weekends">
                  <div><FiInfo size={32} color="#37C77F" /></div>
                  <div>
                    Atendemos <br />
                    fim de semana
                  </div>
                </div>
              ):(
                <div className="open-on-weekends-dont">
                  <div><FiInfo size={32} color="#da442a" /></div>
                  <div>Não atendemos <br />
                  fim de semana
                  </div>
                </div>
              )}
            </div>  
            {console.log(place.open_on_weekends)}
               
            <a href={`https://api.whatsapp.com/send?phone=55${place.whatsapp}`} target="_blank" type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}