import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IToDoItem } from '../to-do-item/to-do-item';
import { ToDoItemService } from '../to-do-item/to-do-item.service';
import { IToDoCategory } from './to-do-categories';
import { ToDoCategoriesService } from './to-do-categories.service';

@Component({
  selector: 'to-do-categories',
  templateUrl: './to-do-categories.component.html',
  styleUrls: ['./to-do-categories.component.css']
})
export class ToDoCategoriesComponent implements OnInit {
  modalRef?: BsModalRef;
  modalErrorMessage = '';
  categories: IToDoCategory[] = [];
  items: IToDoItem[] = [];
  itemToSave: IToDoItem = {
    id: 0,
    title: '',
    category: '',
    description: '',
    timesUpdated: 0,
    dateUpdated: 0,
  };
  showSaveModalPreview = false;
  constructor(private categoryService: ToDoCategoriesService, private itemService: ToDoItemService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });

    this.itemService
      .getItems()
      .subscribe({
        next: (items) => {
          this.items = items;
        }
      });
    this.modalService.onHide
      .subscribe(() => this.resetItemToSaveModal())
  }

  getItemsByCategory(categoryName: string) {
    return [
      ...this.items
        .filter(i => i.category === categoryName)
        .sort((a, b) => a.dateUpdated - b.dateUpdated)
    ];
  }

  get previewItem(): IToDoItem {
    return {
      ...this.itemToSave,
      title: this.itemToSave.title || "Placeholder text",
      dateUpdated: new Date().getTime(),
      timesUpdated: this.itemToSave.timesUpdated + 1
    }
  }

  onAddItemClick(template: TemplateRef<any>, categoryName: string) {
    this.itemToSave.category = categoryName;
    this.modalRef = this.modalService.show(template);
  }

  onEditItemClick(template: TemplateRef<any>, item: IToDoItem) {
    this.itemToSave = { ...item };
    this.modalRef = this.modalService.show(template);
  }

  onDeleteItemClick(id: number) {
    this.itemService
      .deleteItem(id)
      .subscribe(() => this.items = this.items.filter(i => i.id !== id));
  }

  saveItem() {
    if (!this.itemToSave.title) {
      this.modalErrorMessage = 'You must select a title in order to proceed!'
      return;
    }

    this.itemToSave.timesUpdated++;
    this.itemToSave.dateUpdated = new Date().getTime();
    if (this.itemToSave.id) {
      const existingItemIdx = this.items.findIndex(i => i.id === this.itemToSave.id);
      if (
        this.items[existingItemIdx]?.category === this.itemToSave.category &&
        this.items[existingItemIdx]?.title === this.itemToSave.title &&
        this.items[existingItemIdx].description === this.itemToSave.description
      ) {
        this.closeModal();
        return;
      }
      this.itemService
        .updateItem(this.itemToSave)
        .subscribe(item => this.items.splice(existingItemIdx, 1, item));
    } else {
      this.itemService
        .addItem(this.itemToSave)
        .subscribe(item => this.items.push(item));
    }
    this.closeModal();
  }

  resetItemToSaveModal() {
    this.itemToSave = {
      id: 0,
      title: '',
      category: '',
      description: '',
      timesUpdated: 0,
      dateUpdated: 0,
    };
    this.showSaveModalPreview = false;
  }

  resetErrorMessage() {
    if (this.modalErrorMessage) {
      this.modalErrorMessage = '';
    }
  }

  closeModal() {
    this.modalRef?.hide();
  }

  itemDropped(event: DragEvent, categoryName: string) {
    if (!event.dataTransfer?.getData('itemId')) return;
    const itemId = parseInt(event.dataTransfer?.getData('itemId'));
    const itemIdx = this.items.findIndex(i => i.id === itemId);
    if (!this.items[itemIdx] || this.items[itemIdx].category === categoryName) return;
    this.itemService
      .updateItem({
        ...this.items[itemIdx],
        category: categoryName,
        dateUpdated: new Date().getTime(),
        timesUpdated: this.items[itemIdx].timesUpdated + 1
      })
      .subscribe(item => this.items.splice(itemIdx, 1, item));
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
}
