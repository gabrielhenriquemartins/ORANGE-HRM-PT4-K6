import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export const options = {
    stages: [
        {
            duration: '5s',
            target: 1
        }
    ]
}

export default function () {
    const res = http.get('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    sleep(5)
    console.log(res.body)
    const regex = /:token="&quot;([^"]+)/;
    const match = String(res.body).match(regex);
    if (match) {
        const token = match[1].replace(/&quot;/g, ''); // Clean up any remaining &quot; if necessary
        console.log(`Extracted Token: ${token}`);
    } else {
    console.log('Token not found in the response.');
    }
}