import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Home({ users }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [isReverseSort, setIsReverseSort] = useState(false);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sorted = [...filtered].sort((a, b) => {
      if (isReverseSort) {
        if (a.username < b.username) {
          return 1;
        }
        if (a.username > b.username) {
          return -1;
        }
        return 0;
      } else {
        if (a.username < b.username) {
          return -1;
        }
        if (a.username > b.username) {
          return 1;
        }
        return 0;
      }
    });
    setFilteredUsers(sorted);
  }, [searchTerm, users, isReverseSort]);



  return (
    <div>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by users"
        value={searchTerm}
        className='search-input'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='sort-button' onClick={() => setIsReverseSort(!isReverseSort)}>Sort</button>
      <div>
        {filteredUsers.map((user) => (
          <div key={user.id} className='list-item'>
            <Link href={`/user/${user.id}`} className='link'>
              {user.username} - {user.name} - {user.email}
            </Link>
          </div>
        ))}
      </div>
    </div >
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
}

export default Home;
