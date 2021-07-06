import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import UserService from '../services/userService';
import { useParams } from 'react-router-dom';





export const UserUpdate = () => {

    let {id} = useParams();

    const [user, setUser] = useState({})
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const toast = useRef(null);

    const userService = new UserService();

    



    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            accept: (false),

        },
        validate: (data) => {
            let errors = {};

            if (!data.userName) {
                errors.userName = 'Kullanıcı Adı Gereklidir';
            }

            if (!data.email) {
                errors.email = 'Email Gereklidir';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Geçersiz Email Adresi. örn. örnek@email.com';
            }

            if (!data.password) {
                errors.password = 'Şifre Gereklidir';
            }

            if (!data.confirmPassword) {
                errors.confirmPassword = 'Şifre Tekrarı Gereklidir';
            }
            else if (data.password !== data.confirmPassword) {
                errors.confirmPassword = 'Şifreler Aynı Olmalıdır';
            }

            if (!data.firstName) {
                errors.firstName = 'Ad Gereklidir';
            }

            if (!data.lastName) {
                errors.lastName = 'Soyad Gereklidir';
            }

            if (!data.phoneNumber) {
                errors.phoneNumber = 'Telefon Numarası Gereklidir';
            }

            if (!data.accept) {
                errors.accept = 'Kabul etmeniz gerekiyor';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            
            userService.updateUser(id,data)
            setShowMessage(true);
            console.log(data)
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Şifrenizi Belirleyin</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="p-mt-2">Öneriler</p>
            <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                <li>En az bir küçük harf içermeli</li>
                <li>En az bir büyük harf içermeli</li>
                <li>En az bir numara içermeli</li>
                <li>En az 8 karakterli olmalı</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="user-add">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Kayıt Başarılı</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Hesabın şu kullanıcı adıyla oluşturuldu: <b>{formData.userName}</b>
                    </p>
                </div>
            </Dialog>

            <div className=" my-form p-d-flex p-jc-center p-shadow-6 ">
                <div className="card">
                    <h2 className="p-text-center p-my">Kaydol</h2>
                    <form onSubmit={formik.handleSubmit} className="form p-fluid p-formgrid  p-grid ">

                        <div className="p-field p-col-6 p-mb-3 ">
                            <span className="p-float-label">
                                <InputText id="userName" name="userName" value={formik.values.userName} onChange={formik.handleChange} className={classNames("p-mx-1", { 'p-invalid': isFormFieldValid('userName') })} />
                                <label htmlFor="userName" className={classNames({ 'p-error': isFormFieldValid('userName') })}>Kullanıcı Adı</label>
                            </span>
                            {getFormErrorMessage('userName')}
                        </div>
                        <div className="p-field p-col-6 p-mb-3 ">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames("p-mx-1", { 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="p-field p-col-6 p-my-3 ">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames("p-mx-1", { 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Şifre</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="p-field p-col-6 p-my-3 ">
                            <span className="p-float-label">
                                <Password id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} toggleMask
                                    className={classNames("p-mx-1", { 'p-invalid': isFormFieldValid('confirmPassword') })} />
                                <label htmlFor="confirmPassword" className={classNames({ 'p-error': isFormFieldValid('confirmPassword') })}>Şifre Tekrarı</label>
                            </span>
                            {getFormErrorMessage('confirmPassword')}
                        </div>


                        <div className="p-field p-col-6 p-my-3">
                            <span className="p-float-label">
                                <InputText id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} toggleMask
                                    className={classNames("p-mx-1", { 'p-invalid': isFormFieldValid('firstName') })} />
                                <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid('firstName') })}>Ad</label>
                            </span>
                            {getFormErrorMessage('firstName')}
                        </div>
                        <div className="p-field p-col-6 p-my-3 ">
                            <span className="p-float-label">
                                <InputText id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} toggleMask
                                    className={classNames("p-mx-1", { 'p-invalid': isFormFieldValid('lastName') })} />
                                <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid('lastName') })}>Soyad</label>
                            </span>
                            {getFormErrorMessage('lastName')}
                        </div>
                        <div className="p-field p-col-6 p-my-3">
                            <span className="p-float-label">
                                <InputText id="phoneNumber" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} toggleMask
                                    className={classNames("p-mx-1", { 'p-invalid': isFormFieldValid('phoneNumber') })} />
                                <label htmlFor="phoneNumber" className={classNames({ 'p-error': isFormFieldValid('phoneNumber') })}>Telefon Numarası</label>
                            </span>
                            {getFormErrorMessage('picture')}
                        </div>




                        <div className="p-field-checkbox p-ml-4 p-mt-3 p-col-3 ">
                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>Kabul Ediyorum</label>
                        </div>

                        <Button type="submit" label="Kayıt Ol" className="p-mt-2 p-mx-2 p-shadow-6" />
                    </form>
                </div>
            </div >
        </div >
    );


}
export default UserUpdate

