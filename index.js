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

// Middlewares:

// Rutas:
// Muestra todo
app.get('/', async (req, res) => {
	try {
		const anime = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		// res.status(201).json(anime);
		res.status(201).render('home', { anime });
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

// Busqueda por ID.
app.get('/search/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = animeFile[id];
		// console.log(anime);
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

// Busqueda por nombre.
app.get('/search/name/:name', async (req, res) => {
	const name = req.params.name.toLowerCase();
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = Object.values(animeFile).filter((anime) =>
			anime.nombre.toLowerCase().includes(name)
		);
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
