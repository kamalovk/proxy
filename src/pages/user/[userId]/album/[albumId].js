import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image'

const AlbumDetail = ({ album, photos }) => {
  return (
    <div>
      <Link href={`/user/${album.userId}`}>
        Go Back
      </Link>
      <h1>{album.title}</h1>
      <div className='photo-list'>
        {photos.map((photo) => (
          <div key={photo.id} className='photo-list-item'>
            <img
              src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/`);
  const album = response.data;


  const paths = album.map((user) => ({
    params: { userId: user.userId.toString(), albumId: user.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const { albumId } = params;

  const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
  const album = response.data;
  const photosResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
  const photos = photosResponse.data;

  return {
    props: {
      album,
      photos
    },
  };
}

export default AlbumDetail;