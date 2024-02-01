import React from 'react';
import Link from 'next/link';
import axios from 'axios';

const UserProfile = ({ user, posts, albums }) => {

  return (
    <div>
      <Link href="/">
        Go Back
      </Link>
      <h1>{user.name} Profile</h1>
      <div className='user-block'>
        <div>
          <h2>Posts</h2>
          <div>
            {posts?.map(post => (
              <div key={post.id} className='list-item'>
                <Link href={`/user/${user.id}/post/${post.id}`} className='link'>
                  {post.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2>Albums</h2>
          <div>
            {albums?.map(album => (
              <div key={album.id} className='list-item'>
                <Link href={`/user/${user.id}/album/${album.id}`} className='link'>
                  {album.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
  const users = usersResponse.data;

  const paths = users.map((user) => ({
    params: { userId: String(user.id) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { userId: id } = params;

  try {
    const [userResponse, postsResponse, albumsResponse] = await Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`),
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`),
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`),
    ]);

    const user = userResponse.data;
    const posts = postsResponse.data;
    const albums = albumsResponse.data;

    return {
      props: {
        user,
        posts,
        albums,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      notFound: true,
    };
  }
}

export default UserProfile;