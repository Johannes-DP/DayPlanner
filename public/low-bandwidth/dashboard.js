const src = document.getElementById('weather');

const h2 = document.createElement('h2');
h2.innerText = 'Weather in Vienna';

const temperature = document.createElement('p');
temperature.setAttribute('id', 'test1');
temperature.innerText = 'Temperature: ';

const sunset = document.createElement('p');
sunset.setAttribute('p', 'test2');
sunset.innerText = 'Sunset:  ';

const sunrise = document.createElement('p');
sunrise.setAttribute('p', 'test3');
sunrise.innerText = 'Sunrise: ';

const description = document.createElement('p');

const img = document.createElement('img');

fetch('http://localhost:3000/api/weather/getWeather')
  .then((res) => res.json())
  .then((data) => setParams(data.data));
// .then(data => data.data)
// .then(console.log(data.data))//{
//    temperature.innerText += data.temp;
//    sunrise.innerText += data.sunrise;
//    sunset.innerText += data.sunset;
//   img.src = '/icons/' +data.weather.icon +'.png'
//   description.innerText = data.weather.description;
// });

function setParams(data) {
  console.log(data[0].weather.description);
  console.log(data);
  console.log(data[0].temp);
  console.log(data[0].sunrise);
  console.log(data[0].sunset);
  temperature.innerText += ` ${data[0].temp}°C`;
  img.src = `/icons/${data[0].weather.icon}.png`;
  description.innerText = data[0].weather.description;

  const text = data[0].sunrise;
  const myArray = text.split(':');
  myArray[0] = parseInt(myArray[0]) + 2;
  const time = `${myArray[0]}:${myArray[1]}`;

  sunrise.innerText += ` ${time}`;

  const text2 = data[0].sunset;
  const myArray2 = text2.split(':');
  myArray2[0] = parseInt(myArray2[0]) + 2;
  const time2 = `${myArray2[0]}:${myArray2[1]}`;

  sunset.innerText += ` ${time2}`;
}

// img.append(description);
// h2.append(description);
src.appendChild(h2);
src.append(img);
src.append(description);
src.appendChild(temperature);
src.append(sunrise);
src.append(sunset);
