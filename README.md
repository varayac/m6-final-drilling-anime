# Prueba Final Modulo 6 - CRUD Express - Test Mocha

Este proyecto corresponde a la prueba final del modulo 6 - Desarrollo de aplicaciones web node express, para el bootcamp **Desarrollo de Aplicaciones Full Stack JavaScript Trainee v2.0 Vespertino**.

### Ejercicio Propuesto 🚀

Dentro del marco de lo aprendido durante este Drill (modulo), se debe desarrollar un CRUD utilizando **Express** y opcionalmente **Handlebars**, posteriormente debe realizar un test con el modulo **Mocha** para probar la respuesta del servidor que fue creado.

### Requerimientos ⚙️

-   Crear un servidor con node/express. ✔
-   Crear un archivo principal llamado index.js. ✔
-   En un archivo aparte, llamado anime.json, guardar los datos con la siguiente información: [anime.json](./anime.json) ✔
-   Crear un programa que permita hacer el CRUD completo de los datos. El id será el primer argumento para acceder a las propiedades de cada anime. ✔
-   Se deberá poder listar todos los datos del archivo y, además, leer los datos de un anime especifico, accediendo por su id y / o por su nombre. ✔
-   Realizar un test para poder probar la respuesta del servidor que fue creado. ✔

### Importante ❗️

En la rama **main** podrá encontrar el proyecto solicitado en clases, y en la rama **develop** podrá encontrar el proyecto con handlebars: `git checkout develop`

### Instalación / Ejecución 🧨

Instalación:

```
npm install
```

Ejecución de servidor en unix:

```
npm run dev
```

Ejecución de servidor en windows:

```
npm run dev-win
```

Ejecución de testing:

```
mocha test
```

o

```
npm run manual-test
```

### End Points (Postman / Thunder client)

Listar Todo

```
http://localhost:3000/
```

Búsqueda por ID o Nombre:

```
http://localhost:3000/search?search=5
http://localhost:3000/search?search=naruto
```

Añadir nuevo Anime:

```
http://localhost:3000/create?nombre=Rurouni%20Kenshin&genero=Shonen&anio=1996&autor=Nobuhiro%20Watsuki
```

Actualizar Anime:

```
http://localhost:3000/update/6?nombre=Samurai%20X&genero=Shonen&anio=1996&autor=Nobuhiro%20Watsukiiiiiii
```

Eliminar Anime:

```
http://localhost:3000/delete/6
```

---

Create by [varayac](https://github.com/varayac) with ♥️
