-- Insert institutions
INSERT INTO institutions (name, location) VALUES 
('Roosevelt University', 'Chicago, IL'),
('Harold Washington College', 'Chicago, IL');
	
-- Insert users (directors, students, admins)
INSERT INTO users (name, email, password_hash, role) VALUES 
('Alice Johnson', 'alice.johnson@roosevelt.edu', 'hashed_password_1', 'director'),
('Bob Smith', 'bob.smith@hwc.edu', 'hashed_password_2', 'director'),
('Charlie Davis', 'charlie.davis@roosevelt.edu', 'hashed_password_3', 'student'),
('Diana Lee', 'diana.lee@hwc.edu', 'hashed_password_4', 'student'),
('Eve Thompson', 'eve.thompson@admin.com', 'hashed_password_5', 'admin'),
('Sam Harper', 'sam.harper@roosevelt.edu', 'hashed_password_6', 'student'),
('Liam Carter', 'liam.carter@hwc.edu', 'hashed_password_7', 'student'),
('Elena Brooks', 'elena.brooks@roosevelt.edu', 'hashed_password_8', 'student'),
('Mason Reed', 'mason.reed@hwc.edu', 'hashed_password_9', 'student'),
('Sophia Bennett', 'sophia.bennett@roosevelt.edu', 'hashed_password_10', 'director'),
('Ethan Hayes', 'ethan.hayes@hwc.edu', 'hashed_password_11', 'director'),
('Chloe Dawson', 'chloe.dawson@admin.com', 'hashed_password_12', 'admin');


