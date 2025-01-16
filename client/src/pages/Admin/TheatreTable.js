import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, message, Table } from "antd";

import { HideLoading, ShowLoading } from "../../redux/slices/loaderSlice";
import { getAllTheatres, updateTheatre } from "../../api/theatre";

function TheatreTable() {
  const tableHeading = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      render: (text, data) => {
        return data.owner && data.owner.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return "Approved";
        }
        return "Pending/Blocked";
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {data.isActive ? (
              <Button
                onClick={() => {
                  handleStatusChange(data);
                }}
              >
                Block
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleStatusChange(data);
                }}
              >
                Approve
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTheatres();

      if (response.success) {
        const allTheatres = response.data;

        setTheatres(
          allTheatres.map((theatre) => ({
            ...theatre,
            key: `theatre${theatre._id}`,
          }))
        );
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading);
    } catch (err) {
      message.error(err.message);
      dispatch(HideLoading);
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading);
      const updateTheatre = {
        ...theatre,
        isActive: !theatre.isActive,
        theatreId: theatre._id,
      };
      const response = await updateTheatre(updateTheatre);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading);
    } catch (err) {
      dispatch(HideLoading);
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {theatres && theatres.length > 0 && (
        <Table dataSource={theatres} columns={tableHeading} />
      )}
    </>
  );
}

export default TheatreTable;
