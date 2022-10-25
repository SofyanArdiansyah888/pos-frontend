import { Lucide, Modal, ModalBody } from "@/base-components";
import { useMutation } from "@apollo/client";
import { DELETE_PRINTER_MUTATION } from "../../graphql/printer";

function DeleteModal({ modal, setModal, printer }) {
  const [deletePrinter, { data, loading }] = useMutation(DELETE_PRINTER_MUTATION);
  const handleDelete = () => {
    deletePrinter({
      variables: {
       input:{
        id:printer.id
       }
      },
      onCompleted: () => {
        setModal(false);
      },
      refetchQueries: () => ['printers']
    });
  };
  return (
    <>
      <Modal
       show={modal}
        onHidden={() => {
          setModal(false);
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
              Do you really want to delete this printer? <br />
              <strong className="capitalize">{printer ? printer.name : ''}</strong>
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <button
              type="button"
              onClick={() => {
                setModal(false);
              }}
              className="btn btn-outline-secondary w-24 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger w-24"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default DeleteModal;
