import { createWorker } from "tesseract.js";

export const recognise = async(ImageUrl)=>{
    const worker =await createWorker('eng+bul');
    const ret = await worker.recognize(ImageUrl)
    await worker.terminate();
    return ret.data.text;
}


