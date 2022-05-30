import axios from 'axios';

const YOUR_APP_ID = '64afc52f';
const YOUR_APP_KEY = 'a69a06c7ddb2ba7e62c5bef724f43b21';

export const getRecipes = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=10&calories=591-722&health=alcohol-free`;
  return await axios.get(url);
};
