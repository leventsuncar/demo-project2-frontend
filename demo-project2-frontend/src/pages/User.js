import React, { useState, useEffect, useRef } from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UserService from "../services/userService";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'

const User = () => {

    const [users, setUsers] = useState([]);

    const [globalFilter, setGlobalFilter] = useState('');




    useEffect(() => {
        const userService = new UserService();

        userService.getUsers().then(result => setUsers(result.data.data));
    }, []);

    const isActiveBodyTemplate = (rowData) => {
        if (rowData.isActive) {
            return "Aktif";
        }
        else {
            return "İnaktif";
        }
       

    }
    
    const imageBodyTemplate = (rowData) => {
        return <img src= {rowData.pictureURL} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.pictureURL} className="user-picture" />;
    }

    
    
    
    const reset = () => {
        setGlobalFilter('');

    }

    const header = (
        <div className="table-header">
            <Button type="button" label="Temizle" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Ara" />
            </span>
        </div>
    );


    return (
        <div>
            <div className="card ">
                <DataTable className ="p-datatable-sm p-mb-3 demo-container" resizableColumns value={users} showGridlines header={header}
                    globalFilter={globalFilter} emptyMessage="No customers found.">
                    <Column field="userName" header="Kullanıcı Adı"></Column>
                    <Column field="firstName" header="Ad" ></Column>
                    <Column field="lastName" header="Soyad" ></Column>
                    <Column field="email" header="Email" ></Column>
                    <Column field="phoneNumber" header="Telefon Numarası" ></Column>
                    <Column header="Fotoğraf" body={imageBodyTemplate} ></Column>
                    <Column field="isActive" header="Aktif mi?" body={isActiveBodyTemplate} ></Column>
                    <Column field="status" header="Yetki" ></Column>
                    <Column field="password" header="Şifre" ></Column>
                    
                </DataTable>
            </div >
        </div >
    );


}
export default User