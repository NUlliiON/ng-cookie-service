import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NgCookieService {

    constructor() { }

    /**
     * Setting cookie value by name
     * @param name name of cookie
     * @param value cookie value
     * @param AddExpires add expiration (date or seconds) to cookie
     */
    public setCookie(name: string, value: string, addExpires: Date | number) {

        let addExpiresStr = '';
        if (addExpires) {
            if (typeof addExpires === 'number') {
                const date = new Date();
                date.setSeconds(date.getSeconds() + addExpires);
                addExpiresStr = date.toUTCString();
            } else if ((addExpires as Date).toUTCString) {
                addExpiresStr = addExpires.toUTCString();
            }
        }

        value = encodeURIComponent(value);

        let newCookie = name + '=' + value + '; ';
        newCookie += 'expires=' + addExpiresStr;

        document.cookie = newCookie;
    }

    public getCookie(name: string): string {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    public deleteCookie(name: string): void {
        this.setCookie(name, '', -1);
    }

    public setCookieExpDate(cookieName: string, date: Date) {
        document.cookie += '; expires=' + date.toUTCString();
    }

    public addCookieExpTime(cookieName: string, seconds: number) {
        const date = new Date();
        date.setSeconds(date.getSeconds() + seconds);
        document.cookie += '; expires=' + date.toUTCString();
    }

    public cookieExists(name: string): boolean {
        return this.getCookie(name) == null ? false : true;
    }
}
