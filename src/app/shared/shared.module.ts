import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeDifferencePipe } from './time-difference.pipe';



@NgModule({
  declarations: [
    TimeDifferencePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TimeDifferencePipe,
    FormsModule,
    CommonModule,
  ]
})
export class SharedModule { }
