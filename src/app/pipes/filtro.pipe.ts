import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any, texto: string, columna: string): any[] {
    if (texto === '') {
      return arreglo;
    }

    texto.toLowerCase();
    //console.log(texto);
    return arreglo.filter(item => {
      return item[columna].toLowerCase()
        .includes(texto);
    });

  }

}
