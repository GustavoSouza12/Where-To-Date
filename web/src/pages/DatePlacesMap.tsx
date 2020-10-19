import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import './../styles/DatePlace.css'
import 'leaflet/dist/leaflet.css'
import { HiLocationMarker } from 'react-icons/hi'
import Leaflet from 'leaflet'
import IconLocation from '../images/LocationHearth.svg'

import { GiModernCity } from 'react-icons/gi'
import { FaGlobeAmericas } from 'react-icons/fa'
import api from '../services/api'

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const mapIcon = Leaflet.icon({
    iconUrl: IconLocation,

    iconSize: [80,150],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

interface Place {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}
const OrphanagesMap = () => {

   const [places, setPlaces] = useState<Place[]>([])


    useEffect(() => {
        api.get('placesToDate').then(response =>{
             setPlaces(response.data)
             console.log(response.data)
        })          
    }, [])
        const REACT_TOKEN = "pk.eyJ1IjoiZ3VzdGF2b3NvdXphMTIiLCJhIjoiY2tnOW13NTdnMDJjdTJwbnkzeWF2eXM4bSJ9.bSDbva2eQ5em_TTlOQ66Eg"
    return (
        <div id="page-map">
            <aside data-aos="zoom-in">
                <header>
                    <HiLocationMarker size={60} color={'rgba(255, 187, 0, 0.7)'}/>
                    <h2>Escolha um lugar para seu <span className="orange">Date</span>!</h2>
                    <p>Muitos lugares estão no aguardo! :)</p>
                </header>

                <footer>
                    <strong><GiModernCity size={26} color="rgba(255, 187, 0, 0.7)"/> Taboão da Serra <GiModernCity size={26} color="rgba(255, 187, 0, 0.7)"/></strong>
                    <span><FaGlobeAmericas size={26} color="rgba(255, 187, 0, 0.7)"/> São Paulo - BR <FaGlobeAmericas size={26} color="rgba(255, 187, 0, 0.7)"/></span>
                </footer>
            </aside>

                <Map
                    center={[-23.6125655,-46.7672465]}
                    zoom={15}
                    style={{ width: '100%', height: '100%'}}
                    data-aos="zoom-in"
                >
                    {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}

                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${REACT_TOKEN}`}/>

                    {places.map(place => {
                        console.log(place)
                        return(
                            <Marker
                                icon={mapIcon}
                                position={[place.latitude, place.longitude]}
                                key={place.id}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {place.name}
                                    <Link to={`/place/${place.id}`}>
                                        <FiArrowRight size={20} color="FFF"/>
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })}
                </Map>

                <Link to="/place/create" className="create-dateplace">
                    <FiPlus size="32" color={'rgba(255, 187, 0, 0.7)'}/>
                </Link>
        </div>
    )
}

export default OrphanagesMap