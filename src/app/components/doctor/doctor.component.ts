import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { Cita } from 'src/app/models/cita.model';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  cita: Cita = {
    idCita: '',
    usuarioDoctor: {},
    usuarioPaciente: {},
    fechaCita: ''
  };

  usuarioPaciente: Usuario = {
    idUsuario: '',
    nombre: '',
    username: '',
    password: '',
    rol: '',
  };

  usuarios?: Usuario[];
  citas?: Cita[];
  fechaCita?: string;

  submitted = false;
  constructor(private doctorService: DoctorService, private router: Router, 
    private miDatePipe: DatePipe) { }

  ngOnInit(): void {
  }

  getCitasDoctor(): void {
    const fechaFormateada = this.miDatePipe.transform(this.fechaCita, 'dd-MM-yyyy');
    this.citas = [];
    if(fechaFormateada != null){
      this.doctorService.getCitasDoctor(localStorage.getItem('idUsuario')!, fechaFormateada!)
        .subscribe({
          next: (data) => {
            console.log(data);
            if(data.length == 0){
              Swal.fire('No tiene citas en esa fecha');
              this.citas = data;
            } else {
              this.citas = data;
            }
          },
          error: (e) => console.error(e)
        });
    } else {
      Swal.fire('Debe seleccionar una fecha');
    }
  }

}
