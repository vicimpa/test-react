export const Item = ({ item = null }) => {

  return (
    <p>
      {JSON.stringify(item)}
    </p>
  );
}