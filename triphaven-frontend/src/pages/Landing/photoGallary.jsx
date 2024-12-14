import React from 'react'
import image01 from '../../assets/images/1.jpg'
import image02 from '../../assets/images/2.jpg'
import image03 from '../../assets/images/3.jpg'
import image04 from '../../assets/images/4.jpg'
import image05 from '../../assets/images/5.jpg'
import image06 from '../../assets/images/6.jpg'
import './styles/slider.css'

const PhotoGallary = () => {
    const numberOfItems = 10;
  return (
    <div className="banner">
        <div className="slider" style={{ '--quantity': numberOfItems }}>
            <div className="item" style={{ '--position': 1 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 2 }}><img src={image02} alt='' /></div>
            <div className="item" style={{ '--position': 3 }}><img src={image03} alt='' /></div>
            <div className="item" style={{ '--position': 4 }}><img src={image04} alt='' /></div>
            <div className="item" style={{ '--position': 5 }}><img src={image05} alt='' /></div>
            <div className="item" style={{ '--position': 6 }}><img src={image06} alt='' /></div>
            <div className="item" style={{ '--position': 7 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 8 }}><img src={image02} alt='' /></div>
            <div className="item" style={{ '--position': 9 }}><img src={image03} alt='' /></div>
            <div className="item" style={{ '--position': 10 }}><img src={image04} alt='' /></div>
        </div>
        <div className="content">
            <h1>Photo Gallery</h1>
        </div>
    </div>
  )
}

export default PhotoGallary