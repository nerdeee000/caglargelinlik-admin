import cookie from 'js-cookie'


export const setCookie = (key,value) => {
    if(window !== 'undefined'){
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = (key,value) => {
    if(window !== 'undefined'){
        cookie.remove(key, {
            expires: 1
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
    setLocalStorage('user', response.user);
    next();
}



export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }
            else{
                return false
            }
        }
    }
}

export const signout = () => {
    removeCookie('token');
    removeLocalStorage('user');
    console.log("Güvenli çıkış yapıldı.")
}