const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs/promises');
const app = express();

const HOST = 'http://localhost';
const PORT = 3000;

// Configuracion del motor de plantillas Handlebars.
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		layoutsDir: __dirname + '/views/layouts/',
		partialsDir: __dirname + '/views/partials/',
	})
);
app.set('view engine', 'hbs');

// Configuracion de la carpetas y archivos estaticos.
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

// Rutas:
// Muestra todo
app.get('/', async (req, res) => {
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		// res.status(201).json(anime);
		res.status(201).render('home', { anime: animeFile });
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
});

// Agregar Anime
app.get('/create', async (req, res) => {
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const id = Object.keys(animeFile).length + 1;
		const nombre = req.query.name;
		const genero = req.query.gender;
		const anio = req.query.year;
		const autor = req.query.author;

		const newAnime = {
			nombre,
			genero,
			anio,
			autor,
		};

		animeFile[id] = newAnime;
		await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
		res.status(201).render('add', { anime: [newAnime] });
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Actualizar Anime
app.get('/update/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const nombre = req.query.name;
		const genero = req.query.gender;
		const anio = req.query.year;
		const autor = req.query.author;
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = animeFile[id];

		if (anime) {
			anime.nombre = nombre;
			anime.genero = genero;
			anime.anio = anio;
			anime.autor = autor;
			await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
			res.status(201).render('home', { anime: [anime] });
		} else {
			res.status(404).send('No se encontro el anime');
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).send(error.message);
	}
});

// Eliminar Anime
app.get('/delete/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = animeFile[id];

		if (anime) {
			delete animeFile[id];
			await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
			// res.status(201).send('Anime borrado con exito!');
			res.status(201).render('home', { anime: [anime] });
		} else {
			res.status(404).send('No se encontró el Anime');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
});

// Busqueda por ID.
app.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		// json convertido a objeto js
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = animeFile[id];
		// console.log(anime);

		// objeto js convertido a matriz clave valor solo para renderizar y mostrar id
		/* const animeArray = Object.entries(await anime);
		const animeList = await animeArray.map(([id, anime]) => ({ id, anime }));
		const newAnime = animeList[id - 1]; */

		if (anime) {
			res.status(200).render('home', { anime: [anime] });
		} else {
			res.status(404).send('Anime no encontrado');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
});

/* // Busqueda por ID.
app.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const animeKey = Object.keys(animeFile);
		const key = animeKey[id - 1];
		const animeValue = animeFile[id];
		const newAnimeObj = { id: key, anime: animeValue };

		if (animeValue) {
			// res.status(200).render('home', { id: key, anime: [animeValue] });
			res.status(200).render('home', { anime: [newAnimeObj] });
			console.log([newAnimeObj]);
		} else {
			res.status(404).send('Anime no encontrado');
		}
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
}); */

// Busqueda por nombre.
app.get('/search/:name', async (req, res) => {
	const name = req.params.name.toLowerCase();
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = Object.values(animeFile);
		anime.filter((anime) => anime.nombre.toLowerCase().includes(name));

		if (anime.length > 0) {
			res.status(200).render('home', { anime });
		} else {
			res.status(404).send('No se encontraron animes');
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

app.listen(PORT, () => console.log(`Servidor conectado en ${HOST}:${PORT}/`));
