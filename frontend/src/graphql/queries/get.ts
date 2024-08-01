import {gql} from "@apollo/client";

// user
export const GET_USER = gql`
    query me {
    profile {
      __typename
      id
      nickName
      firstName
      lastName
      email
      password
      age
      role
      enabled
      createdAt
    }
  }
`;

export const GET_POSTS = gql`
    query Posts {
        posts {
            id
            title
            content
            created_at
        }
    }
`;


