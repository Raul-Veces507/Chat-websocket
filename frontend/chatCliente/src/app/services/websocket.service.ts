import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io } from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket:any;
  server = io('http://192.168.88.144:4000/', {transports: ['websocket']});


  constructor() {
    this.socket = this.server
    
   }




   emit(eventName:string,data:any){
    this.socket.emit(eventName,data)
  }


  // listen(eventName:string){
  //   return new Observable((Subscriber)=>{
  //     this.socket.on(eventName,(data:any)=>{
  //       Subscriber.next(data)
  //     })
  //   })
  // }




  listen(valor:any,usuario:any){
    return new Observable((Subscriber)=>{
      this.socket.emit(valor,usuario,(data:any)=>{
        Subscriber.next(data)
      })
    })

  }

  listen2(eventName:string){
    return new Observable((Subscriber)=>{
      this.socket.on(eventName,(data:any)=>{
        Subscriber.next(data)
      })
    })
  }
}
