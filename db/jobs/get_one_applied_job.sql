select * from Job_applied
join jobs
ON Job_applied.job_id = jobs.id
where Job_applied.id = $1
