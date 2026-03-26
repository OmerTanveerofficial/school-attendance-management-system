const classes = [
  { id: 'c1', name: 'Class 10-A', grade: '10', section: 'A' },
  { id: 'c2', name: 'Class 10-B', grade: '10', section: 'B' },
  { id: 'c3', name: 'Class 9-A', grade: '9', section: 'A' },
  { id: 'c4', name: 'Class 9-B', grade: '9', section: 'B' },
  { id: 'c5', name: 'Class 8-A', grade: '8', section: 'A' },
];

const students = [
  { id: 's1', name: 'Ahmed Khan', rollNo: '001', classId: 'c1', email: 'ahmed@school.edu' },
  { id: 's2', name: 'Sara Ali', rollNo: '002', classId: 'c1', email: 'sara@school.edu' },
  { id: 's3', name: 'Usman Malik', rollNo: '003', classId: 'c1', email: 'usman@school.edu' },
  { id: 's4', name: 'Fatima Noor', rollNo: '004', classId: 'c1', email: 'fatima@school.edu' },
  { id: 's5', name: 'Hassan Raza', rollNo: '005', classId: 'c1', email: 'hassan@school.edu' },
  { id: 's6', name: 'Ayesha Tariq', rollNo: '006', classId: 'c2', email: 'ayesha@school.edu' },
  { id: 's7', name: 'Bilal Ahmed', rollNo: '007', classId: 'c2', email: 'bilal@school.edu' },
  { id: 's8', name: 'Zainab Shah', rollNo: '008', classId: 'c2', email: 'zainab@school.edu' },
  { id: 's9', name: 'Omar Farooq', rollNo: '009', classId: 'c2', email: 'omar@school.edu' },
  { id: 's10', name: 'Hira Javed', rollNo: '010', classId: 'c2', email: 'hira@school.edu' },
  { id: 's11', name: 'Ali Hussain', rollNo: '011', classId: 'c3', email: 'ali@school.edu' },
  { id: 's12', name: 'Mehwish Iqbal', rollNo: '012', classId: 'c3', email: 'mehwish@school.edu' },
  { id: 's13', name: 'Kamran Yousuf', rollNo: '013', classId: 'c3', email: 'kamran@school.edu' },
  { id: 's14', name: 'Nadia Bukhari', rollNo: '014', classId: 'c3', email: 'nadia@school.edu' },
  { id: 's15', name: 'Saad Qureshi', rollNo: '015', classId: 'c3', email: 'saad@school.edu' },
  { id: 's16', name: 'Rabia Aslam', rollNo: '016', classId: 'c4', email: 'rabia@school.edu' },
  { id: 's17', name: 'Imran Siddiqui', rollNo: '017', classId: 'c4', email: 'imran@school.edu' },
  { id: 's18', name: 'Sana Rehman', rollNo: '018', classId: 'c4', email: 'sana@school.edu' },
  { id: 's19', name: 'Tariq Mehmood', rollNo: '019', classId: 'c4', email: 'tariq@school.edu' },
  { id: 's20', name: 'Amina Khalid', rollNo: '020', classId: 'c4', email: 'amina@school.edu' },
  { id: 's21', name: 'Faisal Nawaz', rollNo: '021', classId: 'c5', email: 'faisal@school.edu' },
  { id: 's22', name: 'Uzma Riaz', rollNo: '022', classId: 'c5', email: 'uzma@school.edu' },
  { id: 's23', name: 'Waqas Haider', rollNo: '023', classId: 'c5', email: 'waqas@school.edu' },
  { id: 's24', name: 'Samira Anwar', rollNo: '024', classId: 'c5', email: 'samira@school.edu' },
  { id: 's25', name: 'Junaid Aziz', rollNo: '025', classId: 'c5', email: 'junaid@school.edu' },
];

const users = [
  { id: 'u1', name: 'Mr. Omer Tanveer', email: 'omer@school.edu', password: 'teacher123', role: 'teacher', assignedClasses: ['c1', 'c2'] },
  { id: 'u2', name: 'Ms. Nazia Parveen', email: 'check@school.edu', password: 'teacher123', role: 'teacher', assignedClasses: ['c3', 'c4'] },
  { id: 'u3', name: 'Dr. Rashid Mahmood', email: 'admin@school.edu', password: 'admin123', role: 'admin', assignedClasses: ['c1', 'c2', 'c3', 'c4', 'c5'] },
];

