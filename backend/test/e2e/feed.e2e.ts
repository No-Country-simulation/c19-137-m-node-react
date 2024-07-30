import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Feed  (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('should return the feed for a user', () => {
    const feedQuery = `
      query Feed($useId: Int!) {
        feed(id: $id) {
          ... on Post {
          id,
          title,
          content,
          media {
            id,
            url,
            type,
            filename,
            mimetype,
          }
        }
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: feedQuery,
        variables: {
          id: 1,
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.feed).toBeDefined();
        expect(res.body.data.feed.id).toBe(1);
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
