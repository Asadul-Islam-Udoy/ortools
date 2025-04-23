import React, { useState } from "react";
import { toast } from "react-toastify";
import HostUrls from "../host/HostUrls";
interface ModalProps {
  isDelete: boolean;
  userid: number;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomerDeleteModal: React.FC<ModalProps> = ({
  isDelete,
  setIsDelete,
  userid,
}) => {
  const [lodding, setLodding] = useState<boolean>(false);

  const submitHandler = async (userid: number) => {
    setLodding(true);
    try {
      const res = await fetch(
        HostUrls + `/api/customers/delete/customer/${userid}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!res.ok) toast.error("request falis");
      setLodding(false);
      const data = await res.json();
      setIsDelete(false); // Close modal on success
      toast.success(data.message);
    } catch (err) {
      console.error("Error:", err);
      setLodding(false);
      toast.error("Error creating customer. Try again.");
    }
  };

  return (
    <>
      {isDelete && (
        <div className=" -mt-72 mr-32">
          <div className="flex  items-center justify-center min-h-screen p-4">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div
              className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-gray-50 md:flex justify-between w-full px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => setIsDelete((pre) => !pre)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  x
                </button>
                <h2 className="md:ml-3 w-full text-[22px] text-orange-400">
                  Delete Customer
                </h2>
              </div>

              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <button
                  type="button"
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                >
                  
                </button>
                <div className="p-4 md:p-5 text-center">
                  <svg
                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                  </h3>
                  <button
                    onClick={()=>submitHandler(userid)}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  >
                    {lodding?'Deleting':"Yes, I'm sure"}
                  </button>
                  <button
                    onClick={() => setIsDelete((pre) => !pre)}
                    data-modal-hide="popup-modal"
                    type="button"
                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDeleteModal;
