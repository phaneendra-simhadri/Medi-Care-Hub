document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const maleBtn = document.getElementById('male-btn');
    const femaleBtn = document.getElementById('female-btn');
    const frontBtn = document.getElementById('front-btn');
    const backBtn = document.getElementById('back-btn');
    const selectedSymptomsList = document.getElementById('selected-symptoms-list');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const questionsContainer = document.getElementById('questions-container');
    const resultsContainer = document.getElementById('results-container');
    const resultsContent = document.getElementById('results-content');
    const recommendationsContent = document.getElementById('recommendations-content');
    const newCheckBtn = document.getElementById('new-check-btn');
    const mainContent = document.querySelector('.main-content');

    // Extensive symptom database
    const symptomData = {
        back: {
            name: "Back",
            symptoms: {
                back_pain: {
                    name: "Back Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching",
                                "Stabbing"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Numbness/tingling in legs",
                                "Weakness in legs",
                                "Difficulty walking",
                                "Fever",
                                "Bowel/bladder problems"
                            ]
                        }
                    ]
                }
            }
        },
        lower_back: {
            name: "Lower Back",
            symptoms: {
                lower_back_pain: {
                    name: "Lower Back Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Does pain radiate to legs?",
                            options: [
                                "Yes, to one leg",
                                "Yes, to both legs",
                                "No"
                            ]
                        }
                    ]
                }
            }
        },
        head: {
            name: "Head",
            symptoms: {
                headache: {
                    name: "Headache",
                    questions: [
                        {
                            type: "radio",
                            question: "What type of headache are you experiencing?",
                            options: [
                                "Throbbing pain",
                                "Dull ache",
                                "Sharp pain",
                                "Pressure-like",
                                "Stabbing pain"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Where is the pain located?",
                            options: [
                                "All over",
                                "One side",
                                "Forehead",
                                "Back of head",
                                "Temples",
                                "Around eyes"
                            ]
                        },
                        {
                            type: "radio",
                            question: "How severe is your headache?",
                            options: [
                                "Mild (can ignore)",
                                "Moderate (distracting)",
                                "Severe (can't function)",
                                "Worst pain ever"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Nausea/vomiting",
                                "Sensitivity to light",
                                "Sensitivity to sound",
                                "Visual changes",
                                "Fever",
                                "Neck stiffness",
                                "Dizziness",
                                "Confusion"
                            ]
                        },
                        {
                            type: "radio",
                            question: "How long have you had this headache?",
                            options: [
                                "Less than 1 hour",
                                "1-24 hours",
                                "1-3 days",
                                "More than 3 days",
                                "Chronic (weeks or more)"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Did the headache come on suddenly?",
                            options: [
                                "Yes, very suddenly (within seconds)",
                                "Gradually over minutes to hours",
                                "Developed over days"
                            ]
                        }
                    ]
                },
                dizziness: {
                    name: "Dizziness",
                    questions: [
                        {
                            type: "radio",
                            question: "What type of dizziness?",
                            options: [
                                "Lightheadedness",
                                "Spinning sensation (vertigo)",
                                "Off-balance",
                                "Faint feeling"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Nausea/vomiting",
                                "Hearing loss",
                                "Ringing in ears",
                                "Vision changes",
                                "Fainting",
                                "Headache",
                                "Sweating",
                                "Chest pain"
                            ]
                        },
                        {
                            type: "radio",
                            question: "When does it occur?",
                            options: [
                                "When standing up",
                                "When moving head",
                                "Randomly",
                                "After injury"
                            ]
                        },
                        {
                            type: "radio",
                            question: "How long does it last?",
                            options: [
                                "Seconds",
                                "Minutes",
                                "Hours",
                                "All the time"
                            ]
                        }
                    ]
                },
                head_injury: {
                    name: "Head Injury",
                    questions: [
                        {
                            type: "radio",
                            question: "How did the injury occur?",
                            options: [
                                "Fall",
                                "Car accident",
                                "Sports injury",
                                "Assault",
                                "Other"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Symptoms since injury:",
                            options: [
                                "Loss of consciousness",
                                "Confusion",
                                "Memory loss",
                                "Nausea/vomiting",
                                "Headache",
                                "Seizure",
                                "Bleeding",
                                "Clear fluid from nose/ears"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Severity of impact:",
                            options: [
                                "Mild (no loss of consciousness)",
                                "Moderate (brief loss of consciousness)",
                                "Severe (prolonged unconsciousness)"
                            ]
                        }
                    ]
                }
            }
        },
        left_eye: {
            name: "Left Eye",
            symptoms: {
                eye_pain: {
                    name: "Eye Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Pressure",
                                "Foreign body sensation"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Redness",
                                "Discharge",
                                "Blurred vision",
                                "Light sensitivity",
                                "Swelling",
                                "Tearing",
                                "Itching"
                            ]
                        },
                        {
                            type: "radio",
                            question: "When did it start?",
                            options: [
                                "Today",
                                "1-3 days ago",
                                "More than 3 days ago",
                                "Chronic (weeks or more)"
                            ]
                        }
                    ]
                },
                vision_changes: {
                    name: "Vision Changes",
                    questions: [
                        {
                            type: "radio",
                            question: "What vision changes?",
                            options: [
                                "Blurred vision",
                                "Double vision",
                                "Flashes of light",
                                "Floaters",
                                "Partial vision loss",
                                "Complete vision loss"
                            ]
                        },
                        {
                            type: "radio",
                            question: "How sudden was onset?",
                            options: [
                                "Sudden (seconds to minutes)",
                                "Rapid (hours)",
                                "Gradual (days to weeks)"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Headache",
                                "Eye pain",
                                "Nausea/vomiting",
                                "Dizziness",
                                "Fever"
                            ]
                        }
                    ]
                },
                eye_redness: {
                    name: "Eye Redness",
                    questions: [
                        {
                            type: "radio",
                            question: "Pattern of redness:",
                            options: [
                                "All over",
                                "Around iris",
                                "One spot",
                                "Under eyelid"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Pain",
                                "Discharge",
                                "Itching",
                                "Swelling",
                                "Light sensitivity"
                            ]
                        }
                    ]
                }
            }
        },
        right_eye: {
            name: "Right Eye",
            symptoms: {
                eye_pain: {
                    name: "Eye Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Pressure",
                                "Foreign body sensation"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Redness",
                                "Discharge",
                                "Blurred vision",
                                "Light sensitivity",
                                "Swelling",
                                "Tearing",
                                "Itching"
                            ]
                        },
                        {
                            type: "radio",
                            question: "When did it start?",
                            options: [
                                "Today",
                                "1-3 days ago",
                                "More than 3 days ago",
                                "Chronic (weeks or more)"
                            ]
                        }
                    ]
                },
                vision_changes: {
                    name: "Vision Changes",
                    questions: [
                        {
                            type: "radio",
                            question: "What vision changes?",
                            options: [
                                "Blurred vision",
                                "Double vision",
                                "Flashes of light",
                                "Floaters",
                                "Partial vision loss",
                                "Complete vision loss"
                            ]
                        },
                        {
                            type: "radio",
                            question: "How sudden was onset?",
                            options: [
                                "Sudden (seconds to minutes)",
                                "Rapid (hours)",
                                "Gradual (days to weeks)"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Headache",
                                "Eye pain",
                                "Nausea/vomiting",
                                "Dizziness",
                                "Fever"
                            ]
                        }
                    ]
                }
            }
        },
        neck: {
            name: "Neck",
            symptoms: {
                neck_pain: {
                    name: "Neck Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Stiffness",
                                "Burning",
                                "Radiating"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Headache",
                                "Numbness/tingling in arms",
                                "Weakness in arms",
                                "Fever",
                                "Swollen glands"
                            ]
                        },
                        {
                            type: "radio",
                            question: "What makes it worse?",
                            options: [
                                "Movement",
                                "Sitting/standing",
                                "Nothing specific"
                            ]
                        }
                    ]
                },
                neck_stiffness: {
                    name: "Neck Stiffness",
                    questions: [
                        {
                            type: "radio",
                            question: "Severity:",
                            options: [
                                "Mild (can turn head with some discomfort)",
                                "Moderate (limited movement)",
                                "Severe (can barely move neck)"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Fever",
                                "Headache",
                                "Nausea/vomiting",
                                "Light sensitivity",
                                "Recent injury"
                            ]
                        }
                    ]
                }
            }
        },
        chest: {
            name: "Chest",
            symptoms: {
                chest_pain: {
                    name: "Chest Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp/stabbing",
                                "Pressure/squeezing",
                                "Burning",
                                "Aching",
                                "Tightness"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Left side",
                                "Right side",
                                "Center",
                                "All over"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Shortness of breath",
                                "Pain radiating to arm/jaw",
                                "Nausea/vomiting",
                                "Sweating",
                                "Dizziness",
                                "Palpitations"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Duration:",
                            options: [
                                "Seconds",
                                "Minutes",
                                "Hours",
                                "Days"
                            ]
                        },
                        {
                            type: "radio",
                            question: "What makes it better/worse?",
                            options: [
                                "Better with rest",
                                "Worse with activity",
                                "Better with antacids",
                                "No change with position"
                            ]
                        }
                    ]
                },
                shortness_of_breath: {
                    name: "Shortness of Breath",
                    questions: [
                        {
                            type: "radio",
                            question: "When does it occur?",
                            options: [
                                "At rest",
                                "With exertion",
                                "When lying down",
                                "At night"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Chest pain",
                                "Wheezing",
                                "Cough",
                                "Swelling in legs",
                                "Fever",
                                "Palpitations"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Severity:",
                            options: [
                                "Mild (can do normal activities)",
                                "Moderate (limits some activities)",
                                "Severe (limits all activities)"
                            ]
                        }
                    ]
                },
                palpitations: {
                    name: "Palpitations",
                    questions: [
                        {
                            type: "radio",
                            question: "Description:",
                            options: [
                                "Skipped beats",
                                "Racing heart",
                                "Pounding",
                                "Irregular"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Chest pain",
                                "Shortness of breath",
                                "Dizziness",
                                "Fainting"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Duration:",
                            options: [
                                "Seconds",
                                "Minutes",
                                "Hours",
                                "Continuous"
                            ]
                        }
                    ]
                }
            }
        },
        abdomen: {
            name: "Abdomen",
            symptoms: {
                abdominal_pain: {
                    name: "Abdominal Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Upper right",
                                "Upper left",
                                "Lower right",
                                "Lower left",
                                "Central",
                                "All over"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Cramping",
                                "Sharp",
                                "Dull",
                                "Colicky",
                                "Burning"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Nausea/vomiting",
                                "Diarrhea",
                                "Constipation",
                                "Fever",
                                "Blood in stool",
                                "Bloating",
                                "Loss of appetite"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Duration:",
                            options: [
                                "Hours",
                                "Days",
                                "Weeks",
                                "Chronic"
                            ]
                        }
                    ]
                },
                nausea: {
                    name: "Nausea/Vomiting",
                    questions: [
                        {
                            type: "radio",
                            question: "Duration:",
                            options: [
                                "Hours",
                                "Days",
                                "Weeks"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Abdominal pain",
                                "Diarrhea",
                                "Fever",
                                "Headache",
                                "Dizziness"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Content of vomit:",
                            options: [
                                "Food/liquid",
                                "Bile (yellow/green)",
                                "Blood (red or coffee grounds)"
                            ]
                        }
                    ]
                },
                diarrhea: {
                    name: "Diarrhea",
                    questions: [
                        {
                            type: "radio",
                            question: "Duration:",
                            options: [
                                "Less than 24 hours",
                                "1-3 days",
                                "More than 3 days",
                                "Chronic (weeks or more)"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Blood in stool",
                                "Fever",
                                "Abdominal pain",
                                "Nausea/vomiting",
                                "Dehydration symptoms"
                            ]
                        }
                    ]
                }
            }
        },
        left_arm: {
            name: "Left Arm",
            symptoms: {
                arm_pain: {
                    name: "Arm Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching",
                                "Throbbing"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Numbness/tingling",
                                "Weakness",
                                "Swelling",
                                "Redness",
                                "Limited movement"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Upper arm",
                                "Lower arm",
                                "Shoulder to hand",
                                "Joints"
                            ]
                        }
                    ]
                },
                numbness: {
                    name: "Numbness/Tingling",
                    questions: [
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Whole arm",
                                "Fingers/hand",
                                "Upper arm",
                                "Patchy areas"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Weakness",
                                "Pain",
                                "Neck pain",
                                "Color changes"
                            ]
                        }
                    ]
                }
            }
        },
        right_arm: {
            name: "Right Arm",
            symptoms: {
                arm_pain: {
                    name: "Arm Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching",
                                "Throbbing"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Numbness/tingling",
                                "Weakness",
                                "Swelling",
                                "Redness",
                                "Limited movement"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Upper arm",
                                "Lower arm",
                                "Shoulder to hand",
                                "Joints"
                            ]
                        }
                    ]
                }
            }
        },
        left_leg: {
            name: "Left Leg",
            symptoms: {
                leg_pain: {
                    name: "Leg Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching",
                                "Cramping"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Redness",
                                "Warmth",
                                "Numbness/tingling",
                                "Weakness"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Thigh",
                                "Calf",
                                "Knee",
                                "Whole leg"
                            ]
                        }
                    ]
                },
                swelling: {
                    name: "Leg Swelling",
                    questions: [
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Foot/ankle",
                                "Calf",
                                "Whole leg"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Pain",
                                "Redness",
                                "Warmth",
                                "Shortness of breath",
                                "Chest pain"
                            ]
                        }
                    ]
                }
            }
        },
        right_leg: {
            name: "Right Leg",
            symptoms: {
                leg_pain: {
                    name: "Leg Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching",
                                "Cramping"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Redness",
                                "Warmth",
                                "Numbness/tingling",
                                "Weakness"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Thigh",
                                "Calf",
                                "Knee",
                                "Whole leg"
                            ]
                        }
                    ]
                }
            }
        },
        left_knee: {
            name: "Left Knee",
            symptoms: {
                knee_pain: {
                    name: "Knee Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching",
                                "Stabbing"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Redness",
                                "Warmth",
                                "Locking",
                                "Popping sound",
                                "Instability"
                            ]
                        },
                        {
                            type: "radio",
                            question: "When does it hurt?",
                            options: [
                                "With movement",
                                "At rest",
                                "At night",
                                "When bearing weight"
                            ]
                        }
                    ]
                }
            }
        },
        right_knee: {
            name: "Right Knee",
            symptoms: {
                knee_pain: {
                    name: "Knee Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching",
                                "Stabbing"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Redness",
                                "Warmth",
                                "Locking",
                                "Popping sound",
                                "Instability"
                            ]
                        }
                    ]
                }
            }
        },
        left_ankle: {
            name: "Left Ankle",
            symptoms: {
                ankle_pain: {
                    name: "Ankle Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Throbbing",
                                "Aching"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Bruising",
                                "Difficulty walking",
                                "Redness",
                                "Warmth"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Did it follow an injury?",
                            options: [
                                "Yes, recent injury",
                                "No injury",
                                "Chronic issue"
                            ]
                        }
                    ]
                }
            }
        },
        right_ankle: {
            name: "Right Ankle",
            symptoms: {
                ankle_pain: {
                    name: "Ankle Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Throbbing",
                                "Aching"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Bruising",
                                "Difficulty walking",
                                "Redness",
                                "Warmth"
                            ]
                        }
                    ]
                }
            }
        },
        left_foot: {
            name: "Left Foot",
            symptoms: {
                foot_pain: {
                    name: "Foot Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Redness",
                                "Numbness/tingling",
                                "Difficulty walking"
                            ]
                        },
                        {
                            type: "radio",
                            question: "Location:",
                            options: [
                                "Heel",
                                "Arch",
                                "Toes",
                                "Ball of foot",
                                "Whole foot"
                            ]
                        }
                    ]
                }
            }
        },
        right_foot: {
            name: "Right Foot",
            symptoms: {
                foot_pain: {
                    name: "Foot Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Burning",
                                "Aching"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Swelling",
                                "Redness",
                                "Numbness/tingling",
                                "Difficulty walking"
                            ]
                        }
                    ]
                }
            }
        },
        pelvis: {
            name: "Pelvis",
            symptoms: {
                pelvic_pain: {
                    name: "Pelvic Pain",
                    questions: [
                        {
                            type: "radio",
                            question: "Type of pain:",
                            options: [
                                "Sharp",
                                "Dull",
                                "Cramping",
                                "Pressure"
                            ]
                        },
                        {
                            type: "checkbox",
                            question: "Associated symptoms:",
                            options: [
                                "Urinary symptoms",
                                "Bowel changes",
                                "Vaginal bleeding (females)",
                                "Fever",
                                "Nausea/vomiting"
                            ]
                        }
                    ]
                }
            }
        }
    };

    // Comprehensive medical knowledge base
    const medicalKnowledge = {
        conditions: [
            {
                name: "Muscle Strain",
                symptoms: ["back_pain", "neck_pain", "arm_pain", "leg_pain"],
                requiredSymptoms: {
                    back_pain: {
                        "Type of pain:": ["Dull", "Aching"],
                        "Associated symptoms:": []
                    },
                    neck_pain: {
                        "Type of pain:": ["Dull", "Aching"],
                        "Associated symptoms:": []
                    }
                },
                description: "Overstretching or tearing of muscle fibers, often from overuse or improper lifting.",
                severity: "low",
                recommendations: [
                    "Rest the affected area",
                    "Apply ice for first 48 hours, then heat",
                    "Over-the-counter pain relievers (ibuprofen, acetaminophen)",
                    "Gentle stretching after acute phase",
                    "Consider physical therapy if not improving"
                ]
            },
            {
                name: "Viral Upper Respiratory Infection",
                symptoms: ["headache", "neck_pain"],
                requiredSymptoms: {
                    headache: {
                        "What type of headache are you experiencing?": ["Dull ache", "Pressure-like"],
                        "Associated symptoms:": ["Fever"]
                    }
                },
                description: "Common cold caused by viruses, affecting the nose, throat and sinuses.",
                severity: "low",
                recommendations: [
                    "Rest and stay hydrated",
                    "Use saline nasal sprays",
                    "Over-the-counter cold medications as needed",
                    "Gargle with warm salt water for sore throat",
                    "Use humidifier to ease congestion"
                ]
            },
            // Add more common conditions...
            {
                name: "Tension Headache",
                symptoms: ["headache"],
                requiredSymptoms: {
                    headache: {
                        "What type of headache are you experiencing?": ["Dull ache", "Pressure-like"],
                        "How severe is your headache?": ["Mild (can ignore)", "Moderate (distracting)"],
                        "Associated symptoms:": []
                    }
                },
                description: "Common headache often related to stress or muscle tension.",
                severity: "low",
                recommendations: [
                    "Rest in a quiet, dark room",
                    "Over-the-counter pain relievers",
                    "Apply warm or cold compress",
                    "Practice relaxation techniques",
                    "Improve posture and take breaks"
                ]
            },
            {
                name: "Migraine",
                symptoms: ["headache"],
                requiredSymptoms: {
                    headache: {
                        "What type of headache are you experiencing?": ["Throbbing pain"],
                        "How severe is your headache?": ["Moderate (distracting)", "Severe (can't function)"],
                        "Associated symptoms:": ["Nausea/vomiting", "Sensitivity to light", "Sensitivity to sound"]
                    }
                },
                description: "Recurrent headache disorder with attacks lasting 4-72 hours.",
                severity: "moderate",
                recommendations: [
                    "Rest in dark, quiet room",
                    "Prescription migraine medications if available",
                    "Hydrate well",
                    "Avoid known triggers",
                    "Apply cold compress"
                ]
            },
            {
                name: "Tension Headache",
                symptoms: ["headache"],
                requiredSymptoms: {
                    headache: {
                        "What type of headache are you experiencing?": ["Dull ache", "Pressure-like"],
                        "How severe is your headache?": ["Mild (can ignore)", "Moderate (distracting)"],
                        "Associated symptoms:": []
                    }
                },
                description: "Common headache often related to stress or muscle tension, typically described as a constant band-like pain around the head.",
                severity: "low",
                recommendations: [
                    "Rest in a quiet, dark room",
                    "Over-the-counter pain relievers (ibuprofen, acetaminophen)",
                    "Apply warm or cold compress to head/neck",
                    "Practice relaxation techniques and stress management",
                    "Improve posture and take frequent breaks if computer work",
                    "Consider massage or physical therapy if chronic"
                ]
            },
            {
                name: "Migraine",
                symptoms: ["headache"],
                requiredSymptoms: {
                    headache: {
                        "What type of headache are you experiencing?": ["Throbbing pain"],
                        "How severe is your headache?": ["Moderate (distracting)", "Severe (can't function)"],
                        "Associated symptoms:": ["Nausea/vomiting", "Sensitivity to light", "Sensitivity to sound"],
                        "Did the headache come on suddenly?": ["Gradually over minutes to hours"]
                    }
                },
                description: "Recurrent headache disorder manifesting with attacks lasting 4-72 hours, often with nausea, photophobia, and phonophobia.",
                severity: "moderate",
                recommendations: [
                    "Rest in a dark, quiet room",
                    "Prescription migraine medications if available",
                    "Hydrate well and avoid dehydration triggers",
                    "Avoid known triggers (certain foods, stress, lack of sleep, hormonal changes)",
                    "Apply cold compress to forehead or neck",
                    "Consider preventive medications if frequent migraines"
                ]
            },
            {
                name: "Cluster Headache",
                symptoms: ["headache"],
                requiredSymptoms: {
                    headache: {
                        "What type of headache are you experiencing?": ["Sharp pain", "Stabbing pain"],
                        "How severe is your headache?": ["Severe (can't function)", "Worst pain ever"],
                        "Where is the pain located?": ["One side", "Around eyes"],
                        "Associated symptoms:": ["Tearing", "Nasal congestion"]
                    }
                },
                description: "Excruciating unilateral headaches that occur in cyclical patterns or clusters, often described as the worst pain imaginable.",
                severity: "high",
                recommendations: [
                    "Seek medical attention for proper diagnosis",
                    "High-flow oxygen therapy during attacks",
                    "Prescription triptan medications",
                    "Avoid alcohol during cluster periods",
                    "Consider preventive medications like verapamil",
                    "Maintain regular sleep schedule"
                ]
            },
            {
                name: "Acute Coronary Syndrome (Heart Attack)",
                symptoms: ["chest_pain"],
                requiredSymptoms: {
                    chest_pain: {
                        "Type of pain:": ["Pressure/squeezing", "Tightness"],
                        "Associated symptoms:": ["Shortness of breath", "Pain radiating to arm/jaw", "Sweating", "Nausea/vomiting"],
                        "Duration:": ["Minutes", "Hours"]
                    }
                },
                description: "Life-threatening condition caused by reduced blood flow to heart muscle, requiring immediate medical attention.",
                severity: "emergency",
                recommendations: [
                    "Call emergency services immediately (911 or local emergency number)",
                    "Chew aspirin (325mg) if not allergic (unless contraindicated)",
                    "Stay calm and rest while waiting for help",
                    "Do not drive yourself to the hospital",
                    "Loosen tight clothing",
                    "Be prepared to perform CPR if person becomes unconscious"
                ]
            },
            {
                name: "Gastroenteritis",
                symptoms: ["abdominal_pain", "nausea", "diarrhea"],
                requiredSymptoms: {
                    abdominal_pain: {
                        "Type of pain:": ["Cramping"],
                        "Associated symptoms:": ["Nausea/vomiting", "Diarrhea"]
                    }
                },
                description: "Inflammation of the stomach and intestines, typically due to viral or bacterial infection, causing diarrhea and vomiting.",
                severity: "moderate",
                recommendations: [
                    "Stay hydrated with small, frequent sips of clear fluids or oral rehydration solutions",
                    "Follow BRAT diet (bananas, rice, applesauce, toast) as tolerated",
                    "Rest as needed",
                    "Avoid dairy, fatty foods, and caffeine initially",
                    "Use over-the-counter anti-diarrheal medications cautiously",
                    "Seek medical care if symptoms persist >48 hours, if dehydration occurs, or if blood in stool"
                ]
            },
            {
                name: "Appendicitis",
                symptoms: ["abdominal_pain"],
                requiredSymptoms: {
                    abdominal_pain: {
                        "Location:": ["Lower right"],
                        "Type of pain:": ["Sharp"],
                        "Associated symptoms:": ["Nausea/vomiting", "Fever", "Loss of appetite"]
                    }
                },
                description: "Inflammation of the appendix requiring urgent surgical evaluation, typically starting with periumbilical pain migrating to right lower quadrant.",
                severity: "high",
                recommendations: [
                    "Seek immediate medical attention",
                    "Do not eat or drink anything",
                    "Avoid pain medications until evaluated by a doctor",
                    "Do not apply heat to abdomen",
                    "Be prepared to go to emergency department if symptoms worsen"
                ]
            },
            {
                name: "Pneumonia",
                symptoms: ["shortness_of_breath"],
                requiredSymptoms: {
                    shortness_of_breath: {
                        "Associated symptoms:": ["Fever", "Cough"],
                        "When does it occur?": ["At rest", "With exertion"]
                    }
                },
                description: "Infection of the lungs causing inflammation of air sacs, which may fill with fluid or pus, leading to cough with phlegm, fever, and difficulty breathing.",
                severity: "high",
                recommendations: [
                    "Seek medical attention for evaluation",
                    "Get plenty of rest",
                    "Stay well hydrated",
                    "Use fever reducers as needed (acetaminophen, ibuprofen)",
                    "Complete any prescribed antibiotic course fully",
                    "Return to doctor if symptoms worsen or don't improve in 3 days"
                ]
            },
            {
                name: "Conjunctivitis (Pink Eye)",
                symptoms: ["eye_pain"],
                requiredSymptoms: {
                    eye_pain: {
                        "Type of pain:": ["Burning"],
                        "Associated symptoms:": ["Redness", "Discharge", "Itching"]
                    }
                },
                description: "Inflammation or infection of the outer membrane of the eyeball and inner eyelid, causing redness, itching, and discharge.",
                severity: "low",
                recommendations: [
                    "Practice good hygiene - wash hands frequently",
                    "Avoid touching or rubbing eyes",
                    "Use clean warm compresses to relieve discomfort",
                    "Avoid wearing contact lenses until resolved",
                    "Use artificial tears for comfort",
                    "See doctor if severe pain, vision changes, or no improvement in 2-3 days"
                ]
            },
            {
                name: "Urinary Tract Infection",
                symptoms: ["pelvic_pain"],
                requiredSymptoms: {
                    pelvic_pain: {
                        "Associated symptoms:": ["Urinary symptoms"],
                        "Type of pain:": ["Burning"]
                    }
                },
                description: "Infection in any part of the urinary system (kidneys, ureters, bladder, urethra), most commonly causing painful urination and frequent urges to urinate.",
                severity: "moderate",
                recommendations: [
                    "Drink plenty of water to flush out bacteria",
                    "Urinate frequently and completely empty bladder",
                    "Use heating pad for comfort",
                    "Drink cranberry juice (may help prevent but not treat)",
                    "See doctor for antibiotic treatment",
                    "Seek immediate care if fever, back pain, or nausea/vomiting occur"
                ]
            },
            {
                name: "Deep Vein Thrombosis (DVT)",
                symptoms: ["leg_pain", "swelling"],
                requiredSymptoms: {
                    leg_pain: {
                        "Type of pain:": ["Aching", "Cramping"],
                        "Associated symptoms:": ["Swelling", "Warmth"]
                    }
                },
                description: "Blood clot in a deep vein, usually in the leg, which can be life-threatening if the clot travels to the lungs (pulmonary embolism).",
                severity: "emergency",
                recommendations: [
                    "Seek immediate medical attention",
                    "Do not massage the affected leg",
                    "Keep leg elevated when possible",
                    "Avoid prolonged sitting or standing",
                    "Be prepared for ultrasound testing and possible blood thinners",
                    "Watch for chest pain or shortness of breath (signs of pulmonary embolism)"
                ]
            },
            {
                name: "Osteoarthritis",
                symptoms: ["knee_pain"],
                requiredSymptoms: {
                    knee_pain: {
                        "Type of pain:": ["Dull", "Aching"],
                        "When does it hurt?": ["With movement", "When bearing weight"]
                    }
                },
                description: "Degenerative joint disease causing breakdown of joint cartilage and underlying bone, most common in weight-bearing joints like knees and hips.",
                severity: "moderate",
                recommendations: [
                    "Maintain healthy weight to reduce joint stress",
                    "Low-impact exercise (swimming, cycling) to strengthen muscles",
                    "Apply heat or cold for pain relief",
                    "Consider over-the-counter pain relievers (acetaminophen, NSAIDs)",
                    "Use assistive devices if needed (cane, brace)",
                    "Consult doctor about physical therapy or joint injections"
                ]
            },
            {
                name: "Ankle Sprain",
                symptoms: ["ankle_pain"],
                requiredSymptoms: {
                    ankle_pain: {
                        "Did it follow an injury?": ["Yes, recent injury"],
                        "Associated symptoms:": ["Swelling", "Bruising", "Difficulty walking"]
                    }
                },
                description: "Stretching or tearing of ligaments surrounding the ankle joint, usually from twisting or rolling the ankle.",
                severity: "moderate",
                recommendations: [
                    "Follow RICE protocol: Rest, Ice, Compression, Elevation",
                    "Use elastic bandage or brace for support",
                    "Take over-the-counter pain relievers as needed",
                    "Gradually resume activity as pain allows",
                    "Perform rehabilitation exercises to restore strength and flexibility",
                    "See doctor if unable to bear weight or if pain persists beyond a few days"
                ]
            },
            {
                name: "Plantar Fasciitis",
                symptoms: ["foot_pain"],
                requiredSymptoms: {
                    foot_pain: {
                        "Location:": ["Heel"],
                        "Type of pain:": ["Sharp"],
                        "When does it hurt?": ["With first steps in morning"]
                    }
                },
                description: "Inflammation of the thick band of tissue that runs across the bottom of your foot and connects your heel bone to your toes.",
                severity: "moderate",
                recommendations: [
                    "Stretch calf muscles and plantar fascia regularly",
                    "Wear supportive shoes with good arch support",
                    "Use night splints to maintain stretch while sleeping",
                    "Apply ice to painful area for 15-20 minutes several times daily",
                    "Consider over-the-counter arch supports or orthotics",
                    "Lose weight if overweight to reduce stress on fascia"
                ]
            },
            {
                name: "Carpal Tunnel Syndrome",
                symptoms: ["arm_pain", "numbness"],
                requiredSymptoms: {
                    arm_pain: {
                        "Location:": ["Fingers/hand"],
                        "Type of pain:": ["Burning", "Aching"]
                    },
                    numbness: {
                        "Location:": ["Fingers/hand"]
                    }
                },
                description: "Compression of the median nerve as it travels through the wrist, causing pain, numbness, and tingling in the hand and arm.",
                severity: "moderate",
                recommendations: [
                    "Take frequent breaks from repetitive hand activities",
                    "Wear wrist splint at night to keep wrist neutral",
                    "Apply cold packs for acute pain",
                    "Perform nerve gliding exercises",
                    "Consider ergonomic adjustments to workspace",
                    "See doctor for evaluation - may need steroid injections or surgery"
                ]
            }
        ]
    };

    // State management
    let state = {
        selectedSymptoms: [],
        currentBodyPart: null,
        currentSymptom: null,
        answers: {},
        gender: 'male'
    };

    // Event Listeners
    maleBtn.addEventListener('click', () => {
        state.gender = 'male';
        maleBtn.classList.add('active');
        femaleBtn.classList.remove('active');
        updateBodyView();
    });

    femaleBtn.addEventListener('click', () => {
        state.gender = 'female';
        femaleBtn.classList.add('active');
        maleBtn.classList.remove('active');
        updateBodyView();
    });

    frontBtn.addEventListener('click', () => {
        frontBtn.classList.add('active');
        backBtn.classList.remove('active');
        updateBodyView();
    });

    backBtn.addEventListener('click', () => {
        backBtn.classList.add('active');
        frontBtn.classList.remove('active');
        updateBodyView();
    });

    analyzeBtn.addEventListener('click', analyzeSymptoms);
    clearBtn.addEventListener('click', clearAll);
    newCheckBtn.addEventListener('click', resetTool);

    // Body part click handlers
    document.querySelectorAll('.body-part').forEach(part => {
        part.addEventListener('click', function() {
            const bodyPart = this.dataset.part;
            showSymptomSelection(bodyPart);
        });
    });

    // Helper function to update body view
    function updateBodyView() {
        const isFrontView = frontBtn.classList.contains('active');
        
        // Hide all body views first
        document.querySelectorAll('#body-map .human-body').forEach(body => {
            body.style.display = 'none';
        });
        
        // Show the correct body view
        const activeBody = document.querySelector(`#body-map .human-body.${state.gender}.${isFrontView ? 'front-view' : 'back-view'}`);
        if (activeBody) {
            activeBody.style.display = 'block';
        }
    }
    // Show symptom selection modal
    function showSymptomSelection(bodyPart) {
        state.currentBodyPart = bodyPart;
        const partData = symptomData[bodyPart];
        
        // Create symptom selection modal
        const modal = document.createElement('div');
        modal.className = 'symptom-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Select Symptoms for ${partData.name}</h3>
                <div class="symptom-options">
                    ${Object.keys(partData.symptoms).map(symptomKey => `
                        <button class="symptom-option" data-symptom="${symptomKey}">
                            ${partData.symptoms[symptomKey].name}
                        </button>
                    `).join('')}
                </div>
                <div class="modal-actions">
                    <button class="secondary-btn close-modal"><i class="fas fa-times"></i> Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners to symptom options
        modal.querySelectorAll('.symptom-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const symptomKey = this.dataset.symptom;
                addSymptom(bodyPart, symptomKey);
                document.body.removeChild(modal);
            });
        });
        
        // Close modal
        modal.querySelector('.close-modal').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
    }
    
    // Add symptom to selected list
    function addSymptom(bodyPart, symptomKey) {
        const symptomId = `${bodyPart}_${symptomKey}`;
        
        // Check if symptom already added
        if (state.selectedSymptoms.some(s => s.id === symptomId)) {
            return;
        }
        
        const symptom = {
            id: symptomId,
            bodyPart: bodyPart,
            symptomKey: symptomKey,
            name: symptomData[bodyPart].symptoms[symptomKey].name
        };
        
        state.selectedSymptoms.push(symptom);
        updateSelectedSymptomsList();
        showQuestionsForSymptom(bodyPart, symptomKey);
    }
    
    // Update the selected symptoms list display
    function updateSelectedSymptomsList() {
        selectedSymptomsList.innerHTML = '';
        
        if (state.selectedSymptoms.length === 0) {
            selectedSymptomsList.innerHTML = '<p class="empty-message">No symptoms selected yet. Click on body parts to add symptoms.</p>';
            return;
        }
        
        state.selectedSymptoms.forEach(symptom => {
            const chip = document.createElement('div');
            chip.className = 'symptom-chip';
            chip.innerHTML = `
                ${symptom.name}
                <button data-id="${symptom.id}"><i class="fas fa-times"></i></button>
            `;
            selectedSymptomsList.appendChild(chip);
            
            // Add event listener to remove button
            chip.querySelector('button').addEventListener('click', function() {
                removeSymptom(this.dataset.id);
            });
        });
    }
    
    // Remove a symptom from the selected list
    function removeSymptom(symptomId) {
        state.selectedSymptoms = state.selectedSymptoms.filter(s => s.id !== symptomId);
        
        // Remove answers for this symptom
        delete state.answers[symptomId];
        
        updateSelectedSymptomsList();
        
        // If we were showing questions for this symptom, clear them
        if (state.currentSymptom && state.currentSymptom.id === symptomId) {
            questionsContainer.innerHTML = '<p class="empty-message">Select a symptom to see detailed questions.</p>';
            state.currentSymptom = null;
        }
    }
    
    // Show detailed questions for a specific symptom
    function showQuestionsForSymptom(bodyPart, symptomKey) {
        state.currentSymptom = {
            id: `${bodyPart}_${symptomKey}`,
            bodyPart: bodyPart,
            symptomKey: symptomKey
        };
        
        const questions = symptomData[bodyPart].symptoms[symptomKey].questions;
        questionsContainer.innerHTML = '';
        
        const symptomTitle = document.createElement('h3');
        symptomTitle.textContent = `Details about your ${symptomData[bodyPart].symptoms[symptomKey].name}`;
        symptomTitle.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');        questionsContainer.appendChild(symptomTitle);
        
        questions.forEach((q, qIndex) => {
            const questionId = `${bodyPart}_${symptomKey}_q${qIndex}`;
            
            const group = document.createElement('div');
            group.className = 'question-group';
            
            const questionText = document.createElement('h3');
            questionText.textContent = q.question;
            group.appendChild(questionText);
            
            if (q.type === 'radio') {
                const radioGroup = document.createElement('div');
                radioGroup.className = 'radio-group';
                
                q.options.forEach((opt, optIndex) => {
                    const optionId = `${questionId}_opt${optIndex}`;
                    
                    const option = document.createElement('div');
                    option.className = 'radio-option';
                    
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.id = optionId;
                    input.name = questionId;
                    input.value = opt;
                    
                    // Check if this answer was previously given
                    if (state.answers[state.currentSymptom.id] && 
                        state.answers[state.currentSymptom.id][q.question] === opt) {
                        input.checked = true;
                    }
                    
                    input.addEventListener('change', function() {
                        saveAnswer(q.question, opt);
                    });
                    
                    const label = document.createElement('label');
                    label.htmlFor = optionId;
                    label.textContent = opt;
                    
                    option.appendChild(input);
                    option.appendChild(label);
                    radioGroup.appendChild(option);
                });
                
                group.appendChild(radioGroup);
            } 
            else if (q.type === 'checkbox') {
                const checkboxGroup = document.createElement('div');
                checkboxGroup.className = 'checkbox-group';
                
                q.options.forEach((opt, optIndex) => {
                    const optionId = `${questionId}_opt${optIndex}`;
                    
                    const option = document.createElement('div');
                    option.className = 'checkbox-option';
                    
                    const input = document.createElement('input');
                    input.type = 'checkbox';
                    input.id = optionId;
                    input.name = optionId;
                    input.value = opt;
                    
                    // Check if this answer was previously given
                    if (state.answers[state.currentSymptom.id] && 
                        state.answers[state.currentSymptom.id][q.question] &&
                        state.answers[state.currentSymptom.id][q.question].includes(opt)) {
                        input.checked = true;
                    }
                    
                    input.addEventListener('change', function() {
                        saveCheckboxAnswer(q.question, opt, this.checked);
                    });
                    
                    const label = document.createElement('label');
                    label.htmlFor = optionId;
                    label.textContent = opt;
                    
                    option.appendChild(input);
                    option.appendChild(label);
                    checkboxGroup.appendChild(option);
                });
                
                group.appendChild(checkboxGroup);
            }
            questionsContainer.appendChild(group);
        });
    }
    
    // Save radio button answer to state
    function saveAnswer(question, answer) {
        const symptomId = state.currentSymptom.id;
        
        if (!state.answers[symptomId]) {
            state.answers[symptomId] = {};
        }
        
        state.answers[symptomId][question] = answer;
    }
    
    // Save checkbox answers to state
    function saveCheckboxAnswer(question, answer, isChecked) {
        const symptomId = state.currentSymptom.id;
        
        if (!state.answers[symptomId]) {
            state.answers[symptomId] = {};
        }
        
        if (!state.answers[symptomId][question]) {
            state.answers[symptomId][question] = [];
        }
        
        if (isChecked) {
            if (!state.answers[symptomId][question].includes(answer)) {
                state.answers[symptomId][question].push(answer);
            }
        } else {
            state.answers[symptomId][question] = state.answers[symptomId][question].filter(a => a !== answer);
        }
    }
    
    // Analyze symptoms and match to conditions
    function analyzeSymptoms() {
        if (state.selectedSymptoms.length === 0) {
            alert('Please select at least one symptom to analyze');
            return;
        }
    
        const possibleConditions = [];
        
        medicalKnowledge.conditions.forEach(condition => {
            // 1. Check if at least one symptom matches (looser requirement)
            const hasAtLeastOneSymptom = condition.symptoms.some(symptom => 
                state.selectedSymptoms.some(selected => selected.symptomKey === symptom)
            );
            
            if (!hasAtLeastOneSymptom) return;
            
            // 2. Calculate match score with more flexible matching
            let matchScore = 0;
            let totalPossibleScore = 0;
            let requiredMatches = 0;
            
            for (const symptom in condition.requiredSymptoms) {
                const symptomId = state.selectedSymptoms.find(s => s.symptomKey === symptom)?.id;
                if (!symptomId) continue;
                
                const symptomAnswers = state.answers[symptomId] || {};
                
                for (const question in condition.requiredSymptoms[symptom]) {
                    totalPossibleScore += condition.requiredSymptoms[symptom][question].length;
                    
                    const userAnswer = symptomAnswers[question];
                    if (userAnswer) {
                        if (Array.isArray(userAnswer)) {
                            // For checkbox answers
                            const matchingAnswers = userAnswer.filter(ans => 
                                condition.requiredSymptoms[symptom][question].includes(ans)
                            );
                            matchScore += matchingAnswers.length;
                        } else {
                            // For radio answers
                            if (condition.requiredSymptoms[symptom][question].includes(userAnswer)) {
                                matchScore += 1;
                            }
                        }
                    }
                }
                requiredMatches++;
            }
            
            // 3. More flexible probability calculation
            const baseProbability = totalPossibleScore > 0 ? 
                (matchScore / totalPossibleScore) * 100 : 0;
                
            // Boost probability if multiple symptoms match
            const symptomBoost = Math.min(30, state.selectedSymptoms.length * 5);
            const probability = Math.min(100, Math.round(baseProbability * 1.2 + symptomBoost));
            
            // 4. Lower threshold for showing conditions
            if (probability > 20 || (requiredMatches > 0 && matchScore > 0)) {
                possibleConditions.push({
                    condition: condition,
                    probability: probability
                });
            }
        });
        
        // Sort by probability
        possibleConditions.sort((a, b) => b.probability - a.probability);
        
        displayResults(possibleConditions);
    }
    // Display analysis results
    function displayResults(possibleConditions) {
        mainContent.style.display = 'none';
        resultsContainer.style.display = 'block';
        resultsContent.innerHTML = '';
        recommendationsContent.innerHTML = '';
        
        if (possibleConditions.length === 0) {
            // Show more helpful information when no conditions identified
            resultsContent.innerHTML = `
                <div class="condition-card">
                    <h3>No Specific Conditions Identified</h3>
                    <p>While we couldn't match your symptoms to specific conditions, here are some general possibilities based on your symptoms:</p>
                    <ul>
                        ${state.selectedSymptoms.map(s => `
                            <li><strong>${s.name}</strong> could indicate:
                                <ul>
                                    ${getGeneralPossibilities(s.symptomKey).map(p => `<li>${p}</li>`).join('')}
                                </ul>
                            </li>
                        `).join('')}
                    </ul>
                    <p>Consider consulting a healthcare provider if symptoms persist or worsen.</p>
                </div>
            `;
            
            recommendationsContent.innerHTML = `
                <div class="recommendation-item">
                    <i class="fas fa-user-md"></i>
                    <div>Monitor your symptoms and note any changes</div>
                </div>
                <div class="recommendation-item">
                    <i class="fas fa-heartbeat"></i>
                    <div>Practice general wellness: stay hydrated, rest, and manage stress</div>
                </div>
                <div class="recommendation-item">
                    <i class="fas fa-clipboard-check"></i>
                    <div>Consider keeping a symptom diary to track patterns</div>
                </div>
            `;
            return;
        }

        
        // Show emergency warning if any condition is critical
        const emergencyCondition = possibleConditions.find(c => c.condition.severity === 'emergency');
        if (emergencyCondition) {
            resultsContent.innerHTML += `
                <div class="emergency-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Warning: Potential Medical Emergency</strong>
                        <p>Based on your symptoms, you may be experiencing ${emergencyCondition.condition.name} which requires immediate medical attention.</p>
                    </div>
                </div>
            `;
            
            recommendationsContent.innerHTML += `
                <div class="recommendation-item">
                    <i class="fas fa-ambulance"></i>
                    <div><strong>Call emergency services immediately (911 or local emergency number)</strong></div>
                </div>
            `;
            
            // Add specific emergency recommendations
            emergencyCondition.condition.recommendations.forEach(rec => {
                recommendationsContent.innerHTML += `
                    <div class="recommendation-item">
                        <i class="fas fa-first-aid"></i>
                        <div>${rec}</div>
                    </div>
                `;
            });
        }
        
        // Display all possible conditions
        possibleConditions.forEach(pc => {
            const conditionCard = document.createElement('div');
            conditionCard.className = 'condition-card';
            
            conditionCard.innerHTML = `
                <h3>${pc.condition.name} <span class="probability">${pc.probability}% match</span></h3>
                <p>${pc.condition.description}</p>
                <div class="probability-bar">
                    <div class="probability-fill" style="width: ${pc.probability}%"></div>
                </div>
            `;
            
            resultsContent.appendChild(conditionCard);
            
            // Add recommendations for non-emergency conditions
            if (pc.condition.severity !== 'emergency') {
                pc.condition.recommendations.forEach(rec => {
                    recommendationsContent.innerHTML += `
                        <div class="recommendation-item">
                            <i class="fas fa-check-circle"></i>
                            <div>${rec}</div>
                        </div>
                    `;
                });
            }
        });
        
        // Add general recommendations if no emergency
        if (!emergencyCondition) {
            recommendationsContent.innerHTML += `
                <div class="recommendation-item">
                    <i class="fas fa-user-md"></i>
                    <div>Consult a healthcare provider if symptoms persist or worsen</div>
                </div>
                <div class="recommendation-item">
                    <i class="fas fa-clock"></i>
                    <div>Monitor your symptoms and note any changes</div>
                </div>
            `;
        }
    }
    
    // Clear all selected symptoms and answers
    function clearAll() {
        state.selectedSymptoms = [];
        state.answers = {};
        state.currentSymptom = null;
        updateSelectedSymptomsList();
        questionsContainer.innerHTML = '<p class="empty-message">Select a symptom to see detailed questions.</p>';
    }
    
    // Reset the tool to initial state
    function resetTool() {
        clearAll();
        mainContent.style.display = 'flex';
        resultsContainer.style.display = 'none';
    }
    
    // Initialize
    updateSelectedSymptomsList();
    questionsContainer.innerHTML = '<p class="empty-message">Select a symptom to see detailed questions.</p>';
    updateBodyView();
});