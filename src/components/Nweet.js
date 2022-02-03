import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));
      if (nweetObj.attachmentUrl !== "") {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl));
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const { target: { value } } = event;
    setNewNweet(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });
    setEditing(false);
  }

  return (
    <div className="nweet">
      { editing ? (
        <>
          <form className="container nweetEdit" onSubmit={ onSubmit }>
            <input className="formInput" value={ newNweet } required onChange={ onChange } placeholder="Edit your nweet" autoFocus />
            <input className="formBtn" type="submit" value="Update Nweet" />
          </form>
          <button className="formBtn cancelBtn" onClick={ toggleEditing }>Cancel</button>
        </>
      ) : (
        <>
          <h4>{ nweetObj.text }</h4>
          { nweetObj.attachmentUrl && (
            <img alt="" src={ nweetObj.attachmentUrl } width="50px" height="50px" />
          )}
          { isOwner && (
            <div className="nweet__actions">
              <span onClick={ onDeleteClick }>
                <FontAwesomeIcon icon={ faTrash } />
              </span>
              <span onClick={ toggleEditing }>
                <FontAwesomeIcon icon={ faPencilAlt } />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;