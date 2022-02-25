package com.example.backend.controllers;

import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.models.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.example.backend.repository.TaskRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/main")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    //get all tasks
    @GetMapping("/tasks")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    //create task rest api
    @PostMapping("/tasks")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Task createTasks(@RequestBody Task task){
        return taskRepository.save(task);
    }

    //get task by id rest api
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        return ResponseEntity.ok(task);
    }

    //update task rest api
    @PutMapping("/tasks/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails){

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));



        task.setTask_name(taskDetails.getTask_name());
        task.setAccountable(taskDetails.getAccountable());
        task.setPerforming(taskDetails.getPerforming());
        task.setDeadline(taskDetails.getDeadline());

        Task updateTask = taskRepository.save(task);

        return ResponseEntity.ok(updateTask);
    }

    //delete task rest api
    @DeleteMapping("/tasks/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteTask(@PathVariable Long id){
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not exist with id:" + id));

        taskRepository.delete((task));
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
