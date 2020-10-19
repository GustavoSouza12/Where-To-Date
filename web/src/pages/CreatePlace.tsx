import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import L from 'leaflet';
import { useHistory } from "react-router-dom";

import {FiPlus } from "react-icons/fi";

import '../styles/CreatePlace.css';
import Sidebar from '../components/Sidebar'
import IconLocation from '../images/LocationHearth.svg'
import api from "../services/api";

const happyMapIcon = L.icon({
  iconUrl: IconLocation,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const history = useHistory()

  const[position, setPosition] = useState({latitude: 0, longitude: 0})

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [howToArrive, setHowToArrive] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [whatsapp, setWhatsapp] = useState('')


  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng
    
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return
    }
  
    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }
  async function handleSubmit(event: FormEvent){
    event.preventDefault()
  
    const { latitude, longitude} = position

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('howToArrive', howToArrive)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('whatsapp', whatsapp)
    
    images.forEach(image => {
      data.append('images', image)
    })
    
   await api.post('placesToDate', data)

   alert('Cadastro feito!')

   history.push('/app')
  }
  const { goBack } = useHistory();
  const REACT_TOKEN = "pk.eyJ1IjoiZ3VzdGF2b3NvdXphMTIiLCJhIjoiY2tnOW13NTdnMDJjdTJwbnkzeWF2eXM4bSJ9.bSDbva2eQ5em_TTlOQ66Eg"

  return (
    <div id="page-create-orphanage">
      
      <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.6125655,-46.7672465]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${REACT_TOKEN}`}
              />

              {position.latitude != 0
              ? <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} /> 
              : null }

            
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Número Whatsapp (com ddd)</label>
              <input id="name" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image =>{
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="red" />
                </label>

              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/> 
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Como chegar</label>
              <textarea id="instructions" value={howToArrive} onChange={e => setHowToArrive(e.target.value)} />
            </div>


            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                   Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
