const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const app = require("../api/app");
const db = require("../db/connection");
const request = require("supertest");


afterAll(() => db.end());

beforeEach(() => {
  return seed(testData)
});

describe("GET /api/topics", () => {
  it("should return all of the topics data", () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(3)
      })
  });
  it('should contain the properties slug and description', () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        body.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String)
            })
          )
        })
        expect(body.length).toBe(3);
      });
  });
});

describe('GET /api/article/:article_id', () => {
  it('should return the article object of the article_id', () => {
    return request(app)
      .get('/api/articles/2')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Object)
      })
  });
  it('should contain the required properties', () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  it('should return a 404 No Article Found if given an invalid id', () => {
    return request(app)
      .get("/api/articles/2000")
      .expect(404)
      .then(({ body }) => {
        console.log(body);
        expect(body.msg).toBe('No article found for article_id')
      });
  });
});