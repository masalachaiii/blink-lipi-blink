function scheduleNextAlarm() {
    const now = new Date();
    let next = new Date(now);

    const minutes = now.getMinutes();

    if (minutes < 20) {
        next.setMinutes(20, 0, 0);
    } else if (minutes < 40) {
        next.setMinutes(40, 0, 0);
    } else {
        next.setHours(now.getHours() + 1);
        next.setMinutes(0, 0, 0);
    }

    chrome.alarms.clear("blinkReminder", () => {
        chrome.alarms.create("blinkReminder", {
            when: next.getTime()
        });

        console.log("Next blink:", next);
    });
}


// runs when installed
chrome.runtime.onInstalled.addListener(() => {
    scheduleNextAlarm();
});


// runs when Chrome opens
chrome.runtime.onStartup.addListener(() => {
    scheduleNextAlarm();
});


// notification trigger
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "blinkReminder") {

        console.log("BLINK TIME");

        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/blink128.png",
            title: "BLINK LIPI BLINK!",
            message: "Time to blink for 20 seconds 👀"
        });

        scheduleNextAlarm();
    }
});


// click notification → open extension popup
chrome.notifications.onClicked.addListener(() => {

    console.log("notification clicked");

    chrome.windows.create({
        url: chrome.runtime.getURL("blink.html"),
        type: "popup",
        width: 350,
        height: 220
    });

});