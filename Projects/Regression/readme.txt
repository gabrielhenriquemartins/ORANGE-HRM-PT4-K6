Smoke Run (main folder)
$env:EXECUTION_TYPE="smoke"; k6 run .\Projects\Regression\regression.js

Load Run (main folder)
$env:EXECUTION_TYPE="load"; k6 run .\Projects\Regression\regression.js