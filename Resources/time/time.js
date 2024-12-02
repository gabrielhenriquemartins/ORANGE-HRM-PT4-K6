import http from 'k6/http';
import { check, sleep } from 'k6';

export function getDateTime(cookies, expectedStatusCode) {
    const params = {
        headers: {
            Cookies: cookies,
        }
    };

    const res = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/attendance/current-datetime', params);

    sleep(3)

    const valid = check(res, {
        [`Retrieve Datetime: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to retrieve current datetime.');
    }

    const responseData = res.json();
    const currentDate = responseData?.data?.utcDate;

    if (!currentDate) {
        throw new Error('Failed to retrieve datetime.');
    }else{
        console.log(`Retrieve date successfully! UTC: ${currentDate}`);
    }
    return currentDate;
}

export function getAllPunchInOut(cookies, date, expectedStatusCode) {
    const params = {
        headers: {
            Cookies: cookies,
        }
    };

    const res = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/attendance/records?limit=50&offset=0&date=' + date, params);

    sleep(3)

    const valid = check(res, {
        [`Retrieve all Punch In/Out: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to retrieve Punch In/Out.');
    }
}