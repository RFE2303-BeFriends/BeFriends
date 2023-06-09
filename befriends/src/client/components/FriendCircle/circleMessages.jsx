
function CircleMessages ({userChats, setCurrentChat}) {


    return (
    <div className="flex justify-center">
        <div className="tabs flex flex-col">
        <a className="tab tab-bordered tab-lg" >My FriendCircles:</a>
          {(userChats.length > 0 ? userChats.map((chat, index) => {
            return (<a className="tab tab-lg" key={index} onClick={() => {
              setCurrentChat(chat.chatId);
            }}> {chat.chatName}</a>)
          }) :  <><a className="tab tab-lg">Cave Divers</a>
          <a className="tab tab-lg">Jousters R Us</a>
          <a className="tab tab-lg">Fisherman</a></>)}
        </div>
    </div>
  )
}

export default CircleMessages;