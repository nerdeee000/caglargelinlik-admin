import cookie from 'js-cookie'


export const setCookie = (key,value) => {
    if(window !== 'undefined'){
        cookie.set(key, value, {
            expires: 5/24
        })
    }
}

export const removeCookie = (key,value) => {
    if(window !== 'undefined'){
        cookie.remove(key, {
            expires: 5/24
        })
    }
}

export const getCookie = (key,value) => {
    if(window !== 'undefined'){
        return cookie.get(key);
    }
}


export const setLocalStorage = (key,value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

export const authenticate = (response, next) => {
    console.log("Giriş yapıldı.");
    setCookie('token', response.token);
    setLocalStorage('user_name', response.user_name);
    setLocalStorage('user_role', response.user_role);
    next();
}


export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user_name')){
                return JSON.parse(localStorage.getItem('user_name'))
            }
            else{
                return false
            }
        }
    }
}

export const signout = () => {
    removeCookie('token');
    removeLocalStorage('user_name');
    removeLocalStorage('user_role');
    console.log("Güvenli çıkış yapıldı.");
}