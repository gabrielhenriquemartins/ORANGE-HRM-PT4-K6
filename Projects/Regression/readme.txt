Stable Since Version: 5.7

Brief Project Overview:
Project created to support basic regression testing on the OrangeHRM website.

Links to the Project Documentation:
My Linkedin Article - Waiting to be Published

How to Run:
Smoke Run (main folder)
$env:EXECUTION_TYPE="smoke"; k6 run .\Projects\Regression\regression.js

Load Run (main folder)
$env:EXECUTION_TYPE="load"; k6 run .\Projects\Regression\regression.js
