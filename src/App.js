import { useState } from 'react';
import './App.css';

function App() {

  let [city , setCity] = useState('');

  let [wDetails , setWdetails ] = useState();

  let [ isloading , setIsloading] = useState(false);


  let getData=(event)=>{
    setIsloading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`).then((res)=>res.json())
    .then((finalres)=>{
      if(finalres.cod == '404'){
        setWdetails(undefined)
      }else{
        setWdetails(finalres);
      }

      setIsloading(false);
    })

    event.preventDefault();
    setCity('');
  }


  return (
    <div className="App">
      <div>

        <div>
          <h1>CHECK WEATHER OF ANY CITY HERE</h1>
          </div>

          <div>
            <form onSubmit={getData}>
              <input type="text" className='input' placeholder='Enter the city name' value={city} onChange={(e)=>setCity(e.target.value)} />
            <button className='button-85'>Check Weather</button>
            </form>
            
          </div>


          <div className='data'>

            <img src="https://cdn.dribbble.com/users/2973561/screenshots/5757826/loading__.gif" className={`${isloading ? 'loading' : 'hidden'}`}
            
            />

            {wDetails !== undefined
            ? 
            <>
            <h3>{wDetails.name} <span>{wDetails.sys.country}</span></h3>
            <h2>temp: &emsp; {wDetails.main.temp} &ensp; <span><sup>o</sup>C</span></h2>
            <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}/>
            <p>
              {wDetails.weather[0].description}
            </p>
            <h3>MaxTemp  :  {wDetails.main.temp_max} <sup>o</sup>C</h3>
            <h3>MinTemp   :   {wDetails.main.temp_min}  <sup>o</sup>C</h3>
            </>
            
            :
            <>
            <h1 className='NoData'>'NO Data found'</h1>
            </>
            }


            
          </div>

      </div>
    </div>
  );
}

export default App;
