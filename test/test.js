const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index');
chai.use(chaiHttp);

describe('Probando servidor en ruta raiz /', () => {
	it('Método GET en ruta "/" - Los datos recibidos deben ser de tipo objeto', () => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				if (err) console.log(err);
				// console.log(res.text);
				let data = JSON.parse(res.text);
				chai.expect(data).to.be.an('object');
			});
	});

	it('Método GET en ruta "/" - La longitud del objeto debe ser igual al número de animes(ids/keys)', () => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				if (err) console.log('Error:', err.message);
				let data = JSON.parse(res.text);
				// console.log(data);
				chai.expect(Object.keys(data.animes).length).to.be.equal(
					Object.keys(data.animes).length
				);
			});
	});
});

describe('Probando busquedas en ruta /Search', () => {
	it('Método GET en ruta "/search" - La busqueda por ID: 4 deberia encontrar un objeto anime: Naruto', () => {
		const ID = 4;
		chai.request(app)
			.get(`/search?search=${ID}`)
			.end((err, res) => {
				if (err) return console.log('Error en busqueda por ID:', err.message);
				chai.expect(res).to.have.status(200);
				chai.expect(res.body).to.have.property('message', 'Anime encontrado');
				chai.expect(res.body.anime).to.be.an('object');
				chai.expect(res.body.anime).to.have.property('nombre', 'Naruto');
				// console.log(res.body.anime);
			});
	});

	it('Método GET en ruta "/search" - La busqueda por Nombre: Akira deberia encontrar un objeto anime: Akira', () => {
		const NOMBRE = 'akira';
		chai.request(app)
			.get(`/search?search=${NOMBRE}`)
			.end((err, res) => {
				if (err) return console.log('Error en busqueda por ID:', err.message);
				chai.expect(res).to.have.status(200);
				chai.expect(res.body).to.have.property('message', 'Anime encontrado');
				chai.expect(res.body.anime).to.be.an('object');
				chai.expect(res.body.anime).to.have.property('nombre', 'Akira');
				console.log(res.body.anime);
			});
	});
});
