import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { BloodPressureService } from 'src/app/shared/Services/BloodPressure/BloodPressure.service'
import { BloodSugarService } from 'src/app/shared/Services/BloodSugar/BloodSugar.service'
import { HeartRateService } from 'src/app/shared/Services/HeartRate/HeartRate.service'
import { MedicalNoteService } from 'src/app/shared/Services/MedicalNote/medicalNote.service'

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent implements OnInit {
  user: any = {}
  bpData: any[] = []
  bsData: any[] = []
  hrData: any[] = []
  notesData: any[] = []
  constructor(
    private router: Router,
    public medicalNoteService: MedicalNoteService,
    public bloodPressureService: BloodPressureService,
    public bloodSugarService: BloodSugarService,
    public heartRateService: HeartRateService,
  ) {
    let a = localStorage.getItem('userDataDetails')
    this.user = JSON.parse(a)
  }

  goBack() {
    this.router.navigateByUrl('/patients')
  }
  ngOnInit(): void {
    this.getNotesList()
    this.getBpList()
    this.getBsList()
    this.getHrList()
  }

  getBpList() {
    let b = localStorage.getItem('roleUser')
    let patient = JSON.parse(b)
    if (patient) {
      this.bloodPressureService
        .getBloodPressuresByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.bpData = res
        })
    }
  }
  getBsList() {
    let b = localStorage.getItem('roleUser')
    let patient = JSON.parse(b)
    if (patient) {
      this.bloodSugarService
        .getBloodSugarsByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.bsData = res.reverse()
        })
    }
  }
  getHrList() {
    let b = localStorage.getItem('roleUser')
    let patient = JSON.parse(b)
    if (patient) {
      this.heartRateService
        .getHeartRatesByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.hrData = res
        })
    }
  }
  getNotesList() {
    let b = localStorage.getItem('roleUser')
    let patient = JSON.parse(b)
    if (patient)
      this.medicalNoteService
        .getMedicalNotesByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.notesData = res
        })
  }
}
