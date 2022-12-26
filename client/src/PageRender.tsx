import React from "react";
import { useParams } from "react-router-dom";
import { IParams } from "./TypeScript";
import NotFound from "./components/global/NotFound";
const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default;
  try {
    return React.createElement(component());
  } catch (e) {
    return <NotFound />;
  }
};
const PageRender = () => {
  const { page, slug } = useParams();
  let name = "";

  if (page) {
    name = slug ? `${page}/[slug]` : `${page}`;
    // name = slug ? `${page}/${slug}` : `${page}`;
  }

  return generatePage(name);
};

export default PageRender;
