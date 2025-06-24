// src/data/scenarios.js

const scenarios = [
    {
        "id": "EF700AGL",
        "title": "Engine Failure at 700’ AGL During Cruise",
        "description": "You're cruising at 70 KIAS, 700’ AGL in an R44. Engine RPM drops. Low rotor RPM horn sounds.",
        "steps": [
            {
                "prompt": "What’s your FIRST action?",
                "choices": [
                    { "label": "A", "text": "Lower collective", "correct": true },
                    { "label": "B", "text": "Pull mixture", "correct": false },
                    { "label": "C", "text": "Apply full throttle", "correct": false },
                    { "label": "D", "text": "Turn into wind", "correct": false }
                ]
            },
            {
                "prompt": "You're in autorotation. What site do you choose?",
                "choices": [
                    { "label": "A", "text": "Open field ahead", "correct": true },
                    { "label": "B", "text": "Road with power lines", "correct": false },
                    { "label": "C", "text": "Try 180° turn back to airport", "correct": false },
                    { "label": "D", "text": "Overfly trees", "correct": false }
                ]
            },
            {
                "prompt": "What’s your final flare plan?",
                "choices": [
                { "label": "A", "text": "Flare at 40’, level, raise collective at 5–10’", "correct": true },
                { "label": "B", "text": "Pull full collective early", "correct": false },
                { "label": "C", "text": "Delay flare for smoother touchdown", "correct": false },
                { "label": "D", "text": "Flare at 100’", "correct": false }
                ]
            }
        ],
        "debrief": {
            "success": "Excellent RPM control and judgment. Maintain better site scanning in cruise to reduce decision lag.",
            "fail": "Critical rotor management error. Review POH guidance on cruise autorotation procedures."
    }
    },
    {
        "id": "TRHoverFail",
        "title": "Tail Rotor Failure in Hover",
        "description": "You're in a 3’ hover on a calm day doing pedal turns. Suddenly, the nose yaws sharply right.",
        "steps": [
        {
            "prompt": "What’s happening?",
            "choices": [
            { "label": "A", "text": "LTE onset", "correct": false },
            { "label": "B", "text": "Cyclic failure", "correct": false },
            { "label": "C", "text": "Tail rotor failure", "correct": true },
            { "label": "D", "text": "Low rotor RPM", "correct": false }
            ]
        },
        {
        "prompt": "What should you do?",
        "choices": [
            { "label": "A", "text": "Chop throttle and land vertically", "correct": true },
            { "label": "B", "text": "Climb and try forward flight", "correct": false },
            { "label": "C", "text": "Apply full left pedal", "correct": false },
            { "label": "D", "text": "Try to yaw opposite with cyclic", "correct": false }
            ]
        },
        {
            "prompt": "What’s the landing result?",
            "choices": [
                { "label": "A", "text": "Hard vertical contact, minor damage", "correct": true },
                { "label": "B", "text": "Rolled over due to pedal input", "correct": false },
                { "label": "C", "text": "Spun out, tail strike", "correct": false },
                { "label": "D", "text": "Skidded into hangar", "correct": false }
            ]
        }
        ],
        "debrief": {
            "success": "Great recognition. Vertical descent minimizes yaw acceleration in hover tail rotor failures.",
            "fail": "Incorrect response. Hover tail rotor failures demand immediate throttle chop and vertical landing."
        }
    },
    {
        "id": "LRRPMTakeoff",
        "title": "Low Rotor RPM During Takeoff",
        "description": "You're doing a max performance takeoff in an R44 from a confined area. At 75’ AGL, the low rotor RPM horn sounds.",
        "steps": [
            {
                "prompt": "What is your IMMEDIATE corrective action?",
                "choices": [
                    { "label": "A", "text": "Lower collective while simultaneously rolling on throttle", "correct": true },
                    { "label": "B", "text": "Raise nose to gain altitude", "correct": false },
                    { "label": "C", "text": "Pull more collective", "correct": false },
                    { "label": "D", "text": "Begin a left turn toward open terrain", "correct": false }
                ]
            },
            {
                "prompt": "RPM has stabilized just above 97%. You’re mid-climb. What do you do?",
                "choices": [
                    { "label": "A", "text": "Abort takeoff and land in open spot ahead", "correct": true },
                    { "label": "B", "text": "Continue climb—RPM is recovering", "correct": false },
                    { "label": "C", "text": "Attempt 180° return to LZ", "correct": false },
                    { "label": "D", "text": "Descend vertically into original LZ", "correct": false }
                ]
            },
            {
                "prompt": "Approaching touchdown at 20’ AGL. What’s your final move?",
                "choices": [
                    { "label": "A", "text": "Flare, level, then cushion with collective", "correct": true },
                    { "label": "B", "text": "Pull full collective early", "correct": false },
                    { "label": "C", "text": "Touch down tail-low", "correct": false },
                    { "label": "D", "text": "Try to extend glide to smoother ground", "correct": false }
                ]
            }
        ],
        "debrief": {
            "success": "Excellent abort and recovery. Low rotor RPM is a killer—your quick throttle + collective correction saved it.",
            "fail": "Incorrect. Low RPM requires immediate correction. Attempting to continue climb was high-risk."
        }
    }
];

export default scenarios;
