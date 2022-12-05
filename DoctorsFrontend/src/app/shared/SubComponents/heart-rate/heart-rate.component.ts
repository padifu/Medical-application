import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import * as moment from 'moment'
import { HeartRateService } from 'src/app/shared/Services/HeartRate/HeartRate.service'
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
  selector: 'app-heart-rate',
  templateUrl: './heart-rate.component.html',
  styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent implements OnInit {
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

  constructor(
    public heartRateService: HeartRateService,
  ) {
    let a = localStorage.getItem('userDataDetails')
    this.user = JSON.parse(a)
  }

  ngOnChanges() {
    if (this.refreshGrid) {
      this.hookFunction()
      this.refreshList.emit('sugar')
    }
  }
  ngOnInit(): void {
    this.hookFunction()
  }
  hookFunction() {
    this.heartRateService.subject.subscribe((data: any[]) => {
      if (data) {
        this.paramsData = data.reverse()
        let dataArray = []
        let axisArr = []
        data.forEach((element) => {
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
          text: 'All Heart Rate Measurements',
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
    this.heartRateService
      .getHeartRatesByPatientId({ patientId: this.patientId })
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
      this.heartRateService.CreateHeartRate(data)
      this.getParamsList()
      this.clearAll()
      this.refreshList.emit('sugar')
    } else {
      alert('Ivalid inputs!')
    }
  }
}
