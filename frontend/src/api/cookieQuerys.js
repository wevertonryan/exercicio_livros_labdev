export default class CookieQuery{
    static upsertCookie(key, value){
        document.cookie = `${key}=${value};`;
    }
    static getCookie(key){
        const cookie = document.cookie;
        const regex = new RegExp(`${key}=([^;]+)`);
        const result = cookie.match(regex);
        if(result){
            return result[1];
        }
        return undefined;
    }
    static deleteCookie(key){
        document.cookie = `${key}=;`;
    }
}