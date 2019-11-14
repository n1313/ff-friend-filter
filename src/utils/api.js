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

export function getMyHomefeed(token, username, offset = 0, classicMode = true) {
  const args = [offset ? `offset=${offset}` : false, classicMode ? 'homefeed-mode=classic' : '']
    .filter(Boolean)
    .join('&');

  return fetch(`https://freefeed.net/v2/timelines/home?${args}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}

export function getMyDiscussions(token, username, offset = 0, withMyPosts = true) {
  const args = [offset ? `offset=${offset}` : false, withMyPosts ? 'with-my-posts=yes' : false]
    .filter(Boolean)
    .join('&');

  return fetch(`https://freefeed.net/v2/timelines/filter/discussions?${args}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}

export function getFullPost(token, postId, maxComments = true, maxLikes = true) {
  const args = [maxComments ? 'maxComments=all' : false, maxLikes ? 'maxLikes=all' : false]
    .filter(Boolean)
    .join('&');

  return fetch(`https://freefeed.net/v2/posts/${postId}?${args}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((response) => response.json());
}
