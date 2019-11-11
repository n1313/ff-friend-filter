import 'whatwg-fetch';

const apiConfig = {
  whoami: 'https://freefeed.net/v2/users/whoami'
};

export function getWhoAmI(token) {
  return fetch(apiConfig.whoami, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}
