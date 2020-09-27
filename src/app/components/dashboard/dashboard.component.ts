import { Component} from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import {TESTCASES} from '../project/testcases';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  chartLabels: Label[] = [];
  chartData: MultiDataSet[0] = [];
  chartType: ChartType = 'doughnut';

  constructor() {
    var projects = TESTCASES.map(item => item.projectId).filter((v, i, a) => a.indexOf(v) === i);
    projects.forEach(unique => {
      var countOccurrences = TESTCASES.reduce((a, v) => (v.projectId === unique ? a + 1 : a), 0);
      this.chartLabels.push(unique);
      this.chartData.push(countOccurrences);
    });
      
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}