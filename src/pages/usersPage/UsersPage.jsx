import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import usersReducer, {getOneUser, getUsers, deleteUser, postUsers, updateUser} from "../../store/slices/usersSlice";
import {useForm} from "react-hook-form";

function UsersPage() {
    const {
        register,
        handleSubmit,
        reset} = useForm()

    const dispatch = useDispatch();
    const {users, user, error, loading} = useSelector(store => store.usersReducer);

    useEffect(() => {
        dispatch(getUsers())
        console.log(users)
    }, []);

    function getMoreInfo(id){
        dispatch(getOneUser(id))
    }

    function deleteUserFn(id){
        dispatch(deleteUser(id))
    }

    function submit(id, values){
        console.log(values)
    }

    function addUser(id, values){
        dispatch(postUsers(id, values))
        reset()
    }

    function updateUserFn(values){
        dispatch(updateUser(values));
        reset()
    }

    return (
        <div>
            <h2>Users list</h2>
            {
                loading && <p>Loading...</p>
            }

            <ul className='users_list'>
                {
                    users.map((user) => (
                        <li key={user.id}>
                            {user.name}
                            <button onClick={() => getMoreInfo(user.id)}>get more info</button>
                            <button onClick={() => deleteUserFn(user.id)}>delete</button>
                            <button onClick={handleSubmit((values) =>
                                updateUserFn({...values, id: user.id}
                                ))
                            }>update</button>
                        </li>
                    ))
                }
            </ul>

            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder='name' {...register("name")}/>
                <input type="text" placeholder='username' {...register("username")}/>
                <input type="text" placeholder='email' {...register("email")}/>
                <input type="text" placeholder='phone' {...register("phone")}/>
                <input type="text" placeholder='website' {...register("website")}/>
                <button onClick={handleSubmit(addUser)}>post user</button>
            </form>

            {
                error ? <h3>{error}</h3> :
                    <ul>
                        <li>name: {user.name}</li>
                        <li>username: {user.username}</li>
                        <li>email: {user.email}</li>
                        <li>phone: {user.phone}</li>
                        <li>website: {user.website}</li>
                    </ul>
            }
        </div>
    );
}

export default UsersPage;