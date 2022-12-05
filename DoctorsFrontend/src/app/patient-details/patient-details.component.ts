import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment'
import { LoginService } from '../shared/Services/login/login.service'
import { MedicalNoteService } from '../shared/Services/MedicalNote/medicalNote.service'
import { PatientService } from '../shared/Services/patient/patient.service'

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  buttonsList: string[] = [
    'Personal Information',
    'Blood Pressure',
    'Blood Sugar',
    'Heart Rate',
    'Medical Note',
  ]
  btnTab: string = 'Personal Information'
  // refreshGrid: boolean = false
  refreshGrid: boolean = false
  moment: any = moment
  user: any = {}
  patientData: any[] = []
  roleUser: any = {}
  notesData: any[] = []
  note: string = ''
  noteError: boolean = false
  patientId: string = ''
  closeResult: string
  modalOptions: NgbModalOptions
  constructor(
    private router: Router,
    public patientService: PatientService,
    public loginService: LoginService,
    private modalService: NgbModal,
    public medicalNoteService: MedicalNoteService,
    private route: ActivatedRoute,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'md',
      scrollable: true,
      centered: true,
    }
    let a = localStorage.getItem('userDataDetails')
    this.user = JSON.parse(a)
  }

  goBack() {
    this.router.navigate(['/patients'])
  }
  ngOnInit(): void {
    this.medicalNoteService.subject.subscribe((data: any[]) => {
      if (data) {
        this.notesData = data.reverse()
      }
    })
    this.getNotesList()
    this.getPatient()
    let b = localStorage.getItem('roleUser')
    this.roleUser = JSON.parse(b)
    this.handlePatientId()
  }
  handlePatientId() {
    this.route.params.subscribe((params) => {
      this.patientId = params.id
    })
  }
  getPatient() {
    let myId = ''
    this.route.params.subscribe((params) => {
      myId = params.id
    })
    if (myId)
      this.patientService.getPatientById(myId).subscribe((res: any[]) => {
        this.patientData = res
      })
  }

  getNotesList() {
    let myId = ''
    this.route.params.subscribe((params) => {
      myId = params.id
    })
    this.medicalNoteService
      .getMedicalNotesByPatientId({ patientId: myId })
      .subscribe((res: any[]) => {
        this.notesData = res.reverse()
      })
  }
  refreshList($event: string) {
    this.refreshGrid = !this.refreshGrid
  }
  openModal(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    })
  }

  handleNote(val: string) {
    if (val) {
      this.noteError = false
      this.note = val
    } else {
      this.noteError = true
    }
  }
  clearAll() {
    this.note = ''
    this.noteError = false
  }

  handleAddNote() {
    let myId = ''
    this.route.params.subscribe((params) => {
      myId = params.id
    })
    if (this.note && this.noteError === false) {
      let data = {
        note: this.note,
        patient: myId,
        doctor: this.roleUser._id,
      }
      this.medicalNoteService.CreateMedicalNote(data)
      this.getNotesList()
      this.modalService.dismissAll()
      this.clearAll()
    } else {
      alert('Ivalid inputs!')
    }
  }
}
