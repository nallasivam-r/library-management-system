import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BookService } from '../../services/book';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.html',
  styleUrls: ['./books.css']
})

export class Books implements OnInit {

  books: any[] = [];
  filteredBooks: any[] = [];
  categories: any[] = [];

  searchText = '';
  selectedCategory = '';

  editMode = false;
  editId = 0;

  book = {
    bookName: '',
    author: '',
    isbn: '',
    publishedDate: '',
    category: {
      id: ''
    }
  };

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.getBooks();
    this.getCategories();

  }

  getBooks() {

    this.bookService.getAll()
    .subscribe((data: any) => {

      this.books = data;
      this.filteredBooks = data;

    });
  }

  getCategories() {

    this.categoryService.getAll()
    .subscribe((data: any) => {

      this.categories = data;

    });
  }

  saveBook() {
    if(!this.book.bookName ||
   !this.book.author ||
   !this.book.isbn ||
   !this.book.publishedDate ||
   !this.book.category.id) {

  alert('All fields are required');
  return;

}

    if(this.editMode) {

      this.bookService.update(this.editId, this.book)
      .subscribe(() => {

        this.resetForm();
        this.getBooks();

      });

    } else {

      this.bookService.create(this.book)
      .subscribe(() => {

        this.resetForm();
        this.getBooks();

      });
    }
  }

  editBook(book: any) {

    this.editMode = true;

    this.editId = book.id;

    this.book = {
      bookName: book.bookName,
      author: book.author,
      isbn: book.isbn,
      publishedDate: book.publishedDate,
      category: {
        id: book.category?.id
      }
    };
  }

  deleteBook(id: number) {

    if(confirm('Delete Book?')) {

      this.bookService.delete(id)
      .subscribe(() => {

        this.getBooks();

      });
    }
  }

  searchBooks() {

    this.filteredBooks = this.books.filter(book =>

      book.bookName.toLowerCase()
      .includes(this.searchText.toLowerCase())

    );
  }

  filterCategory() {

    if(this.selectedCategory == '') {

      this.filteredBooks = this.books;

    } else {

      this.filteredBooks = this.books.filter(book =>

        book.category?.id == this.selectedCategory

      );
    }
  }

  resetForm() {

    this.editMode = false;

    this.editId = 0;

    this.book = {
      bookName: '',
      author: '',
      isbn: '',
      publishedDate: '',
      category: {
        id: ''
      }
    };
  }
}