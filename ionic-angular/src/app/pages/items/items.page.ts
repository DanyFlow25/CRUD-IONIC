import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss']
})
export class ItemsPage implements OnInit {
  items: any[] = [];
  name = '';
  description = '';

  constructor(private itemsSvc: ItemsService) {}

  ngOnInit() {
    this.load();
  }

  async load() {
    this.items = await this.itemsSvc.getItems();
  }

  async add() {
    if (!this.name.trim()) return;
    await this.itemsSvc.createItem({ name: this.name.trim(), description: this.description || '' });
    this.name = '';
    this.description = '';
    this.load();
  }

  async edit(item: any) {
    const newName = prompt('Editar nombre', item.name);
    if (newName === null) return;
    const newDesc = prompt('Editar descripción', item.description || '');
    await this.itemsSvc.updateItem(item._id, { name: newName, description: newDesc });
    this.load();
  }

  async remove(item: any) {
    if (!confirm('¿Eliminar item?')) return;
    await this.itemsSvc.deleteItem(item._id);
    this.load();
  }
}
