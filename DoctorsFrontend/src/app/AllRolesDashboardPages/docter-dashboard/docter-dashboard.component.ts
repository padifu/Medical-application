import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { PatientService } from 'src/app/shared/Services/patient/patient.service'

@Component({
  selector: 'app-docter-dashboard',
  templateUrl: './docter-dashboard.component.html',
  styleUrls: ['./docter-dashboard.component.scss'],
})
export class DocterDashboardComponent implements OnInit {
  moment: any = moment
  patientsData: any = []
  myPatients: any = []
  constructor(public patientService: PatientService) {}
  ngOnInit(): void {
    this.getPatientsList()
    this.getPatientsByDoctor()
  }
  getPatientsList() {
    this.patientService.getPatients().subscribe((res: any) => {
      this.patientsData = res
    })
  }
  getPatientsByDoctor() {
    let b = localStorage.getItem('roleUser')
    let doctor = JSON.parse(b)
    if (doctor)
      this.patientService
        .getPatientsByDoctor(doctor._id)
        .subscribe((res: any) => {
          this.myPatients = res
        })
  }
}
