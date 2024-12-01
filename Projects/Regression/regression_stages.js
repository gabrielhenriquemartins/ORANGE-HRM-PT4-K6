export const options = {
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
