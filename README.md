# Prueba Final Modulo 6 - CRUD Express - Test Mocha

Este projecto corresponde a la prueba final del modulo 6 - Desarrollo de aplicaciones web node express, para el bootcamp **Desarrollo de Aplicaciones Full Stack JavaScript Trainee v2.0 Vespertino**.

### Ejercicio Propuesto 🚀

Dentro del marco de lo aprendido durante este Drill (modulo), se debe desarrollar un CRUD utilizando **Express** y opcionalmente **Handlebars**, posteriormente debe realizar un test con el modulo **Mocha** para probar la respuesta del servidor que fue creado.

### Requerimientos

-   Crear un servidor con node/express. ✔
-   Crear un archivo principal llamado index.js. ✔
-   En un archivo aparte, llamado anime.json, guardar los datos con la siguiente información: [anime.json](./anime.json) ✔
-   Crear un programa que permita hacer el CRUD completo de los datos. El id será el primer argumento para acceder a las propiedades de cada anime.
-   Se deberá poder listar todos los datos del archivo y, además, leer los datos de un anime especifico, accediendo por su id y / o por su nombre. ✔
-   Realizar un test para poder probar la respuesta del servidor que fue creado.

### Instalación / Ejecución

Instalación:

```
npm install
```

Ejecución de servidor:

```
npm run dev
```

Ejecución de testing:

```
npm test
```

### End Points

Listar Todo

```
http://localhost:3000/
```

Añadir nuevo Anime:

```
http://localhost:3000/create?name=Rurouni%20Kenshin&gender=Shonen&year=1996&author=Nobuhiro%20Watsuki
```

Actualizar Anime:

```
http://localhost:3000/update/6?name=Samurai%20X&gender=Shonen&year=1996&author=Nobuhiro%20Watsuki
```

Eliminar Anime:

```
http://localhost:3000/delete/6
```

Busqueda por ID:

```
http://localhost:3000/search/4
```

Busqueda por Nombre:

```
http://localhost:3000/search/name/neon%20genesis%20evangelion
```

---

Create by [varayac](https://github.com/varayac) with ♥️
