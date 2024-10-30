import {QueryClient} from "@tanstack/react-query";

// Create and export a singleton query client instance
const queryClientService = new QueryClient();

export const getQueryClientService = () => queryClientService;

export default queryClientService;