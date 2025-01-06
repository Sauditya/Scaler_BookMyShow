import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreTable from "./TheatreTable";

function Admin() {
  const tabItem = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatreTable />,
    },
  ];
  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs items={tabItem}/>
    </div>
  );
}

export default Admin;
