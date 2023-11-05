import { Injectable } from '@angular/core';
import { StorageService } from './local-storage.service';
import { Customer } from '../models';
import { CUSTOMERS_MAIL_KEY } from 'src/app/config/local-storage.config';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers = this.storageService.getItem(CUSTOMERS_MAIL_KEY) || [];
  constructor(private storageService: StorageService) {}

  addCustomer(customer: Customer) {
    this.customers.push(customer);
    return this.storageService.setItem(CUSTOMERS_MAIL_KEY, this.customers);
  }
}
