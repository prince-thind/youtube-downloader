import { io } from "../index.js";
import createMockStream from "../misc/mockDownloader.js";

export default async function processInput(formData){
  const mock= createMockStream();

  mock.on('progress',(progress)=>{
    io.emit('progress',{
        message:'Downloading',
        showPercentage:true,
        percentage:progress
    })
  });

  mock.on('finish',()=>{
    io.emit('progress',{
      message:'working',
      showPercentage:false,
      percentage:null
  })
  })
}