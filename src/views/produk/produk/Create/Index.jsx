import {
  Lucide,
  Tippy,
  TomSelect,
  Alert,
  ClassicEditor,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import { createContext, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LIST_CATEGORY_QUERY } from "../../../../graphql/category";
import { useQuery } from "@apollo/client";
import classnames from "classnames";
import Variant from "./Variant";
import Material from "./Material";
import { uoms } from "../../../../utils/constant";
import { LIST_MATERIAL_QUERY } from "../../../../graphql/material";

const schema = yup.object({
  name: yup.string().required(),
  // category: yup.string().required(),
  // description: yup.string().required(),
  // photo: yup.string().required(),
  // isFavourite: yup.boolean().required(),
  // price: yup.number().required(),
  // capital: yup.number(),
  // isStock: yup.boolean().required(),
  // uom: yup.string().required(),
});

export const MaterialContext = createContext()
function Main() {
  const [editorData, setEditorData] = useState(
    "<p>Deskripsi tidak boleh kosong...</p>"
  );

  const { data:categoryData } = useQuery(LIST_CATEGORY_QUERY, {
    variables: {
      filter: {
        filter: "",
        take: 0,
        skip: 0,
        cursor: 0,
      },
    },
  });
  
  const { data:materialData } = useQuery(LIST_MATERIAL_QUERY, {
    variables:{
      filter: {
        filter:"RAW",
        take:10,
        skip:0,
        cursor:0
      }
    }
  });
  

  const form = useForm({
    defaultValues: {
      varian: [],
      material: []
    },
    resolver: yupResolver(schema),
  });
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
  } = form;

  const variantForm = useFieldArray({
    control,
    name: "varian",
  });

  const materialForm = useFieldArray({
    control,
    name: "material",
  });

  const handleCreate = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Tambah Produk</h2>
      </div>
      <div className="grid grid-cols-11 gap-x-6 mt-5 pb-20">
        <div className="intro-y col-span-11 2xl:col-span-9">
          <Link to="/produk/produk">
            <button className="btn btn-primary shadow-md mr-2 mb-3">
              Kembali
            </button>
          </Link>
          <FormProvider {...form}>
            <form
              className="validate-form"
              onSubmit={handleSubmit(handleCreate)}
            >
              {/* BEGIN: Uplaod Product */}
              <div className="intro-y box p-5">
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                  <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />{" "}
                    Upload Product
                  </div>
                  <div className="mt-5">
                    <div className="form-inline items-start flex-col xl:flex-row mt-10">
                      <div className="form-label w-full xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Foto Produk</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                          <div className="leading-relaxed text-slate-500 text-xs mt-3">
                            <div>
                              Format gambar .jpg .jpeg .png dan size minimal 300
                              x 300 pixels .
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

              {/* BEGIN: Product Information */}
              <div className="intro-y box p-5 mt-5">
                <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                  <div className="font-medium text-base flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />{" "}
                    Product Information
                  </div>
                  <div className="mt-5">
                    {/* NAME */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Nama Produk</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <input
                          {...register("name")}
                          className={classnames({
                            "form-control": true,
                            "border-danger": errors.name,
                          })}
                          type="text"
                          placeholder="Nama Produk"
                        />
                        {errors.name && (
                          <div className="text-danger mt-2">
                            {errors.name.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* CATEGORY */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Kategori</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <select
                          id="category"
                          {...register("category")}
                          className={classnames({
                            "form-select": true,
                            "border-danger": errors.category,
                          })}
                        >
                          {categoryData
                            ? categoryData.categories.map((category, index) => (
                                <option key={index} value={category.name}>
                                  {category.name}
                                </option>
                              ))
                            : ""}
                        </select>
                        {errors.category && (
                          <div className="text-danger mt-2">
                            {errors.category.message}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* DESCRIPTION  */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Deskripsi</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <input type="hidden" {...register("description")} />
                        <ClassicEditor
                          value={editorData}
                          onChange={(data) => {
                            setEditorData(data);
                            setValue("description", data);
                          }}
                        />
                        <div className="form-help text-right">
                          Maximum character 0/2000
                        </div>
                      </div>
                    </div>
                    {/* FAVOURITE  */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Produk Favorit</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
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
                            Produk Favorit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* HARGA */}
                    <div className="form-inline items-start flex-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Harga</div>
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
                    {/* UOM */}
                    <div className="form-inline items-start flegx-col xl:flex-row mt-5 pt-5 first:mt-0 first:pt-0">
                      <div className="form-label xl:w-64 xl:!mr-10">
                        <div className="text-left">
                          <div className="flex items-center">
                            <div className="font-medium">Satuan</div>
                            <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                              Required
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full mt-3 xl:mt-0 flex-1">
                        <select id="satuan" className="form-select">
                          {uoms.map((uom, index) => (
                            <option key={index} value={uom}>
                              {uom}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Variant {...variantForm} />
              <MaterialContext.Provider value={materialData}>
                  <Material {...materialForm} />
              </MaterialContext.Provider>

              <div className="flex justify-end flex-col md:flex-row gap-2 mt-5">
                <button
                  type="button"
                  className="btn py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 w-full md:w-52"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn py-3 btn-primary w-full md:w-52"
                >
                  Save
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}

export default Main;
