import { smokeTestStages, loadTestStages } from './regression_stages.js';
import { getLoginPage, login } from "../../Resources/login/login.js";
import { createJobTitle, deleteJobTitle } from '../../Resources/admin/admin.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = (__ENV.EXECUTION_TYPE === 'load') ? loadTestStages : smokeTestStages; // If true, run load; else run smoke. Default is smoke.

export default function () {
    const token = getLoginPage();
    const cookies = login(token, 'Admin', 'admin123', 302);

    const jobID = createJobTitle(cookies, 'New Job - ' + randomString(6), 'My description', 'My Note', 200);

    deleteJobTitle(cookies, jobID, 200);
}