import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function createLeaveType(cookies, leaveType, expectedStatusCode) {
    const payload = JSON.stringify({
        "name": leaveType,
        "situational": false
      });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-types', payload, params);

    sleep(randomIntBetween(1, 4));

    const valid = check(res, {
        [`New Leave Type Created: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to create leave type.');
    }

    const responseData = res.json();
    const leaveTypeId = responseData?.data?.id;

    if (!leaveTypeId) {
        throw new Error('Failed to retrieve leave type ID from the response.');
    }else{
        console.log(`Leave Type ${leaveType} created successfully! ID: ${leaveTypeId}`);
    }
    return leaveTypeId;
}

export function deleteLeaveType(cookies, leaveTypeID, expectedStatusCode) {
    const payload = JSON.stringify({
        ids: [leaveTypeID],
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.del('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-types', payload, params);

    sleep(randomIntBetween(1, 4));

    const valid = check(res, {
        [`Leave Type Deleted: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to delete Leave type.');
    }else{
        console.log(`Leave type deleted successfully! ID: ${leaveTypeID}`);
    }
}