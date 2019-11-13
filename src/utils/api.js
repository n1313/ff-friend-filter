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

export function getSubscribers(token, username) {
  return fetch(`https://freefeed.net/v1/users/${username}/subscribers`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}

export function getPosts(token, username, offset = 0, sortedByDate = true) {
  const args = [offset ? `offset=${offset}` : false, sortedByDate ? 'sort=created' : '']
    .filter(Boolean)
    .join('&');

  return fetch(`https://freefeed.net/v2/timelines/${username}?${args}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}
