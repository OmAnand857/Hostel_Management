import { createContext , useContext , useState } from "react";

export const AuthProviderContext = createContext( null );
export const FormdataProviderContext = createContext( null );

export const AuthProviderFunction = ( { children } ) => {
    const [ user, setuser  ] = useState( null );
    return (
        <AuthProviderContext.Provider value={ { user , setuser } }>
            { children }
        </AuthProviderContext.Provider>
    )   
}

export const FormdataProviderFunction = ( { children } ) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userType: 'student', // default value
        description: '',
        state: '',
        city: '',
        pincode: '',
      });
    return (
        <FormdataProviderContext.Provider value={ { formData , setFormData } }>
            { children }
        </FormdataProviderContext.Provider>
    )
}