import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-transaction-graph',
  standalone: true,
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.css']
})
export class TransactionGraphComponent implements OnInit, OnChanges {
  @Input() transactions: any[] = [];
  chart: any;

  constructor() {}

  ngOnInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] && !changes['transactions'].firstChange) {
      const currentValue = changes['transactions'].currentValue;
      const previousValue = changes['transactions'].previousValue;

      // Handle the changes
      console.log('Transactions changed. Current:', currentValue, 'Previous:', previousValue);

      // Update the chart with new data
      this.updateChart();
    }
  }

  initChart(): void {
    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Transaction Amount',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChart(): void {
    const groupedTransactions = this.transactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});

    this.chart.data.labels = Object.keys(groupedTransactions);
    this.chart.data.datasets[0].data = Object.values(groupedTransactions);
    this.chart.update();
  }
}
