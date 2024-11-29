import http from 'k6/http';
import { sleep, check } from 'k6';

let token = null;
let cookies = {};

export const options = {
    maxRedirects: 0,
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01']
    },
    stages: [
        {
            duration: '5s',
            target: 1
        }
    ]
};

export default function () {
    const res = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    sleep(5);

    const regex = /:token="&quot;([^"]+)/;

    const result = check(res, {
        'Auth Login: Status Code is 200': (r) => r.status === 200,
        'Valid Token Found': (r) => {
            const match = String(r.body).match(regex);
            if (match) {
                token = match[1].replace(/&quot;/g, '');
                console.log(`Token: ${token}`);
                return true;
            } else {
                console.log('Token not found.');
                return false;
            }
        },
    });

    if (!result) {
        console.error('Some tests failed!');
        return;
    }

    const payload = {
        _token: token,
        username: 'Admin',
        password: 'admin123',
    };
    const params = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const loginRes = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate', payload, params);
    
    check(loginRes, {
        'Auth Validation: Status Code is 302': (r) => r.status === 302,
        'Valid Cookie Found': (r) => r.cookies.session !== null,
    });

    cookies = loginRes.cookies;
    console.log('Login successful! Cookies:', cookies);

    const payload2 = {
        title: 'Title Test',
        description: 'My description',
        note: 'My Note'
    };
    const params2 = {
        headers: {
            Cookies: cookies,
        }
    };

    const admin = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles', payload2, params2);
    
    check(admin, {
        'Status Code': (r) => r.status === 200,
    });
}
