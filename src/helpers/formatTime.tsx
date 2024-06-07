export const formatTime = (date: Date, short?: "short") => {
    let day: any = date.getDate()
    let month: any = date.getMonth() + 1
    let year: any = date.getFullYear()
    let hour: any = date.getHours();
    let minute: any = date.getMinutes();
    if (day < 10) { day = "0" + day };
    if (month < 10) { month = "0" + month }
    if (hour < 10) { hour = "0" + hour }
    if (minute < 10) { minute = "0" + minute }
    return day + "/" + month + (!short ? ("/" + year + " " + hour + ":" + minute) : "")
}

export const formatParamDate = (date: Date) => {
    if (date.getTime() < (new Date()).getTime()) {
        return new Date()
    } else { return date }
}

export const stringTime = (date: number, short?: "shortTime") => {
    const monthNames = short ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ] : ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let x = new Date(date);
    let day: any = x.getDate()
    let month: any = x.getMonth()
    let year: any = x.getFullYear()
    let hour: any = x.getHours();
    let minute: any = x.getMinutes();
    if (short) {
        return monthNames[month] + " " + (day >= 10 ? day : "0" + day) + ", " + (hour >= 10 ? hour : "0" + hour) + ":" + (minute >= 10 ? minute : "0" + minute)
    }
    return monthNames[month] + " " + (day >= 10 ? day : "0" + day) + ", " + year + " " + (hour >= 10 ? hour : "0" + hour) + ":" + (minute >= 10 ? minute : "0" + minute)
}

export const stringTime2 = (date: number, short?: "short") => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let x = new Date(date);
    let day: any = x.getDate()
    let month: any = x.getMonth()
    let year: any = x.getFullYear()
    // let hour: any = x.getHours();
    // let minute: any = x.getMinutes();
    if (!short) {
        return monthNames[month] + " " + day + ", " + year
    }
    return `${((month + 1) >= 10 ? (month + 1) : "0" + (month + 1))}/${day}/${year}`
}

export const calEnd = (date: number) => {
    let now = (new Date()).getTime();
    let x = date - now;
    if (x <= 0) {
        return "Ended"
    } else {
        let hour = Math.floor(x / (1000 * 3600));
        let minute = Math.floor((x - hour * 3600 * 1000) / (60 * 1000))
        let second = Math.floor((x - hour * 3600 * 1000 - minute * 60 * 1000) / 1000)
        return (hour > 0 ? (hour + "h ") : "") + (minute + "m") + (hour <= 0 ? (" " + second + "s") : "")
    }
}

export const calEndToNow = (date: number) => {
    let now = (new Date()).getTime();
    let x = now - date;
    if (x <= 0) {
        return "--:--"
    } else {
        let day = Math.floor(x / (1000 * 3600 * 24));
        let hour = Math.floor(x / (1000 * 3600));
        let minute = Math.floor(x / (1000 * 60))
        let second = Math.floor(x / 1000)
        if (day > 0) {
            return day + (day > 1 ? " days ago" : " day ago")
        }
        if (hour > 0) {
            return hour + (hour > 1 ? " hours ago" : " hour ago")
        }
        if (minute > 0) {
            return minute + (minute > 1 ? " minutes ago" : " minute ago")
        }
        if (second > 0) {
            // return second + (second > 1 ? " seconds ago" : "second ago")
            return "few seconds ago"
        }
    }
}

export const formatHourMinute = (x: any) => {
    let date = new Date(x)
    let hour: any = date.getHours();
    let minute: any = date.getMinutes();
    if (minute < 10) { minute = "0" + minute }
    if (hour < 10) { hour = "0" + hour }
    return hour + ":" + minute
}