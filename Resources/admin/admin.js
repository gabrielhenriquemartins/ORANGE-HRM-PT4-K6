import http from 'k6/http';
import { check, sleep } from 'k6';


export function createJobTitle(cookies, title, description, note, expectedStatusCode) {
    const payload = {
        title: title,
        description: description,
        note: note,
    };
    const params = {
        headers: {
            Cookies: cookies,
        }
    };

    sleep(3)

    const res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles', payload, params);

    const valid = check(res, {
        [`Job Title Created: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to create job title.');
    }

    console.log('Job title created successfully!');
}
