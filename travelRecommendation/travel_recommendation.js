const fetchedData = fetch('travel_recommendation_api.json')
  .then((response) => response.json());

  console.log(fetchedData);