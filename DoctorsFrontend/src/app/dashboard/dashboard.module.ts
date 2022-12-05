import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard.component'
import { SharedModule } from '../shared/shared.module'
import { PatientDashboardComponent } from '../AllRolesDashboardPages/patient-dashboard/patient-dashboard.component'
import { DocterDashboardComponent } from '../AllRolesDashboardPages/docter-dashboard/docter-dashboard.component'
import { AdminDashboardComponent } from '../AllRolesDashboardPages/admin-dashboard/admin-dashboard.component'
import { PatientsReportChartComponent } from '../patients-report-chart/patients-report-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DashboardComponent,
    PatientDashboardComponent,
    DocterDashboardComponent,
    AdminDashboardComponent,
    PatientsReportChartComponent
  ],
  exports: [
    PatientDashboardComponent,
    DocterDashboardComponent,
    AdminDashboardComponent,
    PatientsReportChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    // NgbModule,
    DashboardRoutingModule,
    NgApexchartsModule
  ],
})
export class DashboardModule {}
