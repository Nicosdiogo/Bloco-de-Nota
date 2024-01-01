import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotaContexto = createContext()
const NotaProvisoria = ({children}) =>{
    const [notas, setNotas] = useState([])

    const findNotes = async () => {
        const result = await AsyncStorage.getItem('notas');
        console.log(result)
        if (result !== null) setNotas(JSON.parse(result));
    }

    useEffect(() => {
        //AsyncStorage.clear();
        findNotes()
    }, [])

    return(
        <NotaContexto.Provider value={{notas, setNotas, findNotes}}>
            {children}
        </NotaContexto.Provider>
    )
}


export const useNotas = () => useContext(NotaContexto)
export default NotaProvisoria;