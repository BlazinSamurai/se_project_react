import "./ItemCard.css";

//destructored here so we don't have to use props.item
function ItemCard({ item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;
