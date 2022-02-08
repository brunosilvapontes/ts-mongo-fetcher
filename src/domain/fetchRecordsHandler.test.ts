global.TextEncoder = require("util").TextEncoder
global.TextDecoder = require("util").TextDecoder

jest.mock('./MongoRecordRepository')

import request from 'supertest'
import app from '../presentation/http/app'

const stubBody = {
  startDate: '2021-01-01',
  endDate: '2022-01-01',
  minCount: 2,
  maxCount: 100,
}

describe('fetchRecordsHandler', () => {
  describe('should fail when missing a mandatory field', () => {
    it('should fail when missing body.startDate', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          startDate: null,
        })
      expect(response.body.code).toEqual(1)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  
    it('should fail when missing body.endDate', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          endDate: null,
        })
      expect(response.body.code).toEqual(1)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  
    it('should fail when missing body.minCount', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          minCount: null,
        })
      expect(response.body.code).toEqual(1)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  
    it('should fail when missing body.maxCount', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          maxCount: null,
        })
      expect(response.body.code).toEqual(1)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  })

  describe('should fail when it has a parameter with wrong type', () => {
    it('should fail when body.startDate is not a string', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          startDate: 1,
        })
      expect(response.body.code).toEqual(2)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  
    it('should fail when body.endDate is not a string', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          endDate: {},
        })
      expect(response.body.code).toEqual(2)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  
    it('should fail when body.minCount is not a number', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          minCount: '1',
        })
      expect(response.body.code).toEqual(2)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  
    it('should fail when body.maxCount is not a number', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          maxCount: true,
        })
      expect(response.body.code).toEqual(2)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  })

  describe('should fail when it has an invalid parameter', () => {
    it('should fail when startDate is not in YYYY-MM-DD format', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          startDate: '200-01-01',
        })
      expect(response.body.code).toEqual(3)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })

    it('should fail when endDate is not in YYYY-MM-DD format', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          endDate: '200-01-01',
        })
      expect(response.body.code).toEqual(4)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })

    it('should fail when endDate < startDate', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          endDate: '2000-01-01',
        })
      expect(response.body.code).toEqual(5)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })

    it('should fail when minCount < 0', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          minCount: -2,
        })
      expect(response.body.code).toEqual(6)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })

    it('should fail when maxCount < 0', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          maxCount: -1,
        })
      expect(response.body.code).toEqual(7)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })

    it('should fail when maxCount < minCount', async () => {
      const response = await request(app)
        .post('/')
        .send({
          ...stubBody,
          maxCount: 1,
        })
      expect(response.body.code).toEqual(8)
      expect(response.statusCode).toEqual(422)
      expect(response.body.records).toHaveLength(0)
    })
  })

  it('should succeed', async () => {
    const response = await request(app)
      .post('/')
      .send({ ...stubBody })
    expect(response.body.code).toEqual(0)
    expect(response.statusCode).toEqual(200)
    expect(response.body.msg).toEqual('success')
  })
})
