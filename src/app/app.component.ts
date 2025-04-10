import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { UsuarioService } from './usuario.service';
import { DialogUsuarioComponent } from './dialog-usuario/dialog-usuario.component';
import { MatDialog } from '@angular/material/dialog';


// 'id', 'nombre', 'ap1', 'ap1', 'email', 'curp', 'sexo', 'id_rol', 'password'
export interface IDataTable {
  id: number;
  nombre: string;
  ap1: string;
  ap2: string;
  email?: string; /* El ? hace que la variable sea OPCIONAL */
  curp: string;
  sexo: string;
  id_rol: number;
  password: string;
}


@Component({
  selector: 'app-root',
  imports: [ MatTableModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{

  // usuarios: any[] = [];
  // dataSource: any[] = [];
  dataSource: IDataTable[] = []; //Buena práctica porque nuestros datos ya llegan con un estructura (BUENAS PRÁCTICAS DE PROGRAMACIÓN)
  readonly dialog = inject(MatDialog);



  constructor(private usuarioService:UsuarioService){ }

  ngOnInit(): void {
    // Lo que esté aqui será lo primero en ejecutarse en llamar al componente
    this.usuarioService.getUsuarios().subscribe(data=>{
      this.dataSource=data;
      // console.log(this.usuarios);
    })
  }
  displayedColumns: string[] = ['id', 'nombre', 'ap1', 'ap2', 'email', 'curp', 'sexo', 'id_rol', 'password'];
  // dataSource = this.usuarios;
  title = 'angularCurso';





  openDialog(): void {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      width: '80%',
      height: '80%',
      data: { mode: 'create' } // Modo para crear un usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario de creación fue cerrado');
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      width: '80%',
      height: '80%',
      data: { mode: 'edit' } // Modo para editar un usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario de edición fue cerrado');
    });
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DialogUsuarioComponent, {
      width: '80%',
      height: '80%',
      data: { mode: 'delete' } // Modo para eliminar un usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El formulario de eliminación fue cerrado');
    });
  }  



}