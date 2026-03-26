

// import { Component, OnInit } from '@angular/core';
// import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
// import { ReportService } from './report.service';

// Chart.register(PieController, ArcElement, Tooltip, Legend);

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html'
// })
// export class ReportComponent implements OnInit {

//   locations: string[] = [];
//   months = [
//     { value: 1, label: 'January' },
//     { value: 2, label: 'February' },
//     { value: 3, label: 'March' },
//     { value: 4, label: 'April' },
//     { value: 5, label: 'May' },
//     { value: 6, label: 'June' },
//     { value: 7, label: 'July' },
//     { value: 8, label: 'August' },
//     { value: 9, label: 'September' },
//     { value: 10, label: 'October' },
//     { value: 11, label: 'November' },
//     { value: 12, label: 'December' }
//   ];

//   years: number[] = [];

//   selectedLocation = '';
//   selectedMonth: number | '' = '';
//   selectedYear: number | '' = '';

//   chart: any;

//   constructor(private reportService: ReportService) {}

//   ngOnInit() {
//     this.generateYears();
//     this.loadLocations();
//     this.loadReport();
//   }

//   generateYears() {
//     const currentYear = new Date().getFullYear();
//     for (let y = currentYear; y >= currentYear - 5; y--) {
//       this.years.push(y);
//     }
//   }
   
//   //Working fine
//   loadLocations() {
//     this.reportService.getLocations().subscribe((res: any) => {
//       this.locations = res.locations || [];
//     });
//   }

//   loadReport() {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');

//     const params = {
//       userId: user._id,
//       location: this.selectedLocation,
//       month: this.selectedMonth,
//       year: this.selectedYear
//     };

//     this.reportService.getReport(params).subscribe((res: any) => {

//       console.log(params);
      
//       const booked = res.booked || 0;
//       const cancelled = res.cancelled || 0;

//       this.renderChart(booked, cancelled);
//     });
//   }

//   renderChart(booked: number, cancelled: number) {

//     if (this.chart) {
//       this.chart.destroy();
//     }

//     this.chart = new Chart("reportChart", {
//       type: 'pie',
//       data: {
//         labels: ['Booked', 'Cancelled'],
//         datasets: [{
//           data: [booked, cancelled],
//           backgroundColor: ['#36A2EB', '#FF6384']
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { position: 'bottom' }
//         }
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Chart, PieController, ArcElement, Tooltip,
BarController, BarElement,
  CategoryScale, LinearScale,
 Legend } from 'chart.js';
import { ReportService } from './report.service';

Chart.register(PieController, ArcElement,
BarController, BarElement,
  CategoryScale, LinearScale,
 Tooltip, Legend);

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html'
})
export class ReportComponent implements OnInit {

  locations: string[] = [];
  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  years: number[] = [];

  selectedLocation = '';
  selectedMonth: number | '' = '';
  selectedYear: number | '' = '';

  // chart: any;
  
selectedChartType: 'pie' | 'bar' = 'pie';

  chart: Chart | null = null;

  
// Optional: store latest values so chart type change doesn't call API again
  lastBooked = 0;
  lastCancelled = 0;


  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.generateYears();
    this.loadLocations();
    this.loadReport();
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= currentYear - 5; y--) {
      this.years.push(y);
    }
  }
   
  //Working fine
  loadLocations() {
    this.reportService.getLocations().subscribe((res: any) => {
      this.locations = res.locations || [];
    });
  }

  loadReport() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const params = {
      userId: user._id,
      location: this.selectedLocation,
      month: this.selectedMonth,
      year: this.selectedYear
    };

    this.reportService.getReport(params).subscribe((res: any) => {

      console.log(params);
      
      const booked = res.booked || 0;
      const cancelled = res.cancelled || 0;

      this.lastBooked=booked;
      this.lastCancelled=cancelled;
      
      this.renderChart(booked, cancelled);
    });
  }

   
 onChartTypeChange() {
    this.renderChart(this.lastBooked, this.lastCancelled);
  }

  // renderChart(booked: number, cancelled: number) {
  //   if (this.chart) {
  //     this.chart.destroy();
  //   }

  //   this.chart = new Chart("reportChart", {
  //     type: 'pie',
  //     data: {
  //       labels: ['Booked', 'Cancelled'],
  //       datasets: [{
  //         data: [booked, cancelled],
  //         backgroundColor: ['#36A2EB', '#FF6384']
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { position: 'bottom' }
  //       }
  //     }
  //   });


  // }
  
renderChart(booked: number, cancelled: number) {
    if (this.chart) {
      this.chart.destroy();
    }

    const canvasId = "reportChart";

    if (this.selectedChartType === 'pie') {
      this.chart = new Chart(canvasId, {
        type: 'pie',
        data: {
          labels: ['Booked', 'Cancelled'],
          datasets: [{
            data: [booked, cancelled],
            backgroundColor: ['#36A2EB', '#FF6384']
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom' }
          }
        }
      });

    } else {
      // ✅ Bar chart
      this.chart = new Chart(canvasId, {
        type: 'bar',
        data: {
          labels: ['Booked', 'Cancelled'],
          datasets: [{
            label: 'Bookings',
            data: [booked, cancelled],
            backgroundColor: ['#36A2EB', '#FF6384'],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { precision: 0 }
            }
          }
        }
      });
    }
  }


}



