export const countdownTimer = (value: number) => {
    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var days = Math.floor(value / _day);
    var hours = Math.floor((value % _day) / _hour);
    var minutes = Math.floor((value % _hour) / _minute);
    var seconds = Math.floor((value % _minute) / _second);
    return { days, hours, minutes, seconds }
}