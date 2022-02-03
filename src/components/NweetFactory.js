import { useState } from "react";
import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (nweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const { target: { value } } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { currentTarget: { result } } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => { setAttachment(""); }

  return (
    <form onSubmit={ onSubmit } className="factoryForm">
      <div className="factoryInput__container">
        <input className="factoryInput__input" value={ nweet } onChange={ onChange } type="text" placeholder="What's on your mind?" maxLength={ 120 } />
        <input className="factoryInput__label" type="submit" value="&rarr;" />
      </div>
      <label className="factoryInput__label" htmlFor="attach-file">
        <span>Add photos</span>
        <FontAwesomeIcon icon={ faPlus } />
      </label>
      <input id="attach-file" type="file" accept="image/*" onChange={ onFileChange } style={{ opacity: 0 }} />
    { attachment && (
      <div className="factoryInput__attachment">
        <img alt="" src={ attachment } style={{ backgroundImage: attachment }} /> 
        <div className="factoryForm__clear" onClick={ onClearAttachment }>
          <span>Remove</span>
          <FontAwesomeIcon icon={ faTimes } />
        </div>
      </div>
    )}
    </form>
  );
};

export default NweetFactory;
