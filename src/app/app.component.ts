import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CustomerListComponent } from './Components/customer-list/customer-list.component';
import { TransactionGraphComponent } from './Components/transaction-graph/transaction-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CustomerListComponent,TransactionGraphComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'customer-transaction-app';
  transactions: any[] = [];

  updateGraph(transactions: any[]): void {
    this.transactions = transactions;
  }
}
