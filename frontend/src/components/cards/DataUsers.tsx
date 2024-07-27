'use client'
import { gql, useQuery } from '@apollo/client';

const GET_ALL_USERS = gql`
  query getAllUsers {
    users {
      __typename
      age
      created_at
      email
      first_name
      posts {
        content
      }
    }
  }
`;

export interface Post {
  content: string;
}

export interface User {
  __typename: string;
  age: number;
  created_at: string;
  email: string;
  first_name: string;
  posts: Post[];
}

export default function DataUsers() {
  const { loading, error, data } = useQuery<{ users: User[] }>(GET_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.users.map((user: User) => (
        <div key={user.email}>
          <h2>{user.first_name}</h2>
          <p>{user.email}</p>
          <p>{user.age}</p>
          <p>{user.created_at}</p>
          <div>
            {user.posts.map((post: Post, index: number) => (
              <p key={index}>{post.content}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
// compoenente ejemplo traer todos los usuarios