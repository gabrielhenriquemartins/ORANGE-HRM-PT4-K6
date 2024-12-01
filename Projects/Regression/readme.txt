Smoke Run
$env:EXECUTION_TYPE="smoke"; k6 run regression.js

Load Run
$env:EXECUTION_TYPE="load"; k6 run regression.js