import { Breadcrumbs, Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveFolderId } from "../store/auth";
import getAncestors from "../utils/getAncestors";

export default function BreadCrumb() {
  const dispatch = useDispatch();
  const nodes = useSelector((store) => store.app.entities);
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const activeFolderId = useSelector((store) => store.auth.activeFolderId);
  const [ancestors, setAncestors] = useState([]);

  useEffect(() => {
    setAncestors(getAncestors(nodes, activeFolderId).reverse());
  }, [activeFolderId]);
  return (
    <Breadcrumbs aria-label="breadcrumb" style={{ color: "#fff" }}>
      {ancestors.map((ancestor) => (
        <Link
          onClick={() => dispatch(setActiveFolderId(ancestor[0]))}
          key={ancestor[0]}
          color="inherit"
          href={ancestor.id}
        >
          {ancestor[1]}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
