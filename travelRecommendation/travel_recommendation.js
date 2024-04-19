let dataFromServer;

function handleClear() {
  document.querySelector('.input').value = '';
  displayResults([]);
}

function fetchData() {
  const query = document.querySelector('input').value.trim().toLowerCase();
  if (query === '') {
    console.log('Please enter a valid keyword.');
    return;
  }

  fetch('./travel_recommendation_api.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      dataFromServer = data;

      filterResults(query);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function filterResults(query) {
  const filteredCities = [];

  dataFromServer.countries.forEach((country) => {
    country.cities.forEach((city) => {
      if (
        city.name.toLowerCase().includes(query) ||
        city.description.toLowerCase().includes(query)
      ) {
        filteredCities.push(city);
      }
    });
  });

  if (query.toLowerCase().includes('temple')) {
    dataFromServer.temples.forEach((temple) => {
      filteredCities.push(temple);
    });
  }

  if (query.toLowerCase().includes('beach')) {
    dataFromServer.beaches.forEach((beach) => {
      filteredCities.push(beach);
    });
  }

  displayResults(filteredCities);
}

function displayResults(results) {
  const result = document.querySelector('.result');
  result.innerHTML = '';

  results.forEach((city) => {
    const card = `
            <div class="card">
                <img src="${city.imageUrl}" alt="${city.name} height="300px" width="300px"">
                <h3>${city.name}</h3>
                <p>${city.description}</p>
            </div>
        `;
    result.innerHTML += card;
  });
}
