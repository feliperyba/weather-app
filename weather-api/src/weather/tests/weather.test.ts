import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';
import mongoose from 'mongoose';

const user = {
    login: `test_${shortid.generate()}`,
    password: 'password',
};
const weather = {
    hourly_temperature: [1, 2, 3, 4],
    date: "1985-01-01",
    forecast: 0,
    location: {
        city: `Tests_${shortid.generate()}`,
        country: "TestLand"
    }
};

let auth_id = "";
let accessToken = "";
let weather_id = "";

describe('Check weather endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    after(function (done) {
        app.close(() => {
            mongoose.connection.close(done);
        });
    });

    it('POST to /users, should return id and update permission', async function () {
        const res = await request.post('/users').send(user);
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body.id).to.be.a('string');
        auth_id = res.body.id;

        const resPermission = await request.patch(`/users/${auth_id}/permissionLevel/2`).send();
        expect(resPermission.status).to.equal(204);
    });

    it('POST to /auth, return tokens', async function () {
        const res = await request.post('/auth').send(user);
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('object');
        expect(res.body.accessToken).to.be.a('string');

        accessToken = res.body.accessToken;
    });

    it('POST to /weather without auth, should return 401', async function () {
        const res = await request.post('/weather').send(weather);
        expect(res.status).to.equal(401);
    });

    it('POST to /weather with auth, should return id', async function () {
        const res = await request
            .post('/weather')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(201);
        weather_id = res.body.id;
    });

    it('POST to /weather with existing date, should return 400', async function () {
        const res = await request
            .post('/weather')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(400);
    });

    it('GET from /weather/:weatherId, should return weather', async function () {
        const res = await request.get(`/weather/${weather_id}`).send();
        expect(res.status).to.equal(200);
    });

    it('GET from /weather/city/:city, should return array of weather', async function () {
        const res = await request.get(`/weather/city/${weather.location.city}`).send();
        expect(res.status).to.equal(200);
    });

    it('GET from /weather/city/:city, with daysRange parameter, should return array of weather', async function () {
        const res = await request.get(`/weather/city/${weather.location.city}`).send({ daysRange: 1 });

        expect(res.status).to.equal(200);
    });

    it('GET from /weather/city/:city/:date, should return weather', async function () {
        const res = await request.get(`/weather/city/${weather.location.city}/${weather.date}`).send();
        expect(res.status).to.equal(200);
    });

    it('PUT to /weather/:weatherId without auth, should return 401', async function () {
        const res = await request.put(`/weather/${weather_id}`).send(weather);
        expect(res.status).to.equal(401);
    });

    it('PUT to /weather/:weatherId with non-existing id, should return 404', async function () {
        const res = await request
            .put(`/weather/12124`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(404);
    });

    it('PUT to /weather/:weatherId with existing date, should return 204', async function () {
        const res = await request
            .put(`/weather/${weather_id}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(204);
    });

    it('PUT to /weather/:weatherId with auth, should return 204', async function () {
        const res = await request
            .put(`/weather/${weather_id}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(
                {
                    ...weather,
                    date: "1985-01-02"
                }
            );

        expect(res.status).to.equal(204);
    });

    it('PATCH to /weather/:weatherId without auth, should return 401', async function () {
        const res = await request.patch(`/weather/${weather_id}`).send(weather);
        expect(res.status).to.equal(401);
    });

    it('PATCH to /weather/:weatherId with non-existing id, should return 404', async function () {
        const res = await request
            .patch(`/weather/12124`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(404);
    });

    it('PATCH to /weather/:weatherId with auth, should return 204', async function () {
        const res = await request
            .patch(`/weather/${weather_id}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(204);
    });

    it('PATCH to /weather/:weatherId with existing date, should return 400', async function () {
        const res = await request
            .patch(`/weather/${weather_id}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(
                {
                    ...weather,
                    date: "1985-01-01"
                }
            );

        expect(res.status).to.equal(400);
    });

    it('DELETE to /weather/:weatherId with non-existing id, should return 404', async function () {
        const res = await request
            .delete(`/weather/12124`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(404);
    });

    it('DELETE to /weather/:weatherId without auth, should return 401', async function () {
        const res = await request.delete(`/weather/${weather_id}`).send(weather);
        expect(res.status).to.equal(401);
    });

    it('DELETE to /weather/:weatherId with auth, should return 204', async function () {
        const res = await request
            .delete(`/weather/${weather_id}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send(weather);

        expect(res.status).to.equal(204);
    });

    it('DELETE to /users/:userId, clean up test', async function () {
        await request
            .delete(`/users/${auth_id}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
    });
});
