"use latest";
var request = require('request@2.56.0');
var dateformat = require('dateformat@1.0.11');

module.exports = function (ctx, cb) {
  const URL = 'https://maker.ifttt.com/trigger/timer_add/with/key/'

  function parse(time) {
    if (!time) { return false; }
    let r = time.split(':');
    for (let n of r) {
      if (isNaN(n)) {
        return false;
      }
    }
    if (r.length == 1) {
      return [0, r[0]];
    } else if (r.length == 2) {
      return r;
    } else {
      return false;
    }
  }

  function min2mil(min) { return min * 60 * 1000; }
  function hour2mil(h) { return min2mil(h * 60); }
  function toUTC(date) {
    return new Date(date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate(),
                    date.getUTCHours(),
                    date.getUTCMinutes(),
                    date.getUTCSeconds());
  }

  //params
  let time = parse(ctx.data.time); //required
  let tz = ctx.data.tz ? ctx.data.tz : 0;
  let message = ctx.data.name ? ctx.data.name : 'Timer Stop';

  if (!time) {
    cb(null, 'Error');
    return false;
  }
  let hours = time[0];
  let minutes = time[1];

  let from = toUTC(new Date(
    Date.now() + hour2mil(hours) + min2mil(minutes) + hour2mil(tz)));
  let hour_from = dateformat(from, 'HH:MM');
  let hour_to = dateformat(new Date(from.getTime() + min2mil(1)), 'HH:MM');
  let date = dateformat(from, 'mm/dd/yyyy');
  let quick = `${message} from ${hour_from} to ${hour_to} on ${date}`;
  request.post(URL + ctx.data.KEY).form({'value1': quick});

  cb(null, 'Ok');
}
