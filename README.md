# Moo Music Notebook

Moo Music Notebook es una aplicación web para hacer notas musicales rápida y fácil de usar.
Este repositorio es el frontend del proyecto construido con React y daisyUI.
El repositorio del servidor se encuentra en esta liga: [https://github.com/superquique/moo-server](https://github.com/superquique/moo-server)

## Cómo usar

### Página Principal

Muestra las partituras y notebooks agregadas a favoritos. 


### Sheets

Crea partituras en clave de sol (do y fa estarán disponibles pronto) y en los compases de 4/4, 3/4 y 2/4. 

- **+ Añadir partitura**: crea una partitura nueva
- **Buscar por título**: filtra partituras por el título
- **Favorita**: añade la partitura como favorita para que se muestre en la página principal como acceso rápido
- **Eliminar**: elimina una partitura permanentemente

### Notebooks

Puedes organizar las partituras por notebooks

- **+ Añadir notebook**: crear un notebook nuevo
- **Búsqueda por nombre**: filtra notebooks por nombre
- **Favorito**: añade el notebook como favorito para que se muestre en la página principal como acceso rápido 
- **Editar**: cambia el nombre de un notebook
- **Eliminar**: elimina el notebook permanentemente (esto no borra las partituras asociadas que aún estarán disponibles en Sheets)

### Editar Sheet

Al pulsar en una partitura accedes a la página de edición:

| Campo | Descripción |
|-------|-------------|
| Título | Título de la partitura |
| Pentragramas | La partitura se visualiza en notación musical |
| Favorita | Puedes añadir una partitura como favorita desde la página de edición |
| Menú FAB | Utiliza el menú de botón de acción flotante ubicado en la parte inferior derecha de la pantalla |
| Duración de la Nota (FAB) | Selecciona la duración de la nota que quieres agregar a continuación |
| Tono | Añade una nota con el tono y duración seleccionados justo después de la última nota agregada |
| Borrar | Borra la última nota agregada |
| Octava | Usa los botones de arriba y abajo para subir o bajar el tono una octava respectivamente |

Los cambios se guardan automáticamente.

- Intrucciones para ejecutar esta app en mi ordenador
  - git clone
  - instalar dependencias (`npm install`)
  - crea un archivo .env con las siguiente variable de entorno:
    `VITE_API_URL="http://localhost:5005"`
  - ejecuta la aplicación (`npm run dev`)

- Demo
  - Una demo del proyecto se encuentra disponible en [https://moo-music-notebook.vercel.app](https://moo-music-notebook.vercel.app)