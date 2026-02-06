import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
  stages: [
    { duration: '10s', target: 10 }, // ramp-up
    { duration: '20s', target: 10 },  // steady load
    { duration: '10s', target: 0 },  // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% requests < 500ms
    http_req_failed: ['rate<0.01'],   // <1% errors
  },
};

export default function () {
  const url = 'https://reqres.in/api/users';

  const payload = JSON.stringify({
    name: 'Igor',
    job: 'QA Engineer',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':'reqres_f9517d924f1b4bce93cecae7e225a4c1'
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
    'id is present': (r) => JSON.parse(r.body).id !== undefined,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    'target/k6-report.html': htmlReport(data),
  };
}
