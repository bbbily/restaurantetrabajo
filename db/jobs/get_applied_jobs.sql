SELECT Job_applied.id,
      company_name,
      company_type,
      title,
      salary,
      city,
      state,
      zipcode,
      phone,
      experience,
      person_name,
      person_phone,
      person_state,
      person_city,
      apply_date
FROM Job_applied
  JOIN jobs
    ON Job_applied.job_id = jobs.id;
