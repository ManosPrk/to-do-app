import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { IToDoItem } from '../to-do-item/to-do-item';
import { IToDoCategory } from './to-do-categories';
import { ToDoCategoriesService } from './to-do-categories.service';

@Component({
  selector: 'to-do-categories',
  templateUrl: './to-do-categories.component.html',
  styleUrls: ['./to-do-categories.component.css']
})
export class ToDoCategoriesComponent implements OnInit {
  modalRef?: BsModalRef;
  categories: IToDoCategory[] = [];
  itemToSave: IToDoItem = {
    title: '',
    category: '',
  };
  categoriesSubcription!: Subscription;
  constructor(private categoryService: ToDoCategoriesService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.categoriesSubcription = this
      .categoryService
      .getCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        }
      });
  }

  onAddItemClick(template: TemplateRef<any>, categoryName: string, itemTitle = '') {
    this.itemToSave.category = categoryName;
    this.itemToSave.title = itemTitle;
    this.modalRef = this.modalService.show(template);
  }
}
