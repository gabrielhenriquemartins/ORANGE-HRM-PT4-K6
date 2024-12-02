import http from 'k6/http';
import { check, sleep } from 'k6';

export function createExpenseType(cookies, expenseType, description, expectedStatusCode) {
    const payload = JSON.stringify({
        "name": expenseType,
        "description": description,
        "status": true
      });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/claim/expenses/types', payload, params);

    sleep(3)

    const valid = check(res, {
        [`New Expense Type Created: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to create expense type.');
    }

    const responseData = res.json();
    const expenseTypeId = responseData?.data?.id;

    if (!expenseTypeId) {
        throw new Error('Failed to retrieve expense type ID from the response.');
    }else{
        console.log(`Expense Type ${expenseType} created successfully! ID: ${expenseTypeId}`);
    }
    return expenseTypeId;
}

export function deleteExpenseType(cookies, expenseTypeID, expectedStatusCode) {
    const payload = JSON.stringify({
        ids: [expenseTypeID],
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.del('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/claim/expenses/types', payload, params);

    sleep(3)

    const valid = check(res, {
        [`Expense Type Deleted: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to delete Expense type.');
    }else{
        console.log(`Expense type deleted successfully! ID: ${expenseTypeID}`);
    }
}