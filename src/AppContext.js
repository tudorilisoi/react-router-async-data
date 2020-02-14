import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
const AppContext = React.createContext(null);
export default AppContext;

export const defaultData = {
    loading: false,
}

function loadDataMock({ pathname }) {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => resolve(Math.random()), 200 + Math.random() * 800)
    })
}

// Context provider
export const AppContextProvider = ({ initialData, children }) => {

    const mergedInitialData = { ...defaultData, ...initialData }
    const [data, setData] = useState(mergedInitialData)
    const [dataByRoute, setDataByRoute] = useState({})

    const location = useLocation();

    const contextValue = {
        data,
        dataByRoute,
        setData: (values => setData({ ...data, ...values })),
        getRouteData:()=>dataByRoute[location.pathname]
    }

    //logging
    useEffect(() => {
        console.log(`ctx Update:`, contextValue)
    }, [data, dataByRoute])

    useEffect(() => {
        const currentPath = location.pathname;
        console.log(`location.pathname changed to: ${currentPath}`)
        const searchParams = new URLSearchParams(location.search);

        //load data by route
        setData({ ...data, loading: true})
        loadDataMock({
            pathname: currentPath
        }).then(loadedData => {
            setDataByRoute({ ...dataByRoute, [currentPath]: loadedData })
        }).finally(() => {
            setData({ ...data, loading: false })
        })

    }, [location]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}


export function Async({ children }) {
    const ctx = useContext(AppContext)
    if (ctx.data.loading) {
        return (
            <p>Loading...</p>
        )
    }
    return (
        <>
            {children}
        </>
    )
}