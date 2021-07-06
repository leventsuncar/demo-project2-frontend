import React, { useState, useEffect, useRef } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserService from "../services/userService";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from 'primereact/checkbox';
import { filter } from "async";


const UserTable = () => {

    const [users, setUsers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const dt = useRef(null);
    const [globalFilter, setGlobalFilter] = useState('');

    const toast = useRef(null);const [checked, setChecked] = useState(false);
    const userService = new UserService();
    


    useEffect(() => {

        if(!checked){
             userService.getActiveUsers().then(result => setUsers(result.data.data));
        }else{
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

    

    const onStatusChange = (e) => {
        dt.current.filter(e.value, 'status', 'equals');
        setSelectedStatus(e.value);
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


    


    const deneme = () =>{
        if(checked){
           let users = users.filter(user => user.isActive === true)

           return users
        }
        else{
            let users = users.filter(user => user.isActive === false)

            return users;
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
                    <Column field="password" header="Şifre" ></Column>

                </DataTable>
            </div >



        </div >


    );


}
export default UserTable