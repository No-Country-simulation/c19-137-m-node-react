import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should sign in a user', () => {
    const signInMutation = `
      mutation SignIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          code
          message
          success
          token
          expire_at
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: signInMutation,
        variables: {
          email: 'yeimar112003@gmail.com',
          password: '12345678',
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.signIn).toBeDefined();
        expect(res.body.data.signIn.success).toBeTruthy();
        expect(res.body.data.signIn.token).toBeDefined();
      });
  });

  it('should sign up a new user', () => {
    const signUpMutation = `
      mutation SignUp($data: CreateUserInput!) {
        signUp(data: $data) {
          code
          success
          message
          token
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: signUpMutation,
        variables: {
          data: {
            email: 'orlandocardenas0107@gmail.com',
            firstName: 'Orlando',
            lastName: 'Cardenas',
            nickName: 'orlando',
            password: '12345678',
            passwordConfirmation: '12345678',
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.signUp).toBeDefined();
        expect(res.body.data.signUp.success).toBeTruthy();
        expect(res.body.data.signUp.token).toBeDefined();
      });
  });

  it('should send forgot password email', () => {
    const forgotPasswordMutation = `
      mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
          code
          success
          message
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: forgotPasswordMutation,
        variables: {
          email: 'yeimar112003@gmail.com',
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.forgotPassword).toBeDefined();
        expect(res.body.data.forgotPassword.success).toBeTruthy();
      });
  });

  it('should reset password', () => {
    const resetPasswordMutation = `
      mutation ResetPassword($data: ResetPasswordInput!) {
        resetPassword(data: $data) {
          code
          message
          success
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: resetPasswordMutation,
        variables: {
          data: {
            confirmNewPassword: '123456',
            newPassword: '123456',
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InllaW1hcjExMjAwM0BnbWFpbC5jb20iLCJzdWIiOiI3ZmUwYzg0MS1hMzQ0LTQxYzYtYjI3Yi04OTMzMTk2Mjk1ZGQiLCJpYXQiOjE3MjA5OTA4NjQsImV4cCI6MTcyMDk5NDQ2NH0.YTgw8I8Q8_Eldv8lqE_lzH5j-rHnaKwOHuQ4_8Ff81s',
          },
        },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.resetPassword).toBeDefined();
        expect(res.body.data.resetPassword.success).toBeTruthy();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
