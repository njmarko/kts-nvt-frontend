import { Component, Input, OnInit } from '@angular/core';
import { OrderItemGroup } from '../../types/OrderItemGroup';

@Component({
  selector: 'app-order-item-group',
  templateUrl: './order-item-group.component.html',
  styleUrls: ['./order-item-group.component.scss'],
})
export class OrderItemGroupComponent implements OnInit {
  @Input() group!: OrderItemGroup;

  constructor() {}

  ngOnInit(): void {}

  getGroupIcon(): string {
    if (this.group.status === 'NEW') return 'delete_forever';
    else if (this.group.status === 'SENT') return 'hourglass_full';
    else return 'done_all';
  }

  getGroupIconColor(): string {
    if (this.group.status === 'NEW') return 'red';
    else if (this.group.status === 'SENT') return 'orange';
    else return 'green';
  }
}
