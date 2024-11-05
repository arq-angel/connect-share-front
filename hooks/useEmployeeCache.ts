import {useQueryClient} from "@tanstack/react-query";

export const useEmployeeCache = ({employeeId}) => {
    const queryClient = useQueryClient();

    const cachedData = queryClient.getQueryData(['employees', "live", "infinite"]);

    const employee = cachedData?.pages
        // .flatMap(page => page.data?.requests || [])
        // .find(emp => emp.id === employeeId);
        .flatMap(page => {
            // console.log("Page: ", page.data.requests);
            return page.data?.requests || [];
        })
        .find(employee => {
            // console.log("Employee: ", employee);
            // console.log("Requested ID: ", employeeId)
            return employee.id == employeeId
        })

    return {
        employee: employee,
    }
}