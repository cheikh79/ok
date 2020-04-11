import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { PickbazarApi } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, pickbazarApi

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  pickbazarApi = await PickbazarApi.create({})
})

test('POST /pickbazar-apis 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, title: 'test', content: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('POST /pickbazar-apis 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /pickbazar-apis 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /pickbazar-apis 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /pickbazar-apis 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /pickbazar-apis/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${pickbazarApi.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pickbazarApi.id)
})

test('GET /pickbazar-apis/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${pickbazarApi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /pickbazar-apis/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${pickbazarApi.id}`)
  expect(status).toBe(401)
})

test('GET /pickbazar-apis/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /pickbazar-apis/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${pickbazarApi.id}`)
    .send({ access_token: masterKey, title: 'test', content: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(pickbazarApi.id)
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('PUT /pickbazar-apis/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pickbazarApi.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /pickbazar-apis/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pickbazarApi.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /pickbazar-apis/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${pickbazarApi.id}`)
  expect(status).toBe(401)
})

test('PUT /pickbazar-apis/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, title: 'test', content: 'test' })
  expect(status).toBe(404)
})

test('DELETE /pickbazar-apis/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pickbazarApi.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /pickbazar-apis/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pickbazarApi.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /pickbazar-apis/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pickbazarApi.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /pickbazar-apis/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${pickbazarApi.id}`)
  expect(status).toBe(401)
})

test('DELETE /pickbazar-apis/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
