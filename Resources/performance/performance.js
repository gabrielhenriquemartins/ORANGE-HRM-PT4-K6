import http from 'k6/http';
import { check, sleep } from 'k6';

export function createKpi(cookies, kpi, expectedStatusCode) {
    const payload = JSON.stringify({
        "title": kpi,
        "jobTitleId": 5,
        "minRating": 0,
        "maxRating": 100,
        "isDefault": false
      });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/performance/kpis', payload, params);

    sleep(3)

    const valid = check(res, {
        [`New KPI Created: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to create KPI.');
    }

    const responseData = res.json();
    const kpiId = responseData?.data?.id;

    if (!kpiId) {
        throw new Error('Failed to retrieve KPI ID from the response.');
    }else{
        console.log(`KPI ${kpi} created successfully! ID: ${kpiId}`);
    }
    return kpiId;
}

export function deleteKpi(cookies, kpiID, expectedStatusCode) {
    const payload = JSON.stringify({
        ids: [kpiID],
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.del('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/performance/kpis', payload, params);

    sleep(3)

    const valid = check(res, {
        [`KPI Deleted: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to delete KPI.');
    }else{
        console.log(`KPI deleted successfully! ID: ${kpiID}`);
    }
}