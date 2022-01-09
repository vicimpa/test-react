import { Fetch } from "Fetch";
import { Item } from "Item";
import { useState } from "react";

const size = 4;

export const Main = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(Infinity);

  const appendPage = () => setPage(v => {
    if (v + 1 <= maxPage)
      return v + 1;

    return v;
  });

  const setMaxPageHandler = (v: number) => {
    if (v < maxPage)
      setMaxPage(v);
  };

  return (
    <>
      {
        [...new Array(page)].map((e, i) => (
          <Fetch key={i} page={i + 1} setMaxPage={setMaxPageHandler} size={size}>
            {({ data }) => {
              console.log(data, i + 1);
              return (
                <>
                  {data.map((e, i) => {
                    return <Item key={i} item={e} />;
                  })}
                </>
              );
            }}
          </Fetch>
        ))
      }
      <button onClick={appendPage}>Add</button>
    </>
  );
};