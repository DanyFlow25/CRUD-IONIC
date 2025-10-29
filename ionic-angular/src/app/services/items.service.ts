import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private API = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) {}

  getItems(): Promise<any[]> {
    return this.http.get<any[]>(this.API).toPromise();
  }

  createItem(payload: { name: string; description?: string }) {
    return this.http.post(this.API, payload).toPromise();
  }

  updateItem(id: string, payload: { name: string; description?: string }) {
    return this.http.put(`${this.API}/${id}`, payload).toPromise();
  }

  deleteItem(id: string) {
    return this.http.delete(`${this.API}/${id}`).toPromise();
  }
}
