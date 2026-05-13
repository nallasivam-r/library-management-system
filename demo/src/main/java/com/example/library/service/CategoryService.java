package com.example.library.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.library.entity.Category;
import com.example.library.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> getAll() {
        return repository.findAll();
    }

    public Category getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Category create(Category category) {
        return repository.save(category);
    }

    public Category update(Long id, Category category) {

        Category existing = repository.findById(id).orElse(null);

        if(existing != null) {
            existing.setName(category.getName());
            existing.setDescription(category.getDescription());

            return repository.save(existing);
        }

        return null;
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}