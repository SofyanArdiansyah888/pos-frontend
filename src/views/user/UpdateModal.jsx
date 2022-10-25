import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_QUERY } from "../../graphql/user";
import { useEffect } from "react";

function UpdateModal({ modal, setModal, user }) {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER_QUERY);

  // VALIDATION
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      role: yup.string().required(),
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
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("role", user.role);
    }
  });

  const handleUpdate = async (data) => {
    const result = await trigger();
    let input = {
        id: user.id,
        ...data
    }
    
    if (result) {
      updateUser({
        variables: { input },
        onCompleted: () => {
          setModal(false);
        },
        refetchQueries: () => ["users"],
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
            <h2 className="font-medium text-base mr-auto">Update User</h2>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register("password")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.password,
                })}
                name="password"
                id="password"
                type="password"
              />
              {errors.password && (
                <div className="text-danger mt-2">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="col-span-12">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                {...register("role")}
                className={classnames({
                  "form-control": true,
                  "border-danger": errors.role,
                })}
                name="role"
                id="role"
              >
                <option>Pilih Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="CASHIER">CASHIER</option>
                <option value="WAREHOUSE">WAREHOUSE</option>
              </select>
              {errors.role && (
                <div className="text-danger mt-2">{errors.role.message}</div>
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
