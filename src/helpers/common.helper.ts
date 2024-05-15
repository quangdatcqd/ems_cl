export const getCurrentUser = () => { 
    return getLocalStorage('auth')
}
export const getLocalStorage = (key:string) : any => {
    const auth  = localStorage.getItem(key) || null;
    return auth ?JSON.parse(auth ) :null 
}