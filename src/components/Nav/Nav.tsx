import React from 'react'
import logo from '../../assets/icon/logo.svg'
import search from '../../assets/icon/search-icon.png'
import alarm from '../../assets/icon/alarm-icon.png'
import profile from '../../assets/icon/profile.png'
import drop from '../../assets/icon/dropdown.png'
import './nav.scss'

const Nav = () => {
  return (
    <header className='header'>
        <div className='header-left'>
            <div className='header-left-img'>
                <img src={logo} alt='logo' />
            </div>
            <div className='header-left-input'>
                <input type='text' placeholder='Search for anything' />
                <div className='header-left-input-search'>
                    <img src={search} alt='search icon' />
                </div>
            </div>
        </div>
        <div className='nav-profile'>
            <p className='nav-profile-docs'>Docs</p>
            <div>
                <img src={alarm} alt='alarm icon' />
            </div>
            <div className='nav-profile-picture'>
                <img src={profile} alt='profile picture' />
                <div className='nav-profile-picture-user'>
                    <p>Adedeji</p>
                    <img src={drop} alt='dropdown' />
                </div>
            </div>
        </div>
    </header>
  )
}

export default Nav