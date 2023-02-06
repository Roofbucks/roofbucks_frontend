import * as React from "react";
import styles from "./styles.module.css";
import {
  AttachmentIcon,
  CaretRight,
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
  const [showSearch, setShowSearch] = React.useState(false);
  const [showChat, setShowChat] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth <= 1000 ? true : false
  );

  const screenSizeUpdate = () => {
    setIsMobile(window.innerWidth <= 1000 ? true : false);
  };
  window.onresize = screenSizeUpdate;

  const showMobileChat = (showChat && isMobile) || !isMobile;
  const showMobileList = (!showChat && isMobile) || !isMobile;

  return (
    <>
      {showMobileList ? <h1 className={styles.ttl}>Inbox</h1> : ""}
      <div className={styles.container}>
        {showMobileList ? (
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
              <div
                onClick={() => setShowChat(true)}
                className={styles.chatItem}
              >
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
        ) : (
          ""
        )}
        {showMobileChat ? (
          <section className={styles.chatAreaWrap}>
            <div
              className={`${styles.chatArea} ${
                showSearch ? styles.chatAreaReduce : ""
              }`}
            >
              <div className={styles.chatHd}>
                <CaretRight
                  role="button"
                  onClick={() => setShowChat(false)}
                  className={styles.backBtn}
                />
                <img className={styles.chatImg} src={avatar} />
                <p className={styles.chatTtl}>Property #1</p>
                <SearchIcon
                  onClick={() => setShowSearch(true)}
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
            {showSearch ? (
              <div className={styles.searchChat}>
                <div className={styles.searchChatHd}>
                  <CloseIcon2
                    role="button"
                    onClick={() => setShowSearch(false)}
                  />
                  <p>Search chat</p>
                </div>
                <div className={styles.listSearch}>
                  <SearchIcon />
                  <input type={"search"} placeholder="Search..." />
                </div>
                <div className={styles.searchChatResults}>
                  <p className={styles.searchChatResultsDefault}>
                    Search within chat
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </section>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export { InboxUI };
