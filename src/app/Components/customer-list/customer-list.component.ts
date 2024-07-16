import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @Output() transactionsChange = new EventEmitter<any[]>();

  customers: any[] = [];
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  selectedCustomer: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(data => {
      this.customers = data;
    });

    this.dataService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = this.transactions;
      this.transactionsChange.emit(this.filteredTransactions); 
    });
  }

  filterTransactions(customerId: number): void {
    if (customerId === 0) {
      
      this.selectedCustomer = null;
      this.filteredTransactions = this.transactions;
    } else {
      this.selectedCustomer = this.customers.find(c => c.id === customerId);
      this.filteredTransactions = this.transactions.filter(t => t.customer_id === customerId);
    }
    this.transactionsChange.emit(this.filteredTransactions);
  }

  selectCustomer(customerId: number): void {
    this.filterTransactions(customerId);
  }
}
