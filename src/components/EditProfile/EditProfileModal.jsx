import React, { useState } from "react";

import "./EditProfileModal.css";

function EditProfileModal({ activeModal, onClose }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const cssRules = {
    maxWidth: 496,
    height: 304,
    // paddingTop: 60,
    // paddingRight: 152,
    // paddingBottom: 60,
    // paddingLeft: 151,
  };
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
          <label htmlFor="name" className="modal__label modal__label_span">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              minLength="1"
              maxLength="30"
              id="name"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
            />
            <span className="modal__span-divider"></span>
          </label>
          <label htmlFor="imageUrl" className="modal__label modal__label_span">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              minLength="1"
              id="imageUrl"
              placeholder="Avatar URL"
              value={avatar}
              onChange={handleAvatarChange}
            />
            <span className="modal__span-divider"></span>
          </label>
          <button
            // onClick={handleDeleteClick}
            type="button"
            // className="modal__delete-btn"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
