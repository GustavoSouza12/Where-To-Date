import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import IconLocation from '../images/icon.svg'

import '../styles/components/Sidebar.css'

export default function SideBar(){
    const { goBack } = useHistory()
    return (
        <aside className="app-sidebar">
            <img src={IconLocation} alt="Happy" />

            <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
        </aside>
    )
}