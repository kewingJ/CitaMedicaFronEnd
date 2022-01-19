import { Component, Input, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Cita } from 'src/app/models/cita.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentCita: Cita = {
    idCita: '',
    usuarioDoctor: {},
    usuarioPaciente: {},
    fechaCita: ''
  };
  
  citas?: Cita[];
  currentIndex = -1;
  title = '';

  constructor(private pacienteService: PacienteService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerCitasPaciente();
  }

  obtenerCitasPaciente(): void {
    this.pacienteService.getCitasPaciente(localStorage.getItem('idUsuario'))
      .subscribe({
        next: (data) => {
          this.citas = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.obtenerCitasPaciente();
    this.currentCita = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(cita: Cita, index: number): void {
    this.currentCita = cita;
    this.currentIndex = index;
  }

  cancelarCita(id: number){
    console.log(id);
    this.pacienteService.deleteCitaPaciente(id)
      .subscribe({
        next: (data) => {
          console.log(data);
          window.location.reload();
        },
        error: err => {
          Swal.fire(err.error.text);
          console.log(err);
        }
      });
  }
}
