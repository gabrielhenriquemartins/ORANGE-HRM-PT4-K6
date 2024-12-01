import { options } from './regression_stages.js';
import { getLoginPage, login } from "../../Resources/login/login.js";
import { createJobTitle } from '../../Resources/admin/admin.js';

export { options };

export default function () {
    const token = getLoginPage();

    const cookies = login(token, 'Admin', 'admin123', 302);

    createJobTitle(cookies, 'Title Testr', 'My description', 'My Note', 200);
}
