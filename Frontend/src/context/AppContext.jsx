import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialPatients = [
  {
    id: "P001",
    name: "Ram Prasad",
    age: 76,
    bloodGroup: "O+",
    familyContacts: "9876543210, 9812345678",
    fitStatus: "Unfit",
    disease: "Severe Hypertension, Diabetes",
    helperId: "H001",
    reports: [
      { id: "R1", date: "2026-06-15", type: "Blood Test", summary: "HbA1c: 7.8% (Elevated), Hemoglobin: 14.2 g/dL (Normal)", details: "Maintain diabetes diet." },
      { id: "R2", date: "2026-06-20", type: "Cardiogram", summary: "Mild sinus tachycardia", details: "Monitor blood pressure daily." }
    ],
    foodLogs: [
      { id: "F1", date: "2026-06-27", breakfast: "Oats & Almonds", lunch: "Dal, Rice, Roti, Salad", dinner: "Vegetable Soup & Roti" }
    ]
  },
  {
    id: "P002",
    name: "Savitri Devi",
    age: 82,
    bloodGroup: "A-",
    familyContacts: "9123456780",
    fitStatus: "Fit",
    disease: "Severe Osteoarthritis",
    helperId: null,
    reports: [
      { id: "R3", date: "2026-06-10", type: "Bone Density Scan", summary: "T-Score -2.7 (Osteoporosis detected)", details: "Prescribed Calcium & Vitamin D3." }
    ],
    foodLogs: [
      { id: "F2", date: "2026-06-27", breakfast: "Poha & Milk", lunch: "Khichdi & Curd", dinner: "Boiled Vegetables" }
    ]
  }
];

const initialHelpers = [
  {
    id: "H001",
    name: "Aman Kumar",
    phone: "9898989898",
    email: "aman@karmyog.org",
    status: "Approved",
    assignedPatientId: "P001"
  },
  {
    id: "H002",
    name: "Neha Sharma",
    phone: "9797979797",
    email: "neha@karmyog.org",
    status: "Pending",
    assignedPatientId: null
  }
];

const initialVitals = [
  // Ram Prasad (P001)
  { patientId: "P001", date: "2026-06-21", bpSystolic: 142, bpDiastolic: 89, sugar: 145, pulse: 78 },
  { patientId: "P001", date: "2026-06-22", bpSystolic: 139, bpDiastolic: 87, sugar: 152, pulse: 80 },
  { patientId: "P001", date: "2026-06-23", bpSystolic: 145, bpDiastolic: 92, sugar: 138, pulse: 82 },
  { patientId: "P001", date: "2026-06-24", bpSystolic: 150, bpDiastolic: 95, sugar: 160, pulse: 85 },
  { patientId: "P001", date: "2026-06-25", bpSystolic: 141, bpDiastolic: 88, sugar: 142, pulse: 79 },
  { patientId: "P001", date: "2026-06-26", bpSystolic: 138, bpDiastolic: 85, sugar: 130, pulse: 76 },
  { patientId: "P001", date: "2026-06-27", bpSystolic: 135, bpDiastolic: 82, sugar: 125, pulse: 72 }
];

const initialMedicines = [
  { id: "M1", name: "Metformin 500mg", company: "Cipla", time: "9:00 AM (After Breakfast)", patientId: "P001" },
  { id: "M2", name: "Amlodipine 5mg", company: "Sun Pharma", time: "8:00 AM (Before Breakfast)", patientId: "P001" },
  { id: "M3", name: "Calcium Sandoz", company: "Sandoz", time: "2:00 PM (After Lunch)", patientId: "P002" }
];

const initialTasks = [
  { id: "T1", patientId: "P001", helperId: "H001", task: "Administer Morning Amlodipine", completed: true, time: "08:00 AM" },
  { id: "T2", patientId: "P001", helperId: "H001", task: "Log Breakfast Food Intake", completed: true, time: "09:30 AM" },
  { id: "T3", patientId: "P001", helperId: "H001", task: "Record BP and Sugar Levels", completed: false, time: "11:00 AM" },
  { id: "T4", patientId: "P001", helperId: "H001", task: "Assist with Lunch and Post-Meal Dava", completed: false, time: "02:00 PM" }
];

