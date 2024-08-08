import { useState, useEffect } from 'react'

import Loading from './Loading'
import User from './User'

import getUser from '../apis/getUser'

import './UserContainer.css'

const UserContainer = () => {
    const [user, setUser] = useState(null); // if empty array{}, it's gonna be true so here use null 
    const [id, setId] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pagination, setPagination] = useState({
        previous: true,
        next: false
    })

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const userData = await getUser(id);
            setUser(userData);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    useEffect(() => {
        setPagination({
            previous : id <= 1,
            next: id >= 10
        })
    }, [id])

    const clickHandler = (change) => {
        if(change === 'previous') {
            setId((prevId) => prevId - 1);
        } else {
            setId((prevId) => prevId + 1);
        }
    };

  return (
    <>
        {loading && <Loading />}
        {user && <User user={user} />}
        {error && <div>Error</div>}

        <button onClick={() => clickHandler('previous')} disabled={pagination.previous}>Prev</button>
        <button onClick={() => clickHandler('next')} disabled={pagination.next}>Next</button>
        </>
  );
}

export default UserContainer