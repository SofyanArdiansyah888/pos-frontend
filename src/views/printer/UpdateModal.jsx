import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { useMutation } from "@apollo/client";
import { UPDATE_PRINTER_MUTATION } from "../../graphql/printer";
import { useEffect } from "react";

function UpdateModal({ modal, setModal, printer }) {
  const [updatePrinter, { data, loading, error }] = useMutation(UPDATE_PRINTER_MUTATION);

  // VALIDATION
  const schema = yup
    .object({
      name: yup.string().required(),
      description: yup.string().required(),
      ipAddress: yup.string().required(),
    })
    .required();
  const {
    register,
    trigger,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (printer) {
      setValue("name", printer.name);
      setValue("description", printer.description);
      setValue("ipAddress", printer.ipAddress);
    }
  });

  const handleUpdate = async (data) => {
    const result = await trigger();
    let input = {
        id: printer.id,
        ...data
    }
    
    if (result) {
      updatePrinter({
        variables: { input },
        onCompleted: () => {
          setModal(false);
        },
        refetchQueries: () => ["printers"],
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
        <form className="validate-form" onSubmit={handleSubmit(handleUpdate)}>
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Update Printer</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="name" className="form-label">
                Nama
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
              <label htmlFor="description" className="form-label">
                Deskripsi
              </label>
              <input
                {...register("description")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.description,
                })}
                name="description"
                id="description"
                type="text"
              />
              {errors.description && (
                <div className="text-danger mt-2">{errors.description.message}</div>
              )}
            </div>

            <div className="col-span-12">
              <label htmlFor="ipAddress" className="form-label">
                Deskripsi
              </label>
              <input
                {...register("ipAddress")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.ipAddress,
                })}
                name="ipAddress"
                id="ipAddress"
                type="text"
              />
              {errors.ipAddress && (
                <div className="text-danger mt-2">{errors.ipAddress.message}</div>
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

export default UpdateModal;
