import fetchJsonp from 'fetch-jsonp';

const expireTime = 1000 * 60 * 60; //20分钟有效值

export default function requestJSONP(method, url, body) {
  method = method.toUpperCase();

  if (method === 'GET') {
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }


  return fetchJsonp(url, {
    timeout: 10000,
    method,
    headers: {
      'Access-Token': localStorage.getItem('access_token') || ''
    },
    body
  })
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      // console.log('parsed json', json);
      return json;
    }).catch(function (ex) {
      // console.log('parsing failed', ex)
      window.location.href = './#login';
      //return Promise.reject('Unauthorized.');
    });

}

export const get = url => requestJSONP('GET', url);
export const post = (url, body) => requestJSONP('POST', url, body); //query

export const put = (body) => requestJSONP('PUT', url, body); //add/update
export const del = (url, body) => requestJSONP('DELETE', url, body); //delete