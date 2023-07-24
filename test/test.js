const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../index.js');
chai.use(chaiHttp);

describe('Probando Servidor', () => {
	it('Método GET en ruta "/" - El contenido debe ser HTML', () => {
		chai.request(app)
			.get('/')
			.end((err, res) => {
				if (err) console.log(err);
				chai.expect(res).to.have.header('content-type', 'text/html; charset=utf-8');
			});
	});
});
