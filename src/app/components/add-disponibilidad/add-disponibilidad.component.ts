import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Cita } from 'src/app/models/cita.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-disponibilidad',
  templateUrl: './add-disponibilidad.component.html',
  styleUrls: ['./add-disponibilidad.component.css']
})
export class AddDisponibilidadComponent implements OnInit {
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

  citas?: Cita[];
  diaSeleccionado?: string;
  horaInicio?: string;
  horaFin?: string;

  listaDias:string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  submitted = false;

  constructor(private doctorService: DoctorService, 
    private miDatePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
  }

  seleccionarDia(){
    console.log(this.diaSeleccionado);
  }

  saveDisponibilidad(): void{
    if(this.diaSeleccionado != null && this.horaInicio != null && this.horaFin != null){
      this.usuarioDoctor['idUsuario'] = localStorage.getItem('idUsuario')!;
      //poner AM a hora inicio
      this.horaInicio = this.horaInicio+'AM';
      //hora fin PM
      let finAux = this.horaFin!.split(":");
      let finChar = Number(finAux[0]);
      if(finChar > 12){
        let fin = finChar - 12;
        this.horaFin = fin+':'+finAux[1]+'PM';
      } else {
        this.horaFin+'AM';
      }
      this.doctorService.saveDisponibilidad(this.usuarioDoctor, this.diaSeleccionado, this.horaInicio, this.horaFin).subscribe({
        next: data => {
          console.log(data);
          this.router.navigateByUrl('doctor');
        },
        error: err => {
          Swal.fire(err.error.text);
          console.log(err);
        }
      });
    } else {
      Swal.fire('Debe seleccionar un dia y hora de inicio y fin');
    }
  }

}
