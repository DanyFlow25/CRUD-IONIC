# Ionic + Angular CRUD (Items)

Proyecto mínimo listo para conectar con el backend Node/Express en `http://localhost:3000/api/items`.

Requisitos en tu máquina:
- Node.js (>=18 recomendable)
- npm
- Ionic CLI (recomendado): `npm install -g @ionic/cli`

Instalación y ejecución (PowerShell):

```powershell
cd c:\Users\Danie\Documents\IONIC\ionic-angular
npm install
# Ejecutar la app (abre navegador)
ionic serve
```

Notas:
- Si no quieres instalar Ionic CLI, puedes ejecutar `npm start` que también lanza `ionic serve` si la CLI está instalada localmente.
- El servicio `ItemsService` apunta por defecto a `http://localhost:3000/api/items`. Cámbialo si tu backend corre en otra URL.
