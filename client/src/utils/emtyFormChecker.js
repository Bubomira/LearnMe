
export default function checkIfFormDataIsInvalid(data){
   for (const key in data) {
        const element = data[key];
        if(!element||(element&&element.trim().length==0)){
            return false
        }      
    }
    return true; 
}