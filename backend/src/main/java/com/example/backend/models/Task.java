package com.example.backend.models;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tasks")
public class Task {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  long id;

   @Column(name = "task_name")
    private String task_name;

   @Column(name = "accountable")
    private String accountable;

    @Column(name = "performing")
    private String performing;

    @Column(name = "deadline")
    private String deadline;

    public Task() {
    }

    public Task(long id, String task_name, String accountable, String performing, String deadline) {
        this.id = id;
        this.task_name = task_name;
        this.accountable = accountable;
        this.performing = performing;
        this.deadline = deadline;
    }
}
