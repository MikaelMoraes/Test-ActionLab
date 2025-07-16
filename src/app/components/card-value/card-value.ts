import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-value',
  imports: [CommonModule],
  templateUrl: './card-value.html',
  styleUrl: './card-value.scss'
})
export class CardValue {
  @Input() date: string = '';
  @Input() openValue: number = 0;
  @Input() highValue: number = 0;
  @Input() closeValue: number = 0;
  @Input() lowValue: number = 0;
  @Input() closeDiffPercentage?: number = 0;

  get closeDiffClass(): string {
    if (this.closeDiffPercentage) {
      return this.closeDiffPercentage < 0 ? 'text-danger' : 'text-success';
    }
    return 'text-danger'
  }

  get closeDiffIcon(): string {
    if (this.closeDiffPercentage) {
      return this.closeDiffPercentage < 0 ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-up';
    }
    return 'fa-solid fa-chevron-down'
  }
}
