import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Cita } from 'src/app/models/cita.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Disponibilidad } from 'src/app/models/disponibilidad.model';
import { Router } from '@angular/router';

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

  usuarioDoctor: Usuario = {
    idUsuario: '',
    nombre: '',
    username: '',
    password: '',
    rol: '',
  };

  usuarioPaciente: Usuario = {
    idUsuario: '',
    nombre: '',
    username: '',
    password: '',
    rol: '',
  };

  Disponibilidad: Disponibilidad = {
    idDisponibilidad: '',
    dia: '',
    horaInicio: '',
    horaFin: '',
    usuarioDoctor: {},
  };
    
  usuarios?: Usuario[];
  citas?: Cita[];
  disponibilidades?: Disponibilidad[];
  usuarioSeleccionado?: string;
  fechaCita?: string;
  horaCita?: string;

  listaHoras:string[] = [];

  submitted = false;

  constructor(private pacienteService: PacienteService, 
    private miDatePipe: DatePipe, private router: Router) { }

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

  seleccionarHora(){
    console.log(this.horaCita);
  }

  getDisponibilidad(): void {
    const fechaFormateada = this.miDatePipe.transform(this.fechaCita, 'dd-MM-yyyy');
    this.listaHoras = [];
    this.horaCita = '';
    this.disponibilidades = [];
    if(this.usuarioSeleccionado != 'undefined' && fechaFormateada != null){
      this.pacienteService.getDisponibilidadDoctor(this.usuarioSeleccionado!, fechaFormateada!)
        .subscribe({
          next: (data) => {
            console.log(data);
            if(data.length == 0){
              Swal.fire('El Doctor no tiene disponibilidad en esa fecha');
              this.disponibilidades = data;
            } else {
              this.disponibilidades = data;
              this.Disponibilidad = data[0];
              //obtener las horas y agregarlas al selec
              let inicioAux = this.Disponibilidad.horaInicio!.split(":");
              let inicio = Number(inicioAux[0]);
              //
              let finAux = this.Disponibilidad.horaFin!.split(":");
              let finChar = Number(finAux[0]);
              let fin = finChar + 12;
              for (let i = inicio; i <= fin; i++) {
                this.listaHoras.push(i+":00");
              }
            }
          },
          error: (e) => console.error(e)
        });
    } else {
      Swal.fire('Debe seleccionar un doctor y una fecha');
    }
  }

  saveCitaPaciente(): void {
    //unir la fecha mas la hora
    let fecha = this.fechaCita+" "+this.horaCita+":00";
    //obtener datos del doctor seleccionado
    this.usuarioDoctor['idUsuario'] = this.usuarioSeleccionado;
    this.usuarioPaciente['idUsuario'] = localStorage.getItem('idUsuario')!;
    console.log(fecha);
    this.pacienteService.saveCita(this.usuarioPaciente, this.usuarioDoctor, fecha).subscribe({
      next: data => {
        console.log(data);
        this.router.navigateByUrl('home');
      },
      error: err => {
        Swal.fire(err.error.text);
        console.log(err);
      }
    });
  }

}
