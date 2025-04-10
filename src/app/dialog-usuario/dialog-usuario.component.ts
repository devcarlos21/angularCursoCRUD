import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldControl } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.css'
})
export class DialogUsuarioComponent {

  mode: 'create' | 'edit' | 'delete';
  public formUsuarios: FormGroup;
  public formEditarUsuario: FormGroup;
  public formEliminarUsuario: FormGroup;
  private http!: HttpClient;

  
  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.mode = data?.mode || 'create'; // Si no hay data, por defecto será 'create'

    // Formulario para agregar usuario
    this.formUsuarios = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      ap1: new FormControl('', [Validators.required]),
      ap2: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      curp: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      id_rol: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    // Formulario para editar usuario
    this.formEditarUsuario = new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl(''),
      ap1: new FormControl(''),
      ap2: new FormControl(''),
      email: new FormControl(''),
      curp: new FormControl(''),
      sexo: new FormControl(''),
      id_rol: new FormControl(''),
      password: new FormControl(''),
    });

    // Formulario para eliminar usuario
    this.formEliminarUsuario = new FormGroup({
      id: new FormControl('', [Validators.required]),
    });

  }

  guardar(){
    if(this.formUsuarios.valid){
      console.log(this.formUsuarios.value); 
      

      const body = {
        id: this.formUsuarios.value.id,
        nombre: this.formUsuarios.value.nombre,
        ap1: this.formUsuarios.value.ap1,
        ap2: this.formUsuarios.value.ap2,
        email: this.formUsuarios.value.email,
        curp: this.formUsuarios.value.curp, //Opcional
        sexo: this.formUsuarios.value.sexo,
        id_rol: this.formUsuarios.value.id_rol,
        password: this.formUsuarios.value.password,

      };

      this.formUsuarios.reset();

      this.httpClient.post('http://localhost:3000/crearusuario', body).subscribe(
        response => {
          console.log('Respuesta del servidor: ', response);
        },
        error => {
          console.error('Error en la peticion', error);
        }
      );

      this.formUsuarios.reset();

    } else{
      console.log("Formulario no valido");
    }
  }



  // Método para editar un usuario
  editarUsuario() {
    if (this.formEditarUsuario.valid) {
      const id = this.formEditarUsuario.value.id;
      const body = { ...this.formEditarUsuario.value };
      delete body.id; // Eliminamos el ID del cuerpo de la solicitud

      this.httpClient.put(`http://localhost:3000/editarusuario/${id}`, body).subscribe(
        response => {
          console.log('Usuario actualizado:', response);
        },
        error => {
          console.error('Error al actualizar usuario:', error);
        }
      );
      this.formEditarUsuario.reset();
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para eliminar un usuario
  eliminarUsuario() {
    if (this.formEliminarUsuario.valid) {
      const id = this.formEliminarUsuario.value.id;

      this.httpClient.delete(`http://localhost:3000/borrarusuario/${id}`).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
        },
        error => {
          console.error('Error al eliminar usuario:', error);
        }
      );
      this.formEliminarUsuario.reset();
    } else {
      console.log('Formulario no válido');
    }
  }



}