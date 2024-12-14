import React from 'react'
import image01 from '../../assets/images/1.jpg'
import './styles/slider.css'

const PhotoGallary = () => {
    const numberOfItems = 10;
  return (
    <div className="banner">
        <div className="slider" style={{ '--quantity': numberOfItems }}>
            <div className="item" style={{ '--position': 1 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 2 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 3 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 4 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 5 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 6 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 7 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 8 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 9 }}><img src={image01} alt='' /></div>
            <div className="item" style={{ '--position': 10 }}><img src={image01} alt='' /></div>
        </div>
        <div className="content">
            <h1>Photo Gallery</h1>
            <div className="author">
                <h2>TripHaven</h2>
                <p><b>Team</b></p>
            </div>
            <div className="model"></div>
        </div>
    </div>
  )
}

export default PhotoGallary