import React, { useState } from "react";
import { toast } from "react-toastify";
import HostUrls from "../host/HostUrls";
interface ModalProps {
  isUpdate: boolean;
  userid: number;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}
interface CustormerInputProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
}
interface CustomersProps {
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
}
const CustomerUpdateModal: React.FC<ModalProps> = ({
isUpdate,
setIsUpdate,
userid,
}) => {
  const [lodding, setLodding] = useState<boolean>(false);
  const [customer, setCustomer] = React.useState<CustomersProps>();
  const tags = ["Lead", "Prospect", "Client"];
  const [customerInput, setCustomerInput] = useState<CustormerInputProps>({
    name: "",
    email: "",
    phone: "",
    company: "",
    tags: [],
  });

  React.useEffect(() => {
    const feachCustomers = async () => {
      try {
        setLodding(true);
        const config: any = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Important for sending cookies
        };
        const response = await fetch(
          HostUrls + `/api/customers/get/single/customer/${userid}`,
          config
        );
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.message);
        } else {
          setCustomer(data.data);
          setCustomerInput({
            name: data.data.name || "",
            email: data.data.email || "",
            phone: data.data.phone || "",
            company: data.data.company || "",
            tags: data.data.tags?.map((tag: any) => tag.name) || [],
          });
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLodding(false);
      }
    };

    feachCustomers();
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLodding(true);
    if (!customerInput.email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }
    try {
      const res = await fetch(HostUrls + `/api/customers/update/customer/${userid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(customerInput),
      });

      if (!res.ok) toast.error("request falis");
      setLodding(false);
      const data = await res.json();
      setIsUpdate(false); // Close modal on success
      toast.success(data.message);
    } catch (err) {
      console.error("Error:", err);
      setLodding(false);
      toast.error("Error creating customer. Try again.");
    }
  };


  return (
    <>
      {isUpdate && (
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
                  onClick={() => setIsUpdate((pre) => !pre)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  x
                </button>
                <h2 className="md:ml-3 w-full text-[22px] text-orange-400">Update Customer</h2>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={submitHandler}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer name
                      </label>
                      <input
                        onChange={(e) =>
                          setCustomerInput((pre) => ({
                            ...pre,
                            name: e.target.value,
                          }))
                        }
                        value={customerInput.name}
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="asadul islam"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer email
                      </label>
                      <input
                       value={customerInput.email}
                        onChange={(e) =>
                          setCustomerInput((pre) => ({
                            ...pre,
                            email: e.target.value,
                          }))
                        }
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Phone
                      </label>
                      <input
                       value={customerInput.phone}
                        onChange={(e) =>
                          setCustomerInput((pre) => ({
                            ...pre,
                            phone: e.target.value,
                          }))
                        }
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="01772346923"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Customer Company
                      </label>
                      <input
                      value={customerInput.company}
                        onChange={(e) =>
                          setCustomerInput((pre) => ({
                            ...pre,
                            company: e.target.value,
                          }))
                        }
                        type="text"
                        name="company"
                        id="company"
                        placeholder="orangetoolz"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Tags
                      </label>
                      <div className="flex items-center">
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                          {tags?.map((item) => (
                            <li
                              key={item}
                              className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
                            >
                              <div className="flex items-center ps-3">
                                <input
                                  id={`tag-${item}`}
                                  type="checkbox"
                                  value={item}
                                  checked={customerInput.tags.includes(item)}
                                  onChange={(e) => {
                                    const checked = e.target.checked;
                                    setCustomerInput((prev) => ({
                                      ...prev,
                                      tags: checked
                                        ? [...prev.tags, item]
                                        : prev.tags.filter(
                                            (tag) => tag !== item
                                          ),
                                    }));
                                  }}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  {item}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="mt-3 w-full hover:bg-gray-200 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        {!lodding ? "Update" : "Updating..."}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerUpdateModal;
