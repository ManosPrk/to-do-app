import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';
import { ToDoCategoriesComponent } from './to-do-categories/to-do-categories.component';
import { ToDoItemComponent } from './to-do-item/to-do-item.component';



@NgModule({
  declarations: [
    ToDoCategoriesComponent,
    ToDoItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ToDoCategoriesComponent
  ]
})
export class ToDoModule { }
