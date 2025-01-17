import React from 'react';
import { Link } from 'react-router-dom';
import HireHeader from '../hireEquipment/HireHeader';
import HireFooter from '../hireEquipment/HireFooter';

function PageNotFound(){
    return (
        <>
            <HireHeader/>
            <div className='filter-blank'></div>
            <div className='pageNotFound'>
                <div className='container'>
                    <h1 className='main-title'>404</h1>
                    <h3 className='title'>Ooops!</h3>
                    <h3 className='title'>Page Not Found</h3>
                    <p className='content'>This page doesn't exist or was removed!<br/>We suggest you back to home</p>
                    <Link className='filled-button' to='/home/hire-equipment'>Back to home</Link>
                </div>
            </div>
            <HireFooter/>
        </>
    );
};

export default PageNotFound;