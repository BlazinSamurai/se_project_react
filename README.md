# What to Wear(WTWR)

## Tech Stack

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="30" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="30" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="30" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="30" alt="git logo"  />
</div>

## Back End

- Link to the backend of this project: [here](https://github.com/BlazinSamurai/se_project_express.git)

## Description

'What to Wear' is a digital closet application where a user can sort through clothing cards depending on what the temperature is.

**Some features include:**

- Creating an account
- Change display temperature unit
- Add clothing cards
- Like a card or unlike a card
- Delete a card
- Two display modes, home view and the profile view

**Home View**

- Clothing cards are sorted to display based on the temperature
- New users can like previous users clothing cards on display after logout

**Profile View**

- Displays all clothing cards in the database that the user has created
- Edit profile picture or profile name

## Figma Design

Design for the whole application. [WTWR_Design](https://www.figma.com/design/bfVOvqlLmoKZ5lpro8WWBe/Sprint-14_-WTWR?node-id=0-1&p=f&t=ECfNwaaTAeghZ06c-0)

## Future Additions

- Could implement user's to determine their own "hot","cold", and "warm" temperatures.
- Allow user's to upload images from gallery or other areas where images are stored instead of only allowing a url.
- Allow user's to upload multiple images of one item, for different views.
- Allow user's to pair items to include "completed outfits" instead of having individual items.
  - Or create scrollable sections for tops and bottoms so users can choose which items match best with each other.
- Maybe allow user's to "send" items to another user.

## Images of Application

**Home View, No user signed In**
![](src/images/WTWR_ss/wtwr_home_no_user.png)

**Sign Up Modal**
![](src/images/WTWR_ss/signup_modal.png)

**Login Modal**
![](src/images/WTWR_ss/login_modal.png)

**New User View**
![](src/images/WTWR_ss/new_user_home_no_cards.png)

**New User Profile View**
![](src/images/WTWR_ss/new_user_profile_no_cards.png)

**Editing Profile Information**
![](src/images/WTWR_ss/new_user_profile_edit_profile_modal.png)

**Adding A Clothing Card**
![](src/images/WTWR_ss/new_user_profile_add_card.png)

**Profile View With Clothing Cards**
![](src/images/WTWR_ss/profile_with_cards.png)

**Clothing Card Preview**
![](src/images/WTWR_ss/clothing_card_preview.png)

**Delete Confirmation Modal**
![](src/images/WTWR_ss/delete_confirm_modal.png)

**Home View when User logs out**
![](src/images/WTWR_ss/home_w_cards_no_user.png)

**Home View with previous user card on display**

- The important thing to note here is that the clothing cards on display were the previous user's clothing cards. The current user can view them, preview them, and like them and if the user goes to their profile view the cards that were on display in the home view will not appear in their profile view. The current user cannot delete the cards either, the red delete button doesn't render, as shown below.
  ![](src/images/WTWR_ss/home_w_cards_new_user.png)
  ![](src/images/WTWR_ss/home_w_cards_new_user_preview_item.png)
