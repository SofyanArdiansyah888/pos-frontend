import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/base-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import { useMutation } from "@apollo/client";
import { CREATE_TABLE_MUTATION } from "../../graphql/table";

function CreateModal({ modal, setModal }) {
  const [createTable, { data, loading, error }] =
    useMutation(CREATE_TABLE_MUTATION);
  // VALIDATION
  const schema = yup
    .object({
      name: yup.string().required(),
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
      createTable({
        variables: { input: { ...data } },
        onCompleted: () => {
          reset(() => ({
            name: "",
          }));
          setModal(false)
        },
        refetchQueries: () => ["tables"],
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
            <h2 className="font-medium text-base mr-auto">Buat Meja Baru</h2>
          </ModalHeader>
          <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="name" className="form-label">
                Nama Meja
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
