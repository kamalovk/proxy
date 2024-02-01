import React from 'react';
import axios from 'axios';
import Link from 'next/link';

const PostDetail = ({ post, comments }) => {

  return (
    <div>
      <Link href={`/user/${post.userId}`}>
        Go Back
      </Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h2>Comments</h2>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className='list-item'>
            <strong>{comment.name}</strong>: {comment.body}
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/`);
  const posts = response.data;


  const paths = posts.map((user) => ({
    params: { userId: user.userId.toString(), postId: user.id.toString() },
  }))

  return { paths, fallback: false }
}


export async function getStaticProps({ params }) {
  const { postId } = params;

  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = response.data;


  const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  const comments = commentsResponse.data;

  return {
    props: {
      post,
      comments
    },
  };
}

export default PostDetail;