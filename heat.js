class Heat extends EventTarget {

    constructor() {
        super();

        const params = (new URL(document.location)).searchParams;
        const channel = params.get("channel") || params.get("channelID") || 97032862;
        const clear = params.get("clear") || 0;

        const url = 'wss://heat-ebs.j38.net/';
        const socket = io(url, { transports: ['websocket'] });

        console.log("Running Heat for channel: " + channel + " " + url);

        //

        if (!window.obsstudio && !clear) {
            document.body.classList.add("demo");
        }

        //

        socket.on('connect', () => {
            console.log("Heat connected.");
            socket.emit("channel", channel);
        });

        socket.on('click', (data) => {
            const clickData = JSON.parse(data);
            let event = new CustomEvent("click", { detail: clickData });
            this.dispatchEvent(event);
        });

    }

}

(function () {
    window.heat = new Heat();
})();
