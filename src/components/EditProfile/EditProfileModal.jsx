import { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/auth";
import { getToken } from "../../utils/token";

import "./EditProfileModal.css";

function EditProfileModal({ activeModal, onClose, changeProfile }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [prevName, setPrevName] = useState("");
  const [prevAvatar, setPrevAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeProfile(name, avatar);
  };

  const cssRules = {
    maxWidth: 496,
    height: 304,
  };

  useEffect(() => {
    const jwt = getToken();

    getUserInfo(jwt)
      .then((data) => {
        setName(data.name);
        setAvatar(data.avatar);
      })
      .catch(console.error);
  }, []);

  return (
    <div className={`modal ${activeModal === "editProfile" && "modal_opened"}`}>
      <div className="modal__content" style={cssRules}>
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-item"
        ></button>
        <div className="modal__content-edit-profile">
          <h1 className="modal__title-edit-profile"> Change profile data </h1>
          <label
            htmlFor="EditProfile_name"
            className="modal__label modal__label_span modal__label_padding-remover"
          >
            Name *{" "}
            <input
              type="text"
              className="modal__input"
              minLength="1"
              maxLength="30"
              id="EditProfile_name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <span className="modal__span-divider"></span>
          </label>
          <label
            htmlFor="EditProfile_imageUrl"
            className="modal__label modal__label_span modal__label_padding-remover"
          >
            Avatar *{" "}
            <input
              type="url"
              className="modal__input"
              minLength="1"
              id="EditProfile_imageUrl"
              placeholder="Avatar URL"
              value={avatar}
              onChange={handleAvatarChange}
            />
            <span className="modal__span-divider"></span>
          </label>
          <button
            onClick={handleSubmit}
            type="button"
            className="modal__btn-edit-profile"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
