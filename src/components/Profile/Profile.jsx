import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  currentUser,
  onCardClick,
  clothingItems,
  onCardLike,
  onAddNewClick,
  editProfile,
  logOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar editProfile={editProfile} logOut={logOut} />
      </section>
      <section className="profile__clothing-items">
        {/* for smaller components DO NOT rename the
            prop. Youll just cause more confusion */}
        <ClothesSection
          currentUser={currentUser}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
          onAddNewClick={onAddNewClick}
        />
      </section>
    </div>
  );
}

export default Profile;
