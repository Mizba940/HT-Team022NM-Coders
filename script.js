let step = 0;
let userData = {};

function sendMessage() {
    const input = document.getElementById("userInput");
    const chatBox = document.getElementById("chatBox");
    const message = input.value.trim();

    if (message === "") return;

    // User message
    addMessage(message, "user-message");
    input.value = "";

    // Bot logic delay
    setTimeout(() => {
        handleBotResponse(message.toLowerCase());
    }, 500);
}

function addMessage(text, className) {
    const chatBox = document.getElementById("chatBox");
    const msg = document.createElement("div");
    msg.className = className;
    msg.innerText = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleBotResponse(msg) {

    // STEP 0: Greeting
    if (step === 0) {
        addMessage(
            "👋 Hi! I am your AI Fitness Planner.\nWhat is your goal?\n👉 weight loss / muscle gain / fitness",
            "bot-message"
        );
        step = 1;
    }

    // STEP 1: Goal
    else if (step === 1) {
        userData.goal = msg;
        addMessage("Great 👍 Tell me your age.", "bot-message");
        step = 2;
    }

    // STEP 2: Age
    else if (step === 2) {
        userData.age = msg;
        addMessage("Got it! Now enter your height (in cm).", "bot-message");
        step = 3;
    }

    // STEP 3: Height
    else if (step === 3) {
        userData.height = msg;
        addMessage("Nice! Finally, enter your weight (in kg).", "bot-message");
        step = 4;
    }

    // STEP 4: Weight & Plan Generation
    else if (step === 4) {
        userData.weight = msg;
        generatePlan();
        step = 5;
    }

    // After plan
    else {
        addMessage(
            "💡 You can refresh the page to generate a new plan anytime!",
            "bot-message"
        );
    }
}

function generatePlan() {
    let plan = "";

    if (userData.goal.includes("loss")) {
        plan =
`🔥 PERSONALIZED FITNESS PLAN (Weight Loss)

🏃 Workout:
• Cardio – 30 min (5 days/week)
• Bodyweight exercises
• Daily walking

🥗 Diet:
• High protein
• Low sugar & fried food
• More vegetables

💧 Tip:
Drink 3L water daily & sleep 7–8 hrs`;
    }
    else if (userData.goal.includes("gain")) {
        plan =
`🔥 PERSONALIZED FITNESS PLAN (Muscle Gain)

🏋️ Workout:
• Strength training – 5 days/week
• Progressive overload
• Rest days important

🥗 Diet:
• High protein
• Calorie surplus
• Milk, eggs, pulses

💧 Tip:
Stay consistent & track progress`;
    }
    else {
        plan =
`🔥 PERSONALIZED FITNESS PLAN (Fitness)

🚶 Workout:
• Mix cardio & strength
• Yoga / stretching
• Active lifestyle

🥗 Diet:
• Balanced meals
• Avoid junk food

💧 Tip:
Consistency is the key 💪`;
    }

    addMessage(plan, "bot-message");
}
