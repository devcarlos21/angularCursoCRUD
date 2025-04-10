import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldControl } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-usuario',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule ,ReactiveFormsModule, FormsModule],
  templateUrl: './dialog-usuario.component.html',
  styleUrl: './dialog-usuario.component.css'
})
export class DialogUsuarioComponent {

  public formUsuarios: FormGroup;
  private http!: HttpClient;

  constructor(private httpClient: HttpClient) {
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
  
}