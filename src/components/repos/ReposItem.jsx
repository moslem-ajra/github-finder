import React from "react";

function ReposItem({ repo }) {
  return <div className="mx-1 badge badge-info">{repo.name}</div>;
}

export default ReposItem;
