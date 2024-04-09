import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InnerhtmlPipe } from '../innerhtml.pipe';
import { DatetimeagoPipe } from '../datetimeago.pipe';
import { CalculateNumberInKPipe } from '../calculate-number-in-k.pipe';
@NgModule({
  declarations: [
    InnerhtmlPipe,
    DatetimeagoPipe,
    CalculateNumberInKPipe
  ],
  imports: [CommonModule],
  exports: [
    InnerhtmlPipe,
    DatetimeagoPipe,
    CalculateNumberInKPipe
  ],
})
export class PipeModule {}
