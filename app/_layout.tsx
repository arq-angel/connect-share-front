import UserLoggedInProvider from "../context/UserLoggedIn";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PageHeadingProvider from "../context/PageHeading";

const queryClient = new QueryClient();

const InitialLayout = () => {
    return (
        <>
        </>
    );
}

const RootLayout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <UserLoggedInProvider>
                <PageHeadingProvider>
                    <InitialLayout/>
                </PageHeadingProvider>
            </UserLoggedInProvider>
        </QueryClientProvider>
    )
};

export default RootLayout;