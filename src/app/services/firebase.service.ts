import { Injectable } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    //public afAuth: AngularFirestore
  ) { }

  /*login(data: any) {
    var usuarios = this.afAuth.collection("usuarios_movil");
    this.getUsuario(data.correo).subscribe((usuario) => {
      if (!usuario.payload.data()) {
        usuarios.doc(data.correo).set({
          id_usuario: data.id_usuario,
          usuario: data.usuario
        });
      }
    });
  }
  getUsuario(doc) {
    return this.afAuth.collection('usuarios_movil').doc(doc).snapshotChanges();
  }*/


}
