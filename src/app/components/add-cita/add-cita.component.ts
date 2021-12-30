import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Cita } from 'src/app/models/cita.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-cita',
  templateUrl: './add-cita.component.html',
  styleUrls: ['./add-cita.component.css'],
  providers: [DatePipe]
})
export class AddCitaComponent implements OnInit {
  cita: Cita = {
    idCita: '',
    usuarioDoctor: {},
    usuarioPaciente: {},
    fechaCita: ''
  };

  usuario: Usuario = {
    idUsuario: '',
    nombre: '',
    username: '',
    password: '',
    rol: '',
  };
    
  usuarios?: Usuario[];
  usuarioSeleccionado?: string;
  fechaCita?: string;

  submitted = false;

  constructor(private pacienteService: PacienteService, private miDatePipe: DatePipe) { }

  ngOnInit(): void {
    this.obtenerListaDoctores();
  }

  obtenerListaDoctores(): void {
    this.pacienteService.obtenerListaDoctores()
      .subscribe({
        next: (data) => {
          this.usuarios = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  seleccionarDoctor(){
    console.log(this.usuarioSeleccionado);
  }

  getDisponibilidad(): void {
    const fechaFormateada = this.miDatePipe.transform(this.fechaCita, 'dd-MM-yyyy');
    this.pacienteService.getDisponibilidadDoctor(this.usuarioSeleccionado!, fechaFormateada!)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
  }

}
