export const getCurrentUser = () => {
    const auth  = localStorage.getItem('auth');
    return auth ?JSON.parse(localStorage.getItem('auth')||"{}") :null 
}