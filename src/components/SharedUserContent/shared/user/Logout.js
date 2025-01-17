import React, {useEffect} from 'react';
import { useNavigate} from 'react-router-dom';

function Logout() {
    const nav = useNavigate();
    useEffect( ()=> {
        logout();
    });
    const logout = () => {
        localStorage.clear('token');
        localStorage.clear('full_name');
        localStorage.clear('user_type');
        localStorage.clear('registration');
        nav('/');
    }
    return (<> </>)
}

export default Logout;
