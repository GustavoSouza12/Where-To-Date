import React from 'react'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'

import './../styles/DatePlace.css'
import 'leaflet/dist/leaflet.css'
import { HiLocationMarker } from 'react-icons/hi'



const OrphanagesMap = () => {
    const REACT_TOKEN = "pk.eyJ1IjoiZ3VzdGF2b3NvdXphMTIiLCJhIjoiY2tnOW13NTdnMDJjdTJwbnkzeWF2eXM4bSJ9.bSDbva2eQ5em_TTlOQ66Eg"
    return(
        <div id="page-map">
            <aside>
                <header>
                    <HiLocationMarker size={60} color={'rgba(255, 187, 0, 0.7)'}/>
                    <h2>Escolha um lugar para seu <span className="orange">Date</span>!</h2>
                    <p>Muitos lugares estão no aguardo! :)</p>
                </header>

                <footer>
                    <strong>Taboão da Serra</strong>
                    <span>São Paulo - BR</span>
                </footer>
            </aside>

                <Map
                    center={[-23.6125655,-46.7672465]}
                    zoom={15}
                    style={{ width: '100%', height: '100%'}}
                >
                    {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}

                    <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${REACT_TOKEN}`}/>
                </Map>

                <Link to="" className="create-dateplace">
                    <FiPlus size="32" color={'rgba(255, 187, 0, 0.7)'}/>
                </Link>
        </div>
    )
}

export default OrphanagesMap