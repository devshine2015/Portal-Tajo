const fields = [{
  endpoint: 'mwaT',
  customReportKind: 'mwaTime',
  domain: 'JobsTime',
  checkedByDefault: false,
  multiLabel: ['job_name', 'job_status', 'job_pipe', 'job_from', 'job_to', 'job_duration'],
  name: 'mwa_jobs_t',
  reportType: 'mwaJobsTime',
  order: 9,
}];

export default fields;
