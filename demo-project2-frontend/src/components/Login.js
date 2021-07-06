
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom'
import { Password } from 'primereact/password';
import { useDispatch } from 'react-redux';
import { Dialog } from 'primereact/dialog';

import { classNames } from 'primereact/utils';


import UserService from '../services/userService';
import { signInAction } from '../authentication/actions/authActions';

export const Login = () => {

    const [apiSuccess, setApiSuccess] = useState({})
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [apiMessage, setApiMessage] = useState('')
    const history = useHistory();
    const userService = new UserService();

    const dispatch = useDispatch();

    

    
           
      
           
       

    

    const handleSignIn = () => {

        dispatch(signInAction());

    }




    const formik = useFormik({
        initialValues: {
            userName: '',

            password: '',



        },
        validate: (data) => {
            let errors = {};

            if (!data.userName) {
                errors.userName = 'Name is required.';
            }



            if (!data.password) {
                errors.password = 'Password is required.';
            }




            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            userService.signIn(formik.values.password, formik.values.userName).then((result) => setApiMessage(result.data.message));
            userService.signIn(formik.values.password, formik.values.userName).then(result => setApiSuccess(result.data.success));
            setShowMessage(true);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = () =>
    {
        if(apiSuccess) {
            
            return <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); history.push("/"); handleSignIn(); }} /></div>;
        } 
        
            else 
        
        {
            return <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => { setShowMessage(false); }} /></div>;
        }
             
       
    }




    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>{apiMessage}</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        <b>{formData.userName}</b>
                    </p>
                </div>
            </Dialog>

            <div className="my-form p-d-flex p-jc-center">
                <div className="card">
                    <h2 className="p-text-center">Giriş Yap</h2>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="p-field">
                            <span className="p-float-label  p-mb-4">
                                <InputText id="userName" name="userName" value={formik.values.userName} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('userName') })} />
                                <label htmlFor="userName" className={classNames({ 'p-error': isFormFieldValid('userName') })}>Kullanıcı Adı</label>
                            </span>
                            {getFormErrorMessage('userName')}
                        </div>

                        <div className="p-field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Şifre</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>




                        <Button type="submit" label="Giriş Yap" className="p-mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login