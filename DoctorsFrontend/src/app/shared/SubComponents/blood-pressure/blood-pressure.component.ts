import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import * as moment from 'moment'
import { BloodPressureService } from 'src/app/shared/Services/BloodPressure/BloodPressure.service'
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts'
export type ChartOptions = {
  series: ApexAxisChartSeries
  chart: ApexChart
  xaxis: ApexXAxis
  dataLabels: ApexDataLabels
  grid: ApexGrid
  stroke: ApexStroke
  title: ApexTitleSubtitle
}
@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.scss'],
})
export class BloodPressureComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart: ChartComponent
  public chartOptions: Partial<ChartOptions>
  @Input() patientId: string = ''
  @Output() refreshList = new EventEmitter(true)
  @Input() refreshGrid: boolean = false
  moment: any = moment
  rate: string = ''
  rateError: boolean = false
  desc: string = ''
  descError: boolean = false
  paramsData: any[] = []
  user: any = {}
  roleUser: any = {}
  chartData: any[] = []
  xAxisArray: any[] = []
  constructor(public bloodPressureService: BloodPressureService) {
    let a = localStorage.getItem('userDataDetails')
    this.user = JSON.parse(a)
  }
  ngOnChanges() {
    if (this.refreshGrid) {
      this.hookFunction()
      this.refreshList.emit('refresh')
    }
  }
  ngOnInit(): void {
    this.hookFunction()
  }
  hookFunction() {
    this.bloodPressureService.subject.subscribe((data: any[]) => {
      if (data) {
        this.paramsData = data.reverse()
        let dataArray = []
        let axisArr = []
        data.forEach((element: any) => {
          dataArray.push(parseInt(element.rate))
          axisArr.push(moment(element.created_at).format("MM-DD-YYYY"))
        })
        this.chartData = dataArray
        this.xAxisArray = axisArr
      }
    })
    this.getParamsList()
    let b = localStorage.getItem('roleUser')
    this.roleUser = JSON.parse(b)
    setTimeout(() => {
      this.chartOptions = {
        series: [
          {
            name: 'Desktops',
            data: this.chartData,
          },
        ],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },
        title: {
          text: 'All Blood Pressure Measurements',
          align: 'left',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.xAxisArray,
        },
      }
    }, 1000)
  }
  getParamsList() {
    this.bloodPressureService
      .getBloodPressuresByPatientId({ patientId: this.patientId })
      .subscribe((res: any[]) => {
        this.paramsData = res.reverse()
        let dataArray = []
        let axisArr = []
        res.forEach((element) => {
          dataArray.push(parseInt(element.rate))
          axisArr.push(moment(element.created_at).format("MM-DD-YYYY"))
        })
        this.chartData = dataArray
        this.xAxisArray = axisArr
      })
  }
  handleRate(val: string) {
    if (val) {
      this.rateError = false
      this.rate = val
    } else {
      this.rateError = true
    }
  }
  handleDesc(val: string) {
    if (val) {
      this.descError = false
      this.desc = val
    } else {
      this.descError = true
    }
  }
  clearAll() {
    this.rate = ''
    this.desc = ''
    this.rateError = false
    this.descError = false
  }
  handleAddParam() {
    if (
      this.rate &&
      this.desc &&
      this.rateError === false &&
      this.descError === false
    ) {
      let data = {
        rate: this.rate,
        desc: this.desc,
        patient: this.patientId,
        doctor: this.roleUser._id,
      }
      this.bloodPressureService.CreateBloodPressure(data)
      this.getParamsList()
      this.clearAll()
      this.refreshList.emit('refresh')
    } else {
      alert('Ivalid inputs!')
    }
  }
}
