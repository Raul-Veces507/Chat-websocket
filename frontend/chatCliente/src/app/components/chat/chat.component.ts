import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
prueba:any=[]
  userChat = {
    user: '',
    text: '',
  }
  imagen:any
  mensaje=''
  nombre:any;
  myMessages: any=[];
  chat2:any[]=[];
  eventName = "send-message"
  constructor(private servicio: WebsocketService, private activateR: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activateR.snapshot.params['id'];
    this.nombre=id;
    this.userChat.user = id
    var usuario = {
      nombre: id,
      sala: 1
    };
    this.servicio.listen('entrarChat', usuario).subscribe((data) => {
    
    })

    this.servicio.listen2('text-event').subscribe((data:any)=>{    

      console.log('a');
      this.myMessages.push(data);
      if(data.nombre== id){
      }else{
     this.chat2.push(data);
      }

    })



  }




  myMessage() {


    const id = this.activateR.snapshot.params['id'];
    var prueba = {

      nombre: id,
      mensaje: this.mensaje,
      images:this.imagen ,
    };
 
    this.servicio.emit(this.eventName, prueba)
    this.mensaje=''

  }




//   ngOnInit(): void {
//     const id = this.activateR.snapshot.params['id'];
//     this.userChat.user= id
//     this.servicio.listen('text-event').subscribe((data)=>{
//       console.log(data);
      
//       this.myMessages=data
//     })
//   }

// myMessage(){
//   this.servicio.emit(this.eventName,this.userChat);
//   this.userChat.text=''
// }

}
