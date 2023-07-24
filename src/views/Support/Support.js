import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";
import { toast, ToastContainer } from "react-toastify";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, ConversationHeader, Avatar } from '@chatscope/chat-ui-kit-react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import swal from "sweetalert";
import { addNewPost, getUserBiography, deleteUserBiography } from "../../actions/userActions";
import { io } from "socket.io-client";
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Suuport = (props) => {
  const { getUserBiography, posts, deleteUserBiography } = props;
  const [search, setSearch] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [pageLength, setPageLength] = useState(1);
  const [type, setType] = useState("");
  const [chatlist, setchatlist] = useState([]);
  const [chat, setchat] = useState(null);
  const [msg, setmsg] = useState("");
  const [message, setMessage] = useState([]);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [showupload, setshowupload] = useState(false);
  var chating = null;
  var messagesall = [];
  global.socket.on("connect", () => {
    // global.socket.emit("create_admin_chat", {});
    // global.socket.on("receive_user_admin", (data) => {
    //   console.log(data);
    // });
    // alert();
  });
  global.socket.on("receive_messages_admin", (data) => {
    if(data.message.length > 0 && chating && chating.chat && data.roomid == chating.chat._id){
      var m = messagesall;
      data.message.forEach(e=>{
        m.push(e);
      })
      messagesall = m;
      setMessage(m);
    }
  });
  global.socket.on("receive_users_admin", (data) => {
    if(data.messages.length > 0 && data.roomid == "admin"){
      setchatlist(data.messages);
    }
  });
  useEffect(() => {
    console.log(global.raghu);
    global.socket.emit("join_admin", {"sendorid": "admin"});
    // getUserBiography(pageLength, pageLimit, "", type);

  }, [pageLength, pageLimit, getUserBiography, type]);

  const socketfunction = () => {
    
  }
  const joinchat = (obj) => {
    setMessage([]);
    messagesall = [];
    setchat(obj);
    chating = obj;
    global.socket.emit("join_chat_admin", {"userid": "admin", "chatid": obj.chat._id});
  }
  const sendmessage_admin = () => {
    if(msg != "" && chat){
      global.socket.emit("sendmessage_admin", {"sendorid": "admin", "chatid": chat.chat._id, "recieverid": chat.chat.sendorid, "message": msg, "image": "", "voice": "", "video": ""});
      setmsg("");
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target?.files[0]

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          global.socket.emit("sendmessage_admin", {"sendorid": "admin", "chatid": chat.chat._id, "recieverid": chat.chat.sendorid, "message": "", "image": downloadURL, "voice": "", "video": ""});
          setImgUrl(downloadURL);
          setshowupload(false);
        });
      }
    );
  }  
  const handleSubmits = (e) => {
    e.preventDefault()
    const file = e.target?.files[0]

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          global.socket.emit("sendmessage_admin", {"sendorid": "admin", "chatid": chat.chat._id, "recieverid": chat.chat.sendorid, "message": "", "image": "", "voice": "", "video": downloadURL});
          setshowupload(false);
        });
      }
    );
  }
  const { biography, userDetailLoading } = posts;
  if(biography){
    var { page } = biography;
  }else{
    var page = 1;
  }

  page = page - 1;
  const containerStyle = {
    zIndex: 1999,
  };

  return (
    <div className="animated fadeIn">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        style={containerStyle}
      />
      <Row>
        <Col xs="4">
          <Card className="card-style shadow">
            <CardHeader>
              <i className="fas fa-images"></i>
              <strong>Support</strong>
            </CardHeader>
            <CardBody style={{height: 300, overflowY: 'scroll'}}>
              <Col md="12">
                <Row>
                </Row>
              </Col>
              <ul className="list-group">
              {chatlist && chatlist.length
                    ? chatlist.map((obj, indx) => (
                <li onClick={()=>{ joinchat(obj)}} key={indx} class="list-group-item d-flex justify-content-between align-items-center">
                  <Avatar src={"https://ui-avatars.com/api/?name="+(obj.user ? obj.user.username : '')} />
                  {obj.user ? obj.user.username : ''}
                  {obj.unread > 0 ? (
                    <span class="badge badge-primary badge-pill">{obj.unread}</span>
                  ): (<span class="badge badge-warning badge-pill">{'>'}</span>)}
                </li>
                ))
                :
              ""}
              </ul>

              {!chatlist || !chatlist.length && (
                <center style={{ fontSize: 20 }}>No record found</center>
              )}

            </CardBody>
          </Card>
        </Col>
        {chat && (
          <Col xs="8">
            <Card className="card-style shadow">
              <ChatContainer>
                  <ConversationHeader>
                      <Avatar src={"https://ui-avatars.com/api/?name="+(chat.user ? chat.user.username : '')} />
                      <ConversationHeader.Content userName={chat.user.username}/>
                  </ConversationHeader>
                  <MessageList style={{height: 400, overflowY: 'scroll'}}>
                    {message && message.length
                      ? message.map((obj, indx) => (
                        <Message model={{
                                direction: obj.sendorid  != "admin" ?  "incoming" : "outgoing"
                            }}>
                            {/* <Avatar src={akaneIco} name="Akane" /> */}
                            {obj.message != "" && (
                            <Message.HtmlContent html={obj.message} />
                            )}
                            {obj.image != "" && (
                              <Message.ImageContent src={obj.image} alt="Error in loading image" width={200} />
                            )}
                            {obj.video != "" && (
                              <Message.HtmlContent html={"<video src='"+obj.video+"' width='200' height='200' autoplay muted/>"} />
                            )}
                            {obj.voice != "" && (
                              <Message.HtmlContent html={"<audio src='"+obj.voice+"' controls/>"} />
                            )}
                        </Message>
                        ))
                        :
                      ""}

                  </MessageList>
                  <MessageInput onAttachClick={()=>{setshowupload(true)}} placeholder="Type message here" value={msg} onChange={e=>setmsg(e)} onSend={e=>{sendmessage_admin()}} attachButton={true} />        
              </ChatContainer>
              {showupload && (
                    <Row>
                      <Col xs="6">
                        <label for="c-upload" style={{width: "100%"}}>
                          <input type='file' id="c-upload" onChange={handleSubmit}  accept="image/png, image/jpeg, video/*"  style={{visibility: "hidden"}} />
                          <div className="upload-image">
                              <img className="img-upload" src="https://ps.w.org/file-upload-types/assets/icon-256x256.png?rev=2243278" />
                            </div>
                        </label>
                      </Col>
                      <Col xs="6">
                        <label for="c-uploads" style={{width: "100%"}}>
                          <input type='file' id="c-uploads" onChange={handleSubmits}  accept="video/mp4,video/x-m4v,video/*"  style={{visibility: "hidden"}} />
                          <div className="upload-image">
                              <img className="img-upload" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAuA9gLuFKxagroK0BDxFp67cMpj2HYdWvdA&usqp=CAU" />
                            </div>
                        </label>
                      </Col>
                    </Row>
                  )}
            </Card>
          </Col>
        )}

      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, {
  getUserBiography,
  deleteUserBiography,
})(Suuport);
