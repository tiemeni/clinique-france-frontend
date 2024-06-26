import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePasswordComponent from '../../../components/ChangePassComp';
import { getAllUser, updateUser } from '../../../redux/user/actions';
import { UPDATE_USER_FINISHED } from '../../../redux/user/types';




function ChangePasswordUser() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector((state) => state.User.users);
  const [userToUpdate, setUserToUpdate] = useState({});

  const [launchUser, setLaunchUser] = useState(true);
 
  const navigate = useNavigate()

  
  useEffect(() => {
    if(users.length === 0) dispatch(getAllUser());
    users.forEach((u) => {
      if (u?._id === id) {
        setUserToUpdate(u);
        setLaunchUser(false);
      }
    });
  },[users]);

  if (id && launchUser) {
    return 'launching users';
  }

  


 

  const handleChangePass = (password) => {
   
    const user = { ...userToUpdate,password}
      dispatch(updateUser(user))
    
    
  }


 


  return (
    <ChangePasswordComponent
      entityType='user'
      entity={userToUpdate}
      handler={handleChangePass}
      onCancel={() => {
        dispatch({type:UPDATE_USER_FINISHED})
        navigate(-1)
      }}
     
    />
  );
}

export default ChangePasswordUser;
