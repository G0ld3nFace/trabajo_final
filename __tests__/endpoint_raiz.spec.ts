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
                expect(response.text).toContain('Hola mundo al usuario');
            });
    });

});