-- Insert directors
INSERT INTO directors (user_id, institution_id) VALUES 
((SELECT user_id FROM users WHERE email = 'alice.johnson@roosevelt.edu'), (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
((SELECT user_id FROM users WHERE email = 'bob.smith@hwc.edu'), (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College')),
((SELECT user_id FROM users WHERE email = 'ethan.hayes@hwc.edu'), (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College')),
((SELECT user_id FROM users WHERE email = 'sophia.bennett@roosevelt.edu'), (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'));

-- Insert programs
INSERT INTO programs (institution_id, program_name) VALUES 
((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 'Computer Science'),
((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 'Cybersecurity'),
((SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 'Information Technology'),
((SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 'Software Development'),
((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 'Cyber Security and Information Assurance');
	
-- Insert courses
INSERT INTO courses (institution_id, program_id, course_name, course_code, credits) VALUES 
((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 
 (SELECT program_id FROM programs WHERE program_name = 'Computer Science' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')), 
 'Data Structures and Algorithms', 'CS101', 4),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 
 (SELECT program_id FROM programs WHERE program_name = 'Cybersecurity' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')), 
 'Network Security', 'CYB201', 3),

((SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 
 (SELECT program_id FROM programs WHERE program_name = 'Information Technology' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College')), 
 'IT Fundamentals', 'IT101', 3),

((SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 
 (SELECT program_id FROM programs WHERE program_name = 'Software Development' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College')), 
 'Web Development', 'SD102', 3),
 
((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Computer Science I', 'CSIA 150', 4),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Intro to Prob. & Stats', 'CSIA 217', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Python Script Programming', 'CSIA 236', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Data Communications', 'CSIA 246', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Computer Science II', 'CSIA 250', 4),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Open Source Communities', 'CSIA 255', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Computer Organization', 'CSIA 261', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Computer Networking', 'CSIA 301', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Operating Systems', 'CSIA 317', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'UNIX and System Administration', 'CSIA 318', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Cyber Ops', 'CSIA 319', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Software Engineering', 'CSIA 327', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Database Systems', 'CSIA 333', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Ethical Hack & Countermeasures', 'CSIA 335', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Practical Computing with Data in Python', 'CSIA 336', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Network Design', 'CSIA 352', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Introduction to Programming', 'CSIA 354', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Applied Cryptography', 'CSIA 355', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Intro to Computer Security', 'CSIA 359', 3),

((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Internet Security', 'CSIA 368', 3),
 
 ((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'),
 (SELECT program_id FROM programs WHERE program_name = 'Cyber Security and Information Assurance' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University')),
 'Senior Project', 'CSIA 399', 3);

-- Insert knowledge units
INSERT INTO knowledge_units (ku_name, ku_description) VALUES 
('Programming Concepts', 'Covers fundamental programming logic and syntax'),
('Cybersecurity Basics', 'Introduction to security concepts and best practices'),
('Networking Fundamentals', 'Covers basic networking principles and protocols'),
('Database Management', 'Covers SQL and NoSQL database principles'),
('Cybersecurity Foundations', 'Covers fundamental concepts behind cybersecurity'),
('Cybersecurity Principles', 'Covers basic security design fundamentals'),
('IT Systems Components', 'Covers components in an IT system and their roles in system operation'),
('Basic Scripting and Programming', 'Covers simple script/program creation, algorithm implementation, and basic security practices in scripting/programming'),
('Basic Networking', 'Covers how networks are built and operated, network analysis tools, and vulnerabilities'),
('Network Defense', 'Covers defense of networks, basic tools/techniques to protect networks, and communication assets from cyber threats'),
('Basic Cryptography', 'Covers how and where cryptography is used'),
('Operating Systems Concepts', 'Covers roles of operating systems, basic functions, and services provided by operating systems'),
('Advanced Network Technology and Protocols', 'Covers advanced networking concepts in technology, security, and communication'),
('Cloud Computing', 'Covers technologies and services that enable cloud computing, types of cloud computing models, and security/legal issues with cloud computing'),
('Cybersecurity Ethics', 'Covers ethics in cyber contexts'),
('Database Management Systems', 'Covers skills to utilize database management systems'),
('Databases', 'Covers how database systems are used, managed, and associated issues'),
('Digital Communications', 'Covers protocols and methodologies in modern digital communications systems'),
('Intrusion Detection/Prevention Systems', 'Covers skills related to detecting/analyzig vulnerabilities and risk mitigation'),
('Low Level Programming', 'Covers programming securely with low level programming languages'),
('Network Security Administration', 'Covers maintaining comprehensive enterprise security infrastructure'),
('Network Technology and Protocols', 'Covers common network protocols, interaction between network components, and network evolution'),
('Operating Systems Administration', 'Covers basic operations involved in system administration of operating systems'),
('Operating Systems Theory', 'Covers implementation of operating system concepts, components, and interfaces'),
('Vulnerability Analysis', 'Covers system vulnerabilities'),
('Web Application Security', 'Covers technology, tools, and practices associated with web applications');

-- Associate courses with knowledge units
INSERT INTO course_ku (course_id, ku_id) VALUES 
((SELECT course_id FROM courses WHERE course_code = 'CS101'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Programming Concepts')),
((SELECT course_id FROM courses WHERE course_code = 'CYB201'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Cybersecurity Basics')),
((SELECT course_id FROM courses WHERE course_code = 'IT101'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Networking Fundamentals')),
((SELECT course_id FROM courses WHERE course_code = 'SD102'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Database Management')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 150'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Basic Scripting and Programming')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 261'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Low Level Programming')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 301'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Basic Networking')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 301'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Advanced Network Technology and Protocols')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 301'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Digital Communications')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 301'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Network Technology and Protocols')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 317'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'IT Systems Components')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 317'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Operating Systems Concepts')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 317'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Cloud Computing')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 317'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Low Level Programming')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 317'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Operating Systems Theory')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 318'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Basic Scripting and Programming')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 318'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Operating Systems Administration')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 333'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Database Management Systems')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 333'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Databases')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 359'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Cybersecurity Foundations')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 359'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Cybersecurity Principles')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 359'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Basic Cryptography')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 359'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Cybersecurity Ethics')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 359'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Intrusion Detection/Prevention Systems')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 359'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Vulnerability Analysis')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 359'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Web Application Security')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 368'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'IT Systems Components')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 368'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Network Defense')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 368'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Network Security Administration')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 368'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Web Application Security')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 399'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Basic Scripting and Programming')),
((SELECT course_id FROM courses WHERE course_code = 'CSIA 399'), (SELECT ku_id FROM knowledge_units WHERE ku_name = 'Cybersecurity Ethics'));


-- Insert students
INSERT INTO students (user_id, institution_id, program_id) VALUES 
((SELECT user_id FROM users WHERE email = 'charlie.davis@roosevelt.edu'), 
 (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 
 (SELECT program_id FROM programs WHERE program_name = 'Computer Science' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'))),

((SELECT user_id FROM users WHERE email = 'diana.lee@hwc.edu'), 
 (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 
 (SELECT program_id FROM programs WHERE program_name = 'Software Development' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'))),


((SELECT user_id FROM users WHERE email = 'sam.harper@roosevelt.edu'), 
 (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 
 (SELECT program_id FROM programs WHERE program_name = 'Computer Science' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'))),

((SELECT user_id FROM users WHERE email = 'liam.carter@hwc.edu'), 
 (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 
 (SELECT program_id FROM programs WHERE program_name = 'Information Technology' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'))),


((SELECT user_id FROM users WHERE email = 'elena.brooks@roosevelt.edu'), 
 (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 
 (SELECT program_id FROM programs WHERE program_name = 'Cybersecurity' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'))),


((SELECT user_id FROM users WHERE email = 'mason.reed@hwc.edu'), 
 (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 
 (SELECT program_id FROM programs WHERE program_name = 'Software Development' AND institution_id = (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College')));

-- Insert admin
INSERT INTO admins (user_id) VALUES 
((SELECT user_id FROM users WHERE email = 'eve.thompson@admin.com')),
((SELECT user_id FROM users WHERE email = 'chloe.dawson@admin.com'));

-- Insert course matches (example)
INSERT INTO course_match (institution_from, institution_to, course_from, course_to, match_status) VALUES 
((SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 
 (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 
 (SELECT course_id FROM courses WHERE course_code = 'CS101'), 
 (SELECT course_id FROM courses WHERE course_code = 'SD102'), 
 'Pending');

-- Insert transfer requests (example)
INSERT INTO transfer_requests (student_id, course_from, course_to, institution_from, institution_to, status) VALUES 
((SELECT student_id FROM students WHERE user_id = (SELECT user_id FROM users WHERE email = 'charlie.davis@roosevelt.edu')), 
 (SELECT course_id FROM courses WHERE course_code = 'CS101'), 
 (SELECT course_id FROM courses WHERE course_code = 'SD102'), 
 (SELECT institution_id FROM institutions WHERE name = 'Roosevelt University'), 
 (SELECT institution_id FROM institutions WHERE name = 'Harold Washington College'), 
 'Pending');
