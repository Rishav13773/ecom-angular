import { Component, computed, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [],
  template: `
    <div class="bg-slate-100 p-6 rounded-xl shadow-xl border"></div>
  `,
  styles: ``,
})
export class OrderSummaryComponent implements OnInit {
  ngOnInit(): void {}
}
