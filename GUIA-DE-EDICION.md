# Guía para editar la web sergiogamonal.com

Todo se edita desde el navegador, en GitHub. No hay que instalar nada. Cada vez que guardas un cambio ("Commit changes"), la web se actualiza sola en uno o dos minutos.

Para editar un archivo: ábrelo en GitHub, haz clic en el **lápiz** (Edit) arriba a la derecha, haz el cambio y pulsa el botón verde **Commit changes**.

---

## 1. Dónde está cada cosa

| Qué quieres cambiar | Archivo en español | Archivo en inglés |
|---|---|---|
| Reseña (portada) | `index.md` | `en/index.md` |
| Libros | `publicaciones/libros.md` | `en/publications/books.md` |
| Artículos | `publicaciones/articulos.md` | `en/publications/articles.md` |
| Capítulos de libros | `publicaciones/capitulos.md` | `en/publications/chapters.md` |
| Comentarios de sentencias | `publicaciones/comentarios.md` | `en/publications/case-comments.md` |
| Recensiones | `publicaciones/recensiones.md` | `en/publications/reviews.md` |
| Notas | `publicaciones/notas.md` | `en/publications/notes.md` |
| Currículum | `cv.md` | `en/cv.md` |
| Menús, correo, ORCID | `_data/textos.yml` | (mismo archivo) |
| PDF de tus trabajos | carpeta `pdfs/` | (la misma) |
| CV en PDF para descargar | carpeta `archivos/` | (la misma) |
| Foto de la biblioteca | `assets/biblioteca.jpg` | (la misma) |

Las páginas en español y en inglés son independientes, igual que tus dos CV. Si agregas un trabajo, agrégalo en los dos archivos (el texto puede ser idéntico).

**No borres** el bloque que va entre las dos líneas `---` al comienzo de cada archivo: son los datos de la página.

---

## 2. Editar la reseña

Abre `index.md` (o `en/index.md`). Debajo del bloque `---` está el texto. Escribe como en un correo:

- Deja **una línea en blanco** entre párrafos.
- Para cursiva, rodea el texto con asteriscos: `*Principled Labor Law*`.
- Para un enlace: `[texto que se ve](https://direccion.com)`.

La línea pequeña bajo tu nombre está arriba, en `cargo: "..."`. Puedes cambiar lo que va entre comillas.

---

## 3. Agregar una publicación

Abre el archivo de la categoría (por ejemplo `publicaciones/articulos.md`). Las entradas están agrupadas por año, del más reciente al más antiguo:

```
## 2026

- “Robert Owen, utopian socialism and labour law”, *Economic and Industrial Democracy*, Vol. 47, Nº 3, pp. 825-844.
- “Certeza, reglas y estándares en el contrato de trabajo”, *Revista Pro Jure*, Vol. 65, pp. 33-53.
```

- Cada trabajo es **una línea que empieza con guion y espacio** (`- `).
- El nombre de la revista o del libro, entre asteriscos para que salga en cursiva.
- Para un año nuevo, escribe `## 2027` en su propia línea, con una línea en blanco antes y después, encima de `## 2026`.

El índice por décadas, los separadores `* * *` y el buscador se arman solos.

---

## 4. Subir un PDF y enlazarlo

1. En GitHub entra a la carpeta **`pdfs`**.
2. Pulsa **Add file → Upload files** y arrastra el PDF. Usa un nombre sin espacios ni tildes, por ejemplo `2017-hayek-sindicatos.pdf`. Pulsa **Commit changes**.
3. Abre el archivo de la categoría y, al final de la línea del trabajo, agrega:

```
[PDF](/pdfs/2017-hayek-sindicatos.pdf)
```

Ejemplo completo:

```
- “Hayek y los sindicatos: una visión crítica”, *Revista Ius et Praxis*, Nº 23, Nº 2, pp. 295-326. [PDF](/pdfs/2017-hayek-sindicatos.pdf)
```

Si el texto está en otra web (la revista, SciELO, Zenodo, el repositorio de la universidad), enlázalo igual:

