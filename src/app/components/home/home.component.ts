import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { TodoService } from "src/app/services/todo.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //this.setItems();
    this.getAllTodos();
  }

  data = {};
  /*
  data = {
    pendings: ["aaaaaa", "bbb", "cccccc"],
    inProgress: ["11111", "22222222", "33333333"],
    done: ["Get", "Brus", "Chec"]
  };*/

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      /*Object.keys(this.data).forEach(key => {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
      });*/
    }
    this.updateToDo();
  }

  addToDo(todo) {
    if (todo.value.length > 0) {
      const obj = { todo: todo.value };
      this.todoService.addTodo(obj).subscribe((res:any) => {
          console.log(res);
          this.openSnackBar(res.message, "Kapat");
          this.getAllTodos();
        },
        (err) => {
          console.log(err);
        } 
      );
      todo.value = "";
    }
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe(
      res => {
        //console.log(res);
        Object.keys(res).forEach(key => {
          this.data[key] = res[key];
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  updateToDo() {
    this.todoService.updateTodo(this.data).subscribe(
      res => {
        console.log(res);
        this.getAllTodos();
      },
      err => {
        console.log(err);
      }
    );
  }

  removeToDo(id) {
    if(confirm('Silmek istediğinize emin misiniz?'))
    this.todoService.removeTodo(id).subscribe(
      (res:any) => {
        console.log(res);
        this.getAllTodos();
        this.openSnackBar(res.message, "Kapat");
      },
      err => {
        console.log(err);
      }
    );
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  /*
  addToDo(todo) {
    if (todo.value.length > 0) {
      this.data.pendings.push(todo.value);
      todo.value = "";
      localStorage.setItem("pendings", JSON.stringify(this.data.pendings));
    }
  }
  setItems() {
    Object.keys(this.data).forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(this.data[key]));
      } else {
        this.data[key] = JSON.parse(localStorage.getItem(key));
      }
    });
  }*/

  reLoad() {
    window.location.reload();
  }
}