const subjects = [
  { id: 'sub1', name: 'Mathematics', code: 'MATH-301' },
  { id: 'sub2', name: 'Physics', code: 'PHY-301' },
  { id: 'sub3', name: 'Chemistry', code: 'CHEM-301' },
  { id: 'sub4', name: 'English', code: 'ENG-301' },
  { id: 'sub5', name: 'Computer Science', code: 'CS-301' },
  { id: 'sub6', name: 'Biology', code: 'BIO-301' },
  { id: 'sub7', name: 'Urdu', code: 'URD-301' },
  { id: 'sub8', name: 'Islamiat', code: 'ISL-301' },
];

const timetables = {
  c1: [
    { day: 'Monday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub1', teacherId: 'u1', room: 'R-101' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub4', teacherId: 'u1', room: 'R-101' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub7', teacherId: 'u1', room: 'R-101' },
    ]},
    { day: 'Tuesday',   periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub1', teacherId: 'u1', room: 'R-101' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub8', teacherId: 'u1', room: 'R-101' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub4', teacherId: 'u1', room: 'R-101' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
    ]},
    { day: 'Wednesday', periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub4', teacherId: 'u1', room: 'R-101' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub1', teacherId: 'u1', room: 'R-101' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub7', teacherId: 'u1', room: 'R-101' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
    ]},
    { day: 'Thursday',  periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub8', teacherId: 'u1', room: 'R-101' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub1', teacherId: 'u1', room: 'R-101' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub4', teacherId: 'u1', room: 'R-101' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
    ]},
    { day: 'Friday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub4', teacherId: 'u1', room: 'R-101' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub7', teacherId: 'u1', room: 'R-101' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub1', teacherId: 'u1', room: 'R-101' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
    ]},
  ],
  c2: [
    { day: 'Monday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub4', teacherId: 'u1', room: 'R-102' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub1', teacherId: 'u1', room: 'R-102' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub7', teacherId: 'u1', room: 'R-102' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
    ]},
    { day: 'Tuesday',   periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub1', teacherId: 'u1', room: 'R-102' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub4', teacherId: 'u1', room: 'R-102' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub8', teacherId: 'u1', room: 'R-102' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
    ]},
    { day: 'Wednesday', periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub4', teacherId: 'u1', room: 'R-102' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub1', teacherId: 'u1', room: 'R-102' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub8', teacherId: 'u1', room: 'R-102' },
    ]},
    { day: 'Thursday',  periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub1', teacherId: 'u1', room: 'R-102' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub7', teacherId: 'u1', room: 'R-102' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub4', teacherId: 'u1', room: 'R-102' },
    ]},
    { day: 'Friday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub3', teacherId: 'u1', room: 'Lab-2' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub4', teacherId: 'u1', room: 'R-102' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub5', teacherId: 'u1', room: 'CS-Lab' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub1', teacherId: 'u1', room: 'R-102' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub2', teacherId: 'u1', room: 'Lab-1' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub7', teacherId: 'u1', room: 'R-102' },
    ]},
  ],
  c3: [
    { day: 'Monday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub1', teacherId: 'u2', room: 'R-201' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub4', teacherId: 'u2', room: 'R-201' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub7', teacherId: 'u2', room: 'R-201' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub8', teacherId: 'u2', room: 'R-201' },
    ]},
    { day: 'Tuesday',   periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub1', teacherId: 'u2', room: 'R-201' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub4', teacherId: 'u2', room: 'R-201' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub8', teacherId: 'u2', room: 'R-201' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub7', teacherId: 'u2', room: 'R-201' },
    ]},
    { day: 'Wednesday', periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub4', teacherId: 'u2', room: 'R-201' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub1', teacherId: 'u2', room: 'R-201' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub7', teacherId: 'u2', room: 'R-201' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub8', teacherId: 'u2', room: 'R-201' },
    ]},
    { day: 'Thursday',  periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub4', teacherId: 'u2', room: 'R-201' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub1', teacherId: 'u2', room: 'R-201' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub8', teacherId: 'u2', room: 'R-201' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub7', teacherId: 'u2', room: 'R-201' },
    ]},
    { day: 'Friday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub7', teacherId: 'u2', room: 'R-201' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub1', teacherId: 'u2', room: 'R-201' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub4', teacherId: 'u2', room: 'R-201' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub8', teacherId: 'u2', room: 'R-201' },
    ]},
  ],
  c4: [
    { day: 'Monday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub4', teacherId: 'u2', room: 'R-202' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub1', teacherId: 'u2', room: 'R-202' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub8', teacherId: 'u2', room: 'R-202' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub7', teacherId: 'u2', room: 'R-202' },
    ]},
    { day: 'Tuesday',   periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub1', teacherId: 'u2', room: 'R-202' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub7', teacherId: 'u2', room: 'R-202' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub4', teacherId: 'u2', room: 'R-202' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub8', teacherId: 'u2', room: 'R-202' },
    ]},
    { day: 'Wednesday', periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub1', teacherId: 'u2', room: 'R-202' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub7', teacherId: 'u2', room: 'R-202' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub4', teacherId: 'u2', room: 'R-202' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub1', teacherId: 'u2', room: 'R-202' },
    ]},
    { day: 'Thursday',  periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub4', teacherId: 'u2', room: 'R-202' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub8', teacherId: 'u2', room: 'R-202' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub1', teacherId: 'u2', room: 'R-202' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub7', teacherId: 'u2', room: 'R-202' },
    ]},
    { day: 'Friday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub8', teacherId: 'u2', room: 'R-202' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub7', teacherId: 'u2', room: 'R-202' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub1', teacherId: 'u2', room: 'R-202' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub4', teacherId: 'u2', room: 'R-202' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub6', teacherId: 'u2', room: 'Lab-3' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub5', teacherId: 'u2', room: 'CS-Lab' },
    ]},
  ],
  c5: [
    { day: 'Monday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub1', teacherId: 'u3', room: 'R-301' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub4', teacherId: 'u3', room: 'R-301' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub6', teacherId: 'u3', room: 'Lab-3' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub7', teacherId: 'u3', room: 'R-301' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub5', teacherId: 'u3', room: 'CS-Lab' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub8', teacherId: 'u3', room: 'R-301' },
    ]},
    { day: 'Tuesday',   periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub5', teacherId: 'u3', room: 'CS-Lab' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub6', teacherId: 'u3', room: 'Lab-3' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub7', teacherId: 'u3', room: 'R-301' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub1', teacherId: 'u3', room: 'R-301' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub4', teacherId: 'u3', room: 'R-301' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub8', teacherId: 'u3', room: 'R-301' },
    ]},
    { day: 'Wednesday', periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub4', teacherId: 'u3', room: 'R-301' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub1', teacherId: 'u3', room: 'R-301' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub5', teacherId: 'u3', room: 'CS-Lab' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub8', teacherId: 'u3', room: 'R-301' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub6', teacherId: 'u3', room: 'Lab-3' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub7', teacherId: 'u3', room: 'R-301' },
    ]},
    { day: 'Thursday',  periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub7', teacherId: 'u3', room: 'R-301' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub5', teacherId: 'u3', room: 'CS-Lab' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub1', teacherId: 'u3', room: 'R-301' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub4', teacherId: 'u3', room: 'R-301' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub8', teacherId: 'u3', room: 'R-301' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub6', teacherId: 'u3', room: 'Lab-3' },
    ]},
    { day: 'Friday',    periods: [
      { period: 1, time: '08:00 - 08:45', subjectId: 'sub6', teacherId: 'u3', room: 'Lab-3' },
      { period: 2, time: '08:50 - 09:35', subjectId: 'sub7', teacherId: 'u3', room: 'R-301' },
      { period: 3, time: '09:40 - 10:25', subjectId: 'sub8', teacherId: 'u3', room: 'R-301' },
      { period: 4, time: '10:45 - 11:30', subjectId: 'sub5', teacherId: 'u3', room: 'CS-Lab' },
      { period: 5, time: '11:35 - 12:20', subjectId: 'sub1', teacherId: 'u3', room: 'R-301' },
      { period: 6, time: '12:25 - 13:10', subjectId: 'sub4', teacherId: 'u3', room: 'R-301' },
    ]},
  ],
};

