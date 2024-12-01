import http from 'k6/http';
import { check, sleep } from 'k6';
import { extractToken } from '../../Utils/utils.js';

export function getLoginPage() {
    const res = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    sleep(3)
    const token = extractToken(res.body);

    const valid = check(res, {
        'Auth Login: Status Code is 200': (r) => r.status === 200,
        'Valid Token Found': () => token !== null,
    });

    if (!valid) {
        throw new Error('Failed to extract token.');
    }

    return token;
}

export function login(token, username, password, expectedStatusCode) {
    const payload = {
        _token: token,
        username: username,
        password: password,
    };
    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    sleep(3)

    const res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', payload, params);

    const valid = check(res, {
        [`Auth Validation: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
        'Valid Cookie Found': (r) => r.cookies.session !== null,
    });

    if (!valid) {
        throw new Error('Login failed.');
    }

    console.log('Login successful! Cookies:', res.cookies);
    return res.cookies;
}
