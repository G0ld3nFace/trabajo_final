import { response } from 'express';
import app from '../src/server.js';
import request from 'supertest';

describe('Bateria de test del servidor', () => {

    test('servidor en endpoint /', async () => {
        return await request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('Hola mundo al usuario default');
            });
    });

    test('servidor en endpoint /api-key', async () => {
        return await request(app)
            .get('/api-key')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('la apikey de mi aplicacion es: default-key');
            });
    });

    test('servidor en endpoint /validar-rut [valido con guion]', async () => {
        return await request(app)
            .get('/validar-rut?rut=33333333-3')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (33333333-3) es : valido');
            });
    });

    test('servidor en endpoint /validar-rut [valido sin guion]', async () => {
        return await request(app)
            .get('/validar-rut?rut=333333333')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (333333333) es : valido');
            });
    });

    test('servidor en endpoint /validar-rut [invalido con guion]', async () => {
        return await request(app)
            .get('/validar-rut?rut=33333333-2')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (33333333-2) es : invalido');
            });
    });

    test('servidor en endpoint /validar-rut [invalido sin guion]', async () => {
        return await request(app)
            .get('/validar-rut?rut=333333332')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (333333332) es : invalido');
            });
    });

    test('servidor en endpoint /validar-rut [raya k]', async () => {
        return await request(app)
            .get('/validar-rut?rut=7412609-k')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (7412609-k) es : valido');
            });
    });

    test('servidor en endpoint /validar-rut [minimo caracteres]', async () => {
        return await request(app)
            .get('/validar-rut?rut=1')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (1) es : invalido');
            });
    });

    test('servidor en endpoint /validar-rut [letras]', async () => {
        return await request(app)
            .get('/validar-rut?rut=abcdefg-1')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (abcdefg-1) es : invalido');
            });
    });

    test('servidor en endpoint /validar-rut [rut raya 0]', async () => {
        return await request(app)
            .get('/validar-rut?rut=4913477-0')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('El rut suministrado (4913477-0) es : valido');
            });
    });

    test('servidor en endpoint /buscar-subcadena [sub cadena existe]', async () => {
        return await request(app)
            .get('/buscar-subcadena?cadena=owoowoowoowoowo&subcadena=owo')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('La cadeja "owoowoowoowoowo" tiene 5 repeticiones de la subcadena "owo"');
            });
    });

    test('servidor en endpoint /buscar-subcadena [sub cadena existe]', async () => {
        return await request(app)
            .get('/buscar-subcadena?cadena=owoowoowoowoowo&subcadena=uwu')
            .expect(200)
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.text).toBe('La cadeja "owoowoowoowoowo" tiene 0 repeticiones de la subcadena "uwu"');
            });
    });

});