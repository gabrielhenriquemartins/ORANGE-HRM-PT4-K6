import { group } from 'k6';
import { smokeTestStages, loadTestStages } from './regression_stages.js';
import { getLoginPage, login } from "../../Resources/login/login.js";
import { createJobTitle, deleteJobTitle, emailConfiguration, changeLanguageEnglish, changeCorpBrand, activeModules } from '../../Resources/admin/admin.js';
import { createExpenseType, deleteExpenseType } from '../../Resources/claim/claim.js';
import { createLeaveType, deleteLeaveType } from '../../Resources/leave/leave.js';
import { gerPersonalInfo } from '../../Resources/myInfo/myInfo.js';
import { createKpi, deleteKpi } from '../../Resources/performance/performance.js';
import { getJobTitles } from '../../Resources/recruitment/recruitment.js';
import { addEmployee, removeEmployee } from '../../Resources/pim/pim.js';
import { getDateTime, getAllPunchInOut } from '../../Resources/time/time.js';
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"; //https://github.com/benc-uk/k6-reporter
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = (__ENV.EXECUTION_TYPE === 'load') ? loadTestStages : smokeTestStages; // If true, run load; else run smoke. Default is smoke.

export default function () {
    let cookies;
    //************* Login *************
    group('Login', () => {
    const token = getLoginPage();
    cookies = login(token, 'Admin', 'admin123', 302);
    });
    //*********************************

    //************* Admin *************
    group('Admin', () => {
    const jobID = createJobTitle(cookies, 'New Job - ' + randomString(6), 'My description', 'My Note', 200);
    deleteJobTitle(cookies, jobID, 200);
    emailConfiguration(cookies, 200);
    changeLanguageEnglish(cookies, 200);
    changeCorpBrand(cookies, 200);
    activeModules(cookies, 200);
    });
    //*********************************

    //************* Claim *************
    group('Claim', () => {
    const expenseTypeID = createExpenseType(cookies, 'New Expense - ' + randomString(6), 'My description', 200);
    deleteExpenseType(cookies, expenseTypeID, 200);
    });
    //*********************************

    //************* Leave *************
    group('Leave', () => {
    const leaveTypeID = createLeaveType(cookies, 'New Leave - ' + randomString(6), 200);
    deleteLeaveType(cookies, leaveTypeID, 200);
    });
    //*********************************

    //************* My Info *************
    group('My Info', () => {
    gerPersonalInfo(cookies, 200);
    });
    //***********************************

    //************* Performance *********
    group('Performance', () => {
    const kpiID = createKpi(cookies, 'KPI - ' + randomString(6), 200);
    deleteKpi(cookies, kpiID, 200);
    });
    //***********************************

    //************* Recruitment *********
    group('Recruitment', () => {
    getJobTitles(cookies, 200);
    });
    //***********************************

    //************* PIM *****************
    group('PIM', () => {
    const employeeID = addEmployee(cookies, "Gabriel", "Henrique", "Martins", randomIntBetween(10000, 20000), 200);
    removeEmployee(cookies, employeeID, 200);
    });
    //***********************************
    
    //************* TIME ****************
    group('Time', () => {
    const dateUTC = getDateTime(cookies, 200);
    getAllPunchInOut(cookies, dateUTC, 200);
    });
    //***********************************
}

export function handleSummary(data) {
    return {
      "Results/result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }