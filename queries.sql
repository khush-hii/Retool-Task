--sql query to make this table for project management
CREATE TABLE tasks (
    id INT NOT NULL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    site_name VARCHAR(255) NOT NULL,
    entry_date DATE NOT NULL,
    work_status ENUM('Completed', 'In Progress', 'Pending') NOT NULL,
    complete_date DATE,
    recurring_revenue DECIMAL(15, 2),
    nrr DECIMAL(15, 2),
    task_owner VARCHAR(255),
    currency VARCHAR(3)
);



--Table View
SELECT * FROM projectmanagement ORDER BY entry_date ASC;

--. Filter by Year

SELECT * FROM projectmanagement 
WHERE YEAR(entry_date) = {{yearFilter.value}};

--Chart: Revenue by Work Status
 SELECT 
    WorkStatus, 
    SUM(ReccuringRevenue) AS TotalRecurringRevenue, 
    SUM(NRR) AS TotalNRR 
FROM project_management 
GROUP BY WorkStatus;

--Chart: Monthly Revenue Trend
SELECT 
    MONTH(entry_date) AS Month, 
    SUM(recurring_revenue) AS TotalRecurringRevenue, 
    SUM(nrr) AS TotalNRR 
FROM projectmanagement 
WHERE YEAR(entry_date) = {{yearFilter.value}}
GROUP BY MONTH(entry_date)
ORDER BY Month ASC;


--Calendar View: Projects Timeline
SELECT 
    site_name AS Title, 
    entry_date AS startdate, 
    complete_date AS enddate 
FROM projectmanagement;

--Chart: Revenue by Company
SELECT 
    company, 
    SUM(recurring_revenue) AS TotalRecurringRevenue, 
    SUM(nrr) AS TotalNRR 
FROM projectmanagement 
GROUP BY company;

--Project Completion Rate
SELECT 
    COUNT(*) AS TotalProjects, 
    SUM(CASE WHEN work_status = 'Completed' THEN 1 ELSE 0 END) AS CompletedProjects, 
    (SUM(CASE WHEN work_status = 'Completed' THEN 1 ELSE 0 END) * 100 / COUNT(*)) AS CompletionRate 
FROM projectmanagement;

--Calendar: Projects by Selected Year
SELECT 
    site_name AS Title, 
    entry_date AS StartDate, 
    complete_date AS EndDate 
FROM projectmanagement 
WHERE YEAR(entry_date) = {{dropdown1.value}};
