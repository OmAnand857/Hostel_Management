import { createContext , useContext , useState } from "react";

export const AuthProviderContext = createContext( null );


export const AuthProviderFunction = ( { children } ) => {
    const [ user, setuser  ] = useState( null );
    return (
        <AuthProviderContext.Provider value={ { user , setuser } }>
            { children }
        </AuthProviderContext.Provider>
    )   
}