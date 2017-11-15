import { Component } from "react";

export default class Util extends Component {
  static compare(a, b) {
    console.log("Came here");
    if (a.timestamp < b.timestamp) return 1;
    if (a.timestamp > b.timestamp) return -1;
    return 0;
  }
  static formatDate(date) {
    var d, hours, monthNames, mid;
    d = new Date();
    hours = d.getHours();
    monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    mid = "AM";
    if (hours === 12) {
      //At 00 hours we need to show 12 am
      mid = "PM";
    } else if (hours > 12) {
      hours = hours % 12;
      mid = "PM";
    }
    return `${("0" + d.getDate()).slice(-2)} ${monthNames[
      d.getMonth()
    ]} ${d.getFullYear()} ${("0" + hours).slice(-2)}:${("0" + d.getMinutes()
    ).slice(-2)} ${mid}`;
  }
}
