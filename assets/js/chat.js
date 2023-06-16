const msgPanel = document.querySelector(".msg-panel");
const input = document.getElementById("inputC");
const submit = document.getElementById("submit");
const apiUrl = "http://localhost:3700/v1/chat/completions";
const apiKey = "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";

submit.addEventListener("click", async (e) => {
    e.preventDefault();
    const trimmedInputValue = input.value.trim();
    if (trimmedInputValue == "") {
        return;
    }

    const date = new Date();

    const msg = document.createElement("div");
    msg.textContent = trimmedInputValue;
    formatMessage(msg);
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    const timeString = date.toLocaleString("en-US", options);
    const dateString = `${date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;
    msg.title = `${timeString} - ${dateString}`;
    msg.classList.add("msg");
    msgPanel.appendChild(msg);

    setTimeout(() => {
        msg.style.marginTop = "7px";
        msg.style.opacity = 1;
    });

    msg.addEventListener("mousedown", (e) => {
        e.preventDefault();

        if (e.which == 2 || e.which == 4) {
            msg.style.marginRight = "-50px";
            msg.style.opacity = 0;

            setTimeout(() => msg.remove(), 200);
        }
    });

    // send request to the api
    let message = trimmedInputValue;
    message =
        "Now you are called Healthier, Now you are medical assistance, my weight is 50kg and my height is 170cm, just answer me at short as possible " +
        message;
    const sendRequest = async (model, messages) => {
        const url = apiUrl;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };
        const data = {
            model,
            messages,
        };

        try {
            const response = await axios.post(url, data, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    // Example usage
    const model = "davinci";
    const messages = [
        {
            role: "user",
            content: message,
            name: "message-1",
        },
    ];
    sendRequest(model, messages)
        .then((data) => {
            const chatbotResponse = data.choices[0].message.content;
            console.log(data);
            // let msgResponse = document.createElement("div");
            // msgResponse.textContent = chatbotResponse;
            // msgResponse.classList.add("msgResponse");
            // msgPanel.appendChild(msgResponse);
            // setTimeout(() => {
            //     msgResponse.style.marginTop = "7px";
            //     msgResponse.style.opacity = 1;
            // });
        
            // msgResponse.addEventListener("mousedown", (e) => {
            //     e.preventDefault();
        
            //     if (e.which == 2 || e.which == 4) {
            //         msgResponse.style.marginRight = "-50px";
            //         msgResponse.style.opacity = 0;
        
            //         setTimeout(() => msgResponse.remove(), 200);
            //     }
            // });
        
        })
        .catch((error) => console.error(error));


    input.value = "";
    msgPanel.scrollTop = msgPanel.scrollHeight;
    submit.setAttribute("disabled", "");
});


function escapeHTML(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => {
        return map[m];
    });
}

function formatMessage(msg) {
    const message = msg.textContent;
    let formattedMessage = escapeHTML(message);

    // Anchor links
    formattedMessage = formattedMessage.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$1">$2</a>'
    );

    // Images
    formattedMessage = formattedMessage.replace(
        /\((.*?)\)\[(.*?)\]/g,
        '<img src="$1" height="200" alt="$2">'
    );

    // Bold
    formattedMessage = formattedMessage.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Italic
    formattedMessage = formattedMessage.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Strikethrough
    formattedMessage = formattedMessage.replace(/~~(.*?)~~/g, "<del>$1</del>");

    // Underlined
    formattedMessage = formattedMessage.replace(/~(.*?)~/g, "<u>$1</u>");

    // Uppercase
    formattedMessage = formattedMessage.replace(
        /\+\+(.*?)\+\+/g,
        '<span style="text-transform: uppercase;">$1</span>'
    );

    // Lowercase
    formattedMessage = formattedMessage.replace(
        /\+(.*?)\+/g,
        '<span style="text-transform: lowercase;">$1</span>'
    );

    // Highlight
    formattedMessage = formattedMessage.replace(
        /`(.*?)`/g,
        '<span style="background-color: #357c38; border-radius: 5px; padding: 3px;">$1</span>'
    );

    // Reverse
    formattedMessage = formattedMessage.replace(
        /--(.*?)--/g,
        (match, capturedText) => {
            return capturedText.split("").reverse().join("");
        }
    );

    // Line break
    formattedMessage = formattedMessage.replace(/\\n/g, "<br>");

    msg.innerHTML = formattedMessage;
}

input.addEventListener("input", () => {
    if (input.value != "") {
        submit.removeAttribute("disabled");
    } else {
        submit.setAttribute("disabled", "");
    }
});

const clear = document.getElementById("clear");

function clearChat() {
    const messages = msgPanel.querySelectorAll("div");
    let delay = 0;

    clear.setAttribute("disabled", "");

    messages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.marginRight = "-50px";
            msg.style.opacity = 0;
        }, delay);
        delay += 100;
    });

    setTimeout(() => {
        msgPanel.innerHTML = "";
        clear.removeAttribute("disabled");
    }, delay);
}

clear.addEventListener("click", clearChat);

input.addEventListener("keydown", (e) => {
    if (e.ctrlKey) {
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        const currentValue = input.value;

        if (e.key == "b") {
            // Ctrl+B for bold
            e.preventDefault();
            if (startPos !== endPos) {
                const selectedText = currentValue.substring(startPos, endPos);
                const modifiedText = `**${selectedText}**`;
                const newValue =
                    currentValue.substring(0, startPos) +
                    modifiedText +
                    currentValue.substring(endPos);
                input.value = newValue;
                input.selectionStart = startPos + 2;
                input.selectionEnd = endPos + 2;
            }
        } else if (e.key == "i") {
            // Ctrl+I for italic
            e.preventDefault();
            if (startPos !== endPos) {
                const selectedText = currentValue.substring(startPos, endPos);
                const modifiedText = `*${selectedText}*`;
                const newValue =
                    currentValue.substring(0, startPos) +
                    modifiedText +
                    currentValue.substring(endPos);
                input.value = newValue;
                input.selectionStart = startPos + 1;
                input.selectionEnd = endPos + 1;
            }
        } else if (e.key == "u") {
            // Ctrl+U for underline
            e.preventDefault();
            if (startPos !== endPos) {
                const selectedText = currentValue.substring(startPos, endPos);
                const modifiedText = `~${selectedText}~`;
                const newValue =
                    currentValue.substring(0, startPos) +
                    modifiedText +
                    currentValue.substring(endPos);
                input.value = newValue;
                input.selectionStart = startPos + 1;
                input.selectionEnd = endPos + 1;
            }
        } else if (e.key == "s") {
            // Ctrl+S for strikethrough
            e.preventDefault();
            if (startPos !== endPos) {
                const selectedText = currentValue.substring(startPos, endPos);
                const modifiedText = `~~${selectedText}~~`;
                const newValue =
                    currentValue.substring(0, startPos) +
                    modifiedText +
                    currentValue.substring(endPos);
                input.value = newValue;
                input.selectionStart = startPos + 2;
                input.selectionEnd = endPos + 2;
            }
        } else if (e.key == "h") {
            // Ctrl+H for highlight
            e.preventDefault();
            if (startPos !== endPos) {
                const selectedText = currentValue.substring(startPos, endPos);
                const modifiedText = `\`${selectedText}\``;
                const newValue =
                    currentValue.substring(0, startPos) +
                    modifiedText +
                    currentValue.substring(endPos);
                input.value = newValue;
                input.selectionStart = startPos + 1;
                input.selectionEnd = endPos + 1;
            }
        } else if (e.key == "r") {
            // Ctrl+R for reverse
            e.preventDefault();
            const selectedText = currentValue.substring(startPos, endPos);
            const modifiedText = `--${selectedText}--`;
            const newValue =
                currentValue.substring(0, startPos) +
                modifiedText +
                currentValue.substring(endPos);
            input.value = newValue;
            input.selectionStart = startPos + 1;
            input.selectionEnd = endPos + 1;
        }
    }

    if (e.shiftKey && e.key == "Enter") {
        const caretStart = input.selectionStart;
        const caretEnd = input.selectionEnd;

        const currentValue = input.value;
        const newValue = `${currentValue.substring(
            0,
            caretStart
        )}\\n${currentValue.substring(caretEnd)}`;

        input.value = newValue;

        const newCaretPosition = caretStart + 2;
        input.setSelectionRange(newCaretPosition, newCaretPosition);
    }

    if (e.key == "Backspace") {
        const currentValue = input.value;
        const caretStart = input.selectionStart;
        const caretEnd = input.selectionEnd;

        if (currentValue.substring(caretStart - 2, caretStart) === "\\n") {
            const newValue =
                currentValue.substring(0, caretStart - 1) +
                currentValue.substring(caretEnd);
            input.value = newValue;

            const newCaretPosition = caretStart - 1;
            input.setSelectionRange(newCaretPosition, newCaretPosition);
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (!e.shiftKey && e.key == "Enter") {
        submit.click();
    }
    if (e.altKey && e.key == "c") {
        clearChat();
    }
});
