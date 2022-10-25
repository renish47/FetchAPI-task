
fetch('https://restcountries.com/v3.1/all')
  .then(res=>res.json())
  .then(countryData=>{
    let row = document.getElementById('row');
    for(let y=0;y<countryData.length;y++){
      // let y = Math.floor(Math.random()*countryData.length);
      let countryName = countryData[y].name.common;
      let countryCapital = countryData[y].capital;
      let countryLat = countryData[y].latlng[0];
      let countryLng = countryData[y].latlng[1];
      let countryRegion = countryData[y].region;
      let countryCode = countryData[y].altSpellings[0];
      let countryFlagUrl = countryData[y].flags.png;
       
      let col = document.createElement('div');
      col.classList.add('col-lg-4','col-sm-12');

      col.innerHTML = `<div class="card mt-4">
                        <div class="card-header text-center h4">${countryName}</div>
                          <div class="card-body text-center">
                            <img src="${countryFlagUrl}" alt="${countryName}-flag" class="img-fluid mb-3" style="height:100px; width:150px; border: 1px solid grey"> <br>
                            <span class="fw-bold">Region:</span> ${countryRegion} <br>
                            <span class="fw-bold">Capital:</span> ${countryCapital} <br> 
                            <span class="fw-bold">Country Code:</span> ${countryCode} <br>
                            <span class="fw-bold">Latlng:</span> ${countryLat.toFixed(2)}, ${countryLng.toFixed(2)}<br>
                            <button class="btn btn-primary mt-3 ${countryLat} ${countryLng} ${countryName.replace(' ','-')}" onClick=getWeather(event) data-bs-toggle="modal" data-bs-target="#staticBackdrop " type="button">Click for Weather</button>
                          </div>
                        </div>
                      </div>`
      row.append(col);

    }
  }).catch(err=>console.log("Error in Country data fetching :",err));



function getWeather(event){
  let lat = event.target.classList[3];
  let lng = event.target.classList[4];
  let name = event.target.classList[5];
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=b03fc97489b7a7775a0107ee9c45b3f3&units=metric`)
  .then(res=> res.json())
  .then(weatherData=>{
    console.log(weatherData);
      document.getElementById('cName').innerText = name.replace('-',' ');
      document.getElementById('modBody').innerHTML = `<span class='fw-bold'>Description:</span> ${weatherData.weather[0].description} <br>
                                                      <span class='fw-bold'>Temp:</span> ${weatherData.main.temp}&#176;C <br>
                                                      <span class='fw-bold'>Humidity:</span>  ${weatherData.main.humidity}%; <br>
                                                      <span class='fw-bold'>Wind Speed:</span>  ${weatherData.wind.speed} m/s`
  }).catch(err=> console.log("Error in Weather data fetching :",err))
}
