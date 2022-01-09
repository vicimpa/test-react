import { FC, memo, ReactNode, useEffect, useState } from "react";

interface IData {
  data: any[],
  page: {
    current: number,
    first: number,
    last: number;
  };
}

interface IFetch {
  page: number;
  size: number;
  setMaxPage: (v: number) => void;
  children: (data: IData) => ReactNode;
}

export const Fetch = memo(({ page, size, children, setMaxPage }: IFetch) => {
  const [state, setState] = useState(undefined as IData | undefined);

  useEffect(() => {
    fetch(`http://localhost:8080/api?pageNumber=${page}&pageSize=${size}`)
      .then(e => e.json())
      .then(e => setState(e))
      .catch(e => setState(undefined));
  }, [page, size]);

  useEffect(() => {
    state && setMaxPage(state.page.last);
  }, [state]);

  return (
    <>
      {state && children && children(state)}
    </>
  );
}, (prev, props) => {
  return (prev.page == props.page && prev.size == props.size);
});