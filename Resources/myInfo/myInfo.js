import http from 'k6/http';
import { check, sleep } from 'k6';

export function gerPersonalInfo(cookies, expectedStatusCode) {
    const params = {
        headers: {
            Cookies: cookies,
        }
    };

    const res = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/7/personal-details', params);

    sleep(3)

    const valid = check(res, {
        [`Retrieve Personal Info: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to retrieve personal info.');
    }
}