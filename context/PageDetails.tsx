import {useState, createContext} from "react";

export const PageDetailsContext = createContext({
    pageTitle: '',
    setPageTitle: (value: string) => {},
})

const PageDetailsProvider = ({ children }: any) => {
    const [pageTitle, setPageTitle] = useState('');

    return (
        <PageDetailsContext.Provider value={{ pageTitle, setPageTitle }}>
            {children}
        </PageDetailsContext.Provider>
    );
};

export default PageDetailsProvider;
