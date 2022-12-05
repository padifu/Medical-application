import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { LayoutComponent } from './layout/layout.component'
import { HeaderComponent } from './header/header.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { DoctorsSidebarComponent } from './doctors-sidebar/doctors-sidebar.component'
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component'
import { AdminGuard } from './guard/admin.guard'
import { AuthInterceptor } from './Services/authInterceptor/authIntercept'
import { AdminAndDoctorGuard } from './guard/adminAndDoctor.guard'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { PatientGuard } from './guard/patientGaurd'
import { BloodPressureComponent } from './SubComponents/blood-pressure/blood-pressure.component'
import { BloodSugarComponent } from './SubComponents/blood-sugar/blood-sugar.component'
import { HeartRateComponent } from './SubComponents/heart-rate/heart-rate.component'
import { NgApexchartsModule } from 'ng-apexcharts'
// Directives

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidenavComponent,
    DoctorsSidebarComponent,
    AdminSidebarComponent,
    BloodPressureComponent,
    BloodSugarComponent,
    HeartRateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgApexchartsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    DoctorsSidebarComponent,
    AdminSidebarComponent,
    BloodPressureComponent,
    BloodSugarComponent,
    HeartRateComponent,
  ],
  providers: [
    AdminGuard,
    AdminAndDoctorGuard,
    PatientGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
