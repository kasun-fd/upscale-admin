import {Component, Input} from '@angular/core';
import {MatSlideToggle} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-customer-status-manager',
  standalone: true,
  imports: [
    MatSlideToggle
  ],
  templateUrl: './customer-status-manager.component.html',
  styleUrl: './customer-status-manager.component.scss'
})
export class CustomerStatusManagerComponent {
  @Input() customer:any;
}
