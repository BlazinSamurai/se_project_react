import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, clothingItems, onAddNewClick, editProfile }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar editProfile={editProfile} />
      </section>
      <section className="profile__clothing-items">
        {/* for smaller components DO NOT rename the
            prop. Youll just cause more confusion */}
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddNewClick={onAddNewClick}
        />
      </section>
    </div>
  );
}

export default Profile;
