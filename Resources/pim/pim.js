import http from 'k6/http';
import { check, sleep } from 'k6';

export function addEmployee(cookies, firstName, middleName, lastName, id, expectedStatusCode) {
    const payload = JSON.stringify({
        "firstName": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "empPicture": null,
        "employeeId": id
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees', payload, params);

    sleep(3)

    const valid = check(res, {
        [`New Employee Added: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to add new employee.');
    }

    const responseData = res.json();
    const employeeId = responseData?.data?.empNumber;

    if (!employeeId) {
        throw new Error('Failed to retrieve employee ID from the response.');
    }else{
        console.log(`Employee ${firstName} added successfully! ID: ${employeeId}`);
    }
    return employeeId;
}

export function removeEmployee(cookies, employeeID, expectedStatusCode) {
    const payload = JSON.stringify({
        ids: [employeeID],
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.del('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees', payload, params);

    sleep(3)

    const valid = check(res, {
        [`Employee Removed: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to remove employee.');
    }else{
        console.log(`Employee removed successfully! ID: ${employeeID}`);
    }
}