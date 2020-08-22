import { Component } from '@angular/core';
import { Pregunta } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public http: HttpClient,
               public alertCtrl: AlertController,
               private navCtrl: NavController) {

    this.respuestasContestadas= [];
    this.radioRequired = [];
    this.radioRequired[1] = true;
    this.radioRequired[2] = true;
    this.radioRequired[3] = true;
    this.radioRequired[4] = true;
    this.radioRequired[5] = true;
    this.radioRequired[6] = true;
    this.radioRequired[7] = true;
    this.radioRequired[8] = true;
    this.radioRequired[9] = true;
    this.radioRequired[10] = true;
    this.radioRequired[11] = true;
    this.radioRequired[12] = true;
    this.radioRequired[13] = true;
    this.preguntas = [];

    this.getPreguntas().subscribe(preg => {
      preg.forEach(elementPreg => {
          this.preguntas.push(elementPreg); 
          console.log('pusheado')
     });
  });

  }

  preguntas: Pregunta[];
  radioRequired: boolean[];
  respuestasContestadas: number[];
  calificacion: number = 0;

  //Obtener las preguntas del archivo JSON
  getPreguntas() {
    return this.http.get<Pregunta[]>('/assets/data/preguntas.json');
  }

  //Metodo que le da valor a cada pregunta y lo acumula en un arreglo
  radioButtonChange(event, idPregunta){
    this.radioRequired[idPregunta] = false;
    this.respuestasContestadas[idPregunta] = parseInt(event.detail.value);
  }

  //Alerta que muestra el resultado
  async presentAlertConsejo( header: string, message: string) {
      
    var botonTexto: string = "Cerrar";

    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [
        {
          text: botonTexto,
          handler: (bla) => {}
        }
      ],
      mode: "ios",
      backdropDismiss: false
    });
    alert.present();
    await alert.onDidDismiss();
  }

  //Metodo para recargar la pagina
  recarga(){
    window.location.reload()
  }

//Cuando presiona el botón de terminar
async testFinalizado(){
    
    if(this.radioRequired[1] == false && this.radioRequired[2] == false && this.radioRequired[3] == false && this.radioRequired[4] == false && this.radioRequired[5] == false &&
      this.radioRequired[6] == false && this.radioRequired[7] == false && this.radioRequired[8] == false && this.radioRequired[9] == false && this.radioRequired[10] == false &&
      this.radioRequired[11] == false && this.radioRequired[12] == false && this.radioRequired[13] == false){
      
        //Restablecemos a 0
        this.calificacion = 0;

        //Empezamos a dar valores, cada respuesta correcta vale .769230769 y cada semicorrecta vale .384615385

        //Pregunta 1
        if(this.respuestasContestadas[1] == 2){
          this.calificacion += .769230769;
        }
        else if(this.respuestasContestadas[1] == 1){
          this.calificacion += .384615385;
        }
        
        //Pregunta 2
        if(this.respuestasContestadas[2] == 2){
          this.calificacion += .769230769;
        }
        else if(this.respuestasContestadas[2] == 1){
          this.calificacion += .384615385;
        }

        //Pregunta 3
        if(this.respuestasContestadas[3] == 2){
          this.calificacion += .769230769;
        }

        //Pregunta 4
        if(this.respuestasContestadas[4] == 2){
          this.calificacion += .769230769;
        }

        //Pregunta 5
        if(this.respuestasContestadas[5] == 2){
          this.calificacion += .769230769;
        }
        else if(this.respuestasContestadas[5] == 1){
          this.calificacion += .384615385;
        }

        //Pregunta 6
        if(this.respuestasContestadas[6] == 2){
          this.calificacion += .769230769;
        }

        //Pregunta 7
        if(this.respuestasContestadas[7] == 2){
          this.calificacion += .769230769;
        }
        else if(this.respuestasContestadas[7] == 1){
          this.calificacion += .384615385;
        }

        //Pregunta 8
        if(this.respuestasContestadas[8] == 2){
          this.calificacion += .769230769;
        }

        //Pregunta 9
        if(this.respuestasContestadas[9] == 2){
          this.calificacion += .769230769;
        }
        else if(this.respuestasContestadas[9] == 1){
          this.calificacion += .384615385;
        }

        //Pregunta 10
        if(this.respuestasContestadas[10] == 2){
          this.calificacion += .769230769;
        }

        //Pregunta 11
        if(this.respuestasContestadas[11] == 2 || this.respuestasContestadas[11] == 1){
          this.calificacion += .769230769;
        }

        //Pregunta 12
        if(this.respuestasContestadas[12] == 2){
          this.calificacion += .769230769;
        }
        else if(this.respuestasContestadas[12] == 1){
          this.calificacion += .384615385;
        }

        //Pregunta 13
        if(this.respuestasContestadas[13] == 2){
          this.calificacion += .769230769;
        }

        if(this.calificacion == 9.999999997){
          this.calificacion = 10;
        }
  
          await this.presentAlertConsejo("Calificación", "" + this.calificacion);
          this.recarga();
        }
    else{
      await this.presentAlertConsejo("Incompleto", "Examen incompleto");
    }
  
    }
}