const initialLeaves = [
  { id: "L1", helperId: "H001", helperName: "Aman Kumar", duration: "1 day", reason: "Family Event", date: "2026-06-29", status: "Pending" }
];

const initialChats = [
  { sender: "H001", senderName: "Helper Aman", receiver: "P001", text: "Good morning Mr. Ram, I will be arriving at 7:30 AM today.", timestamp: "2026-06-27T07:05:00Z" },
  { sender: "P001", senderName: "Ram Prasad", receiver: "H001", text: "Okay Aman. Please bring the new medicine strip.", timestamp: "2026-06-27T07:10:00Z" }
];

export const AppContextProvider = ({ children }) => {
  const [patients, setPatients] = useState(() => JSON.parse(localStorage.getItem('km_patients')) || initialPatients);
  const [helpers, setHelpers] = useState(() => JSON.parse(localStorage.getItem('km_helpers')) || initialHelpers);
  const [vitals, setVitals] = useState(() => JSON.parse(localStorage.getItem('km_vitals')) || initialVitals);
  const [medicines, setMedicines] = useState(() => JSON.parse(localStorage.getItem('km_medicines')) || initialMedicines);
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('km_tasks')) || initialTasks);
  const [leaves, setLeaves] = useState(() => JSON.parse(localStorage.getItem('km_leaves')) || initialLeaves);
  const [chats, setChats] = useState(() => JSON.parse(localStorage.getItem('km_chats')) || initialChats);
  const [sosAlerts, setSosAlerts] = useState(() => JSON.parse(localStorage.getItem('km_sosAlerts')) || []);
  const [feedbacks, setFeedbacks] = useState(() => JSON.parse(localStorage.getItem('km_feedbacks')) || []);
  const [announcements, setAnnouncements] = useState(() => JSON.parse(localStorage.getItem('km_announcements')) || [
    { id: "A1", text: "Healthy eating seminar tomorrow at 11 AM in the main building.", date: "2026-06-27" }
  ]);
  const [auditLogs, setAuditLogs] = useState(() => JSON.parse(localStorage.getItem('km_auditLogs')) || [
    { id: "AU1", message: "System initialized with mock data", actor: "System", date: "2026-06-27 20:00" }
  ]);
  const [attendance, setAttendance] = useState(() => JSON.parse(localStorage.getItem('km_attendance')) || [
    { helperId: "H001", date: "2026-06-27", checkIn: "07:28 AM", checkOut: "" }
  ]);

  const [activeUser, setActiveUser] = useState(() => JSON.parse(localStorage.getItem('km_activeUser')) || null);

  useEffect(() => {
    localStorage.setItem('km_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('km_helpers', JSON.stringify(helpers));
  }, [helpers]);

  useEffect(() => {
    localStorage.setItem('km_vitals', JSON.stringify(vitals));
  }, [vitals]);

  useEffect(() => {
    localStorage.setItem('km_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('km_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('km_leaves', JSON.stringify(leaves));
  }, [leaves]);

  useEffect(() => {
    localStorage.setItem('km_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('km_sosAlerts', JSON.stringify(sosAlerts));
  }, [sosAlerts]);

  useEffect(() => {
    localStorage.setItem('km_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('km_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('km_auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('km_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('km_activeUser', JSON.stringify(activeUser));
  }, [activeUser]);

  const addLog = (message, actor = "System") => {
    const newLog = {
      id: "AU" + Date.now(),
      message,
      actor,
      date: new Date().toLocaleString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const loginUser = (role, id, name) => {
    const user = { role, id, name };
    setActiveUser(user);
    addLog(`${name} logged in as ${role}`, name);
  };

  const logoutUser = () => {
    if (activeUser) {
      addLog(`${activeUser.name} logged out`, activeUser.name);
      setActiveUser(null);
    }
  };

  // Admin Actions
  const approveHelper = (helperId) => {
    setHelpers(prev => prev.map(h => h.id === helperId ? { ...h, status: 'Approved' } : h));
    const hName = helpers.find(h => h.id === helperId)?.name || helperId;
    addLog(`Helper ${hName} approved by Admin`, "Admin");
  };

  const assignHelper = (helperId, patientId) => {
    setHelpers(prev => prev.map(h => {
      if (h.id === helperId) return { ...h, assignedPatientId: patientId };
      return h;
    }));
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) return { ...p, helperId: helperId };
      return p;
    }));
    const hName = helpers.find(h => h.id === helperId)?.name || helperId;
    const pName = patients.find(p => p.id === patientId)?.name || patientId;
    addLog(`Assigned Helper ${hName} to Old Person ${pName}`, "Admin");
  };

  const addPatient = (patient) => {
    const newPatient = {
      ...patient,
      id: "P" + (patients.length + 1).toString().padStart(3, '0'),
      reports: [],
      foodLogs: []
    };
    setPatients(prev => [...prev, newPatient]);
    addLog(`Added new Patient: ${newPatient.name}`, "Admin");
  };

  const addMedicine = (med) => {
    const newMed = {
      ...med,
      id: "M" + (medicines.length + 1)
    };
    setMedicines(prev => [...prev, newMed]);
    addLog(`Added medicine ${newMed.name} for Patient ${newMed.patientId}`, "Admin");
  };

  const addReport = (patientId, reportType, summary, details) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          reports: [
            { id: "R" + Date.now(), date: new Date().toISOString().split('T')[0], type: reportType, summary, details },
            ...(p.reports || [])
          ]
        };
      }
      return p;
    }));
    const pName = patients.find(p => p.id === patientId)?.name || patientId;
    addLog(`Uploaded new ${reportType} report for ${pName}`, "Admin");
  };

  const broadcastAnnouncement = (text) => {
    const newAnn = {
      id: "A" + Date.now(),
      text,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    addLog(`Broadcasted Announcement: "${text}"`, "Admin");
  };

  const updateLeaveStatus = (leaveId, status) => {
    setLeaves(prev => prev.map(l => l.id === leaveId ? { ...l, status } : l));
    addLog(`Leave ID ${leaveId} updated to ${status}`, "Admin");
  };

  // Helper Actions
  const signupHelper = (helperData) => {
    const newHelper = {
      ...helperData,
      id: "H" + (helpers.length + 1).toString().padStart(3, '0'),
      status: "Pending",
      assignedPatientId: null
    };
    setHelpers(prev => [...prev, newHelper]);
    addLog(`Helper signup request received from ${newHelper.name}`, newHelper.name);
    return newHelper;
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
    const taskText = tasks.find(t => t.id === taskId)?.task;
    addLog(`Task "${taskText}" status toggled`, activeUser?.name || "Helper");
  };

  const addCustomTask = (patientId, helperId, taskName, time) => {
    const newTask = {
      id: "T" + Date.now(),
      patientId,
      helperId,
      task: taskName,
      completed: false,
      time
    };
    setTasks(prev => [...prev, newTask]);
    addLog(`Added task "${taskName}" for Patient`, activeUser?.name || "Helper");
  };

  const checkInHelper = (helperId) => {
    const newCheckIn = {
      helperId,
      date: new Date().toISOString().split('T')[0],
      checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      checkOut: ""
    };
    setAttendance(prev => [newCheckIn, ...prev]);
    addLog(`Helper checked-in`, activeUser?.name || "Helper");
  };

  const checkOutHelper = (helperId) => {
    const today = new Date().toISOString().split('T')[0];
    setAttendance(prev => prev.map(a => {
      if (a.helperId === helperId && a.date === today && !a.checkOut) {
        return { ...a, checkOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      }
      return a;
    }));
    addLog(`Helper checked-out`, activeUser?.name || "Helper");
  };

  const requestLeave = (helperId, helperName, duration, reason, date) => {
    const newLeave = {
      id: "L" + Date.now(),
      helperId,
      helperName,
      duration,
      reason,
      date,
      status: "Pending"
    };
    setLeaves(prev => [...prev, newLeave]);
    addLog(`Helper ${helperName} submitted a leave request`, helperName);
  };

  const logVitals = (patientId, bpSystolic, bpDiastolic, sugar, pulse) => {
    const newVital = {
      patientId,
      date: new Date().toISOString().split('T')[0],
      bpSystolic: parseInt(bpSystolic),
      bpDiastolic: parseInt(bpDiastolic),
      sugar: parseInt(sugar),
      pulse: parseInt(pulse)
    };
    setVitals(prev => [...prev, newVital]);

    // Check for critical vitals and auto-set fitStatus if out of range
    const isCritical = bpSystolic > 140 || bpSystolic < 90 || bpDiastolic > 90 || bpDiastolic < 60 || sugar > 140 || sugar < 70;
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return { ...p, fitStatus: isCritical ? "Unfit" : "Fit" };
      }
      return p;
    }));

    const pName = patients.find(p => p.id === patientId)?.name || patientId;
    addLog(`Logged vitals for ${pName}. Status: ${isCritical ? 'CRITICAL (Unfit)' : 'Normal (Fit)'}`, activeUser?.name || "Helper");

    // If critical, trigger helper alert
    if (isCritical) {
      triggerSos(patientId, `Vitals Alert: BP ${bpSystolic}/${bpDiastolic}, Sugar ${sugar}, Pulse ${pulse}`);
    }
  };

  // Old Person Actions
  const signupOldPerson = (personData) => {
    const newPerson = {
      ...personData,
      id: "P" + (patients.length + 1).toString().padStart(3, '0'),
      fitStatus: "Fit",
      helperId: null,
      reports: [],
      foodLogs: []
    };
    setPatients(prev => [...prev, newPerson]);
    addLog(`Patient signup complete: ${newPerson.name}`, newPerson.name);
    return newPerson;
  };

  const triggerSos = (patientId, details = "Emergency Button Pressed") => {
    const pName = patients.find(p => p.id === patientId)?.name || "Unknown Patient";
    const newSos = {
      id: "SOS" + Date.now(),
      patientId,
      patientName: pName,
      time: new Date().toLocaleTimeString(),
      details,
      active: true
    };
    setSosAlerts(prev => [newSos, ...prev]);
    addLog(`EMERGENCY SOS Triggered for ${pName}: ${details}`, pName);
  };

  const resolveSos = (sosId) => {
    setSosAlerts(prev => prev.map(s => s.id === sosId ? { ...s, active: false } : s));
    addLog(`SOS Alert resolved`, "Admin");
  };

  const addFeedback = (patientId, text) => {
    const pName = patients.find(p => p.id === patientId)?.name || "Unknown Patient";
    const newFb = {
      id: "FB" + Date.now(),
      patientId,
      patientName: pName,
      text,
      date: new Date().toLocaleDateString()
    };
    setFeedbacks(prev => [newFb, ...prev]);
    addLog(`Feedback submitted by ${pName}`, pName);
  };

  const updateFoodLog = (patientId, breakfast, lunch, dinner) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const todayStr = new Date().toISOString().split('T')[0];
        const filteredLogs = p.foodLogs.filter(f => f.date !== todayStr);
        const newLog = { id: "F" + Date.now(), date: todayStr, breakfast, lunch, dinner };
        return { ...p, foodLogs: [newLog, ...filteredLogs] };
      }
      return p;
    }));
    addLog(`Food log updated`, activeUser?.name || "Patient");
  };

  // Chat actions
  const sendMessage = (text, receiverId) => {
    if (!activeUser) return;
    const newMessage = {
      sender: activeUser.id,
      senderName: activeUser.name,
      receiver: receiverId,
      text,
      timestamp: new Date().toISOString()
    };
    setChats(prev => [...prev, newMessage]);
  };

  return (
    <AppContext.Provider value={{
      patients,
      helpers,
      vitals,
      medicines,
      tasks,
      leaves,
      chats,
      sosAlerts,
      feedbacks,
      announcements,
      auditLogs,
      attendance,
      activeUser,
      loginUser,
      logoutUser,
      approveHelper,
      assignHelper,
      addPatient,
      addMedicine,
      addReport,
      broadcastAnnouncement,
      updateLeaveStatus,
      signupHelper,
      toggleTask,
      addCustomTask,
      checkInHelper,
      checkOutHelper,
      requestLeave,
      logVitals,
      signupOldPerson,
      triggerSos,
      resolveSos,
      addFeedback,
      updateFoodLog,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};
