import 'whatwg-fetch';

export function getWhoAmI(token) {
  return fetch('https://freefeed.net/v1/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}

export function getSubscriptions(token, username) {
  return fetch(`https://freefeed.net/v1/users/${username}/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}