const plos = [
  { id: 'plo1', code: 'PLO-1', title: 'Knowledge', description: 'Apply knowledge of mathematics, science, and computing fundamentals to solve problems.' },
  { id: 'plo2', code: 'PLO-2', title: 'Problem Analysis', description: 'Identify, formulate, and analyze complex problems reaching substantiated conclusions.' },
  { id: 'plo3', code: 'PLO-3', title: 'Design & Development', description: 'Design solutions for complex problems and systems that meet specified needs.' },
  { id: 'plo4', code: 'PLO-4', title: 'Investigation', description: 'Conduct investigations of complex problems using research-based knowledge and methods.' },
  { id: 'plo5', code: 'PLO-5', title: 'Modern Tool Usage', description: 'Create, select, and apply appropriate techniques, resources, and modern tools.' },
  { id: 'plo6', code: 'PLO-6', title: 'Society & Environment', description: 'Apply reasoning informed by contextual knowledge to assess societal, health, and safety issues.' },
  { id: 'plo7', code: 'PLO-7', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics, responsibilities, and norms.' },
  { id: 'plo8', code: 'PLO-8', title: 'Communication', description: 'Communicate effectively on complex activities with the community and peers.' },
  { id: 'plo9', code: 'PLO-9', title: 'Individual & Teamwork', description: 'Function effectively as an individual, and as a member or leader in diverse teams.' },
  { id: 'plo10', code: 'PLO-10', title: 'Lifelong Learning', description: 'Recognize the need for and engage in independent and lifelong learning.' },
];

const clos = {
  sub1: [
    { id: 'clo-m1', code: 'CLO-1', title: 'Algebraic Foundations', description: 'Solve complex algebraic equations and inequalities using systematic methods.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo1', 'plo2'] },
    { id: 'clo-m2', code: 'CLO-2', title: 'Calculus Application', description: 'Apply differentiation and integration techniques to real-world problems.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo1', 'plo3'] },
    { id: 'clo-m3', code: 'CLO-3', title: 'Statistical Reasoning', description: 'Analyze data sets using probability and statistics to draw meaningful conclusions.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo2', 'plo4'] },
    { id: 'clo-m4', code: 'CLO-4', title: 'Mathematical Modeling', description: 'Construct mathematical models to represent and solve practical scenarios.', domain: 'Cognitive', level: 'C5', mappedPLOs: ['plo3', 'plo5'] },
  ],
  sub2: [
    { id: 'clo-p1', code: 'CLO-1', title: 'Mechanics', description: 'Analyze motion, forces, and energy using Newton\'s laws and conservation principles.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo1', 'plo2'] },
    { id: 'clo-p2', code: 'CLO-2', title: 'Electromagnetism', description: 'Explain electromagnetic phenomena and solve circuit-based problems.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo1', 'plo3'] },
    { id: 'clo-p3', code: 'CLO-3', title: 'Lab Experimentation', description: 'Design and conduct physics experiments, analyze data and report findings.', domain: 'Psychomotor', level: 'P4', mappedPLOs: ['plo4', 'plo5'] },
    { id: 'clo-p4', code: 'CLO-4', title: 'Waves & Optics', description: 'Describe wave behavior and apply optical principles to real-world systems.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo1', 'plo6'] },
  ],
  sub3: [
    { id: 'clo-c1', code: 'CLO-1', title: 'Atomic Structure', description: 'Explain atomic models, electron configurations, and periodic trends.', domain: 'Cognitive', level: 'C2', mappedPLOs: ['plo1'] },
    { id: 'clo-c2', code: 'CLO-2', title: 'Chemical Reactions', description: 'Predict and balance chemical reactions and calculate stoichiometric quantities.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo1', 'plo2'] },
    { id: 'clo-c3', code: 'CLO-3', title: 'Organic Chemistry', description: 'Identify functional groups and predict reaction mechanisms in organic compounds.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo2', 'plo3'] },
    { id: 'clo-c4', code: 'CLO-4', title: 'Lab Safety & Practice', description: 'Perform laboratory experiments following safety protocols and document results.', domain: 'Psychomotor', level: 'P3', mappedPLOs: ['plo4', 'plo7'] },
  ],
  sub4: [
    { id: 'clo-e1', code: 'CLO-1', title: 'Reading Comprehension', description: 'Analyze and interpret complex texts across various genres and contexts.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo8'] },
    { id: 'clo-e2', code: 'CLO-2', title: 'Writing Skills', description: 'Compose well-structured essays, reports, and creative pieces with clarity.', domain: 'Cognitive', level: 'C5', mappedPLOs: ['plo8', 'plo3'] },
    { id: 'clo-e3', code: 'CLO-3', title: 'Oral Communication', description: 'Deliver effective presentations and participate in structured discussions.', domain: 'Affective', level: 'A3', mappedPLOs: ['plo8', 'plo9'] },
    { id: 'clo-e4', code: 'CLO-4', title: 'Critical Analysis', description: 'Evaluate literary works using critical thinking frameworks and provide interpretations.', domain: 'Cognitive', level: 'C5', mappedPLOs: ['plo2', 'plo10'] },
  ],
  sub5: [
    { id: 'clo-cs1', code: 'CLO-1', title: 'Programming Fundamentals', description: 'Write structured programs using variables, loops, conditionals, and functions.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo1', 'plo5'] },
    { id: 'clo-cs2', code: 'CLO-2', title: 'Data Structures', description: 'Implement and analyze arrays, linked lists, stacks, queues, and trees.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo1', 'plo3'] },
    { id: 'clo-cs3', code: 'CLO-3', title: 'Algorithm Design', description: 'Design efficient algorithms and evaluate their time and space complexity.', domain: 'Cognitive', level: 'C5', mappedPLOs: ['plo2', 'plo3'] },
    { id: 'clo-cs4', code: 'CLO-4', title: 'Project Development', description: 'Develop a software project collaboratively using version control and documentation.', domain: 'Psychomotor', level: 'P4', mappedPLOs: ['plo5', 'plo9'] },
  ],
  sub6: [
    { id: 'clo-b1', code: 'CLO-1', title: 'Cell Biology', description: 'Describe cell structure, organelle function, and cellular processes.', domain: 'Cognitive', level: 'C2', mappedPLOs: ['plo1'] },
    { id: 'clo-b2', code: 'CLO-2', title: 'Genetics & Evolution', description: 'Explain inheritance patterns, genetic variation, and evolutionary mechanisms.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo1', 'plo2'] },
    { id: 'clo-b3', code: 'CLO-3', title: 'Ecology & Environment', description: 'Analyze ecosystems, biodiversity, and the impact of human activities.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo6', 'plo4'] },
    { id: 'clo-b4', code: 'CLO-4', title: 'Lab Investigation', description: 'Conduct biological experiments using microscopy and biological techniques.', domain: 'Psychomotor', level: 'P3', mappedPLOs: ['plo4', 'plo5'] },
  ],
  sub7: [
    { id: 'clo-u1', code: 'CLO-1', title: 'Prose Comprehension', description: 'Understand and analyze Urdu prose passages with contextual interpretation.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo8'] },
    { id: 'clo-u2', code: 'CLO-2', title: 'Poetry Analysis', description: 'Appreciate and critically evaluate Urdu poetry across classical and modern periods.', domain: 'Affective', level: 'A4', mappedPLOs: ['plo8', 'plo10'] },
    { id: 'clo-u3', code: 'CLO-3', title: 'Essay Writing', description: 'Write well-organized Urdu essays on social, cultural, and academic topics.', domain: 'Cognitive', level: 'C5', mappedPLOs: ['plo8', 'plo3'] },
  ],
  sub8: [
    { id: 'clo-i1', code: 'CLO-1', title: 'Islamic Principles', description: 'Understand fundamental Islamic beliefs, pillars, and ethical teachings.', domain: 'Cognitive', level: 'C2', mappedPLOs: ['plo7'] },
    { id: 'clo-i2', code: 'CLO-2', title: 'Quranic Studies', description: 'Interpret selected Quranic verses with translation and contextual understanding.', domain: 'Cognitive', level: 'C3', mappedPLOs: ['plo7', 'plo10'] },
    { id: 'clo-i3', code: 'CLO-3', title: 'Islamic History', description: 'Analyze key events in Islamic history and their relevance to modern society.', domain: 'Cognitive', level: 'C4', mappedPLOs: ['plo6', 'plo7'] },
  ],
};

