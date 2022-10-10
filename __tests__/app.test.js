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
        
      });
  });
});
