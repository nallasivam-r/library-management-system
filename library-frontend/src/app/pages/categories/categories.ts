import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.html',
  styleUrls: ['./categories.css']
})

export class CategoriesComponent implements OnInit {

  categories: any[] = [];

  editMode = false;
  editId = 0;

  category = {
    name: '',
    description: ''
  };

  constructor(private service: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {

    this.service.getAll().subscribe((data: any) => {

      this.categories = data;

    });
  }

  saveCategory() {
if(!this.category.name.trim()) {

  alert('Category Name is required');
  return;

}
    if(this.editMode) {

      this.service.update(this.editId, this.category)
      .subscribe(() => {

        this.resetForm();
        this.getCategories();

      });

    } else {

      this.service.create(this.category)
      .subscribe(() => {

        this.resetForm();
        this.getCategories();

      });
    }
  }

  editCategory(category: any) {

    this.editMode = true;

    this.editId = category.id;

    this.category = {
      name: category.name,
      description: category.description
    };
  }

  deleteCategory(id: number) {

    if(confirm('Delete Category?')) {

      this.service.delete(id)
      .subscribe(() => {

        this.getCategories();

      });
    }
  }

  resetForm() {

    this.editMode = false;

    this.editId = 0;

    this.category = {
      name: '',
      description: ''
    };
  }
}