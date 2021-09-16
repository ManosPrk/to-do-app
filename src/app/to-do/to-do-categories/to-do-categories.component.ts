import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IToDoItem } from '../to-do-item/to-do-item';
import { ToDoItemService } from '../to-do-item/to-do-item.service';
import { IToDoCategory } from './to-do-categories';
import { ToDoCategoriesService } from './to-do-categories.service';

@Component({
  selector: 'to-do-categories',
  templateUrl: './to-do-categories.component.html',
  styleUrls: ['./to-do-categories.component.css']
})
export class ToDoCategoriesComponent implements OnInit, OnDestroy {
  modalRef?: BsModalRef;
  modalErrorMessage = '';
  categories: IToDoCategory[] = [];
  items: IToDoItem[] = [];
  itemToSave = {
    id: 0,
    title: '',
    category: '',
    description: '',
    timesUpdated: 0,
    dateUpdated: 0,
  };
  showSaveModalPreview = false;
  categoriesSubcription!: Subscription;
  itemSubcription!: Subscription;
  constructor(private categoryService: ToDoCategoriesService, private itemService: ToDoItemService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.categoriesSubcription = this
      .categoryService
      .getCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });

    this.itemSubcription = this
      .itemService
      .getItems()
      .subscribe({
        next: (items) => {
          this.items = items;
        }
      });
  }

  getItemsByCategory(categoryName: string) {
    return [
      ...this.items
        .filter(i => i.category === categoryName)
        .sort((a, b) => a.dateUpdated - b.dateUpdated)
    ];
  }

  onAddItemClick(template: TemplateRef<any>, item: any) {
    this.itemToSave = { ...item };
    this.modalRef = this.modalService.show(template);
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
      this.items.splice(existingItemIdx, 1, {
        ...this.itemToSave as IToDoItem,
      })
    } else {
      this.items.push({
        ...this.itemToSave as IToDoItem,
        id: this.items.length + 1,
      })
    }
    this.closeModal();
    this.resetItemToSave();
  }

  onDeleteItemClick(id: number) {
    const itemToDeleteIdx = this.items
      .findIndex(i => i.id === id);
    this.items.splice(itemToDeleteIdx, 1);
  }

  resetItemToSave() {
    this.itemToSave = {
      id: 0,
      title: '',
      category: '',
      description: '',
      timesUpdated: 0,
      dateUpdated: 0,
    };
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
    const item = this.items.find(i => i.id === itemId);
    if (!item || item.category === categoryName) return;
    item.category = categoryName;
    item.dateUpdated = new Date().getTime();
    item.timesUpdated++;
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  ngOnDestroy() {
    this.categoriesSubcription.unsubscribe();
    this.itemSubcription.unsubscribe();
  }
}
