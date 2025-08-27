// Demo Data for Medi-Care Hub Platform
// This file contains sample data for testing and demonstration purposes

const demoData = {
    // Sample patient data
    patients: [
        {
            id: "P001",
            name: "Maya Agarwal",
            age: 28,
            gender: "Female",
            bloodGroup: "O+",
            weight: "65.2 kg",
            height: "165 cm",
            allergies: ["Soy milk", "Lactose"],
            email: "maya.agarwal@email.com",
            phone: "+1 (555) 123-4567",
            emergencyContact: "+1 (555) 987-6543",
            lastVisit: "2024-01-15",
            nextAppointment: "2024-02-20"
        },
        {
            id: "P002",
            name: "John Smith",
            age: 45,
            gender: "Male",
            bloodGroup: "A+",
            weight: "78.5 kg",
            height: "180 cm",
            allergies: ["Peanuts"],
            email: "john.smith@email.com",
            phone: "+1 (555) 234-5678",
            emergencyContact: "+1 (555) 876-5432",
            lastVisit: "2024-01-10",
            nextAppointment: "2024-02-15"
        }
    ],

    // Sample doctor data
    doctors: [
        {
            id: "D001",
            name: "Dr. Sarah Williams",
            specialty: "Cardiologist",
            qualification: "MD, FACC",
            experience: "15 years",
            rating: 4.8,
            patients: 142,
            image: "cardiologist.jpg",
            availability: ["Monday", "Wednesday", "Friday"],
            consultationFee: "$150"
        },
        {
            id: "D002",
            name: "Dr. Michael Chen",
            specialty: "Dermatologist",
            qualification: "MD, FAAD",
            experience: "12 years",
            rating: 4.9,
            patients: 98,
            image: "dermatologist.jpg",
            availability: ["Tuesday", "Thursday", "Saturday"],
            consultationFee: "$120"
        },
        {
            id: "D003",
            name: "Dr. Emily Rodriguez",
            specialty: "Neurologist",
            qualification: "MD, PhD",
            experience: "18 years",
            rating: 4.7,
            patients: 76,
            image: "neurologist.jpg",
            availability: ["Monday", "Tuesday", "Thursday"],
            consultationFee: "$180"
        }
    ],

    // Sample appointments
    appointments: [
        {
            id: "A001",
            patientId: "P001",
            doctorId: "D001",
            date: "2024-02-20",
            time: "10:00 AM",
            type: "Follow-up Consultation",
            status: "Confirmed",
            notes: "Review blood pressure medication effectiveness"
        },
        {
            id: "A002",
            patientId: "P002",
            doctorId: "D002",
            date: "2024-02-15",
            time: "2:30 PM",
            type: "Skin Check",
            status: "Confirmed",
            notes: "Annual skin cancer screening"
        }
    ],

    // Sample medications
    medications: [
        {
            id: "M001",
            name: "Vitamin A Supplements",
            dosage: "1000 IU",
            frequency: "Once daily",
            time: "Morning",
            purpose: "Eye health and immune support",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            status: "Active"
        },
        {
            id: "M002",
            name: "Zincovit (A-O-E)",
            dosage: "1 tablet",
            frequency: "Once daily",
            time: "Evening",
            purpose: "Multivitamin supplement",
            startDate: "2024-01-01",
            endDate: "2024-12-31",
            status: "Active"
        }
    ],

    // Sample test results
    testResults: [
        {
            id: "T001",
            patientId: "P001",
            testName: "Blood Sugar (Fasting)",
            result: "95 mg/dL",
            normalRange: "70-100 mg/dL",
            date: "2024-01-15",
            status: "Normal",
            lab: "City Medical Lab"
        },
        {
            id: "T002",
            patientId: "P001",
            testName: "Cholesterol Total",
            result: "180 mg/dL",
            normalRange: "<200 mg/dL",
            date: "2024-01-15",
            status: "Normal",
            lab: "City Medical Lab"
        },
        {
            id: "T003",
            patientId: "P001",
            testName: "Blood Pressure",
            result: "130/85 mmHg",
            normalRange: "<120/80 mmHg",
            date: "2024-01-15",
            status: "Elevated",
            lab: "City Medical Lab"
        }
    ],

    // Sample billing data
    bills: [
        {
            id: "B001",
            patientId: "P001",
            description: "Cardiology Consultation",
            amount: 150.00,
            date: "2024-01-15",
            status: "Paid",
            paymentMethod: "Credit Card",
            dueDate: "2024-01-30"
        },
        {
            id: "B002",
            patientId: "P001",
            description: "Blood Tests",
            amount: 85.50,
            date: "2024-01-15",
            status: "Pending",
            paymentMethod: null,
            dueDate: "2024-02-15"
        }
    ],

    // Sample health metrics
    healthMetrics: {
        bloodPressure: {
            systolic: [120, 118, 122, 125, 128, 130],
            diastolic: [80, 78, 82, 85, 88, 90],
            dates: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        },
        weight: {
            values: [68.5, 67.8, 67.2, 66.5, 65.8, 65.2],
            dates: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        },
        activity: {
            steps: [7500, 8200, 9100, 7800, 8900, 12000, 8547],
            dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        sleep: {
            hours: [7.2, 7.5, 6.8, 7.0, 7.8, 8.2, 7.5],
            dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        }
    },

    // Sample messages
    messages: [
        {
            id: "MSG001",
            senderId: "P001",
            receiverId: "D001",
            message: "Hello Dr. Williams, I have a question about my blood pressure medication.",
            timestamp: "2024-01-20T10:30:00Z",
            status: "Read"
        },
        {
            id: "MSG002",
            senderId: "D001",
            receiverId: "P001",
            message: "Hello Maya, I'd be happy to help. What specific concerns do you have?",
            timestamp: "2024-01-20T11:15:00Z",
            status: "Read"
        }
    ],

    // Sample notifications
    notifications: [
        {
            id: "N001",
            userId: "P001",
            type: "Appointment Reminder",
            message: "You have an appointment with Dr. Williams tomorrow at 10:00 AM",
            timestamp: "2024-01-19T18:00:00Z",
            status: "Unread"
        },
        {
            id: "N002",
            userId: "P001",
            type: "Medication Reminder",
            message: "Time to take your Vitamin A supplement",
            timestamp: "2024-01-20T08:00:00Z",
            status: "Read"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = demoData;
} else {
    // Browser environment
    window.demoData = demoData;
}

// Utility functions for demo data
const demoUtils = {
    // Get patient by ID
    getPatientById: (id) => {
        return demoData.patients.find(patient => patient.id === id);
    },

    // Get doctor by ID
    getDoctorById: (id) => {
        return demoData.doctors.find(doctor => doctor.id === id);
    },

    // Get appointments for a patient
    getPatientAppointments: (patientId) => {
        return demoData.appointments.filter(apt => apt.patientId === patientId);
    },

    // Get medications for a patient
    getPatientMedications: (patientId) => {
        return demoData.medications.filter(med => med.patientId === patientId);
    },

    // Get test results for a patient
    getPatientTestResults: (patientId) => {
        return demoData.testResults.filter(test => test.patientId === patientId);
    },

    // Get bills for a patient
    getPatientBills: (patientId) => {
        return demoData.bills.filter(bill => bill.patientId === patientId);
    },

    // Get messages for a user
    getUserMessages: (userId) => {
        return demoData.messages.filter(msg => 
            msg.senderId === userId || msg.receiverId === userId
        );
    },

    // Get notifications for a user
    getUserNotifications: (userId) => {
        return demoData.notifications.filter(notif => notif.userId === userId);
    },

    // Generate random health metrics
    generateRandomMetrics: () => {
        return {
            heartRate: Math.floor(Math.random() * 30) + 60, // 60-90 BPM
            bloodPressure: {
                systolic: Math.floor(Math.random() * 40) + 110, // 110-150
                diastolic: Math.floor(Math.random() * 20) + 70  // 70-90
            },
            weight: (Math.random() * 10 + 60).toFixed(1), // 60-70 kg
            steps: Math.floor(Math.random() * 5000) + 5000, // 5000-10000
            sleep: (Math.random() * 3 + 6).toFixed(1) // 6-9 hours
        };
    }
};

// Export utility functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports.demoUtils = demoUtils;
} else {
    window.demoUtils = demoUtils;
}

console.log('Demo data loaded successfully!');
console.log('Use demoData to access sample data and demoUtils for utility functions.'); 