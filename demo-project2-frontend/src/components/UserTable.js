import React, { useState, useEffect, useRef } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserService from "../services/userService";
import { InputText } from 'primereact/inputtext'
import { Checkbox } from 'primereact/checkbox';
import { useHistory } from 'react-router-dom'
import { Button } from 'primereact/button';



const UserTable = () => {

    const [users, setUsers] = useState([]);
    const [userEditDialog, setUserEditDialog] = useState(false)


    const [globalFilter, setGlobalFilter] = useState('');
    
    
    const [checked, setChecked] = useState(false);
    const userService = new UserService();
    const history = useHistory();


    useEffect(() => {

        if (!checked) {
            userService.getActiveUsers().then(result => setUsers(result.data.data));
        } else {
            userService.getUsers().then(result => setUsers(result.data.data));
        }

    }, [checked]);








    const isActiveBodyTemplate = (rowData) => {
        if (rowData.isActive) {
            return "Aktif";
        }
        else {
            return "İnaktif";
        }


    }
    const editUser = (rowData) => {

     return history.push("/updateUser/"+rowData.id)

    }
   







    const header = (
        <div className="table-header">
            <div> <h5>Silinmiş Kullanıcıları Göster</h5>
                <div className="p-field-checkbox">
                    <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
                    <label htmlFor="binary">{checked ? 'Gizle' : 'Göster'}</label>
                </div>
            </div>
            <span className="p-input-icon-left">
                <i className="pi pi-search p-mt" />
                <InputText className="p-mt-4" type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Ara" />
            </span>
        </div>
    );


    const actionBodyTemplate = (rowData) => {
        if (!checked) {
            return (
                <React.Fragment>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editUser(rowData)} />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => { userService.deleteUser(rowData.id); userService.getActiveUsers().then(result => setUsers(result.data.data)) }} />
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success " onClick={() => editUser(rowData)} />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => { userService.activateUser(rowData.id); userService.getUsers().then(result => setUsers(result.data.data)) }} />
                </React.Fragment>)

        }
    }















    return (
        <div>
            <div className="card ">
                <DataTable className="p-datatable-sm p-mb-3 demo-container" resizableColumns value={users} dataKey="id" showGridlines header={header}
                    globalFilter={globalFilter} emptyMessage="Kullanıcı Bulunamadı"
                >

                    <Column field="userName" header="Kullanıcı Adı"></Column>
                    <Column field="firstName" header="Ad" ></Column>
                    <Column field="lastName" header="Soyad" ></Column>
                    <Column field="email" header="Email" ></Column>
                    <Column field="phoneNumber" header="Telefon Numarası" ></Column>
                    <Column field="isActive" header="Aktif mi?" body={isActiveBodyTemplate} ></Column>


                    <Column field="status" header="Yetki" ></Column>

                    <Column field="delete" body={actionBodyTemplate} ></Column>

                </DataTable>
            </div >



        </div >


    );


}
export default UserTable