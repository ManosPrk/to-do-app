import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IToDoItem } from './to-do-item';

@Component({
  selector: 'to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.css']
})
export class ToDoItemComponent implements OnInit {
  @Input() item!: any;
  @Input() previewMode = false;
  @Output() editClicked: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() deleteClicked: EventEmitter<number> =
    new EventEmitter<number>();
  deleteModal?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  onEditClick() {
    this.editClicked.emit(this.item);
  }

  confirmDelete(deleteItemTemplate: TemplateRef<any>) {
    this.deleteModal = this.modalService.show(deleteItemTemplate);
  }

  onDeleteClick() {
    this.deleteModal?.hide();
    this.deleteClicked.emit(this.item.id);
  }

  dragStart(event: DragEvent) {
    if (!this.item.id) return;
    event.dataTransfer?.setData("itemId", `${this.item.id}`);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
