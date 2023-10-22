const requester =async(method,url,data)=>{

    //to be extended
     let request;

     let customHeaders = {};

     if(method=='GET'){
        request = fetch(url,{
            headers:{...customHeaders}
        })
     }else{
        request = fetch(url,{
            headers:{customHeaders,
            'content-type':'application-json'},
            body:JSON.stringify(data)
        })
     }

     var response  = await request;

     if(response.ok){
        const result  = await response.json();
        return result;
     }else{
        const error =  await response.json();
        throw new error;
     }
}




export const get = requester.bind(null,'GET')

export const post =requester.bind(null,'POST')

export const put = requester.bind(null,'PUT')

export const del = requester.bind(null,'DELETE')