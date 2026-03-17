-- ============================================================================
-- India Gully Enterprise Platform — Phase 34–39 ERP Migration
-- Migration: 0005_erp_phase34_39.sql
-- Created:   2026-03-17
-- Purpose:   Full ERP schema: Finance, HR, Governance, CMS, Sales/CRM
--            Phases 34 (D1 Auth), 35 (Finance), 36 (HR),
--            37 (Governance), 38 (CMS), 39 (Sales/CRM)
-- ============================================================================

-- ── PHASE 35: FINANCE ERP ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ig_clients (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  client_code   TEXT     UNIQUE NOT NULL,         -- CLT-001
  company_name  TEXT     NOT NULL,
  contact_name  TEXT     NOT NULL,
  email         TEXT     NOT NULL,
  phone         TEXT,
  address       TEXT,
  city          TEXT,
  state         TEXT,
  gstin         TEXT,
  pan           TEXT,
  status        TEXT     NOT NULL DEFAULT 'Active',
  vertical      TEXT,                              -- Real Estate|Hospitality|Retail|etc
  notes         TEXT,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_clients_code   ON ig_clients(client_code);
CREATE INDEX IF NOT EXISTS idx_clients_status ON ig_clients(status);

CREATE TABLE IF NOT EXISTS ig_vouchers (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  voucher_no    TEXT     UNIQUE NOT NULL,          -- VCH-2026-001
  voucher_type  TEXT     NOT NULL,                 -- Sales|Purchase|Receipt|Payment|Contra|Journal|Debit Note|Credit Note
  date          DATE     NOT NULL,
  fy_year       TEXT     NOT NULL DEFAULT '2025-26',
  narration     TEXT     NOT NULL,
  dr_account    TEXT     NOT NULL,
  cr_account    TEXT     NOT NULL,
  amount        REAL     NOT NULL,
  ref_no        TEXT,
  entity_type   TEXT,                              -- client|vendor|employee
  entity_id     INTEGER,
  is_gst        INTEGER  NOT NULL DEFAULT 0,
  gst_amount    REAL     NOT NULL DEFAULT 0,
  tds_amount    REAL     NOT NULL DEFAULT 0,
  status        TEXT     NOT NULL DEFAULT 'Posted', -- Draft|Posted|Cancelled
  created_by    INTEGER  REFERENCES ig_users(id),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vouchers_type    ON ig_vouchers(voucher_type);
CREATE INDEX IF NOT EXISTS idx_vouchers_date    ON ig_vouchers(date);
CREATE INDEX IF NOT EXISTS idx_vouchers_fy      ON ig_vouchers(fy_year);
CREATE INDEX IF NOT EXISTS idx_vouchers_status  ON ig_vouchers(status);

CREATE TABLE IF NOT EXISTS ig_invoice_items (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  invoice_id    INTEGER  NOT NULL REFERENCES ig_invoices(id) ON DELETE CASCADE,
  description   TEXT     NOT NULL,
  sac_code      TEXT     NOT NULL DEFAULT '998313',
  quantity      REAL     NOT NULL DEFAULT 1,
  rate          REAL     NOT NULL,
  amount        REAL     NOT NULL,
  gst_rate      REAL     NOT NULL DEFAULT 18,
  cgst          REAL     NOT NULL DEFAULT 0,
  sgst          REAL     NOT NULL DEFAULT 0,
  igst          REAL     NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ig_bank_accounts (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  account_name  TEXT     NOT NULL,
  bank_name     TEXT     NOT NULL,
  account_no    TEXT     NOT NULL,                 -- masked in API
  ifsc          TEXT     NOT NULL,
  branch        TEXT,
  account_type  TEXT     NOT NULL DEFAULT 'Current',
  balance       REAL     NOT NULL DEFAULT 0,
  is_active     INTEGER  NOT NULL DEFAULT 1,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ig_expenses (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  expense_no    TEXT     UNIQUE NOT NULL,
  category      TEXT     NOT NULL,                 -- Travel|Office|Marketing|Professional Fees|Technology
  subcategory   TEXT,
  date          DATE     NOT NULL,
  amount        REAL     NOT NULL,
  gst_amount    REAL     NOT NULL DEFAULT 0,
  vendor        TEXT,
  description   TEXT     NOT NULL,
  payment_mode  TEXT     NOT NULL DEFAULT 'Bank Transfer',
  receipt_ref   TEXT,
  status        TEXT     NOT NULL DEFAULT 'Approved',
  submitted_by  INTEGER  REFERENCES ig_users(id),
  approved_by   INTEGER  REFERENCES ig_users(id),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_expenses_date     ON ig_expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON ig_expenses(category);

-- ── PHASE 36: HR ERP ─────────────────────────────────────────────────────────

ALTER TABLE ig_employees ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE ig_employees ADD COLUMN IF NOT EXISTS reporting_to INTEGER;
ALTER TABLE ig_employees ADD COLUMN IF NOT EXISTS employment_type TEXT NOT NULL DEFAULT 'Full-Time';
ALTER TABLE ig_employees ADD COLUMN IF NOT EXISTS basic_salary REAL;
ALTER TABLE ig_employees ADD COLUMN IF NOT EXISTS hra REAL;
ALTER TABLE ig_employees ADD COLUMN IF NOT EXISTS special_allowance REAL;
ALTER TABLE ig_employees ADD COLUMN IF NOT EXISTS pf_applicable INTEGER NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS ig_attendance (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  employee_id   INTEGER  NOT NULL REFERENCES ig_employees(id),
  date          DATE     NOT NULL,
  check_in      TIME,
  check_out     TIME,
  hours_worked  REAL,
  status        TEXT     NOT NULL DEFAULT 'Present', -- Present|Absent|Half-Day|On-Leave|Holiday|WFH
  remarks       TEXT,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(employee_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_emp  ON ig_attendance(employee_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON ig_attendance(date);

CREATE TABLE IF NOT EXISTS ig_leave_requests (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  employee_id   INTEGER  NOT NULL REFERENCES ig_employees(id),
  leave_type    TEXT     NOT NULL,                 -- EL|CL|SL|ML|PL
  from_date     DATE     NOT NULL,
  to_date       DATE     NOT NULL,
  days          REAL     NOT NULL,
  reason        TEXT     NOT NULL,
  status        TEXT     NOT NULL DEFAULT 'Pending', -- Pending|Approved|Rejected|Cancelled
  approved_by   INTEGER  REFERENCES ig_employees(id),
  approved_at   DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_leave_emp    ON ig_leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS idx_leave_status ON ig_leave_requests(status);

CREATE TABLE IF NOT EXISTS ig_leave_balance (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  employee_id   INTEGER  NOT NULL REFERENCES ig_employees(id),
  fy_year       TEXT     NOT NULL DEFAULT '2025-26',
  el_total      REAL     NOT NULL DEFAULT 15,
  el_used       REAL     NOT NULL DEFAULT 0,
  cl_total      REAL     NOT NULL DEFAULT 12,
  cl_used       REAL     NOT NULL DEFAULT 0,
  sl_total      REAL     NOT NULL DEFAULT 6,
  sl_used       REAL     NOT NULL DEFAULT 0,
  UNIQUE(employee_id, fy_year)
);

CREATE TABLE IF NOT EXISTS ig_payroll_runs (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  month         INTEGER  NOT NULL,                 -- 1-12
  year          INTEGER  NOT NULL,
  fy_year       TEXT     NOT NULL DEFAULT '2025-26',
  status        TEXT     NOT NULL DEFAULT 'Draft', -- Draft|Processing|Completed|Paid
  total_gross   REAL     NOT NULL DEFAULT 0,
  total_deductions REAL  NOT NULL DEFAULT 0,
  total_net     REAL     NOT NULL DEFAULT 0,
  total_pf      REAL     NOT NULL DEFAULT 0,
  total_tds     REAL     NOT NULL DEFAULT 0,
  run_by        INTEGER  REFERENCES ig_users(id),
  run_at        DATETIME,
  paid_at       DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(month, year)
);

CREATE TABLE IF NOT EXISTS ig_payslips (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  payroll_run_id INTEGER NOT NULL REFERENCES ig_payroll_runs(id),
  employee_id   INTEGER  NOT NULL REFERENCES ig_employees(id),
  basic         REAL     NOT NULL DEFAULT 0,
  hra           REAL     NOT NULL DEFAULT 0,
  special_allowance REAL NOT NULL DEFAULT 0,
  lta           REAL     NOT NULL DEFAULT 0,
  gross         REAL     NOT NULL DEFAULT 0,
  pf_employee   REAL     NOT NULL DEFAULT 0,
  pf_employer   REAL     NOT NULL DEFAULT 0,
  esi           REAL     NOT NULL DEFAULT 0,
  professional_tax REAL  NOT NULL DEFAULT 0,
  tds           REAL     NOT NULL DEFAULT 0,
  total_deductions REAL  NOT NULL DEFAULT 0,
  net_payable   REAL     NOT NULL DEFAULT 0,
  working_days  INTEGER  NOT NULL DEFAULT 26,
  present_days  INTEGER  NOT NULL DEFAULT 26,
  leave_days    INTEGER  NOT NULL DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(payroll_run_id, employee_id)
);

-- ── PHASE 37: GOVERNANCE ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ig_directors (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  name          TEXT     NOT NULL,
  din           TEXT     UNIQUE NOT NULL,
  designation   TEXT     NOT NULL,
  date_of_appointment DATE NOT NULL,
  is_active     INTEGER  NOT NULL DEFAULT 1,
  email         TEXT,
  phone         TEXT,
  pan_masked    TEXT,                              -- last 4 chars only
  kyc_status    TEXT     NOT NULL DEFAULT 'Pending', -- Pending|Verified|Expired
  kyc_date      DATE,
  din_status    TEXT     NOT NULL DEFAULT 'Active',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ig_board_meetings (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  meeting_ref   TEXT     UNIQUE NOT NULL,          -- BM-2026-001
  meeting_type  TEXT     NOT NULL DEFAULT 'Board Meeting',
  meeting_no    INTEGER  NOT NULL,
  date          DATE     NOT NULL,
  time          TEXT     NOT NULL DEFAULT '11:00',
  venue         TEXT     NOT NULL DEFAULT 'Registered Office, New Delhi',
  mode          TEXT     NOT NULL DEFAULT 'In-Person',
  notice_sent   INTEGER  NOT NULL DEFAULT 0,
  notice_sent_at DATETIME,
  quorum_met    INTEGER  NOT NULL DEFAULT 0,
  status        TEXT     NOT NULL DEFAULT 'Scheduled', -- Scheduled|Notice Sent|Completed|Cancelled|Adjourned
  agenda_json   TEXT,                              -- JSON array of agenda items
  minutes_draft TEXT,
  minutes_final TEXT,
  cs_signed_at  DATETIME,
  md_signed_at  DATETIME,
  created_by    INTEGER  REFERENCES ig_users(id),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_meetings_date   ON ig_board_meetings(date);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON ig_board_meetings(status);

CREATE TABLE IF NOT EXISTS ig_meeting_attendance (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  meeting_id    INTEGER  NOT NULL REFERENCES ig_board_meetings(id) ON DELETE CASCADE,
  director_id   INTEGER  NOT NULL REFERENCES ig_directors(id),
  attended      INTEGER  NOT NULL DEFAULT 0,
  leave_of_absence INTEGER NOT NULL DEFAULT 0,
  joining_time  TEXT,
  leaving_time  TEXT,
  notes         TEXT,
  UNIQUE(meeting_id, director_id)
);

CREATE TABLE IF NOT EXISTS ig_resolutions_v2 (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  meeting_id    INTEGER  NOT NULL REFERENCES ig_board_meetings(id) ON DELETE CASCADE,
  resolution_no TEXT     NOT NULL,
  resolution_type TEXT   NOT NULL DEFAULT 'Ordinary', -- Ordinary|Special
  subject       TEXT     NOT NULL,
  resolution_text TEXT   NOT NULL,
  proposed_by   TEXT,
  seconded_by   TEXT,
  status        TEXT     NOT NULL DEFAULT 'Open',  -- Open|Passed|Failed|Withdrawn|Deferred
  passed_at     DATETIME,
  roc_filing_ref TEXT,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ig_resolution_votes (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  resolution_id INTEGER  NOT NULL REFERENCES ig_resolutions_v2(id) ON DELETE CASCADE,
  director_id   INTEGER  NOT NULL REFERENCES ig_directors(id),
  vote          TEXT     NOT NULL DEFAULT 'For',   -- For|Against|Abstain
  voted_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  remarks       TEXT,
  UNIQUE(resolution_id, director_id)
);

-- ── PHASE 38: CMS ENGINE (content keys) ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS ig_cms_content (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  page          TEXT     NOT NULL,                 -- home|about|services|horeca
  section       TEXT     NOT NULL,                 -- hero|tagline|about|cta
  key           TEXT     NOT NULL,                 -- hero_headline|hero_sub|btn_text
  value         TEXT     NOT NULL,
  content_type  TEXT     NOT NULL DEFAULT 'text',  -- text|html|url|json
  is_published  INTEGER  NOT NULL DEFAULT 1,
  version       INTEGER  NOT NULL DEFAULT 1,
  updated_by    TEXT     NOT NULL DEFAULT 'system',
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page, section, key)
);

CREATE INDEX IF NOT EXISTS idx_cms_content_page ON ig_cms_content(page, section);

-- ── PHASE 39: SALES FORCE / CRM ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS ig_enquiries (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  enquiry_ref   TEXT     UNIQUE NOT NULL,          -- ENQ-2026-001
  enquiry_type  TEXT     NOT NULL DEFAULT 'general', -- mandate|advisory|horeca|investment|nda|general
  name          TEXT     NOT NULL,
  email         TEXT     NOT NULL,
  phone         TEXT,
  organization  TEXT,
  vertical      TEXT,
  message       TEXT,
  scale         TEXT,
  source        TEXT     NOT NULL DEFAULT 'website',
  status        TEXT     NOT NULL DEFAULT 'New',   -- New|Active|Pending|Converted|Closed|Spam
  assigned_to   INTEGER  REFERENCES ig_users(id),
  mandate_id    INTEGER,
  client_id     INTEGER  REFERENCES ig_clients(id),
  priority      TEXT     NOT NULL DEFAULT 'Normal',
  next_action   TEXT,
  next_action_date DATE,
  notes         TEXT,
  ip_address    TEXT,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON ig_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_type   ON ig_enquiries(enquiry_type);
CREATE INDEX IF NOT EXISTS idx_enquiries_date   ON ig_enquiries(created_at);

CREATE TABLE IF NOT EXISTS ig_mandates_crm (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  mandate_code  TEXT     UNIQUE NOT NULL,          -- MND-2026-001
  title         TEXT     NOT NULL,
  client_id     INTEGER  REFERENCES ig_clients(id),
  sector        TEXT     NOT NULL,
  sub_sector    TEXT,
  location      TEXT,
  city          TEXT,
  value_cr      REAL,                              -- value in crores
  stage         TEXT     NOT NULL DEFAULT 'Prospecting', -- Prospecting|Qualified|NDA|IM Shared|Due Diligence|Negotiation|Closed Won|Closed Lost
  probability   INTEGER  NOT NULL DEFAULT 10,      -- 0-100%
  expected_close DATE,
  assigned_to   INTEGER  REFERENCES ig_users(id),
  source        TEXT,
  nda_signed    INTEGER  NOT NULL DEFAULT 0,
  nda_date      DATE,
  description   TEXT,
  notes         TEXT,
  is_public     INTEGER  NOT NULL DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_mandates_crm_stage  ON ig_mandates_crm(stage);
CREATE INDEX IF NOT EXISTS idx_mandates_crm_sector ON ig_mandates_crm(sector);

CREATE TABLE IF NOT EXISTS ig_crm_activities (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  entity_type   TEXT     NOT NULL,                 -- mandate|enquiry|client
  entity_id     INTEGER  NOT NULL,
  activity_type TEXT     NOT NULL,                 -- Call|Email|Meeting|WhatsApp|Note|NDA|IM|Site Visit
  subject       TEXT     NOT NULL,
  notes         TEXT,
  outcome       TEXT,
  next_action   TEXT,
  next_date     DATE,
  performed_by  INTEGER  REFERENCES ig_users(id),
  performed_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_crm_activities_entity ON ig_crm_activities(entity_type, entity_id);

-- ── SEEDS: Clients ───────────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_clients (client_code, company_name, contact_name, email, phone, city, state, vertical, status) VALUES
  ('CLT-001', 'Demo Client Corp', 'Rajesh Sharma', 'rajesh@democlient.com', '+91 98765 43210', 'New Delhi', 'Delhi', 'Real Estate', 'Active'),
  ('CLT-002', 'Entertainment Ventures Ltd', 'Priya Nair', 'priya@evl.com', '+91 87654 32109', 'Mumbai', 'Maharashtra', 'Entertainment', 'Active'),
  ('CLT-003', 'Rajasthan Hotels Pvt Ltd', 'Vikram Singh', 'vikram@rajhotels.com', '+91 76543 21098', 'Jaipur', 'Rajasthan', 'Hospitality', 'Active'),
  ('CLT-004', 'Mumbai Mall Pvt Ltd', 'Anita Desai', 'anita@mumbaimall.com', '+91 65432 10987', 'Mumbai', 'Maharashtra', 'Retail', 'Active');

-- ── SEEDS: Vouchers ──────────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_vouchers (voucher_no, voucher_type, date, fy_year, narration, dr_account, cr_account, amount, is_gst, gst_amount, status) VALUES
  ('VCH-2026-001', 'Sales', '2026-01-15', '2025-26', 'Advisory Retainer — Jan 2026 — Demo Client Corp', 'Accounts Receivable', 'Advisory Fee Revenue', 212000, 1, 38160, 'Posted'),
  ('VCH-2026-002', 'Sales', '2026-02-15', '2025-26', 'Advisory Retainer — Feb 2026 — Demo Client Corp', 'Accounts Receivable', 'Advisory Fee Revenue', 152542, 1, 27458, 'Posted'),
  ('VCH-2026-003', 'Sales', '2026-03-01', '2025-26', 'Transaction Advisory — Entertainment Ventures Ltd', 'Accounts Receivable', 'Advisory Fee Revenue', 271186, 1, 48814, 'Posted'),
  ('VCH-2026-004', 'Purchase', '2026-01-10', '2025-26', 'Office Rent — Jan 2026', 'Office Expenses', 'Accounts Payable', 75000, 1, 13500, 'Posted'),
  ('VCH-2026-005', 'Payment', '2026-01-20', '2025-26', 'Salary Disbursement — Jan 2026', 'Employee Costs', 'HDFC Current A/c', 450000, 0, 0, 'Posted'),
  ('VCH-2026-006', 'Receipt', '2026-02-01', '2025-26', 'Payment received — INV-2026-001 — Demo Client Corp', 'HDFC Current A/c', 'Accounts Receivable', 250160, 0, 0, 'Posted');

-- ── SEEDS: Invoices ──────────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_invoices (invoice_number, client_name, client_gstin, amount_gross, gst_rate, amount_gst, amount_net, status, due_date, paid_date) VALUES
  ('INV-2026-001', 'Demo Client Corp', '07AABCS1429B1ZB', 212000, 18, 38160, 250160, 'Paid', '2026-02-15', '2026-02-01'),
  ('INV-2026-002', 'Demo Client Corp', '07AABCS1429B1ZB', 152542, 18, 27458, 180000, 'Overdue', '2026-02-28', NULL),
  ('INV-2026-003', 'Entertainment Ventures Ltd', '27AABCE1234A1Z1', 271186, 18, 48814, 320000, 'Draft', '2026-03-31', NULL);

-- ── SEEDS: Employees ─────────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_employees (employee_id, name, email, department, designation, joining_date, ctc_annual, pf_applicable, is_active) VALUES
  ('IG-EMP-0001', 'Arun K. Manikonda', 'akm@indiagully.com', 'Leadership', 'Managing Director', '2017-04-01', 1800000, 0, 1),
  ('IG-EMP-0002', 'Pavan K. Manikonda', 'pavan@indiagully.com', 'Operations', 'Executive Director', '2017-04-01', 1500000, 0, 1),
  ('IG-EMP-0003', 'Amit Jhingan', 'amit.jhingan@indiagully.com', 'Advisory', 'President — Real Estate', '2020-01-01', 2100000, 1, 1);

INSERT OR IGNORE INTO ig_leave_balance (employee_id, fy_year, el_total, el_used, cl_total, cl_used, sl_total, sl_used)
SELECT id, '2025-26', 15, 2, 12, 0, 6, 0 FROM ig_employees WHERE is_active=1;

-- ── SEEDS: Directors ─────────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_directors (name, din, designation, date_of_appointment, is_active, email, kyc_status, din_status) VALUES
  ('Arun K. Manikonda', '00000001', 'Managing Director', '2017-04-01', 1, 'akm@indiagully.com', 'Verified', 'Active'),
  ('Pavan K. Manikonda', '00000002', 'Executive Director', '2017-04-01', 1, 'pavan@indiagully.com', 'Verified', 'Active');

-- ── SEEDS: Board Meetings ────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_board_meetings (meeting_ref, meeting_type, meeting_no, date, time, venue, mode, status, notice_sent, quorum_met) VALUES
  ('BM-2026-001', 'Board Meeting', 1, '2026-01-15', '11:00', 'Registered Office, New Delhi', 'In-Person', 'Completed', 1, 1),
  ('BM-2026-002', 'Board Meeting', 2, '2026-02-28', '11:00', 'Registered Office, New Delhi', 'Video Conference', 'Completed', 1, 1),
  ('BM-2026-003', 'Board Meeting', 3, '2026-03-15', '11:00', 'Registered Office, New Delhi', 'In-Person', 'Scheduled', 1, 0);

-- ── SEEDS: Enquiries ─────────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_enquiries (enquiry_ref, enquiry_type, name, email, phone, organization, vertical, message, status, source) VALUES
  ('ENQ-2026-001', 'mandate', 'Suresh Patel', 'suresh@realestate.com', '+91 98765 11111', 'Patel Realty Pvt Ltd', 'Real Estate', 'Interested in listing our commercial property in Gurgaon', 'Active', 'website'),
  ('ENQ-2026-002', 'advisory', 'Neha Kapoor', 'neha@hospitalityfund.com', '+91 87654 22222', 'Hospitality Growth Fund', 'Hospitality', 'Looking for mid-scale hotel acquisition advisory in Tier 2 cities', 'Pending', 'referral'),
  ('ENQ-2026-003', 'horeca', 'Rohit Verma', 'rohit@hotelchain.com', '+91 76543 33333', 'Star Hotel Chain', 'HORECA', 'Need FF&E procurement for 3 properties opening in Q3 2026', 'New', 'website'),
  ('ENQ-2026-004', 'investment', 'Ananya Iyer', 'ananya@family office.com', '+91 65432 44444', 'Iyer Family Office', 'Real Estate', 'UHNWI looking for hospitality asset investment opportunities above ₹50 Cr', 'Active', 'referral'),
  ('ENQ-2026-005', 'mandate', 'Karan Mehta', 'karan@retail.com', '+91 54321 55555', 'Metro Retail Ltd', 'Retail', 'Sale mandate for 3 floors in premium Delhi NCR mall', 'New', 'website');

-- ── SEEDS: Mandates CRM ──────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_mandates_crm (mandate_code, title, sector, city, value_cr, stage, probability, source, nda_signed, description) VALUES
  ('MND-2026-001', 'Prism Tower Gurgaon', 'Real Estate', 'Gurgaon', 400, 'Due Diligence', 75, 'Direct', 1, '312 keys mixed-use commercial building, REIT-grade asset'),
  ('MND-2026-002', 'Belcibo F&B Platform', 'F&B', 'Delhi NCR', 100, 'IM Shared', 60, 'Referral', 1, 'Multi-brand F&B platform — growth equity fundraise'),
  ('MND-2026-003', 'Sawasdee JLG Galleria Noida', 'Hospitality', 'Noida', 150, 'Negotiation', 80, 'Direct', 1, '114-key hotel with integrated retail mall'),
  ('MND-2026-004', 'Hotel Rajshree Chandigarh', 'Hospitality', 'Chandigarh', 70, 'NDA', 40, 'Referral', 1, '41-key boutique property'),
  ('MND-2026-005', 'Heritage Hotel Jaipur', 'Hospitality', 'Jaipur', 20, 'Qualified', 30, 'Website', 0, '43-key heritage property for sale/lease'),
  ('MND-2026-006', 'Maple Resort Chail', 'Hospitality', 'Shimla', 25, 'IM Shared', 50, 'Referral', 1, 'Mountain resort property');

-- ── SEEDS: CMS Content ───────────────────────────────────────────────────────

INSERT OR IGNORE INTO ig_cms_content (page, section, key, value, content_type, is_published) VALUES
  ('home', 'hero', 'tagline', 'Celebrating Desiness', 'text', 1),
  ('home', 'hero', 'subheadline', 'India''s Premier Multi-Vertical Advisory', 'text', 1),
  ('home', 'about', 'description', 'Vivacious Entertainment and Hospitality Pvt. Ltd. — multi-vertical advisory firm spanning Real Estate, Hospitality, Retail, Entertainment and Debt.', 'text', 1),
  ('home', 'stats', 'pipeline_value', '₹1,165 Cr+', 'text', 1),
  ('home', 'stats', 'transactions', '₹2,000 Cr+', 'text', 1),
  ('home', 'stats', 'mandates', '8 Active', 'text', 1),
  ('about', 'hero', 'headline', 'About India Gully', 'text', 1),
  ('services', 'hero', 'headline', 'Advisory Verticals', 'text', 1),
  ('horeca', 'hero', 'headline', 'HORECA Solutions', 'text', 1),
  ('contact', 'hero', 'headline', 'Get In Touch', 'text', 1);
