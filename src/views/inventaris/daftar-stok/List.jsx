import {
  Lucide,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Modal,
  ModalBody,
  Litepicker,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useState } from "react";
import classnames from "classnames";

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [daterange, setDaterange] = useState("");
  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Daftar Stok</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap  justify-between mt-2">
          <div class="inline-flex rounded-md shadow-sm max-h-12" role="group">
            <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              Bahan Baku
            </button>
            <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
              Bahan Pendukung
            </button>
          </div>
     
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
          <Litepicker
            value={daterange}
            onChange={setDaterange}
            options={{
              autoApply: false,
              singleMode: false,
              numberOfColumns: 2,
              numberOfMonths: 2,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true,
              },
            }}
            className="form-control w-56 block mx-auto mb-4"
          />
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
                <th className="whitespace-nowrap">Nama Material</th>
                <th className="whitespace-nowrap">Jenis</th>
                <th className="text-center whitespace-nowrap">Stok Awal</th>
                <th className="text-center whitespace-nowrap">Stok Masuk</th>
                <th className="text-center whitespace-nowrap">Stok Terjual</th>
                <th className="text-center whitespace-nowrap">Stok Akhir</th>
                <th className="text-center whitespace-nowrap">Satuan</th>
              </tr>
            </thead>
            <tbody>
              {$_.take($f(), 9).map((faker, fakerKey) => (
                <tr key={fakerKey} className="intro-x">
                  <td>
                    <a href="" className="font-medium whitespace-nowrap">
                      Ayam
                    </a>
                  </td>
                  <td className="text-center"> Baku</td>
                  <td className="text-center">10</td>
                  <td className="text-center">5</td>
                  <td className="text-center">3</td>
                  <td className="text-center">12</td>
                  <td className="text-center">Pieces</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
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
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationModal}
        onHidden={() => {
          setDeleteConfirmationModal(false);
        }}
      >
        <ModalBody className="p-0">
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 text-danger mx-auto mt-3"
            />
            <div className="text-3xl mt-5">Are you sure?</div>
            <div className="text-slate-500 mt-2">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-danger w-24">
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;
