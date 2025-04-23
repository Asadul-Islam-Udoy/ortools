import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import HostUrls from "../../host/HostUrls";
import { toast } from "react-toastify";
interface ModalProps {
  setId: React.Dispatch<React.SetStateAction<number>>;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
}


 const CustomersTable:React.FC<ModalProps>=({setIsUpdate,setIsDelete,setId,searchValue
  })=> {
    
    interface CustomersProps {
    name: string;
    email: string;
    phone:string,
    company:string,
    tags:string[]
  }
  const [lodding, setLodding] = React.useState<boolean>(false);
  const [customers, setCustomers] = React.useState<CustomersProps[]>(
    []
  );

  React.useEffect(() => {
    const feachCustomers = async () => {
      try {
        setLodding(true);
        const config: any = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Important for sending cookies
        };
        const query = searchValue ? 
        `?name=${searchValue}&email=${searchValue}&phone=${searchValue}` 
        : "";

      const response = await fetch(
        HostUrls + `/api/customers/get/all/customers${query}`,
        config
      );
        const data = await response.json();
        if (!response.ok) {
          toast.error(data.message);
        } else {
          setCustomers(data.data); // Store messages in state
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLodding(false);
      }
    };
    const debounce = setTimeout(() => {
      feachCustomers();
    }, 300); // debounce 300ms
  
    return () => clearTimeout(debounce);

  }, [searchValue]); // Run once when component mounts

  const rows: any[] = [];
  customers?.forEach((element: any) => {
    const data: any = {
      id: element?.id,
      name: element.name,
      email: element.email,
      phone:element.phone,
      company: element.company,
      tags: element?.tags?.map((val:any)=> val?.name),
    };
    rows.push(data);
  });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      editable: true,
    },
    {
      field: "company",
      headerName: "Company",
      width: 150,
      editable: true,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (props) => {
        return (
          <>
            <div className="flex gap-4 ">
              <div onClick={()=>[setId(props.row.id),setIsUpdate((pre)=>!pre)]} title="edit" className="text-green-400 cursor-pointer ">
                <EditIcon />
              </div>
              <div onClick={()=>[setId(props.row.id),setIsDelete((pre)=>!pre)]} title="delete" className="text-red-500 cursor-pointer">
                <DeleteOutlineIcon />
              </div>
            </div>
          </>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}

export default CustomersTable