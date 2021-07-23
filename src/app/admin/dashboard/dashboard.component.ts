import { GraphService } from './../../_services/graphService/graph.service';
import { LoaderService } from './../../_services/loader/loader.service';
import { StatusCategory } from './../../_models/statusCategoryEnum';
import { MemberProfileService } from './../../_services/member-profile/member-profile.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as Highcharts from 'highcharts';
import  More from 'highcharts/highcharts-more';
More(Highcharts);
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);
import { NotifierMsg } from 'src/app/constants/notifierMsg';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  pieChartOptions: {};
  barChartOptions: {};
  Highcharts = Highcharts;
  totalMembers: number;
  newPassRequests: number;
  updatedPassRequests: number;
  disapprovePassRequests: number;
  statusCategory = StatusCategory;
  chartPackageData;
  chartModePackageData;
  currentYear = moment().format('YYYY');

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public sideNavService: SideNavService,
    private router: Router,
    private notifierService: NotifierService,
    private memberProfileService: MemberProfileService,
    private graphService: GraphService,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.sideNavService.navTitle = "Dashbooard";

    this.barChartOption(1);
    this.pieChartOption(1);

    this.totalMember();
    this.newPassRequest();
    this.updatedPassRequest();
    this.disapprovePassRequest();

    this.chartPackageData = 1;
    // this.chartModePackageData = 1;

    this.graphService.packageData().subscribe(
      data => {
        console.log(data);
        this.barChartOption(data);
      },
      err => {
        console.log(err);
      }
    )

    this.graphService.modePackageData().subscribe(
      data => {
        console.log(data);
        this.pieChartOption(data);
      },
      err => {
        console.log(err);
      }
    )
  }

  totalMember() {
    this.memberProfileService.getCountStatus(1).subscribe(
      data => {
        this.totalMembers = data;
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

  newPassRequest() {
    this.memberProfileService.getCountStatus(0).subscribe(
      data => {
        this.newPassRequests = data;
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

  updatedPassRequest() {
    this.memberProfileService.getCountStatus(3).subscribe(
      data => {
        this.updatedPassRequests = data;
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

  disapprovePassRequest() {
    this.memberProfileService.getCountStatus(2).subscribe(
      data => {
        this.disapprovePassRequests = data;
      },
      err => {
        if (err.status == 401 || err.status == 403) {
          this.router.navigateByUrl('/admin/login');
        } else {
          this.notifierService.showNotification(NotifierMsg.errorMsg, 'OK', 'error');
        }
      }
    );
  }

  changeStatus(sts: StatusCategory) {
    this.router.navigate(['/admin/pass-request',{status: sts}]);
  }

  pieChartOption(data) {
    this.chartModePackageData = data;
    this.pieChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: `Top 5 Transport Mode Wise Package. Year ${+this.currentYear-1}`
      },
      subtitle: {
        // text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
      },

      accessibility: {
        announceNewData: {
          enabled: true
        },
        point: {
          valueSuffix: '%'
        }
      },

      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '{point.name}: {point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: this.chartModePackageData,
        }
      ]
    }
  }

  barChartOption(data) {
    this.chartPackageData = data;
    this.barChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: `Top 5 Packages. Year ${+this.currentYear-1}`
      },
      subtitle: {
        // text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Total percent market share'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: this.chartPackageData,
        }
      ]
    };
  }
}
