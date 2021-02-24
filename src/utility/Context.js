import React, { useState, useContext, useEffect } from "react";
import io from "socket.io-client";
import { API } from "./Auth";
import { useSelector } from "react-redux";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

const Context = ({ children }) => {
  const user_id = useSelector((state) => state.auth.data.user_id);
  console.log("CONTEXT", user_id);

  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocketConnection = io(API, {
      query: { user_id },
    });
    setSocket(newSocketConnection);

    return () => newSocketConnection.close();
  }, [user_id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
export default Context;
