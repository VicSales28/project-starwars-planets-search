const fetchPlanets = async (url) => {
  try {
    const promise = await fetch(url);
    const data = await promise.json();
    return data;
  } catch (error) {
    console.log('API request error: ', error.message);
  }
};

export default fetchPlanets;
