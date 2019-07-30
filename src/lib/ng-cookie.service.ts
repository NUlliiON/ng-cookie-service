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

    /**
     * Getting cookie value by name
     * @param name name of cookie
     */
    public getCookie(name: string): string {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    /**
     * Delete cookie by name
     * @param name name of cookie
     */
    public deleteCookie(name: string): void {
        this.setCookie(name, '', -1);
    }

    /**
     * Setting cookie expiration date
     * @param name name of cookie
     */
    public setCookieExpDate(name: string, date: Date) {
        document.cookie += '; expires=' + date.toUTCString();
    }

    /**
     * Adding expiration time to cookie
     * @param name name of cookie
     * @param seconds seconds which will be added to cookie
     */
    public addCookieExpTime(name: string, seconds: number) {
        const date = new Date();
        date.setSeconds(date.getSeconds() + seconds);
        document.cookie += '; expires=' + date.toUTCString();
    }

    /**
     * Check for existing cookie in document.cookie
     * @param name name of cookie which need checking
     */
    public cookieExists(name: string): boolean {
        return this.getCookie(name) == null ? false : true;
    }
}
