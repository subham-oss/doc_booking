import { createContext } from "react";

export const Appcontext = createContext();

const currency = "$"
const AppProvider = (props)=>{
    const calculateage = (dob)=>{
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }

    const value={
        calculateage,currency
    }
    return(
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )
}
export default AppProvider;