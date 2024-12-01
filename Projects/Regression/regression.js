import { options } from './regression_stages.js';
import { getLoginPage, login } from "../../Resources/login/login.js";
import { createJobTitle, deleteJobTitle } from '../../Resources/admin/admin.js';

export { options };

export default function () {
    const token = getLoginPage();

    const cookies = login(token, 'Admin', 'admin123', 302);

    const jobID = createJobTitle(cookies, 'Tees Tesrs', 'My description', 'My Note', 200);

    deleteJobTitle(cookies, jobID, 200);

}
