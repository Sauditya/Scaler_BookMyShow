import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, message, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { HideLoading, ShowLoading } from "../../redux/slices/loaderSlice";
import { getAllTheatresByOwner } from "../../api/theatre";
import DeleteTheatreModal from "./DeleteTheatreModal";
import TheatreForm from "./TheatreForm";
import ShowModal from "./ShowModal";

function TheatreList() {

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
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedTheatre(data);
                setFormType("edit");
              }}
            >
              <EditOutlined />
            </Button>

            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <DeleteOutlined />
            </Button>

            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheatre(data);
                }}
              >
                + Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const { user } = useSelector((state) => state.users);
  const [theatres, setTheatres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    try{
      dispatch(ShowLoading());
      const response = await getAllTheatresByOwner(user._id);
      
      if (response.success) {
        const allTheatres = response.data;

        setTheatres(allTheatres.map((theatre) => ({...theatre, key: `theatre${theatre._id}`})));
      
      }else {
        message.error(response.message);
      }

      dispatch(HideLoading);
    }
    catch(err){
      message.error(err.message);
      dispatch(HideLoading);
    }
  };

  useEffect(()=>{
    getData();
  },[]);

  return (
    <>
    <div className="d-flex justify-content-end">
        <Button
            onClick={() => {
                setIsModalOpen(true);
                setFormType("add");
            }}
        >
            Add Theatre
        </Button>
        <Table dataSource={theatres} columns={tableHeading} />
        {isModalOpen && (
            <TheatreForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                formType={formType}
                getData={getData}
                selectedTheatre={selectedTheatre}
                setSelectedTheatre={setSelectedTheatre}
            />
        )}
        {isDeleteModalOpen && (
            <DeleteTheatreModal
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                getData={getData}
                selectedTheatre={selectedTheatre}
                setSelectedTheatre={setSelectedTheatre}
            />
        )}
        {isShowModalOpen && <ShowModal />}
    </div>
</>

  );
}

export default TheatreList;
