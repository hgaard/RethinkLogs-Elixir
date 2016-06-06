var logger = $.connection.logHub;

var app = new Vue({
    el: "body",
    data: {
        messages: [],
        message: null
    },
    created: function () {
        $.connection.hub.start()
            .then(function () {
                logger.server.history(100)
                    .then(function (messages) {
                        messages.forEach(function (logEvent) {
                            app.onMessage(logEvent);
                        });
                    });
            });
    },
    methods: {
        onMessage: function (logEvent) {
            this.messages.unshift({
                id: logEvent.id,
                Message: logEvent.Message,
                Timestamp: moment(logEvent.Timestamp).format(),
                Level: app.toText(logEvent.Level)
            });
        },
        sendQuery: function () {
            logger.server.query($('#queryString').val())
                .then(function (messages) {
                    app.messages = [];
                    messages.forEach(function (logEvent) {
                        app.onMessage(logEvent);
                    });
                });
        },
        getItem: function (msg) {
            logger.server.get(msg)
                .then(function (message) {
                    app.message = JSON.stringify(message);
                });
        },
        toText: function (level) {
            switch (level) {
                case 0:
                    return "Verbose";
                case 1:
                    return "Debug";
                case 2:
                    return "Information";
                case 3:
                    return "Warning";
                case 4:
                    return "Error";
                case 5:
                    return "Fatal";
                default:
                    return "Unknown";
            }
        }
    }
});

logger.client.onMessage = app.onMessage;