const exams = [
  { id: 'ex1', title: 'Mid-Term Examination', type: 'midterm', subjectId: 'sub1', classIds: ['c1', 'c2'], date: '2026-04-06', startTime: '09:00', endTime: '11:00', room: 'Exam Hall A', totalMarks: 50, status: 'upcoming' },
  { id: 'ex2', title: 'Mid-Term Examination', type: 'midterm', subjectId: 'sub2', classIds: ['c1', 'c2'], date: '2026-04-07', startTime: '09:00', endTime: '11:00', room: 'Exam Hall A', totalMarks: 50, status: 'upcoming' },
  { id: 'ex3', title: 'Mid-Term Examination', type: 'midterm', subjectId: 'sub5', classIds: ['c1', 'c2', 'c3', 'c4'], date: '2026-04-08', startTime: '09:00', endTime: '11:30', room: 'CS Lab', totalMarks: 50, status: 'upcoming' },
  { id: 'ex4', title: 'Mid-Term Examination', type: 'midterm', subjectId: 'sub4', classIds: ['c1', 'c2', 'c3', 'c4'], date: '2026-04-09', startTime: '09:00', endTime: '11:00', room: 'Exam Hall B', totalMarks: 50, status: 'upcoming' },
  { id: 'ex5', title: 'Mid-Term Examination', type: 'midterm', subjectId: 'sub3', classIds: ['c1', 'c2'], date: '2026-04-10', startTime: '09:00', endTime: '11:00', room: 'Exam Hall A', totalMarks: 50, status: 'upcoming' },
  { id: 'ex6', title: 'Mid-Term Examination', type: 'midterm', subjectId: 'sub6', classIds: ['c3', 'c4'], date: '2026-04-06', startTime: '12:00', endTime: '14:00', room: 'Exam Hall B', totalMarks: 50, status: 'upcoming' },
  { id: 'ex7', title: 'Quiz 1', type: 'quiz', subjectId: 'sub1', classIds: ['c1'], date: '2026-02-15', startTime: '08:00', endTime: '08:30', room: 'R-101', totalMarks: 10, status: 'completed' },
  { id: 'ex8', title: 'Quiz 1', type: 'quiz', subjectId: 'sub2', classIds: ['c1'], date: '2026-02-18', startTime: '08:50', endTime: '09:20', room: 'Lab-1', totalMarks: 10, status: 'completed' },
  { id: 'ex9', title: 'Assignment 1', type: 'assignment', subjectId: 'sub5', classIds: ['c1', 'c2'], date: '2026-02-20', startTime: '00:00', endTime: '23:59', room: 'Online', totalMarks: 20, status: 'completed' },
  { id: 'ex10', title: 'Quiz 2', type: 'quiz', subjectId: 'sub1', classIds: ['c1', 'c2'], date: '2026-03-10', startTime: '08:00', endTime: '08:30', room: 'R-101', totalMarks: 10, status: 'completed' },
  { id: 'ex11', title: 'Lab Practical', type: 'practical', subjectId: 'sub3', classIds: ['c1'], date: '2026-03-15', startTime: '10:00', endTime: '12:00', room: 'Lab-2', totalMarks: 25, status: 'completed' },
  { id: 'ex12', title: 'Final Examination', type: 'final', subjectId: 'sub1', classIds: ['c1', 'c2', 'c3', 'c4', 'c5'], date: '2026-06-01', startTime: '09:00', endTime: '12:00', room: 'Main Hall', totalMarks: 100, status: 'upcoming' },
  { id: 'ex13', title: 'Final Examination', type: 'final', subjectId: 'sub2', classIds: ['c1', 'c2'], date: '2026-06-03', startTime: '09:00', endTime: '12:00', room: 'Main Hall', totalMarks: 100, status: 'upcoming' },
  { id: 'ex14', title: 'Final Examination', type: 'final', subjectId: 'sub5', classIds: ['c1', 'c2', 'c3', 'c4', 'c5'], date: '2026-06-05', startTime: '09:00', endTime: '12:00', room: 'Main Hall', totalMarks: 100, status: 'upcoming' },
];

