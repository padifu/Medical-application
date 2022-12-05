import { Component, OnInit } from '@angular/core'
import { DoctorService } from 'src/app/shared/Services/doctor/doctor.service'
import { PatientService } from 'src/app/shared/Services/patient/patient.service'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  patientsData: any[] = []
  doctorsData:any[] = []
  constructor(
    public patientService: PatientService,
    public doctorService: DoctorService,
  ) {}
  ngOnInit(): void {
    // this.doctorService.subject.subscribe((data: any) => {
    //   this.doctorsData = data
    // })
    this.getPatientsList()
    this.getDoctorsList()
  }
  getPatientsList() {
    this.patientService.getPatients().subscribe((res: any) => {
      this.patientsData = res
    })
  }
  getDoctorsList() {
    this.doctorService.getDoctors().subscribe((res: any) => {
      this.doctorsData = res
    })
  }
}
