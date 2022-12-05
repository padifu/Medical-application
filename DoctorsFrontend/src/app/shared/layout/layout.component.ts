import { Component, OnInit } from '@angular/core'
import { LoginService } from '../Services/login/login.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user: any = {}
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {
    let a = localStorage.getItem('userDataDetails')
    this.user = JSON.parse(a)
  }
  sideBarOpen = true

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen
  }
}
