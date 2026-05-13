import { Routes } from '@angular/router';

import { CategoriesComponent } from './pages/categories/categories';
import { Books } from './pages/books/books';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full'
  },

  {
    path: 'categories',
    component: CategoriesComponent
  },

  {
    path: 'books',
    component: Books
  }

];