import React from 'react';
import {Table} from "antd";

function MovieList() {

    const tableHeading = [
        {
          title: "Poster",
        },
        {
            title: "Movie Name",
            dataIndex: "name"
        }
      ];
  return (
    <div><Table /></div>
  )
}

export default MovieList