function generateGrades() {
  const grades = [];
  const completedExams = exams.filter(e => e.status === 'completed');
  for (const exam of completedExams) {
    const examStudents = students.filter(s => exam.classIds.includes(s.classId));
    for (const student of examStudents) {
      const percentage = 0.45 + Math.random() * 0.5;
      const obtained = Math.round(exam.totalMarks * percentage);
      grades.push({
        id: `gr-${exam.id}-${student.id}`,
        examId: exam.id,
        studentId: student.id,
        classId: student.classId,
        subjectId: exam.subjectId,
        obtainedMarks: obtained,
        totalMarks: exam.totalMarks,
        percentage: ((obtained / exam.totalMarks) * 100).toFixed(1),
        grade: obtained / exam.totalMarks >= 0.9 ? 'A+' : obtained / exam.totalMarks >= 0.8 ? 'A' : obtained / exam.totalMarks >= 0.7 ? 'B' : obtained / exam.totalMarks >= 0.6 ? 'C' : obtained / exam.totalMarks >= 0.5 ? 'D' : 'F',
      });
    }
  }
  return grades;
}
const gradeRecords = generateGrades();

const announcements = [
  { id: 'ann1', title: 'Mid-Term Exam Schedule Released', body: 'The mid-term examination schedule for all classes has been finalized. Please check the Exam Schedule section for dates, times, and room assignments. Students are advised to prepare accordingly.', priority: 'high', author: 'Dr. Rashid Mahmood', authorRole: 'admin', date: '2026-03-20', pinned: true, targetClasses: [] },
  { id: 'ann2', title: 'Parent-Teacher Meeting on April 15', body: 'A parent-teacher meeting is scheduled for April 15, 2026. All teachers are required to prepare progress reports for their assigned classes. Parents will be notified via SMS.', priority: 'medium', author: 'Dr. Rashid Mahmood', authorRole: 'admin', date: '2026-03-18', pinned: true, targetClasses: [] },
  { id: 'ann3', title: 'Science Fair Registration Open', body: 'Registration for the annual Science Fair is now open. Students from Class 8 to 10 can participate. Last date for registration is April 1, 2026. See your class teacher for details.', priority: 'low', author: 'Ms. Nazia Parveen', authorRole: 'teacher', date: '2026-03-15', pinned: false, targetClasses: ['c1', 'c2', 'c3', 'c4', 'c5'] },
  { id: 'ann4', title: 'Holiday Notice - Pakistan Day', body: 'The school will remain closed on March 23, 2026 (Monday) on account of Pakistan Day. Regular classes will resume on March 24, 2026.', priority: 'high', author: 'Dr. Rashid Mahmood', authorRole: 'admin', date: '2026-03-19', pinned: false, targetClasses: [] },
  { id: 'ann5', title: 'Computer Lab Maintenance', body: 'The CS Lab will be unavailable on March 28 due to scheduled maintenance and upgrades. Classes scheduled in CS Lab will be held in Room R-103.', priority: 'medium', author: 'Mr. Omer Tanveer', authorRole: 'teacher', date: '2026-03-22', pinned: false, targetClasses: ['c1', 'c2'] },
  { id: 'ann6', title: 'Sports Week Announcement', body: 'Annual Sports Week will be held from April 20-25, 2026. Events include cricket, football, badminton, and athletics. Interested students should register with their class monitors by April 10.', priority: 'low', author: 'Dr. Rashid Mahmood', authorRole: 'admin', date: '2026-03-10', pinned: false, targetClasses: [] },
  { id: 'ann7', title: 'Library Book Return Reminder', body: 'All students with overdue library books are requested to return them by March 31 to avoid fines. New book arrivals will be displayed in the library from April 1.', priority: 'low', author: 'Dr. Rashid Mahmood', authorRole: 'admin', date: '2026-03-08', pinned: false, targetClasses: [] },
  { id: 'ann8', title: 'Class 10 Board Exam Prep Sessions', body: 'Special preparation sessions for Class 10 board exams will begin on April 1. Timing: 2:00 PM - 4:00 PM, Monday to Thursday. Attendance is mandatory for all Class 10 students.', priority: 'high', author: 'Mr. Omer Tanveer', authorRole: 'teacher', date: '2026-03-25', pinned: true, targetClasses: ['c1', 'c2'] },
];

