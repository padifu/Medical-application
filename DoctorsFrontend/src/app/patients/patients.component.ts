import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment'
import { LoginService } from '../shared/Services/login/login.service'
import { PatientService } from '../shared/Services/patient/patient.service'

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patientsData: any[] = []
  user: any = {}
  moment: any = moment
  roleUser: any = {}
  doctorsData: any[] = []
  name: string = ''
  nameError: boolean = false
  error: boolean = false
  email: string = ''
  emailError: boolean = false
  password: string = ''
  passError: boolean = false
  ph: string = ''
  phError: boolean = false
  gender: string = 'Male'
  genderError: boolean = false
  age: string = ''
  ageError: boolean = false
  height: string = ''
  heightError: boolean = false
  weight: string = ''
  weightError: boolean = false
  closeResult: string
  modalOptions: NgbModalOptions
  constructor(
    private router: Router,
    public patientService: PatientService,
    public loginService: LoginService,
    private modalService: NgbModal,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      scrollable: true,
      centered: true,
    }
    let a = localStorage.getItem('userDataDetails')
    this.user = JSON.parse(a)
  }

  ngOnInit(): void {
    if (this.user.role === 'doctor') {
      this.patientService.subject.subscribe((data: any[]) => {
        if (data) {
          this.patientsData = data.reverse()
        }
      })
    }
    this.getPatientsList()
    let b = localStorage.getItem('roleUser')
    this.roleUser = JSON.parse(b)
  }
  getPatientsList() {
    let b = localStorage.getItem('roleUser')
    let doctor = JSON.parse(b)
    if (this.user.role === 'doctor') {
      this.patientService
        .getPatientsByDoctor(doctor._id)
        .subscribe((res: any) => {
          this.patientsData = res.reverse()
        })
    } else if (this.user.role === 'admin') {
      this.patientService.getPatients().subscribe((res: any[]) => {
        this.patientsData = res.reverse()
      })
    }
  }
  openModal(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    })
  }
  IsEmailVerified(email: string) {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if (!email || regex.test(email) === false) {
      return false
    }
    return true
  }
  handleName(val: string) {
    if (val) {
      this.nameError = false
      this.name = val
    } else {
      this.nameError = true
    }
  }
  handleAge(val: string) {
    if (val) {
      this.ageError = false
      this.age = val
    } else {
      this.ageError = true
    }
  }
  handleHeight(val: string) {
    if (val) {
      this.heightError = false
      this.height = val
    } else {
      this.heightError = true
    }
  }
  handleWeight(val: string) {
    if (val) {
      this.weightError = false
      this.weight = val
    } else {
      this.weightError = true
    }
  }
  handlePh(val: string) {
    if (val) {
      this.phError = false
      this.ph = val
    } else {
      this.phError = true
    }
  }
  handleGender(val: string) {
    if (val) {
      this.genderError = false
      this.gender = val
    } else {
      this.genderError = true
    }
  }
  handleEmail(val: string) {
    if (this.IsEmailVerified(val)) {
      this.emailError = false
      this.email = val
    } else {
      this.emailError = true
    }
  }
  handlePassword(val: string) {
    if (val && val.length > 7) {
      this.passError = false
      this.password = val
    } else {
      this.passError = true
    }
  }
  handleSubmit() {
    if (
      this.name &&
      this.IsEmailVerified(this.email) &&
      this.password &&
      this.ph &&
      this.gender &&
      this.password.length > 7 &&
      this.passError === false &&
      this.emailError === false &&
      this.nameError === false &&
      this.phError === false &&
      this.heightError === false &&
      this.weightError === false &&
      this.genderError === false
    ) {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        gender: this.gender,
        phone: this.ph,
        role: 'patient',
      }
      let docData = {
        name: this.name,
        gender: this.gender,
        phone: this.ph,
        age: this.age,
        doctor: this.roleUser._id,
        height: this.height,
        weight: this.weight
      }
      this.loginService.CreateUser(data, docData)
      this.getPatientsList()
      this.modalService.dismissAll()
    } else {
      alert('Ivalid inputs!')
    }
  }
  goToDetailPage(id: string) {
    this.router.navigateByUrl(`/patients/patient-details/` + id)
  }
}
