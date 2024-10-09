import React, {createContext, useState} from 'react';

export const PageHeadingContext = createContext({
    heading: '',
    setHeading: (value: string) => {},
})

const PageHeadingProvider = ({children}: any) => {
    const [heading, setHeading] = useState('');

    return (
        <PageHeadingContext.Provider value={{heading, setHeading}}>
            {children}
        </PageHeadingContext.Provider>
    );
};

export default PageHeadingProvider;