import {HT} from './Dimensions';

export const MenCategory = [
  {id: 1, category: 'Session'},
  {id: 2, category: 'RPE'},
  {id: 3, category: 'Urine'},
  {id: 4, category: 'Played'},
  {id: 5, category: 'Condition'},
  {id: 6, category: 'Weight'},
];

export const WomenCategory = [
  {id: 1, category: 'Mental Condition'},
  {id: 2, category: 'Physical Condition'},
  {id: 3, category: 'Strength'},
  {id: 4, category: 'Running'},
  {id: 5, category: 'Batting'},
  {id: 6, category: 'Bowling'},
  {id: 7, category: 'Fielding'},
];

export const FormMen = [
  {
    id: 1,
    label: 'UID',
    value: '',
    type: 'header-normal',
    postKey: 'Uid',
  },
  {
    id: 2,
    label: 'Date',
    value: '',
    type: 'header-normal',
    postKey: 'date',
  },
  {
    id: 3,
    label: 'Gender',
    value: 'Male',
    type: 'header-radio',
    postKey: 'Gender',
    fields: [
      {
        id: 1,
        label: 'Male',
      },
      {
        id: 2,
        label: 'Female',
      },
    ],
  },
  {
    id: 4,
    label: 'Rest Day',
    type: 'header-switch',
    value: false,
    postKey: 'Restday',
    getKey: 'RestDay',
  },
  {
    id: 5,
    label: 'Session Details',
    value: '',
    type: 'checkbox',
    fields: [
      {
        id: 1,
        label: 'Batting',
        selected: false,
      },
      {
        id: 2,
        label: 'Bowling',
        selected: false,
      },
      {
        id: 3,
        label: 'Fielding/Wicket Keeping',
        selected: false,
      },
      {
        id: 4,
        label: 'Strength Training',
        selected: false,
      },
      {
        id: 5,
        label: 'Ground Training',
        selected: false,
      },
      {
        id: 6,
        label: 'Rehab/Prehab',
        selected: false,
      },
      {
        id: 7,
        label: 'Practice',
        selected: false,
      },
      {
        id: 8,
        label: 'Others',
        selected: false,
      },
    ],
    category: 'Session',
    postKey: 'SessionDetails',
    getKey: 'SessionDetails',
  },
  {
    id: 6,
    label: 'Session Duration',
    value: '',
    type: 'normal',
    category: 'Session',
    postKey: 'SessionDuration',
    getKey: 'SessionDuration',
  },
  {
    id: 7,
    label: 'Match',
    value: '',
    type: 'radio',
    postKey: 'Matchday',
    getKey: 'Matchday',
    fields: [
      {
        id: 1,
        label: 'MatchDay',
      },
      {
        id: 2,
        label: 'Non-MatchDay',
      },
    ],
    category: 'Session',
  },
  {
    id: 8,
    label: 'RPE SCALE',
    value: '',
    type: 'radio',
    postKey: 'StrengthSession',
    getKey: 'RPEScale',
    fields: [
      {
        id: 1,
        label: '1',
      },
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        id: 4,
        label: '4',
      },
      {
        id: 5,
        label: '5',
      },
      {
        id: 6,
        label: '6',
      },
      {
        id: 7,
        label: '7',
      },
      {
        id: 8,
        label: '8',
      },
      {
        id: 9,
        label: '9',
      },
      {
        id: 10,
        label: '10',
      },
    ],
    isImage: true,
    image: require('../Assets/Images/rpe.jpg'),
    category: 'RPE',
  },
  {
    id: 9,
    label: 'Urine Color',
    value: '',
    type: 'radio',
    postKey: 'UrineColor',
    getKey: 'UrineColor',
    fields: [
      {
        id: 1,
        label: 'Very Good',
      },
      {
        id: 2,
        label: 'Good',
      },
      {
        id: 3,
        label: 'Fair',
      },
      {
        id: 4,
        label: 'Light Dehydrated',
      },
      {
        id: 5,
        label: 'Dehydrated',
      },
      {
        id: 6,
        label: 'Very Dehydrated',
      },
      {
        id: 7,
        label: 'Severe Dehydrated',
      },
    ],
    isImage: true,
    image: require('../Assets/Images/urine.png'),
    category: 'Urine',
  },
  {
    id: 10,
    label: 'Number of Balls Played',
    value: '',
    type: 'normal',
    category: 'Played',
    postKey: 'BattingSessionBalls',
    getKey: 'BattingBallsPlayed',
  },
  {
    id: 11,
    label: 'Number of Balls Bowled',
    value: '',
    type: 'normal',
    category: 'Played',
    postKey: 'BowlingSessionBallsMatch',
    getKey: 'BowlingMatchBalls',
  },
  {
    id: 12,
    label: 'Sleep Duration*',
    value: '',
    type: 'normal',
    category: 'Played',
    postKey: 'SleepHours',
    getKey: 'SleepHours',
  },
  {
    id: 13,
    label: 'Recovery',
    value: '',
    type: 'radio',
    fields: [
      {
        id: 1,
        label: 'Stretching',
      },
      {
        id: 2,
        label: 'Foam Rolling / Massage Gun',
      },
      {
        id: 3,
        label: 'Ice Bath',
      },
      {
        id: 4,
        label: 'Pool Recovery',
      },
      {
        id: 5,
        label: 'Compression Garments',
      },
      {
        id: 6,
        label: 'Contrast Bath',
      },
      {
        id: 7,
        label: 'Others',
      },
    ],
    category: 'Condition',
    postKey: 'Recovery',
    getKey: 'Recovery',
  },
  {
    id: 14,
    label: 'Injury',
    value: '',
    type: 'radio',
    fields: [
      {
        id: 1,
        label: 'Yes',
      },
      {
        id: 2,
        label: 'No',
      },
    ],
    category: 'Condition',
    postKey: 'InjuryorNiggles',
    getKey: 'InjuryorNiggles',
  },
  {
    id: 15,
    label: 'Injury / Niggles (If Yes in previous)',
    value: '',
    type: 'normal',
    category: 'Condition',
    postKey: 'InjuryNigglesReason',
    getKey: 'InjuryReason',
  },
  {
    id: 16,
    label: 'Pre Game Weight (in kgs)',
    value: '',
    type: 'normal',
    category: 'Weight',
    postKey: 'Pregameweight',
    getKey: 'PregameWeight',
  },
  {
    id: 17,
    label: 'Post Game Weight (in kgs)',
    value: '',
    type: 'normal',
    category: 'Weight',
    postKey: 'Postgameweight',
    getKey: 'PostGameWeight',
  },
  {
    id: 18,
    label: 'UserId',
    value: '',
    type: 'header-normal',
    postKey: 'UserId',
  },
  {
    id: 19,
    label: 'status',
    value: 0,
    type: 'header-normal',
    postKey: 'sts',
  },
];

