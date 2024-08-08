const getUser = async (id) => {
    try {
        const res = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const user = await res.json();
        return user;
    } catch (err) {
        console.error(err);
    }
};

export default getUser;
