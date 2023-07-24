const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs/promises');
const app = express();
const PORT = 3000;

// CONFIGURACIONES:
// Configuración del motor de plantillas Handlebars.
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		layoutsDir: __dirname + '/views/layouts/',
		partialsDir: __dirname + '/views/partials/',
	})
);

// MIDDLEWARES
app.set('view engine', 'hbs');
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

// RUTAS:
// Muestra todo
app.get('/', async (req, res) => {
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		res.status(201).render('home', { anime: animeFile });
	} catch (error) {
		console.log(error);
		res.status(500).send({ code: 500, error: error.message });
	}
});

// Búsqueda por ID o Nombre.
app.get('/search', async (req, res) => {
	const searchTerm = req.query.searchTerm.toLowerCase();
	try {
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime =
			animeFile[searchTerm] ||
			Object.values(animeFile).find((anime) => anime.nombre.toLowerCase() === searchTerm);

		if (anime) {
			res.status(200).render('home', { anime });
		} else {
			const statusInfo = { code: 404, message: 'Anime no encontrado' };
			res.status(statusInfo.code).render('Http_status', { statusInfo });
		}
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	}
});

// CREA/AGREGA UN NUEVO ANIME
app.get('/add', (req, res) => {
	res.render('Create');
});

app.get('/create', async (req, res) => {
	try {
		const { nombre, genero, anio, autor } = req.query;
		if (!nombre || !genero || !anio || !autor) {
			return res.status(400).render('https://http.cat/400');
		}
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const id = Object.keys(animeFile).length + 1;

		const anime = {
			nombre,
			genero,
			anio,
			autor,
		};

		animeFile[id] = anime;
		await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
		// res.status(201).render('home', { anime });
		res.redirect('/');
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	}
});

// Actualizar Anime
app.get('/update/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = animeFile[id];

		if (anime) {
			console.log(anime);
			// Renderizar la vista Update con los datos del anime pasados como contexto
			res.render('Update', { id: id, anime: anime });
		} else {
			const statusInfo = { code: 404, message: 'Anime no encontrado' };
			res.status(statusInfo.code).render('Http_status', { statusInfo });
		}
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	}
});

app.get('/updatefile/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const { nombre, genero, anio, autor } = req.query;
		const animeFile = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		const anime = animeFile[id];

		if (anime) {
			anime.nombre = nombre;
			anime.genero = genero;
			anime.anio = anio;
			anime.autor = autor;
			await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
			res.redirect('/');
		} else {
			statusInfo = { code: 404, message: 'Anime no encontrado' };
			return res.status(code).render('Http_status', { statusInfo });
		}
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
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
			res.redirect('/');
		} else {
			const statusInfo = { code: 404, message: 'Anime no encontrado' };
			res.status(statusInfo.code).render('Http_status', { statusInfo });
		}
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	}
});

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

// TESTING
module.exports = { app };