export const FormWomen = [
  {
    id: 1,
    label: 'UID',
    value: '',
    type: 'header-normal',
    postKey: 'Uid',
  },
  {
    id: 2,
    label: 'Date',
    value: '',
    type: 'header-normal',
    postKey: 'date',
  },
  {
    id: 3,
    label: 'Gender',
    value: 'Female',
    type: 'header-radio',
    postKey: 'Gender',
    fields: [
      {
        id: 1,
        label: 'Male',
      },
      {
        id: 2,
        label: 'Female',
      },
    ],
  },
  {
    id: 4,
    label: 'Rest Day',
    type: 'header-switch',
    value: false,
    postKey: 'Restday',
    getKey: 'RestDay',
  },
  {
    id: 5,
    label: 'Soreness Level',
    value: '',
    type: 'radio',
    fields: [
      {
        id: 1,
        label: "Very Bad Soreness - Can't Move",
      },
      {
        id: 2,
        label: 'Heavy Soreness (Movement uncomfortable)',
      },
      {
        id: 3,
        label: 'Moderate Soreness (Just a bit uncomfortable)',
      },
      {
        id: 4,
        label: 'Little to No Soreness (Good, Sweet Feeling :p)',
      },
      {
        id: 5,
        label: 'No Soreness',
      },
    ],
    category: 'Mental Condition',
    postKey: 'Soreness',
    getKey: 'SessionDetails',
  },
  {
    id: 6,
    label: 'Fatigue',
    value: '',
    type: 'radio',
    fields: [
      {id: 1, label: "Very Tired (Can't Get out of Bed)"},
      {id: 2, label: 'Little Tired (Feels like Resting a Bit)'},
      {id: 3, label: 'Normal'},
      {id: 4, label: 'Not Tired. Feeling Good'},
      {id: 5, label: 'Ready to Rock'},
    ],
    category: 'Mental Condition',
    postKey: 'Fatigue',
    getKey: 'SessionDuration',
  },
  {
    id: 7,
    label: 'Motivation Levels',
    value: '',
    type: 'radio',
    postKey: 'Motivation',
    getKey: 'Matchday',
    fields: [
      {
        id: 1,
        label: 'Extremely Lethargic',
      },
      {
        id: 2,
        label: 'Need to Push Myself',
      },
      {
        id: 3,
        label: 'Normal',
      },
      {
        id: 4,
        label: 'Feeling Good',
      },
      {
        id: 5,
        label: 'Feeling Great',
      },
    ],
    category: 'Mental Condition',
  },

  {
    id: 8,
    label: 'Menstrual Data',
    value: '',
    type: 'radio',
    postKey: 'Menstrual',
    getKey: 'Matchday',
    fields: [
      {
        id: 1,
        label: 'Pre-Period Signs Have Started',
      },
      {
        id: 2,
        label: 'Periods are ON',
      },
      {
        id: 3,
        label: 'No Periods (I am Fresh)',
      },
    ],
    category: 'Physical Condition',
  },
  {
    id: 9,
    label: 'Sleep Hours',
    value: '',
    type: 'radio',
    postKey: 'SleepHours',
    getKey: 'Matchday',
    fields: [
      {
        id: 1,
        label: '0',
      },
      {
        id: 2,
        label: '1',
      },
      {
        id: 3,
        label: '2',
      },
      {
        id: 4,
        label: '3',
      },
      {
        id: 5,
        label: '4',
      },
      {
        id: 6,
        label: '5',
      },
      {
        id: 7,
        label: '6',
      },
      {
        id: 8,
        label: '7',
      },
      {
        id: 9,
        label: '8',
      },
      {
        id: 10,
        label: '9',
      },
      {
        id: 11,
        label: '10',
      },
    ],
    category: 'Physical Condition',
  },

  {
    id: 10,
    label: 'Any Aches/Pains/Niggles (Remarks)',
    value: '',
    type: 'normal',
    category: 'Physical Condition',
    postKey: 'AchesPains',
    getKey: 'BattingBallsPlayed',
  },

  {
    id: 11,
    label: 'Urine Color',
    value: '',
    type: 'radio',
    postKey: 'UrineColor',
    getKey: 'UrineColor',
    fields: [
      {
        id: 1,
        label: 'Very Good',
      },
      {
        id: 2,
        label: 'Good',
      },
      {
        id: 3,
        label: 'Fair',
      },
      {
        id: 4,
        label: 'Light Dehydrated',
      },
      {
        id: 5,
        label: 'Dehydrated',
      },
      {
        id: 6,
        label: 'Very Dehydrated',
      },
      {
        id: 7,
        label: 'Severe Dehydrated',
      },
    ],
    isImage: true,
    image: require('../Assets/Images/urine.png'),
    category: 'Urine',
  },
  {
    id: 12,
    label: 'Strenth Session RPE',
    value: '',
    type: 'radio',
    postKey: 'StrengthSession',
    getKey: 'RPEScale',
    fields: [
      {
        id: 1,
        label: '1',
      },
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        id: 4,
        label: '4',
      },
      {
        id: 5,
        label: '5',
      },
      {
        id: 6,
        label: '6',
      },
      {
        id: 7,
        label: '7',
      },
      {
        id: 8,
        label: '8',
      },
      {
        id: 9,
        label: '9',
      },
      {
        id: 10,
        label: '10',
      },
    ],
    isImage: true,
    image: require('../Assets/Images/rpe.jpg'),
    category: 'Strength',
  },
  {
    id: 13,
    label: 'Training Duration (in minutes)',
    value: '',
    type: 'normal',
    postKey: 'StrengthSessionDuration',
    getKey: 'RPEScale',
    isImage: true,
    image: require('../Assets/Images/rpe.jpg'),
    category: 'Strength',
  },
  {
    id: 14,
    label: 'Running Session RPE',
    value: '',
    type: 'radio',
    postKey: 'RunningSession',
    getKey: 'RPEScale',
    fields: [
      {
        id: 1,
        label: '1',
      },
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        id: 4,
        label: '4',
      },
      {
        id: 5,
        label: '5',
      },
      {
        id: 6,
        label: '6',
      },
      {
        id: 7,
        label: '7',
      },
      {
        id: 8,
        label: '8',
      },
      {
        id: 9,
        label: '9',
      },
      {
        id: 10,
        label: '10',
      },
    ],
    category: 'Running',
    isImage: true,
    image: require('../Assets/Images/rpe.jpg'),
  },
  {
    id: 15,
    label: 'Training Duration (in minutes)',
    value: '',
    type: 'normal',
    postKey: 'RunningSessionDuration',
    getKey: 'RPEScale',
    category: 'Running',
  },
  {
    id: 16,
    label: 'Batting Session RPE',
    value: '',
    type: 'radio',
    postKey: 'BattingSession',
    getKey: 'RPEScale',
    fields: [
      {
        id: 1,
        label: '1',
      },
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        id: 4,
        label: '4',
      },
      {
        id: 5,
        label: '5',
      },
      {
        id: 6,
        label: '6',
      },
      {
        id: 7,
        label: '7',
      },
      {
        id: 8,
        label: '8',
      },
      {
        id: 9,
        label: '9',
      },
      {
        id: 10,
        label: '10',
      },
    ],
    category: 'Batting',
    isImage: true,
    image: require('../Assets/Images/rpe.jpg'),
  },
  {
    id: 17,
    label: 'Number of Balls Played',
    value: '',
    type: 'normal',
    postKey: 'BattingSessionBalls',
    getKey: 'RPEScale',
    category: 'Batting',
  },
  {
    id: 18,
    label: 'Training Duration (in minutes)',
    value: '',
    type: 'normal',
    postKey: 'BattingSessionDuration',
    getKey: 'RPEScale',
    category: 'Batting',
  },

  {
    id: 19,
    label: 'Bowling Session RPE',
    value: '',
    type: 'radio',
    postKey: 'BowlingSession',
    getKey: 'RPEScale',
    fields: [
      {
        id: 1,
        label: '1',
      },
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        id: 4,
        label: '4',
      },
      {
        id: 5,
        label: '5',
      },
      {
        id: 6,
        label: '6',
      },
      {
        id: 7,
        label: '7',
      },
      {
        id: 8,
        label: '8',
      },
      {
        id: 9,
        label: '9',
      },
      {
        id: 10,
        label: '10',
      },
    ],
    category: 'Bowling',
    isImage: true,
    image: require('../Assets/Images/rpe.jpg'),
  },
  {
    id: 20,
    label: 'Number of Balls Bowled(Match)',
    value: '',
    type: 'normal',
    postKey: 'BowlingSessionBallsMatch',
    getKey: 'RPEScale',
    category: 'Bowling',
  },
  {
    id: 21,
    label: 'Number of Balls Bowled(Practice)',
    value: '',
    type: 'normal',
    postKey: 'BowlingSessionBallsPractice',
    getKey: 'RPEScale',
    category: 'Bowling',
  },
  {
    id: 22,
    label: 'Training Duration (in minutes)',
    value: '',
    type: 'normal',
    postKey: 'BowlingSessionDuration',
    getKey: 'RPEScale',
    category: 'Bowling',
  },

  {
    id: 23,
    label: 'Fielding/Wicket - keeping Session RPE',
    value: '',
    type: 'radio',
    postKey: 'FieldingSession',
    getKey: 'RPEScale',
    fields: [
      {
        id: 1,
        label: '1',
      },
      {
        id: 2,
        label: '2',
      },
      {
        id: 3,
        label: '3',
      },
      {
        id: 4,
        label: '4',
      },
      {
        id: 5,
        label: '5',
      },
      {
        id: 6,
        label: '6',
      },
      {
        id: 7,
        label: '7',
      },
      {
        id: 8,
        label: '8',
      },
      {
        id: 9,
        label: '9',
      },
      {
        id: 10,
        label: '10',
      },
    ],
    category: 'Fielding',
    isImage: true,
    image: require('../Assets/Images/rpe.jpg'),
  },
  {
    id: 24,
    label: 'Number of catches taken?',
    value: '',
    type: 'normal',
    postKey: 'FieldingSessionBalls',
    getKey: 'RPEScale',
    category: 'Fielding',
  },
  {
    id: 25,
    label: 'Number of Balls Fielded',
    value: '',
    type: 'normal',
    postKey: 'BallsFielded',
    getKey: 'RPEScale',
    category: 'Fielding',
  },
  {
    id: 26,
    label: 'Number of thows',
    value: '',
    type: 'normal',
    postKey: 'ThrowsCollected',
    getKey: 'RPEScale',
    category: 'Fielding',
  },
  {
    id: 27,
    label: 'Training Duration (in minutes)',
    value: '',
    type: 'normal',
    postKey: 'FieldingSessionDuration',
    getKey: 'RPEScale',
    category: 'Fielding',
  },

  {
    id: 28,
    label: 'Recovery',
    value: '',
    type: 'radio',
    postKey: 'Recovery',
    getKey: 'RPEScale',
    fields: [
      {
        id: 1,
        label: 'Stretching',
      },
      {
        id: 2,
        label: 'Foam Rolling / Massage Gun',
      },
      {
        id: 3,
        label: 'Ice Bath',
      },
      {
        id: 4,
        label: 'Pool Recovery',
      },
      {
        id: 5,
        label: 'Compression Garments',
      },
      {
        id: 6,
        label: 'Contrast Bath',
      },
      {
        id: 7,
        label: 'Others',
      },
    ],
    category: 'Fielding',
  },

  {
    id: 29,
    label: 'UserId',
    value: '',
    type: 'header-normal',
    postKey: 'UserId',
  },
  {
    id: 30,
    label: 'status',
    value: 0,
    type: 'header-normal',
    postKey: 'sts',
  },
];

