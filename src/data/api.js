import { classes, students, users, attendanceRecords, subjects, timetables, plos, clos, exams, gradeRecords, announcements, leaveRequests } from './mockData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

let records = [...attendanceRecords];

export const api = {
  async login(email, password) {
    await delay();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  async getClasses(userId) {
    await delay();
    const user = users.find(u => u.id === userId);
    if (!user) return classes;
    return classes.filter(c => user.assignedClasses.includes(c.id));
  },

  async getAllClasses() {
    await delay();
    return [...classes];
  },

  async getStudentsByClass(classId) {
    await delay();
    return students.filter(s => s.classId === classId);
  },

  async getAllStudents() {
    await delay();
    return [...students];
  },

  async getStudent(studentId) {
    await delay();
    return students.find(s => s.id === studentId) || null;
  },

  async getAttendance({ classId, date, studentId } = {}) {
    await delay();
    let filtered = records;
    if (classId) filtered = filtered.filter(r => r.classId === classId);
    if (date) filtered = filtered.filter(r => r.date === date);
    if (studentId) filtered = filtered.filter(r => r.studentId === studentId);
    return filtered;
  },

  async markAttendance(classId, date, attendanceList, markedBy) {
    await delay(500);
    if (!classId || !date || !attendanceList?.length) {
      throw new Error('Missing required fields');
    }

    for (const entry of attendanceList) {
      const existingIdx = records.findIndex(
        r => r.studentId === entry.studentId && r.date === date
      );
      const record = {
        id: `att-${entry.studentId}-${date}`,
        studentId: entry.studentId,
        classId,
        date,
        status: entry.status,
        markedBy,
        timestamp: new Date().toISOString(),
      };

      if (existingIdx >= 0) {
        records[existingIdx] = record;
      } else {
        records.push(record);
      }
    }

    return { success: true, count: attendanceList.length };
  },

  async getAttendanceSummary(classId) {
    await delay();
    const classStudents = students.filter(s => s.classId === classId);
    const classRecords = records.filter(r => r.classId === classId);
    const dates = [...new Set(classRecords.map(r => r.date))];

    return classStudents.map(student => {
      const studentRecords = classRecords.filter(r => r.studentId === student.id);
      const present = studentRecords.filter(r => r.status === 'present').length;
      const absent = studentRecords.filter(r => r.status === 'absent').length;
      const late = studentRecords.filter(r => r.status === 'late').length;
      const total = studentRecords.length;

      return {
        ...student,
        present,
        absent,
        late,
        total,
        totalSessions: dates.length,
      };
    });
  },

  async getDashboardStats(userId) {
    await delay();
    const user = users.find(u => u.id === userId);
    const userClasses = user
      ? classes.filter(c => user.assignedClasses.includes(c.id))
      : classes;
    const classIds = userClasses.map(c => c.id);
    const relevantStudents = students.filter(s => classIds.includes(s.classId));
    const relevantRecords = records.filter(r => classIds.includes(r.classId));

    const today = new Date().toISOString().split('T')[0];
    const todayRecords = relevantRecords.filter(r => r.date === today);

    const totalPresent = relevantRecords.filter(r => r.status === 'present').length;
    const totalLate = relevantRecords.filter(r => r.status === 'late').length;
    const totalAbsent = relevantRecords.filter(r => r.status === 'absent').length;
    const totalRecords = relevantRecords.length;

    return {
      totalStudents: relevantStudents.length,
      totalClasses: userClasses.length,
      todayMarked: todayRecords.length,
      todayPresent: todayRecords.filter(r => r.status === 'present').length,
      todayAbsent: todayRecords.filter(r => r.status === 'absent').length,
      todayLate: todayRecords.filter(r => r.status === 'late').length,
      overallRate: totalRecords > 0
        ? (((totalPresent + totalLate * 0.5) / totalRecords) * 100).toFixed(1)
        : 0,
      totalPresent,
      totalAbsent,
      totalLate,
      classSummaries: userClasses.map(cls => {
        const clsRecords = relevantRecords.filter(r => r.classId === cls.id);
        const clsPresent = clsRecords.filter(r => r.status === 'present').length;
        const clsLate = clsRecords.filter(r => r.status === 'late').length;
        const clsTotal = clsRecords.length;
        return {
          ...cls,
          studentCount: relevantStudents.filter(s => s.classId === cls.id).length,
          attendanceRate: clsTotal > 0
            ? (((clsPresent + clsLate * 0.5) / clsTotal) * 100).toFixed(1)
            : 0,
        };
      }),
    };
  },

  async getSubjects() {
    await delay();
    return [...subjects];
  },

  async getTimetable(classId) {
    await delay();
    const tt = timetables[classId];
    if (!tt) return [];
    return tt.map(day => ({
      ...day,
      periods: day.periods.map(p => ({
        ...p,
        subject: subjects.find(s => s.id === p.subjectId),
      })),
    }));
  },

  async getPLOs() {
    await delay();
    return [...plos];
  },

  async getCLOs(subjectId) {
    await delay();
    if (subjectId) {
      return (clos[subjectId] || []).map(clo => ({
        ...clo,
        ploDetails: clo.mappedPLOs.map(pid => plos.find(p => p.id === pid)).filter(Boolean),
      }));
    }
    const all = [];
    for (const [sid, list] of Object.entries(clos)) {
      const sub = subjects.find(s => s.id === sid);
      for (const clo of list) {
        all.push({
          ...clo,
          subject: sub,
          ploDetails: clo.mappedPLOs.map(pid => plos.find(p => p.id === pid)).filter(Boolean),
        });
      }
    }
    return all;
  },

  async getCLOPLOMapping(subjectId) {
    await delay();
    const subjectCLOs = clos[subjectId] || [];
    return {
      subject: subjects.find(s => s.id === subjectId),
      clos: subjectCLOs.map(clo => ({
        ...clo,
        ploDetails: clo.mappedPLOs.map(pid => plos.find(p => p.id === pid)).filter(Boolean),
      })),
      plos: [...plos],
    };
  },

  async getExams(userId) {
    await delay();
    const user = users.find(u => u.id === userId);
    let filtered = exams;
    if (user && user.role !== 'admin') {
      filtered = exams.filter(e => e.classIds.some(cid => user.assignedClasses.includes(cid)));
    }
    return filtered.map(e => ({
      ...e,
      subject: subjects.find(s => s.id === e.subjectId),
      classNames: e.classIds.map(cid => classes.find(c => c.id === cid)?.name).filter(Boolean),
    }));
  },

  async getGrades(classId, examId) {
    await delay();
    let filtered = gradeRecords;
    if (classId) filtered = filtered.filter(g => g.classId === classId);
    if (examId) filtered = filtered.filter(g => g.examId === examId);
    return filtered.map(g => ({
      ...g,
      student: students.find(s => s.id === g.studentId),
      subject: subjects.find(s => s.id === g.subjectId),
      exam: exams.find(e => e.id === g.examId),
    }));
  },

  async getStudentGrades(studentId) {
    await delay();
    return gradeRecords
      .filter(g => g.studentId === studentId)
      .map(g => ({
        ...g,
        subject: subjects.find(s => s.id === g.subjectId),
        exam: exams.find(e => e.id === g.examId),
      }));
  },

  async getAnnouncements() {
    await delay();
    return [...announcements].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.date.localeCompare(a.date);
    });
  },

  async createAnnouncement(data) {
    await delay(400);
    const newAnn = {
      id: `ann${announcements.length + 1}`,
      ...data,
      date: new Date().toISOString().split('T')[0],
      pinned: false,
    };
    announcements.unshift(newAnn);
    return newAnn;
  },

  async getLeaveRequests(userId) {
    await delay();
    const user = users.find(u => u.id === userId);
    let filtered = leaveRequests;
    if (user && user.role !== 'admin') {
      const classIds = user.assignedClasses;
      filtered = leaveRequests.filter(lr => classIds.includes(lr.classId));
    }
    return filtered.map(lr => ({
      ...lr,
      student: students.find(s => s.id === lr.studentId),
      className: classes.find(c => c.id === lr.classId)?.name,
    })).sort((a, b) => b.appliedOn.localeCompare(a.appliedOn));
  },

  async updateLeaveStatus(leaveId, status, reviewedBy) {
    await delay(400);
    const lr = leaveRequests.find(l => l.id === leaveId);
    if (!lr) throw new Error('Leave request not found');
    lr.status = status;
    lr.reviewedBy = reviewedBy;
    lr.reviewedOn = new Date().toISOString().split('T')[0];
    return { ...lr };
  },
};
