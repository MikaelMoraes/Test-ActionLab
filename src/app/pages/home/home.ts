import { Component } from '@angular/core';
import { Accordion } from '../../components/accordion/accordion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CardValue } from "../../components/card-value/card-value";
import { ExchangeRateService } from '../../core/service/exchange-rate.service';
import { FormsModule } from '@angular/forms';
import { DailyExchangeRateResponse } from '../../core/models/daily-exchange-rate.model';
import { CurrentExchangeRate } from '../../core/models/current-exchange-rate.model';
import { forkJoin } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    Accordion,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CardValue,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [DatePipe],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  currencys: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
  selectedCurrency: string = '';
  dayliResult!: DailyExchangeRateResponse;
  currentResult!: CurrentExchangeRate;

  isLoading = false;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private datePipe: DatePipe
  ) { }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') ?? '';
  }

  loadExchangeData() {
    if (!this.selectedCurrency) return;
    this.isLoading = true;
    forkJoin({
      current: this.exchangeRateService.getCurrentExchangeRate(this.selectedCurrency),
      daily: this.exchangeRateService.getDailyExchangeRate(this.selectedCurrency),
    }).subscribe({
      next: ({ current, daily }) => {
        this.currentResult = current;
     




        for (let i = 0; i < daily.data.length; i++) {
          const atual = daily.data[i];
          const anterior = daily.data[i + 1]; // dia anterior é o próximo índice (supondo array em ordem decrescente)

          if (anterior) {
            const diff = ((atual.close - anterior.close) / anterior.close) * 100;
            atual.closeDiffPercentage = +diff.toFixed(2); // adiciona campo direto no objeto
          } else {
            atual.closeDiffPercentage = 0; // ou null, se preferir
          }
        }

       this.dayliResult = daily;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar dados:', err);
        this.isLoading = false;
      },
    });
  }
}
