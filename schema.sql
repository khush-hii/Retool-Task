+-------------+-------------------------------------------+------+-----+---------+----------------+
| Field       | Type                                      | Null | Key | Default | Extra          |
+-------------+-------------------------------------------+------+-----+---------+----------------+
| id          | int                                       | NO   | PRI | NULL    | auto_increment |
| title       | varchar(255)                              | NO   |     | NULL    |                |
| description | text                                      | YES  |     | NULL    |                |
| due_date    | date                                      | YES  |     | NULL    |                |
| status      | enum('Pending','In Progress','Completed') | YES  |     | Pending |                |
+---------