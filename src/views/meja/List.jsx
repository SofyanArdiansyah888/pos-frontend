import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";

function Main() {
  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-8">
        <div className="col-span-12 lg:col-span-3 2xl:col-span-2">
          <h2 className="intro-y text-lg font-medium mr-auto mt-2">
            List Meja
          </h2>
     
        </div>
        <div className="col-span-12 lg:col-span-12 2xl:col-span-10">
          {/* BEGIN: File Manager Filter */}
          <div className="intro-y flex flex-col-reverse sm:flex-row items-center">
            <div className="w-full sm:w-auto relative mr-auto mt-3 sm:mt-0">
              <Lucide
                icon="Search"
                className="w-4 h-4 absolute my-auto inset-y-0 ml-3 left-0 z-10 text-slate-500"
              />
              <input
                type="text"
                className="form-control w-full sm:w-64 box px-10"
                placeholder="Search files"
              />
              <Dropdown
                className="inbox-filter absolute inset-y-0 mr-3 right-0 flex items-center"
                placement="bottom-start"
              >
                <DropdownToggle
                  tag="a"
                  role="button"
                  className="w-4 h-4 block"
                  href="#"
                >
                  <Lucide
                    icon="ChevronDown"
                    className="w-4 h-4 cursor-pointer text-slate-500"
                  />
                </DropdownToggle>
                <DropdownMenu className="inbox-filter__dropdown-menu pt-2">
                  <DropdownContent tag="div">
                    <div className="grid grid-cols-12 gap-4 gap-y-3 p-3">
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-1"
                          className="form-label text-xs"
                        >
                          File Name
                        </label>
                        <input
                          id="input-filter-1"
                          type="text"
                          className="form-control flex-1"
                          placeholder="Type the file name"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-2"
                          className="form-label text-xs"
                        >
                          Shared With
                        </label>
                        <input
                          id="input-filter-2"
                          type="text"
                          className="form-control flex-1"
                          placeholder="example@gmail.com"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-3"
                          className="form-label text-xs"
                        >
                          Created At
                        </label>
                        <input
                          id="input-filter-3"
                          type="text"
                          className="form-control flex-1"
                          placeholder="Important Meeting"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="input-filter-4"
                          className="form-label text-xs"
                        >
                          Size
                        </label>
                        <select
                          id="input-filter-4"
                          className="form-select flex-1"
                        >
                          <option>10</option>
                          <option>25</option>
                          <option>35</option>
                          <option>50</option>
                        </select>
                      </div>
                      <div className="col-span-12 flex items-center mt-3">
                        <button className="btn btn-secondary w-32 ml-auto">
                          Create Filter
                        </button>
                        <button className="btn btn-primary w-32 ml-2">
                          Search
                        </button>
                      </div>
                    </div>
                  </DropdownContent>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="w-full sm:w-auto flex">
              <button className="btn btn-primary shadow-md mr-2">
                Tambah Meja
              </button>
            
            </div>
          </div>
          {/* END: File Manager Filter */}
          {/* BEGIN: Directory & Files */}
          <div className="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
            {$f().map((faker, fakerKey) => (
              <div
                key={fakerKey}
                className="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
              >
                <div className="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in">
                  {/* <div className="absolute left-0 top-0 mt-3 ml-3">
                    <input
                      className="form-check-input border border-slate-500"
                      type="checkbox"
                      checked={faker.trueFalse[0]}
                      onChange={() => {}}
                    />
                  </div> */}
                  {(() => {
                      return (
                        <a
                          href=""
                          className="w-1/4 file__icon file__icon--image mx-auto"
                        >
                          <div className="file__icon--image__preview image-fit">
                            <img
                              alt="Gambar Meja"
                              src="../src/assets/images/table.png"
                            />
                          </div>
                        </a>
                      );
                  })()}
                  <a
                    href=""
                    className="block font-medium mt-4 text-center truncate"
                  >
                    Meja
                  </a>
                  <div className="w-full mt-2 text-center ">
                    <div className="w-12 text-md text-center m-auto bg-success text-stone-50  rounded-full">
                      {/* {faker.files[0].size} */}
                      Open
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 ml-2 mt-3 ml-aut text-xs font-semibold">3 Jam 15 Menit</div>
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
                          Booking
                        </DropdownItem>
                        <DropdownItem>
                          <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                          Delete
                        </DropdownItem>
                      </DropdownContent>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
          {/* END: Directory & Files */}
        =
        </div>
      </div>
    </>
  );
}

export default Main;
