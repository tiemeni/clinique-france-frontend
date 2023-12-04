import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';

// Define your server URL here
const serverUrl = '';
// const serverUrl = process.env.REACT_APP_LOCAL_URL;

const SocketContext = createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const socket = io(serverUrl, { autoConnect: false });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

SocketProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
