// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: 'http://localhost:8000/api',
  SRC: 'http://localhost:8000/fondos/',
  PERFIL: 'http://localhost:8000/perfil/',
  firebaseConfig: {
    apiKey: "AIzaSyBMGyUcfwT3JauJS2MyM8CHe3U847DPIQ8",
    authDomain: "notificaciones-73f9d.firebaseapp.com",
    databaseURL: "https://notificaciones-73f9d.firebaseio.com",
    projectId: "notificaciones-73f9d",
    storageBucket: "notificaciones-73f9d.appspot.com",
    messagingSenderId: "837047116674",
    appId: "1:837047116674:web:984fe4b93f57add7f6a59b",
    measurementId: "G-JZEKR15SXY"
  }
}

/*export const firebaseConfig ={
  apiKey: "AIzaSyBMGyUcfwT3JauJS2MyM8CHe3U847DPIQ8",
  authDomain: "notificaciones-73f9d.firebaseapp.com",
  databaseURL: "https://notificaciones-73f9d.firebaseio.com",
  projectId: "notificaciones-73f9d",
  storageBucket: "notificaciones-73f9d.appspot.com",
  messagingSenderId: "837047116674",
  appId: "1:837047116674:web:984fe4b93f57add7f6a59b",
  measurementId: "G-JZEKR15SXY"
}*/
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
