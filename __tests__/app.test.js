const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const app = require("../api/app");
const db = require("../db/connection");
const request = require("supertest");

afterAll(() => db.end());

beforeEach(() => {
  return seed(testData);
});

describe("GET /api/topics", () => {
  it("should return all of the topics data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(3);
      });
  });
  it("should contain the properties slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(3);
        body.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe('GET /api/articles/:article_id', () => {
  it('should return an object contain the required properties', () => {
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
  it("should return a 404 No Article Found if given an invalid id", () => {
    return request(app)
      .get("/api/articles/2000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article found for article_id");
      });
  });
});

describe("GET /api/users", () => {
  it("should return all of the users data", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(4);
      });
  });
  it("should contain the properties username, name and avatar_url", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
        expect(body.length).toBe(4);
      });
  });
});

describe("PATCH /api/articles/:article_id  ", () => {
  it("should increase the amount of votes the article gets by the inc_votes ", () => {
    const newVote = { inc_votes: 20 };
    return request(app)
      .patch("/api/articles/2")
      .send(newVote)
      .expect(201)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            article_id: 2,
            votes: 20,
          })
        );
      });
  });
  it("should decrease the amount of votes the article gets by the inc_votes ", () => {
    const newVote1 = { inc_votes: -10 };
    const newVote2 = { inc_votes: 20 };
    return request(app)
      .patch("/api/articles/2")
      .send(newVote1)
      .then(() => {
        return request(app)
          .patch("/api/articles/2")
          .send(newVote2)
          .expect(201)
          .then(({ body }) => {
            expect(body.article).toEqual(
              expect.objectContaining({
                article_id: 2,
                votes: 10,
              })
            );
          });
      });
  });
  it("should return a 404 No Article Found if given an invalid id", () => {
    const newVote = { inc_votes: -10 };
    return request(app)
      .patch("/api/articles/2000")
      .send(newVote)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article found for article_id");
      });
  });
  it("should return a 400 Invalid Input when given an invalid body ", () => {
    const newVote = { inc_votes: "banana" };
    return request(app)
      .patch("/api/articles/2")
      .send(newVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid Input");
      });
  });
});
describe("GET /api/articles/:article_id (comment count)", () => {
  it("should return an object with the comment count ", () => {
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
            comment_count: expect.any(Number),
          })
        );
      });
  });
});

describe("GET /api/articles", () => {
  it("should return an array of articles with the required properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(12);
        body.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              body: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  it("should take the query of topic and return the articles in that topic", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(1);
        body.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: "rogersop",
              title: "UNCOVERED: catspiracy to bring down democracy",
              article_id: 5,
              body: expect.any(String),
              topic: "cats",
              created_at: "2020-08-03T13:14:00.000Z",
              votes: 0,
              comment_count: 2,
            })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  it('should return an array of the comments for the article id with the required properties with the most recent comment first', () => {
    return request(app)
      .get("/api/articles/5/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
        body.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String)
            })
          );
        });
      });
  });
  it("should return a 404 No Article Found if given an invalid id", () => {
    return request(app)
      .get("/api/articles/2000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No article found for article_id");
      });
  })
});