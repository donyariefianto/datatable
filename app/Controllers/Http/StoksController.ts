// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stok from 'App/Models/Stok'


export default class StoksController {
  
  public async getData({request,response}){
    const str = 'a,b,c';

    const spaced = str.replaceAll(',', ', ');
    console.log(spaced); // 👉️ "a, b, c"
    return
    const {name,id} = request.all();
    const stok =  await Stok.findBy('name',`${name}`)
    if (stok) {
      return response.json(stok);
    } else {
      return response.json("Not found");
    }
  }

  public async getAllData({response}){
    const stok =  await Stok.all()
    if (stok) {
      return response.json(stok);
    } else {
      return response.json("Not found");
    }
  }

}
