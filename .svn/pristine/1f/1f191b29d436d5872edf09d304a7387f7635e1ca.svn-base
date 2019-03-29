import fetchJsonp from 'fetch-jsonp';
const expireTime = 1000 * 60 * 60; //20分钟有效值

function processJSONP(method, url, body)
{
  method = method.toUpperCase();

  if (method === 'GET') {
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }
//记录上一次登录地址
//  localStorage.setItem('access_LoginHistoryurl', window.location.hash.indexOf('login')>-1?'': window.location.hash);

  let unauthorized = false;//有认证
 // const lastToken = localStorage.getItem('access_token') || ''
  //const now =Date.now();

 //if (lastToken) {
  //  const expired = now - lastToken > expireTime;
 //   if (!expired) {//没有过期
  //      unauthorized = false;
  //      localStorage.setItem('access_token', now);
   // }
  //}

  if (unauthorized) {
   // console.log(window.location.hash);
    window.location.href= './#login';
    // window.location.href= './#login?ReturnUrl='+encodeURIComponent(window.location.hash);
     return 0;
  }
  else
    return 1;
}

export default function requestJSONP (method, url, body) {
  
  var res = processJSONP(method, url, body);
  /*
  if(res == 0)
  {
     let tick = new Date().getMilliseconds();
     url = window.SEVERURL + '/_layouts/15/starbucks/401.js?v='+tick;//401 json

     return [];
  }
  else
  { */

  return fetchJsonp(url, {
    timeout: 20000,
    method,
     headers: new Headers({
         'Authorization': window.gettoken, 
         
       }), 
    body
  })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
       const tmpString  = JSON.stringify(json);
       if(tmpString.indexOf('__401__') > -1)
       {
          localStorage.setItem('access_token','');
          window.location.href= './#login';
          //window.location.href= './#login?ReturnUrl='+encodeURIComponent(window.location.hash);
       }
       else{
         return json;
     }
    }).catch(function(ex) {
     
      console.log('parsing failed', ex)
        return '';
    });
 // }
}

export const get = url => requestJSONP('GET', url);
export const post = (url, body) => requestJSONP('POST', url, body); //query

export const put = (url, body) => requestJSONP('PUT', url, body);//add/update
export const del = (url, body) => requestJSONP('DELETE', url, body);//delete
