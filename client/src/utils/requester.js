const requester =async(method,url,data)=>{
    let customHeaders = {};

   const user = localStorage.getItem('user');
   const userData = JSON.parse(user||'{}');

   if(userData.token){
      customHeaders.Authorization = JSON.parse(user).token;
   }
     let request;
     if(method=='GET'){
        request = fetch(url,{
            method,
            headers:{...customHeaders}
        })
     }else{
        request = fetch(url,{
            method,
            headers:{...customHeaders,
            'content-type':'application/json'},
            body:JSON.stringify(data)
        })
     }

     var response  = await request;

     if(response.ok){
        const result  = await response.json();
        return result;
     }else{
        throw new Error(await response.json())
     }
}


export const get = requester.bind(null,'GET')

export const post =requester.bind(null,'POST')

export const put = requester.bind(null,'PUT')

export const del = requester.bind(null,'DELETE')