import {
  Lucide,
  Tippy,
  TomSelect,
  Alert,
  ClassicEditor,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { useState } from "react";
import { Link } from "react-router-dom";

function Main() {
  const [subcategory, setSubcategory] = useState([]);
  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Add Product</h2>
      </div>
      <div className="grid grid-cols-11 gap-x-6 mt-5 pb-20">
 
        <div className="intro-y col-span-11 2xl:col-span-9">
        <Link to="/produk/produk">
          <button className="btn btn-primary shadow-md mr-2 mb-3">
            Kembali
          </button>
          </Link>
          {/* BEGIN: Uplaod Product */}
          <div className="intro-y box p-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload
                Product
              </div>
              <div className="mt-5">
                
                <div className="form-inline items-start flex-col xl:flex-row mt-10">
                  <div className="form-label w-full xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Photos</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="leading-relaxed text-slate-500 text-xs mt-3">
                        <div>
                          The image format is .jpg .jpeg .png and a minimum size
                          of 300 x 300 pixels (For optimal images use a minimum
                          size of 700 x 700 pixels).
                        </div>
                        <div className="mt-2">
                          Select product photos or drag and drop up to 5 photos
                          at once here. Include min. 3 attractive photos to make
                          the product more attractive to buyers.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1 border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                    <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                      {$_.take($f(), 1).map((faker, fakerKey) => (
                        <div
                          key={fakerKey}
                          className="col-span-5 md:col-span-2 h-28 relative image-fit cursor-pointer zoom-in"
                        >
                          <img
                            className="rounded-md"
                            alt="Midone - HTML Admin Template"
                            src={faker.photos[0]}
                          />
                          <Tippy
                            content="Remove this image?"
                            className="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"
                          >
                            <Lucide icon="X" className="w-4 h-4" />
                          </Tippy>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 pb-4 mt-5 flex items-center justify-center cursor-pointer relative">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="text-primary mr-1">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                      <input
                        id="horizontal-form-1"
                        type="file"
                        className="w-full h-full top-0 left-0 absolute opacity-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Uplaod Product */}
          {/* BEGIN: Product Information */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Information
              </div>
              <div className="mt-5">
                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Name</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                 
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1">
                    <input
                      id="product-name"
                      type="text"
                      className="form-control"
                      placeholder="Product name"
                    />
                    <div className="form-help text-right">
                      Maximum character 0/70
                    </div>
                  </div>
                </div>
                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Category</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1">
                    <select id="category" className="form-select">
                      {$_.take($f(), 9).map((faker, fakerKey) => (
                        <option key={fakerKey} value={faker.categories[0].name}>
                          {faker.categories[0].name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Description</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1">
                    <ClassicEditor
                      value={editorData}
                      onChange={setEditorData}
                    />
                    <div className="form-help text-right">
                      Maximum character 0/2000
                    </div>
                  </div>
                </div>

                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Status</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="leading-relaxed text-slate-500 text-xs mt-3">
                        If the status is active, your product can be searched
                        for by potential buyers.
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1">
                    <div className="form-check form-switch">
                      <input
                        id="product-status-active"
                        className="form-check-input"
                        type="checkbox"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="product-status-active"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Stock</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1">
                    <input
                      id="product-stock"
                      type="text"
                      className="form-control"
                      placeholder="Input Product Stock"
                    />
                  </div>
                </div>
                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">
                          SKU (Stock Keeping Unit)
                        </div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="leading-relaxed text-slate-500 text-xs mt-3">
                        Use a unique SKU code if you want to mark your product.
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1">
                    <input
                      id="sku"
                      type="text"
                      className="form-control"
                      placeholder="Input SKU"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* END: Product Information */}

          {/* BEGIN: Product Variant */}
          <div className="intro-y box p-5 mt-5">
            <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Variant
              </div>
              <div className="mt-5">
                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label sm:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Variant</div>
                      </div>
                      <div className="leading-relaxed text-slate-500 text-xs mt-2">
                        Add variants such as color, size, or more. Choose a
                        maximum of 2 variant types.
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1 xl:text-right">
                    <button className="btn btn-primary w-44">
                      <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add
                      Variant
                    </button>
                  </div>
                </div>

                <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                  <div className="form-label xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Variant Information</div>
                      </div>
                      <div className="leading-relaxed text-slate-500 text-xs mt-3">
                        Apply price and stock on all variants or based on
                        certain variant codes.
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-3 xl:mt-0 flex-1">
                    <div className="sm:grid grid-cols-4 gap-2">
                      <div className="input-group">
                        <div className="input-group-text">$</div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Price"
                        />
                      </div>
                      <input
                        type="text"
                        className="form-control mt-2 sm:mt-0"
                        placeholder="Stock"
                      />
                      <input
                        type="text"
                        className="form-control mt-2 sm:mt-0"
                        placeholder="Variant Code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: Product Variant */}
 
    
          <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
            <button
              type="button"
              className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
            >
              Save & Add New Product
            </button>
            <button
              type="button"
              className="btn py-3 btn-primary w-full md:w-52"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
