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

    sleep(3);

    const res = http.post('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles', payload, params);

    const valid = check(res, {
        [`Job Title Created: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to create job title.');
    }

    const responseData = res.json();
    const jobId = responseData?.data?.id;

    if (!jobId) {
        throw new Error('Failed to retrieve job ID from the response.');
    }else{
        console.log(`Job title ${title} created successfully! ID: ${jobId}`);
    }
    return jobId;
}

export function deleteJobTitle(cookies, jobID, expectedStatusCode) {
    const payload = JSON.stringify({
        ids: [jobID],
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.del('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles', payload, params);

    sleep(3)

    const valid = check(res, {
        [`Job Title Deleted: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Failed to delete job title.');
    }else{
        console.log(`Job title deleted successfully! ID: ${jobID}`);
    }
}

export function emailConfiguration(cookies, expectedStatusCode) {
    const payload = JSON.stringify({
        "mailType": "sendmail",
        "sentAs": "send@mail.com",
        "smtpHost": null,
        "smtpPort": null,
        "smtpUsername": "",
        "smtpPassword": null,
        "smtpAuthType": "none",
        "smtpSecurityType": "none",
        "testEmailAddress": "destination@mail.com"
    });

    const params = {
        headers: {
            "Content-Type": "application/json",
            Cookies: cookies,
        }
    };

    const res = http.put('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/email-configuration', payload, params);

    sleep(3)

    const valid = check(res, {
        [`Email Configuration: Status Code is ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode,
    });

    if (!valid) {
        throw new Error('Email configuration failed');
    }else{
        console.log(`Email configured successfully!`);
    }
}