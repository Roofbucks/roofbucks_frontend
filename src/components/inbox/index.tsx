import * as React from "react";
import styles from "./styles.module.css";
import {
  AttachmentIcon,
  CloseIcon2,
  EllipsisIcon,
  SearchIcon,
  SendIcon,
  SmileyIcon,
  avatar,
} from "assets";

const Message = ({ reverse }) => {
  return (
    <div className={`${styles.msgItem} ${reverse ? styles.reverse : ""}`}>
      <img className={styles.msgAvatar} src={avatar} />
      <div className={styles.msgDetail}>
        <div>
          <p className={styles.msgName}>Jane Doe</p>
          <p className={styles.msgTime}>08:35PM</p>
        </div>
        <p className={styles.msgTxt}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos
          voluptatum, dolorum obcaecati sunt fugiat a temporibus.
        </p>
      </div>
    </div>
  );
};

const InboxUI = () => {
  const [showChat, setShowChat] = React.useState(false);
  return (
    <>
      <h1 className={styles.ttl}>Inbox</h1>
      <div className={styles.container}>
        <section className={styles.chatList}>
          <div className={styles.listSearch}>
            <SearchIcon />
            <input type={"search"} placeholder="Search..." />
          </div>
          <div className={styles.activeNow}>
            <p>Active now</p>
            <div>
              <img src={avatar} />
              <img src={avatar} />
              <img src={avatar} />
              <img src={avatar} />
              <img src={avatar} />
              <img src={avatar} />
              <img src={avatar} />
              <img src={avatar} />
            </div>
          </div>
          <div className={styles.chats}>
            <div className={styles.chatItem}>
              <div className={`${styles.chat} ${styles.activeChat}`}>
                <img src={avatar} />
                <div>
                  <p>Property #1</p>
                  <p>By Angry Bear</p>
                </div>
                <p>08:35PM</p>
              </div>
            </div>
            <div className={styles.chatItem}>
              <div className={`${styles.chat}`}>
                <img src={avatar} />
                <div>
                  <p>Property #1</p>
                  <p>By Angry Bear</p>
                </div>
                <p>08:35PM</p>
              </div>
            </div>
            <div className={styles.chatItem}>
              <div className={`${styles.chat}`}>
                <img src={avatar} />
                <div>
                  <p>Property #1</p>
                  <p>By Angry Bear</p>
                </div>
                <p>08:35PM</p>
              </div>
            </div>
            <div className={styles.chatItem}>
              <div className={`${styles.chat}`}>
                <img src={avatar} />
                <div>
                  <p>Property #1</p>
                  <p>By Angry Bear</p>
                </div>
                <p>08:35PM</p>
              </div>
            </div>
            <div className={styles.chatItem}>
              <div className={`${styles.chat}`}>
                <img src={avatar} />
                <div>
                  <p>Property #1</p>
                  <p>By Angry Bear</p>
                </div>
                <p>08:35PM</p>
              </div>
            </div>
            <div className={styles.chatItem}>
              <div className={`${styles.chat}`}>
                <img src={avatar} />
                <div>
                  <p>Property #1</p>
                  <p>By Angry Bear</p>
                </div>
                <p>08:35PM</p>
              </div>
            </div>
            <div className={styles.chatItem}>
              <div className={`${styles.chat}`}>
                <img src={avatar} />
                <div>
                  <p>Property #1</p>
                  <p>By Angry Bear</p>
                </div>
                <p>08:35PM</p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.chatAreaWrap}>
          <div
            className={`${styles.chatArea} ${
              showChat ? styles.chatAreaReduce : ""
            }`}
          >
            <div className={styles.chatHd}>
              <img className={styles.chatImg} src={avatar} />
              <p className={styles.chatTtl}>Property #1</p>
              <SearchIcon
                onClick={() => setShowChat(true)}
                role="button"
                className={styles.chatSearch}
              />
              <EllipsisIcon role="button" className={styles.chatMenu} />
            </div>
            <div className={styles.chatBody}>
              <Message reverse={false} />
              <Message reverse={true} />
              <Message reverse={false} />
              <Message reverse={true} />
            </div>
            <div className={styles.chatInputArea}>
              <SmileyIcon />
              <AttachmentIcon />
              <textarea placeholder="Type something..." />
              <SendIcon />
            </div>
          </div>
          {showChat ? (
            <div className={styles.searchChat}>
              <div className={styles.searchChatHd}>
                <CloseIcon2 role="button" onClick={() => setShowChat(false)} />
                <p>Search chat</p>
              </div>
              <div className={styles.listSearch}>
                <SearchIcon />
                <input type={"search"} placeholder="Search..." />
              </div>
              <div className={styles.searchChatResults}>
                <p className={styles.searchChatResultsDefault} >Search within chat</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </>
  );
};

export { InboxUI };