```
[Texto completo](https://www.scielo.cl/...)
```

Las palabras **PDF**, **Texto completo**, **Acceso libre**, **Full text** u **Open access** se muestran como un botón. Las entradas con enlace aparecen al marcar la casilla "Solo trabajos con texto disponible".

Límite de GitHub: 25 MB por archivo subido desde el navegador. Si un escaneo pesa más, conviene comprimirlo o subirlo a Zenodo.

---

## 5. Actualizar el CV

- **Página de CV:** edita `cv.md` y `en/cv.md` (son listas con guiones, igual que las publicaciones).
- **PDF para descargar:** sube el nuevo PDF a la carpeta `archivos/` con **el mismo nombre** que el anterior (`CV-Sergio-Gamonal-completo.pdf`, `CV-Sergio-Gamonal-resumido.pdf`, `CV-Sergio-Gamonal-full.pdf`, `CV-Sergio-Gamonal-summary.pdf`). GitHub reemplaza el archivo viejo.

Antes de subir un CV, revisa que no tenga datos que no quieras publicar (por ejemplo, tu celular).

---

## 6. Cambiar la foto

Sube una nueva imagen a `assets/` con el nombre `biblioteca.jpg`. Conviene que sea apaisada (más ancha que alta) y que no pese más de 400 KB. En `assets/` también está `escritorio.jpg`, la segunda foto, por si prefieres usarla: basta con renombrarla.

---

## 7. Si algo se ve mal

Si después de guardar la web no cambia o se ve rota, lo más común es:

- Falta la línea en blanco antes o después de `## año`.
- Una línea de publicación no empieza con `- `.
- Un asterisco de cursiva quedó sin cerrar.

En GitHub, en la pestaña **Actions**, una marca roja indica que hubo un error. También puedes volver a la versión anterior desde el historial del archivo (**History**).

---

# Publicar la web por primera vez

## A. Crear el repositorio en GitHub

1. Crea una cuenta gratuita en <https://github.com>.
2. Pulsa **New repository**. Nombre: `sergiogamonal.com` (o el que quieras). Marca **Public**. Pulsa **Create repository**.
3. En la página del repositorio vacío, pulsa **uploading an existing file**. Descomprime el ZIP de la web en tu computador y arrastra **todo el contenido de la carpeta** (no la carpeta misma). Pulsa **Commit changes**.
   - Las carpetas cuyo nombre empieza con guion bajo (`_layouts`, `_data`) son necesarias: asegúrate de que se suban.
4. Ve a **Settings → Pages**. En *Source* elige **Deploy from a branch**, rama **main**, carpeta **/ (root)**, y pulsa **Save**.
5. En la misma página, en **Custom domain**, escribe `sergiogamonal.com` y pulsa **Save**.

## B. Conectar el dominio en Registros.com

Entra a Registros.com (con tu cuenta de Google), busca el dominio `sergiogamonal.com` y la sección de **DNS** o **Zona DNS**. Agrega:

| Tipo | Nombre / Host | Valor |
|---|---|---|
| A | @ (o vacío) | 185.199.108.153 |
| A | @ (o vacío) | 185.199.109.153 |
| A | @ (o vacío) | 185.199.110.153 |
| A | @ (o vacío) | 185.199.111.153 |
| CNAME | www | TU-USUARIO.github.io |

(Reemplaza TU-USUARIO por tu nombre de usuario de GitHub.)

- Si ya hay otros registros **A** o **CNAME** para `@` o `www`, bórralos o reemplázalos.
- **No toques** los registros **MX** si usas correo con ese dominio.
- Si Registros.com no permite editar DNS porque el dominio usa los servidores de un plan de hosting, pide en su soporte "apuntar el dominio a GitHub Pages con estos registros".

## C. Activar el candado (HTTPS)

Tras unos minutos (a veces unas horas), vuelve a **Settings → Pages** en GitHub. Cuando aparezca el aviso de que el dominio está bien configurado, marca **Enforce HTTPS**.
