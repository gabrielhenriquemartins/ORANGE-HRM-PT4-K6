import http from 'k6/http';
import { check, sleep } from 'k6';

export function getJobTitles(cookies, expectedStatusCode) {
    const params = {
        headers: {
            Cookies: cookies,
        }
    };

    const res = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles?limit=0', params);

    sleep(3)

    const valid = check(res, {
        [`Retrieve Job Titles: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to retrieve job titles.');
    }
}