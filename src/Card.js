import React from 'react';

const Card = (props) => {
  const { cityName, weatherType, temp, feelsLike, dateTime } = props

  return <>
  <div className="card" key={temp}>
    <h2>{cityName}</h2>
    <h3>{weatherType}</h3>
    <h2>{temp}°С</h2>
    <h4>Feels like: {feelsLike}°С</h4>
    <h4>{dateTime}</h4>
  </div>
  </>
}

export default Card;