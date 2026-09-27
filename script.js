function submitEnrollment() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const birthDate = document.getElementById("birthDate").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const program = document.getElementById("program").value;
    const yearLevel = document.getElementById("yearLevel").value;
    const semester = document.getElementById("semester").value;
    const schoolYear = document.getElementById("schoolYear").value;

    if (!firstName || !lastName || !birthDate || !email || !phone ||
        !program || !yearLevel || !semester || !schoolYear) {
        alert("Please complete all required fields marked with *.");
        return;
    }

    if (!/^09\d{9}$/.test(phone)) {
        alert("Please enter a valid Philippine phone number.\nExample: 09123456789");
        return;
    }

    document.getElementById("successModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("successModal").style.display = "none";
}

function clearForm() {
    if (!confirm("Are you sure you want to clear the form?")) return;

    [
        "firstName", "lastName", "middleName", "birthDate", "email", "phone",
        "program", "yearLevel", "semester", "schoolYear",
        "houseNumber", "barangay", "municipality", "province"
    ].forEach(id => {
        document.getElementById(id).value = "";
    });
}

const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    chatInput.value = "";

    setTimeout(() => {
        addAIMessage(getAIResponse(message));
    }, 500);
}

function handleEnter(event) {
    if (event.key === "Enter") sendMessage();
}

function addUserMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "user-message";

    const content = document.createElement("div");
    content.className = "user-message-content";
    content.textContent = message;

    messageDiv.appendChild(content);
    chatBody.appendChild(messageDiv);
    scrollChat();
}

function addAIMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "ai-message";

    const logo = document.createElement("img");
    logo.src = "spusm-logo.png";
    logo.className = "message-logo";
    logo.alt = "SPUSM AI";

    const content = document.createElement("div");
    content.className = "ai-message-content";
    content.innerHTML = message;

    messageDiv.appendChild(logo);
    messageDiv.appendChild(content);
    chatBody.appendChild(messageDiv);
    scrollChat();
}

function scrollChat() {
    chatBody.scrollTop = chatBody.scrollHeight;
}

function quickQuestion(type) {
    const questions = {
        programs: "What programs are available?",
        requirements: "What are the requirements?",
        enroll: "How do I enroll?",
        form: "Can you help me fill out the form?"
    };

    const question = questions[type];
    if (!question) return;

    addUserMessage(question);

    setTimeout(() => {
        addAIMessage(getAIResponse(question));
    }, 400);
}

function getAIResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("program") || text.includes("course") || text.includes("degree")) {
        return `
            <strong>Available Programs</strong><br><br>
            Some programs available in this enrollment form include:<br><br>
            • BS Computer Science<br>
            • BS Information Technology<br>
            • Bachelor of Secondary Education<br>
            • Bachelor of Elementary Education<br>
            • BS Business Administration<br><br>
            Please select your desired program from the Program dropdown.
        `;
    }

    if (text.includes("requirement") || text.includes("documents")) {
        return `
            <strong>Enrollment Requirements</strong><br><br>
            Requirements may depend on your student status and program.
            Common requirements may include:<br><br>
            • Valid identification<br>
            • Previous school records<br>
            • Birth certificate<br>
            • Recent photo<br>
            • Enrollment documents<br><br>
            Please verify the latest requirements with the university registrar.
        `;
    }

    if (text.includes("how do i enroll") || text.includes("how to enroll") || text === "enroll") {
        return `
            <strong>How to Enroll</strong><br><br>
            1. Complete your personal information.<br>
            2. Select your program and year level.<br>
            3. Select your semester and school year.<br>
            4. Enter your address information.<br>
            5. Review your information.<br>
            6. Click <strong>Submit Enrollment</strong>.<br><br>
            Make sure all required fields marked with * are completed.
        `;
    }

    if (text.includes("fill") || text.includes("form") || text.includes("help")) {
        return `
            <strong>Form Assistance</strong><br><br>
            Sure! I can guide you through the form.<br><br>
            <strong>Personal Information</strong><br>
            Enter your complete name, birth date, email, and phone number.<br><br>
            <strong>Enrollment Information</strong><br>
            Select your program, year level, semester, and school year.<br><br>
            <strong>Address</strong><br>
            Enter your house/street, barangay, municipality/city, and province.
        `;
    }

    if (text.includes("computer science") || text.includes("bscs")) {
        return `
            <strong>BS Computer Science</strong><br><br>
            The Bachelor of Science in Computer Science is a computing
            program that covers programming, algorithms, databases,
            software development, computer systems, and other areas of computing.
        `;
    }

    if (text.includes("contact") || text.includes("registrar") || text.includes("office")) {
        return `
            <strong>University Assistance</strong><br><br>
            For official enrollment requirements, schedules, fees,
            and registrar concerns, please contact the appropriate
            university office directly.
        `;
    }

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
        return `
            Hello! 👋<br><br>
            I'm the <strong>SPUSM AI Assistant</strong>.
            I can help you with the enrollment form, programs,
            requirements, and enrollment steps.
        `;
    }

    return `
        I'm here to help with the SPUSM enrollment process. 😊<br><br>
        You can ask me about:<br><br>
        • Available programs<br>
        • Enrollment requirements<br>
        • How to enroll<br>
        • How to fill out the form<br>
        • BS Computer Science<br><br>
        Try asking one of these questions.
    `;
}

function attachmentMessage() {
    alert("Attachment feature is currently for demonstration only.");
}

function toggleChat() {
    const body = document.getElementById("chatBody");
    const input = document.querySelector(".chat-input-area");

    if (body.style.display === "none") {
        body.style.display = "block";
        input.style.display = "flex";
    } else {
        body.style.display = "none";
        input.style.display = "none";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("successModal");
    if (event.target === modal) modal.style.display = "none";
};
