import { Component, OnInit, Pipe } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radius: 5px;
    }

    `
  ]
})
export class AgregarComponent implements OnInit {


  publishers = [
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Image Comics',
      desc: 'Image - Comics'
    }
  ];

  heroe:Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor(private heroesService:HeroesService,
              private ActivatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    if(this.router.url.includes('editar')){
      this.ActivatedRoute.params.
      pipe(switchMap( ({id}) => this.heroesService.getHeroe( id ) )).
      subscribe( heroe => this.heroe = heroe);
    }


  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if( this.heroe.id ){

      this.heroesService.actualizarHeroe( this.heroe ).
      subscribe(resp => this.mostrarSnakbar('Heroe actualizado correctamente'));

    }else{
      this.heroesService.guardarHeroe( this.heroe ).
      subscribe(heroe => this.router.navigate(['/heroes/editar', heroe.id]));
      this.mostrarSnakbar('Heroe agregado correctamente')
    }

    
  }

  eliminarHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '300px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe( (result) => {

      if(result){
        this.heroesService.eliminarHeroe( this.heroe.id! ).subscribe(
          resp => {
            this.router.navigate(['/heroes']);
            this.mostrarSnakbar('Heroe eliminado correctamente')
        });
      }

    });

  }
  

  mostrarSnakbar(mensaje: string){
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 3000
    });
  }
  

}
