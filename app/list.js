document.addEventListener('DOMContentLoaded', () => {
    const messagesListContainer = document.getElementById('messagesList');

    const fetchMessages = async () => {
        try {
            const res = await fetch('http://localhost:3000');
            if (!res.ok) {
                throw new Error("Failed");
            }

            const messages = await res.json();
            renderMessages(messages);
        } catch (error) {
            console.error(error);
            messagesListContainer.innerHTML = '<p>Error loading messages</p>';
        }
    };

    const renderMessages = (messages) => {
        if (messages.length === 0) {
            messagesListContainer.innerHTML = '<p>No messages found</p>';
            return;
        }

        const messagesListHTML = messages.map(m => `
            <div class="message-card">
                <p><b>Name: </b> ${m.name} </p>
                <p><b>Price: </b> ${m.price} </p>
                <p><b>URL: </b> ${m.url} </p>
                <p><b>Description: </b> ${m.description} </p>
                <p><b>Message: </b> ${m.message} </p>
            </div>
        `).join('');

        messagesListContainer.innerHTML = messagesListHTML;
    };

    fetchMessages();
});
