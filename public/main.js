// Client side
document.addEventListener("DOMContentLoaded", function () {
    let subBtn = document.querySelector("#sub");
    let emailInput = document.querySelector("#email");
    let messageInput = document.querySelector("#msg");
    let allMessages = document.querySelector("#all-messages");

    // Fetch and display messages on page load
    window.addEventListener("load", () => {
        fetch("/messages")
            .then((res) => res.json())
            .then((data) => showData(data))
            .catch((err) => console.error("Error:", err));
    });

    // Post the new message to server and update displayed messages
    subBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!email || !message) {
            alert("Email and message cannot be empty.");
            return;
        }

        fetch("/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, message }),
        })
            .then((res) => res.json())
            .then((msg) => {
                showData(msg.data);
            })
            .catch((err) => console.log(err));

        emailInput.value = "";
        messageInput.value = "";
    });

    // Formats and display the messages
    function showData(messages) {
        let html = "";
        // Ensure we only display the last 5 messages, or all messages if there are less than 5
        const startIndex = Math.max(0, messages.length - 5);
        const latestMessages = messages.slice(startIndex);

        latestMessages.forEach((latest) => {
            const formattedDate = new Date(latest.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
            html += `
        <div class="border rounded p-3 mb-3 bg-light">
            <dl>
                <dt>${latest.email}</dt>
                <dd>${latest.message}</dd>
                <dt>${formattedDate}</dt>
            </dl>
        </div>
    `;
        });
        allMessages.innerHTML = html;
    }
});