const leaveRequests = [
  { id: 'lv1', studentId: 's1', classId: 'c1', startDate: '2026-03-24', endDate: '2026-03-25', reason: 'Family wedding ceremony out of town', type: 'personal', status: 'approved', appliedOn: '2026-03-20', reviewedBy: 'u1', reviewedOn: '2026-03-21' },
  { id: 'lv2', studentId: 's3', classId: 'c1', startDate: '2026-03-26', endDate: '2026-03-26', reason: 'Doctor appointment for routine checkup', type: 'medical', status: 'approved', appliedOn: '2026-03-24', reviewedBy: 'u1', reviewedOn: '2026-03-24' },
  { id: 'lv3', studentId: 's6', classId: 'c2', startDate: '2026-03-27', endDate: '2026-03-28', reason: 'Fever and flu - doctor advised rest', type: 'medical', status: 'pending', appliedOn: '2026-03-26', reviewedBy: null, reviewedOn: null },
  { id: 'lv4', studentId: 's7', classId: 'c2', startDate: '2026-03-28', endDate: '2026-03-28', reason: 'Participation in inter-school debate competition', type: 'academic', status: 'pending', appliedOn: '2026-03-25', reviewedBy: null, reviewedOn: null },
  { id: 'lv5', studentId: 's11', classId: 'c3', startDate: '2026-03-20', endDate: '2026-03-21', reason: 'Sister\'s wedding', type: 'personal', status: 'approved', appliedOn: '2026-03-17', reviewedBy: 'u2', reviewedOn: '2026-03-18' },
  { id: 'lv6', studentId: 's14', classId: 'c3', startDate: '2026-04-01', endDate: '2026-04-03', reason: 'Family emergency - need to travel to Lahore', type: 'emergency', status: 'pending', appliedOn: '2026-03-26', reviewedBy: null, reviewedOn: null },
  { id: 'lv7', studentId: 's2', classId: 'c1', startDate: '2026-03-10', endDate: '2026-03-10', reason: 'Not feeling well - stomach ache', type: 'medical', status: 'rejected', appliedOn: '2026-03-11', reviewedBy: 'u1', reviewedOn: '2026-03-11' },
  { id: 'lv8', studentId: 's16', classId: 'c4', startDate: '2026-03-28', endDate: '2026-03-30', reason: 'Attending cousin\'s wedding in Islamabad', type: 'personal', status: 'pending', appliedOn: '2026-03-25', reviewedBy: null, reviewedOn: null },
  { id: 'lv9', studentId: 's21', classId: 'c5', startDate: '2026-03-22', endDate: '2026-03-22', reason: 'Dental surgery', type: 'medical', status: 'approved', appliedOn: '2026-03-20', reviewedBy: 'u3', reviewedOn: '2026-03-20' },
  { id: 'lv10', studentId: 's9', classId: 'c2', startDate: '2026-04-02', endDate: '2026-04-02', reason: 'NADRA appointment for ID card', type: 'personal', status: 'pending', appliedOn: '2026-03-26', reviewedBy: null, reviewedOn: null },
];

function generateAttendanceRecords() {
  const records = [];
  const weights = [0.7, 0.15, 0.15];

  const startDate = new Date('2026-01-05');
  const endDate = new Date('2026-03-25');

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const dateStr = d.toISOString().split('T')[0];

    for (const student of students) {
      const rand = Math.random();
      let status;
      if (rand < weights[0]) status = 'present';
      else if (rand < weights[0] + weights[1]) status = 'absent';
      else status = 'late';

      records.push({
        id: `att-${student.id}-${dateStr}`,
        studentId: student.id,
        classId: student.classId,
        date: dateStr,
        status,
        markedBy: users.find(u => u.assignedClasses.includes(student.classId))?.id || 'u3',
        timestamp: new Date(dateStr + 'T08:30:00').toISOString(),
      });
    }
  }

  return records;
}

const attendanceRecords = generateAttendanceRecords();

export { classes, students, users, attendanceRecords, subjects, timetables, plos, clos, exams, gradeRecords, announcements, leaveRequests };
