export const smokeTestStages = {
    maxRedirects: 0,
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01']
    },
    stages: [
        {
            duration: '5s',
            target: 1
        }
    ]
};

export const loadTestStages = {
    maxRedirects: 0,
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        http_req_failed: ['rate<0.01']
    },
    stages: [
        {
            duration: '1m',
            target: 2
        },
        {
            duration: '3m',
            target: 5
        }
    ]
};
