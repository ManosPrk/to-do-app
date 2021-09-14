import { Component, Input, OnInit } from '@angular/core';
import { IToDoItem } from './to-do-item';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {
  @Input() item!: IToDoItem;
  constructor() { }

  ngOnInit(): void {
  }

}
