import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-accordion',
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.scss']
})
export class Accordion {
  @Input() title: string = 'Accordion Item';
  @Input() show: boolean = false;

  toggle() {
    this.show = !this.show;
  }
}
