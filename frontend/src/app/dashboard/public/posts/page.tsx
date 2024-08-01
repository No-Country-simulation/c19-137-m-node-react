"use client";

import {GET_POSTS} from "@/graphql/queries/get";
import {useQuery} from "@apollo/client";

const Posts = () => {
    const {loading, error, data} = useQuery(GET_POSTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.posts.map((post:any) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>{new Date(post.created_at).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;