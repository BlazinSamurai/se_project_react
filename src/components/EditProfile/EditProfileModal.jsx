import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../Context/CurrentUserContext";

import "./EditProfileModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, changeProfile, closeActiveModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  const tempName = currentUser ? currentUser.name : "";
  const tempAvatar = currentUser ? currentUser.avatar : "";
  const [name, setName] = useState(tempName);
  const [avatar, setAvatar] = useState(tempAvatar);

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

  useEffect(() => {
    setName(tempName);
    setAvatar(tempAvatar);
  }, [currentUser]);

  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Change profile data"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      loginState={false}
      signupState={false}
      editProfileState={true}
    >
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
