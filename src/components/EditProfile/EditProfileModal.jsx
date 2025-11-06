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
  const [nameValid, setNameValid] = useState(false);
  const [avatarUrlValid, setAvatarUrlValid] = useState(false);
  const [error, setError] = useState({
    input: "",
    inputErrorMessage: "",
  });
  const [isValid, setIsValid] = useState(false);

  const nameValidation = (value) => {
    const minLength = 8;
    const maxLength = 15;
    const hasLowerCase = /[a-z]/.test(value);
    const correctLength =
      value.length >= minLength && value.length <= maxLength;

    if (value != currentUser.name) {
      if (!correctLength) {
        setError({
          input: "name",
          inputErrorMessage: `Name must be 8-15 characters long. Current Length: ${value.length}.`,
        });
        return false;
      } else {
        if (!hasLowerCase) {
          setError({
            input: "name",
            inputErrorMessage: `Name must contain a lower case letter.`,
          });
          return false;
        }
      }
      return true;
    }
    return true;
  };

  const urlValidation = (value) => {
    if (value === currentUser.avatar) {
      return true;
    } else {
      try {
        new URL(value);
        return true;
      } catch (e) {
        setError({
          input: "url",
          inputErrorMessage: "Please enter a valid URL.",
        });
        return false;
      }
    }
  };

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
    if (nameValidation(e.target.value)) {
      setNameValid(true);
      if (urlValidation(tempAvatar)) {
        setAvatarUrlValid(true);
      }
      setError({
        input: "",
        inputErrorMessage: "",
      });
    } else {
      setNameValid(false);
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
    if (urlValidation(e.target.value)) {
      setAvatarUrlValid(true);
      setError({
        input: "",
        inputErrorMessage: "",
      });
      nameValidation(tempName);
    } else {
      setAvatarUrlValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isValid && changeProfile(name, avatar);
  };

  useEffect(() => {
    setName(tempName);
    setAvatar(tempAvatar);
  }, [currentUser]);

  useEffect(() => {
    if (nameValid && avatarUrlValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [nameValid, avatarUrlValid]);
  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Change profile data"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
      isValid={isValid}
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
          minLength="8"
          maxLength="15"
          id="EditProfile_name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <span className="modal__span-divider"></span>
        {error.input === "name" && (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        )}
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
        {error.input === "url" && (
          <p className="modal__invalid-input">{error.inputErrorMessage}</p>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
