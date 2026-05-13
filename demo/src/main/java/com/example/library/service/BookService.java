package com.example.library.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.library.entity.Book;
import com.example.library.entity.Category;
import com.example.library.repository.BookRepository;
import com.example.library.repository.CategoryRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository repository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Book> getAll() {
        return repository.findAll();
    }

    public Book getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<Book> getByCategory(Long categoryId) {
        return repository.findByCategoryId(categoryId);
    }

    public Book create(Book book) {

        if(book.getCategory() != null) {

            Long categoryId = book.getCategory().getId();

            Category category = categoryRepository
                    .findById(categoryId)
                    .orElse(null);

            book.setCategory(category);
        }

        return repository.save(book);
    }

    public Book update(Long id, Book book) {

        Book existing = repository.findById(id).orElse(null);

        if(existing != null) {

            existing.setBookName(book.getBookName());
            existing.setAuthor(book.getAuthor());
            existing.setIsbn(book.getIsbn());
            existing.setPublishedDate(book.getPublishedDate());
            existing.setCategory(book.getCategory());

            return repository.save(existing);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}