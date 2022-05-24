import React, {useEffect, useState } from 'react';
import Card from './Card'
import './App.css';

  /*
    Тут я форматирую время в дату, функция возвращает строку в которой мы интерполируем время (т.е мы в строку запихиваем значение date.toDateString)
    date.toDateString() убирает лишнюю херню и оставляет только дату, date.getHours() возвращает число а именно час (16,19,22,01 и т.д), я добавил :00 чтобы выглядело нормально
  */
  const formatTime = (dateTime) => {
    const date = new Date(dateTime * 1000)
    return `${date.toDateString()}, ${date.getHours()}:00`
  }
  
  const App = () => {
    // Стейт погоды, инициализируется пустым массивом
    const [weatherList, setWeatherList] = useState([])
    // Стейт названия города
    const [cityName, setCityName] = useState('')
  
    console.log("1");
    // Эту функцию я обьявил асинхронной, т.к она делает запрос на сервер
    const loadWeather = async () => {
      /*
        В этом этой строчке я делаю запрос на api openweathermap, использую ширину и долготу которую приложили в задание
        Так же тут есть &appid=81d4570775234eee223f4ea15013fc36 это мой бесплатный API ключ, можете использовать либо мой, либо свой, просто зарегайтесь и сделайте ключ там легко
        далее я использую await, это нужно для нормальной работы асинхронной функции
      */
      const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=54.3&lon=48.4&units=metric&appid=81d4570775234eee223f4ea15013fc36')
      /*
        Тут так же используется await, чтобы получить погоду в тот момент, когда response выполнится.
      */
      const weather = await response.json()
      /* Если вам потребуется что-то дополнительно отобразить, то можете поставить debugger, и перезагрузить страничку
            Например:
              const weather = await response.json();
              debugger;
  
         Таким образом вы увидите всю информацию которую пришлет вам сайт openweather
      */
      setWeatherList(weather.list)
      /*
       В стейт weatherList я кладу полученный прогноз погоды с шагом в 3 часа.
      */
      setCityName(weather.city.name)
    }
  
    useEffect(() => {
      loadWeather();
    }, [])
  
    return <div className='card-box'>
      {
        /*
          Здесь мы берем список погоды (шаг по 3 часа) и убираем всякую ненужную хрень, от нас требуют на ближайшее время, поэтому тут вроде на один полный 24 часа день с шагом 3 часа
        */
        weatherList.slice(0, 9).map((forecast) => {
          return <Card cityName={cityName} weatherType={forecast.weather[0].main} temp={forecast.main.temp} feelsLike={forecast.main.feels_like} dateTime={formatTime(forecast.dt)}/>
        })
      }
    </div>
  }

export default App

