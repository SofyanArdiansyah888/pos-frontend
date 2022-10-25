import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { useMutation } from "@apollo/client";
import { UPDATE_CUSTOMER_MUTATION } from "../../graphql/customer";
import { useEffect } from "react";

function UpdateModal({ modal, setModal, customer }) {
  const [updateCustomer, { data, loading, error }] = useMutation(UPDATE_CUSTOMER_MUTATION);

  // VALIDATION
  const schema = yup
    .object({
      name: yup.string().required().min(2),
      email: yup.string().email(),
      phone: yup.string(),
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
    if (customer) {
      setValue("name", customer.name);
      setValue("email", customer.email);
      setValue("phone", customer.phone);
    }
  });

  const handleUpdate = async (data) => {
    const result = await trigger();
    let input = {
        id: customer.id,
        ...data
    }
    
    if (result) {
      updateCustomer({
        variables: { input },
        onCompleted: () => {
          setModal(false);
        },
        refetchQueries: () => ["customers"],
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
            <h2 className="font-medium text-base mr-auto">Update Customer</h2>
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register("email")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.email,
                })}
                id="email"
                name="email"
                type="text"
              />
              {errors.email && (
                <div className="text-danger mt-2">{errors.email.message}</div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                {...register("phone")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.phone,
                })}
                name="phone"
                id="phone"
                type="text"
              />
              {errors.phone && (
                <div className="text-danger mt-2">
                  {errors.phone.message}
                </div>
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
