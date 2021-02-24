import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import "./chat.css";
import sendIcon from "../../assets/image/send.png";
import { API } from "../../utility/Auth";

let socket;

const Chat = (props) => {
  console.log("PROPS", props);
  //   const socket = useSocket();

  const [sellerId, setSellerId] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  //   const [socket, setSocket] = useState();

  const user_id = useSelector((state) => state.auth.data.user_id);
  const user_name = useSelector((state) => state.auth.data.fullname);

  useEffect(() => {
    socket = io(API, {
      query: { user_id },
    });
    // setSocket(newSocketConnection);
    // console.log("NEWNEW", newSocketConnection);

    // return () => newSocketConnection.close();
  }, [user_id]);

  useEffect(() => {
    if (props.location && props.location.seller_id) {
      console.log("LALA", props.location.seller_id);
      setSellerId(props.location.seller_id);
    }
  }, []);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setChatMessages((chatMessages) => [...chatMessages, msg]);
      if (user_id !== msg.sender) {
        setSellerId(msg.sender);
      }
    });
    return () => {
      socket.off("chat message");
    };
  }, []);

  const submitChatMessage = () => {
    socket.emit(
      "chat message",
      { chatMessage, sender: user_id, senderName: user_name },
      sellerId
    );
    setChatMessage("");
  };
  console.log("USER ID ", user_id);
  console.log("SellerID", sellerId);
  console.log("length " + chatMessages.length);
  console.log("MESSAGE", chatMessage);

  console.log("SOCKET", socket);
  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div className="section-chat">
          <div className="row">
            <div className="col-sm-4 d-flex justify-content-end">
              <div className="list-chat">
                <div className="listchat-header">
                  <h5 style={{ fontWeight: "bold" }}>Chat</h5>
                </div>
                <div className="list-user">
                  <div style={{ marginBottom: "5vh" }}>
                    <h4 style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Jonas adam
                    </h4>
                    <p style={{ fontSize: "small", color: "#9B9B9B" }}>
                      woyy gimana sih jual...
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: "bold", fontSize: "16px" }}>
                      Takyun
                    </h4>
                    <p style={{ fontSize: "small", color: "#9B9B9B" }}>
                      bapake tuku iwak...
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="text-message">
                {chatMessages &&
                  chatMessages.length !== 0 &&
                  chatMessages.map(
                    ({ chatMessage, sender, senderName }, index) => {
                      return (
                        <div className="messaging" key={index}>
                          <div className="message-header">
                            <h5 style={{ fontWeight: "bold" }}>{senderName}</h5>
                          </div>
                          <div className="chatting">
                            <p>{chatMessage}....</p>
                          </div>
                          <div className="input-message">
                            {sender === user_id ? "You" : senderName}
                          </div>
                        </div>
                      );
                    }
                  )}
                <div
                  class="form-group"
                  style={{ width: "90%", paddingTop: "350px" }}
                >
                  <form>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      style={{
                        borderRadius: "23px",
                        padding: "0 1.4vw",
                      }}
                      value={chatMessage}
                      onSubmit={() => submitChatMessage()}
                      onChange={(chatMessage) => {
                        setChatMessage(chatMessage.target.value);
                      }}
                      autocomplete="off"
                      placeholder="type message.."
                    />
                  </form>
                </div>
                <button className="send" onClick={submitChatMessage}>
                  <img src={sendIcon} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
