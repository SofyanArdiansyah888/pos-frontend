import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../graphql/user";

function CreateModal({ modal, setModal }) {
  const [createUser, { data, loading, error }] =
    useMutation(CREATE_USER_MUTATION);
  // VALIDATION
  const schema = yup
    .object({
      name: yup.string().required().min(2),
      email: yup.string().required().email(),
      role: yup.string().required(),
      password: yup.string().required().min(6),
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
      createUser({
        variables: { input: { ...data } },
        onCompleted: () => {
          reset(() => ({
            name: "",
            email: "",
            password: "",
            role: "",
          }));
          setModal(false)
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
        <form className="validate-form" onSubmit={handleSubmit(handleCreate)}>
          <ModalHeader>
            <h2 className="font-medium text-base mr-auto">Create User</h2>
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

export default CreateModal;
