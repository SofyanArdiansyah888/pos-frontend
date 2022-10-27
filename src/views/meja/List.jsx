import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Lucide,
} from "@/base-components";
import { faker as $f } from "@/utils";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LIST_TABLE_QUERY } from "../../graphql/table";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

function Main() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedTable, setSelectedTable] = useState();
  const { loading, data } = useQuery(LIST_TABLE_QUERY, {
    variables: {
      filter: {
        filter: "",
        take: 10,
        skip: 0,
        cursor: 0,
      },
    },
  });

  const handleEdit = (table) => {
    setSelectedTable(table);
    setmodalEdit(true);
  };

  const handleDelete = (table) => {
    setSelectedTable(table);
    setModalDelete(true);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
          <h2 className="intro-y text-lg font-medium mr-auto mt-2">
            List Meja
          </h2>
        </div>
        <div className="col-span-12 lg:col-span-12 ">
          {/* SEARCH */}
          <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
            <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
              />
              <input
                type="text"
                className="form-control w-full sm:w-64 box px-10"
                placeholder="Search..."
              />
            </div>
            <div className="w-full sm:w-auto flex">
              <button
                className="btn btn-primary shadow-md mr-2"
                onClick={() => setModal(true)}
              >
                Tambah Meja
              </button>
            </div>
          </div>
       
          {/* LIST MEJA  */}
          <div className="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
            {data &&
              data.tables.map((table, index) => (
                <div
                  key={index}
                  className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-3"
                >
                  <div className="file box rounded-md px-5 pt-8 pb-5  relative zoom-in">
                    {(() => {
                      return (
                        <Link to={`/meja/${table.id}/pos`}>
                          <a className="w-1/4 file__icon file__icon--image mx-auto">
                            <div className="file__icon--image__preview image-fit">
                              <img
                                alt="Gambar Meja"
                                src="../src/assets/images/table.png"
                              />
                            </div>
                          </a>
                        </Link>
                      );
                    })()}
                    <a
                      href=""
                      className="block font-medium mt-4 text-center truncate"
                    >
                      {table.name}
                    </a>
                    <div className="w-full mt-2 ">
                      {table.status === "OPEN" && (
                        <div className="w-24 text-xs text-center m-auto bg-success text-stone-50 p-2 rounded-md">
                          {table.status}
                        </div>
                      )}

                      {table.status === "CLOSED" && (
                        <div className="w-24 text-xs text-center m-auto bg-red-600 text-stone-50 p-2 rounded-md">
                          {table.status}
                        </div>
                      )}

                      {table.status === "ORDERED" && (
                        <div className="w-24 text-xs text-center m-auto bg-blue-600 text-stone-50 p-2 rounded-md">
                          {table.status}
                        </div>
                      )}

                      {table.status === "RESERVED" && (
                        <div className="w-24 text-xs text-center m-auto bg-slate-600 text-stone-50 p-2 rounded-md">
                          {table.status}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-0 left-0 ml-2 mt-3 ml-aut text-xs font-semibold">
                      {!table.order && "0 Jam 0 Menit"}
                    </div>
                  </div>
                  <Dropdown className="absolute top-0 right-0 mr-2 mt-3 ml-auto">
                    <DropdownToggle tag="a" className="w-5 h-5 block" href="#">
                      <Lucide
                        icon="MoreVertical"
                        className="w-5 h-5 text-slate-500"
                      />
                    </DropdownToggle>
                    <DropdownMenu className="w-40">
                      <DropdownContent>
                        <DropdownItem>
                          <Lucide icon="Users" className="w-4 h-4 mr-2" />
                          Reservasi
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEdit(table)}>
                          <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => handleDelete(table)} >
                          <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                          Hapus
                        </DropdownItem>
                      </DropdownContent>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ))}
          </div>
    

          <CreateModal modal={modal} setModal={setModal} />
          <UpdateModal
            modal={modalEdit}
            setModal={setmodalEdit}
            table={selectedTable}
          />
          <DeleteModal
            modal={modalDelete}
            setModal={setModalDelete}
            table={selectedTable}
          />
        </div>
      </div>
    </>
  );
}

export default Main;
