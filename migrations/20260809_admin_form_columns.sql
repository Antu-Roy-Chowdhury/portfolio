begin;

alter table education
  add column if not exists image_url text;

alter table skills
  add column if not exists proficiency_bucket varchar(20) not null default 'core',
  add column if not exists applied_in_projects text[] not null default '{}';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'skills_proficiency_bucket_check'
  ) then
    alter table skills
      add constraint skills_proficiency_bucket_check
      check (proficiency_bucket in ('core', 'familiar'));
  end if;
end $$;

commit;
