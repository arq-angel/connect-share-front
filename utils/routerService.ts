import {Router} from 'expo-router';

let routerInstance: Router | null = null;

export const setRouter = (router: Router) => {
    routerInstance = router;
}

export const getRouter = () => {
    return routerInstance;
}
