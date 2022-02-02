import { dbService } from "fbase";
import { doc, deleteDoc } from "firebase/firestore";

const Nweet = ({ nweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));
    }
  };
  return (
    <div>
      <h4>{ nweetObj.text }</h4>
      { isOwner && (
        <>
          <button onClick={ onDeleteClick }>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;