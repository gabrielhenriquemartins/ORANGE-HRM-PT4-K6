export const smokeTestStages = {
    maxRedirects: 0,
    thresholds: {
        http_req_duration: ['p(90)<600', 'p(95)<800', 'p(99)<1000'], 
        http_req_waiting: ['p(95)<800'],  
        http_req_connecting: ['p(95)<200'], 
        http_req_tls_handshaking: ['p(95)<200'], 
        http_req_sending: ['p(95)<200'],    
        http_req_receiving: ['p(95)<200'], 
        http_req_blocked: ['avg<300', 'p(95)<500'],
        iteration_duration: ['p(95)<60000'],
        checks: ['rate==1'],
        data_received: ['count<50000'],
        data_sent: ['count<10000'],
        'group_duration{group:::Login}': ['p(95)<10000'],
        'group_duration{group:::Admin}': ['p(95)<20000'],
        'group_duration{group:::Claim}': ['p(95)<10000'],
        'group_duration{group:::Leave}': ['p(95)<10000'],
        'group_duration{group:::My Info}': ['p(95)<10000'],
        'group_duration{group:::Performance}': ['p(95)<10000'],
        'group_duration{group:::Recruitment}': ['p(95)<10000'],
        'group_duration{group:::PIM}': ['p(95)<10000'],
        'group_duration{group:::Time}': ['p(95)<10000'],
    },
    iterations: 1,
};

export const loadTestStages = {
    maxRedirects: 0,
    thresholds: {
        http_req_duration: ['p(90)<600', 'p(95)<800', 'p(99)<1000'], 
        http_req_waiting: ['p(95)<800'],  
        http_req_connecting: ['avg<150', 'p(95)<200'], 
        http_req_tls_handshaking: ['avg<150', 'p(95)<200'], 
        http_req_sending: ['p(95)<200'],    
        http_req_receiving: ['p(95)<200'], 
        http_req_blocked: ['avg<300', 'p(95)<500'],
        iteration_duration: ['p(95)<80000'],
        checks: ['rate==1'],
        'group_duration{group:::Login}': ['p(95)<20000'],
        'group_duration{group:::Admin}': ['p(95)<30000'],
        'group_duration{group:::Claim}': ['p(95)<20000'],
        'group_duration{group:::Leave}': ['p(95)<20000'],
        'group_duration{group:::My Info}': ['p(95)<20000'],
        'group_duration{group:::Performance}': ['p(95)<20000'],
        'group_duration{group:::Recruitment}': ['p(95)<20000'],
        'group_duration{group:::PIM}': ['p(95)<20000'],
        'group_duration{group:::Time}': ['p(95)<20000'],
    },
    stages: [
        {
            duration: '3m',
            target: 5
        },
        {
            duration: '3m',
            target: 10
        },
        {
            duration: '3m',
            target: 0
        }
    ]
};