const express = require('express');
const fs = require('fs/promises');
const app = express();
const PORT = 3000;

//MIDDLEWARES
// Servir Archivo JSON
const animeFileObj = async (req, res, next) => {
	try {
		req.animeObj = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
		next();
	} catch (error) {
		return res.status(500).send({ code: 500, error: error.message });
	}
};
app.use(animeFileObj);

// RUTAS GET
// Listar todo: http://localhost:3000/
app.get('/', async (req, res) => {
	try {
		const animeFile = await req.animeObj;
		res.status(200).json({ code: 200, animes: animeFile });
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	} finally {
		res.end();
	}
});

// Listar por ID o Nombre: http://localhost:3000/search?search=naruto
app.get('/search', async (req, res) => {
	try {
		const searchTerm = req.query.search.toLowerCase();
		if (!searchTerm)
			return res.status(400).send({
				code: 400,
				error: 'Error en cliente, parametros incompletos o indefinidos',
			});

		const animeFile = await req.animeObj;
		const anime =
			animeFile[searchTerm] ||
			Object.values(animeFile).find((anime) => anime.nombre.toLowerCase() === searchTerm);

		if (!anime) {
			res.status(404).send({ code: 404, error: 'Anime no encontrado!' });
		} else {
			res.status(200).json({ code: 200, message: 'Anime encontrado', anime: anime });
		}
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	} finally {
		res.end();
	}
});

// Crear anime: http://localhost:3000/create?nombre=Rurouni%20Kenshin&genero=Shonen&anio=1996&autor=Nobuhiro%20Watsuki
app.get('/create', async (req, res) => {
	try {
		const { nombre, genero, anio, autor } = req.query;
		if (!nombre || !genero || !anio || !autor) {
			return res.status(400).send({
				code: 400,
				error: 'Error en cliente, parametros incompletos o indefinidos',
			});
		}
		const animeFile = await req.animeObj;
		const id = Object.keys(animeFile).length + 1;
		const anime = { nombre, genero, anio, autor };
		const values = Object.values(animeFile).map((anime) => anime.nombre);

		if (values.includes(anime.nombre)) {
			return res.status(409).send({ code: 409, error: 'El anime ya existe' });
		}
		animeFile[id] = anime;
		await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
		return res.status(201).json({ code: 201, message: 'Anime añadido:', anime: animeFile[id] });
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	} finally {
		res.end();
	}
});

// Actualizar anime: http://localhost:3000/update/6?nombre=Samurai%20X&genero=Shonen&anio=1996&autor=Nobuhiro%20Watsuki
app.get('/update/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const { nombre, genero, anio, autor } = req.query;
		if (!nombre || !genero || !anio || !autor) {
			return res.status(400).send({
				code: 400,
				error: 'Error en cliente, parametros incompletos o indefinidos',
			});
		}
		const animeFile = await req.animeObj;
		const anime = animeFile[id];
		if (!anime) return res.status(404).send({ code: 404, error: 'Anime no encontrado' });

		anime.nombre = nombre;
		anime.genero = genero;
		anime.anio = anio;
		anime.autor = autor;

		await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
		return res
			.status(200)
			.json({ code: 201, message: 'Anime actualizado', anime: animeFile[id] });
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	} finally {
		res.end();
	}
});

// Eliminar anime: http://localhost:3000/delete/6
app.get('/delete/:id', async (req, res) => {
	const id = req.params.id;
	const animeFile = await req.animeObj;
	const anime = animeFile[id];
	if (!anime) return res.status(404).send({ code: 404, error: 'Anime no encontrado' });

	delete animeFile[id];
	await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeFile, null, 3));
	res.status(201).json({ code: 201, message: `Anime ${id} eliminado` });

	try {
	} catch (error) {
		res.status(500).send({ code: 500, error: error.message });
	} finally {
		res.end();
	}
});

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
module.exports = { app };
