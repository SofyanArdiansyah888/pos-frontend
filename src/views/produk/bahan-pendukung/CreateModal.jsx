import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { useMutation } from "@apollo/client";
import { CREATE_MATERIAL_MUTATION } from "../../../graphql/material";

function CreateModal({ modal, setModal }) {
  const [createMaterial, { data, loading, error }] =
    useMutation(CREATE_MATERIAL_MUTATION);
  // VALIDATION
  const schema = yup
    .object({
      name: yup.string().required().min(2),
      code: yup.string().required(),
      minimalStock: yup.number().required(),
    })
    .required();

 

  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const handleCreate = async (data) => {
    const result = await trigger();

    if (result) {
      createMaterial({
        variables: { input: { ...data, type: "SUPPORT" } },
        onCompleted: () => {
          reset(() => ({
            name: "",
            code: "",
            minimalStock: 0
          }));
          setModal(false)
        },
        refetchQueries: () => ["materials"],
      });
    }
  };
  return (
    <>
      <Modal
        show={modal}
        onHidden={() => {
          setModal(false);
        }}
      >
        <form className="validate-form" onSubmit={handleSubmit(handleCreate)}>
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Create Bahan Pendukung</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                {...register("name")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.name,
                })}
                name="name"
                id="name"
                type="text"
              />
              {errors.name && (
                <div className="text-danger mt-2">{errors.name.message}</div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="code" className="form-label">
                SKU
              </label>
              <input
                {...register("code")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.code,
                })}
                name="code"
                id="code"
                type="text"
              />
              {errors.code && (
                <div className="text-danger mt-2">{errors.code.message}</div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="minimalStock" className="form-label">
                Minimal Stock
              </label>
              <input
                {...register("minimalStock")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.minimalStock,
                })}
                name="minimalStock"
                id="minimalStock"
                type="text"
              />
              {errors.minimalStock && (
                <div className="text-danger mt-2">{errors.minimalStock.message}</div>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="button"
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-20">
              Submit
            </button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default CreateModal;
