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

// Routes:
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

app.listen(PORT, () => console.log(`Servidor conectado en ${HOST}:${PORT}/`));
