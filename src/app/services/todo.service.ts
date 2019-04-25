import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//HttpClientModule ,
@Injectable({
  providedIn: "root"
})
export class TodoService {
  constructor(
    @Inject("apiUrl") private apiUrl,
    private httpClient: HttpClient
  ) {}

  //apiUrl = "https://api.limantech.com/todo";

  addTodo(obj) {
    return this.httpClient.post(this.apiUrl + "/todo", obj);
  }

  getAllTodos() {
    return this.httpClient.get(this.apiUrl + "/todo");
  }

  updateTodo(obj) {
    return this.httpClient.put(this.apiUrl + "/todo", obj);
  }

  removeTodo(id) {
    return this.httpClient.delete(this.apiUrl + "/todo/" + id);
  }
}
