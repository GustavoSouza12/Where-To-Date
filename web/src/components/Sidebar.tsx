import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import IconLogo from '../images/logo.svg'

import '../styles/components/Sidebar.css'

export default function SideBar(){
    const { goBack } = useHistory()
    return (
        <aside className="app-sidebar" data-aos="fade-right" data-aos-duration="1000">
            <img src={IconLogo} alt="Where to date"/>
            <p>Coded by <a className="my_link orange" target="_blank" href="https://github.com/GustavoSouza12">Gustavo</a></p>
            <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="rgba(255, 187, 0, 0.7)" />
            </button>
            </footer>
        </aside>
    )
}