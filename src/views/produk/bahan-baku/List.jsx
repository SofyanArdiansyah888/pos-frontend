import { Lucide } from "@/base-components";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { LIST_MATERIAL_QUERY } from "../../../graphql/material";
import CreateModal from "./CreateModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

function Main() {
  const [modal, setModal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedMaterial, setselectedMaterial] = useState();
  const { loading, data } = useQuery(LIST_MATERIAL_QUERY, {
    variables:{
      filter: {
        filter:"RAW",
        take:10,
        skip:0,
        cursor:0
      }
    }
  });
  const handleEdit = (material) => {
    setselectedMaterial(material);
    setmodalEdit(true);
  };

  const handleDelete = (material) => {
    setselectedMaterial(material);
    setModalDelete(true);
  };
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Bahan Baku</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap justify-between mt-2">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => setModal(true)}
          >
            Tambah Bahan Baku
          </button>

          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Search..."
              />
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="whitespace-nowrap">Nama Bahan Baku</th>
                <th className="whitespace-nowrap">SKU</th>
                <th className="whitespace-nowrap">Stok</th>
                <th className="whitespace-nowrap">Stok Minimal</th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ?? (
                <div className="col-span-12 mt-12  flex flex-col justify-end items-center">
                  <LoadingIcon icon="circles" className="w-16 h-16" />
                </div>
              )}
              {data
                ? data.materials.map((material, key) => (
                    <tr key={key} className="intro-x">
                      <td>
                        <a href="" className="font-medium whitespace-nowrap">
                          {material.name}
                        </a>
                      </td>
                      <td>
                        <a href="" className="font-medium whitespace-nowrap">
                          {material.code}
                        </a>
                      </td>
                      <td>
                        <a href="" className="font-medium whitespace-nowrap">
                          {material.stock}
                        </a>
                      </td>
                      <td>
                        <a href="" className="font-medium whitespace-nowrap">
                          {material.minimalStock}
                        </a>
                      </td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                          <a
                            className="flex items-center mr-3"
                            href="#"
                            onClick={() => handleEdit(material)}
                          >
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-1"
                            />{" "}
                            Edit
                          </a>
                          <a
                            className="flex items-center text-danger"
                            href="#"
                            onClick={() => handleDelete(material)}
                          >
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                            Delete
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        {
          data && data.materials.length > 10?
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
            <nav className="w-full sm:w-auto sm:mr-auto">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronLeft" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    ...
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronRight" className="w-4 h-4" />
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <Lucide icon="ChevronsRight" className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </nav>
            <select className="w-20 form-select box mt-3 sm:mt-0">
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div> : ""
        }
        {/* END: Pagination */}
        <CreateModal modal={modal} setModal={setModal} />
        <UpdateModal
          modal={modalEdit}
          setModal={setmodalEdit}
          material={selectedMaterial}
        />
        <DeleteModal
          modal={modalDelete}
          setModal={setModalDelete}
          material={selectedMaterial}
        />
      </div>
    </>
  );
}

export default Main;