export const WellnessData = [
  {
    id: 1,
    name: 'Daily Wellness',
    text1: 'Tap to complete your check-in',
    text2: '',
    image: require('../Assets/Images/pulse.png'),
    iconColor: '#00A89C',
    colorBg: '#E0F2F1',
    button: true,
    category: 'wellness',
    buttonImage: require('../Assets/Images/time.png'),
    buttonText: 'incomplete',
    buttonBgColor: '#FEF6EA',
    buttonTextColor: '#F59E0B',
    height: HT(13),
  },
  {
    id: 2,
    name: 'New Feedback from Coach',
    text1: 'Batting technique - Session-12',
    text2: '2 hours ago',
    image: require('../Assets/Images/chat2.png'),
    iconColor: '#3881F6',
    colorBg: '#DBEAFE',
    category: 'performance',
    height: HT(13),
  },
  {
    id: 3,
    name: 'Net Practice Video',
    text1: 'Batting drills - yesterday',
    text2: 'Duration:12:34 . Coach notes attached',
    image: require('../Assets/Images/video.png'),
    iconColor: '#6063F1',
    colorBg: '#E1E7FF',
    category: 'performance',
    height: HT(16),
  },

  {
    id: 4,
    name: 'Meal Log',
    text1: "Today's Progress",
    text2: 'Breakfast: logged\nLunch:Not logged\nDinner:Not logged',
    image: require('../Assets/Images/meal.png'),
    iconColor: '#1BC458',
    colorBg: '#DCFCE7',
    category: 'wellness',
    height: HT(17),
  },
  {
    id: 5,
    name: 'Match Recording',
    text1: 'vs Chennai - October 5',
    text2: 'Your innings 45 runs, 38 balls . Duration 18:23',
    image: require('../Assets/Images/video.png'),
    iconColor: '#0BA5E9',
    colorBg: '#EBF6FD',
    category: 'performance',
    height: HT(16),
  },
  {
    id: 6,
    name: 'Assigned Drill',
    text1: 'Cover Drive Technique',
    text2: 'Complete 3 sets 20 reps . Due:today',
    image: require('../Assets/Images/gym.png'),
    iconColor: '#F59E0B',
    colorBg: '#FEF6EA',
    category: 'performance',
    height: HT(16),
  },
  {
    id: 7,
    name: 'Wellness Summary',
    text1: 'This week:6/7 days logged',
    text2: '',
    image: require('../Assets/Images/profits.png'),
    iconColor: '#1BC458',
    colorBg: '#DCFCE7',
    button: true,
    category: 'wellness',
    buttonImage: require('../Assets/Images/check-mark.png'),
    buttonText: 'On Track',
    buttonBgColor: '#DCFCE7',
    buttonTextColor: '#1BC458',
    height: HT(20),
  },
];

export const coachData = [
  {
    id: 1,
    name: 'Video Analysis',
    text1: 'List of videos uploaded by coach',
    text2: '',
    image: require('../Assets/Images/videofill.png'),
    iconColor: '#00A89C',
    colorBg: '#E0F2F1',
    category: 'wellness',
    height: HT(13),
  },
  // {
  //   id: 2,
  //   name: 'Assigned Players',
  //   text1: 'List of players assigned by coach',
  //   text2: '',
  //   image: require('../Assets/Images/profile.png'),
  //   iconColor: '#00A89C',
  //   colorBg: '#E0F2F1',
  //   category: 'wellness',
  //   height: HT(13),
  // },
];
