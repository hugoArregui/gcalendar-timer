# gcalendar-timer
Google Calendar as a timer using webtask.io and IFTTT

## Setup

- [Optional but recommended] Create a new calendar on your Gcalendar account, configure the notification as you like.
- Add [this recipe](https://ifttt.com/recipes/376452-forward-post-request-with-quick-add-to-google-calendar) to your IFTTT with the event name set to "timer_add".
- Create the webtask `wt create --secret KEY=<YOUR MAKER KEY> timer.js`

## Usage

Just make a request to the webtask URL with some of the following parameters:

- time [**required**]: MINUTES|HOURS:MINUTES
- name [optional]: name of the calendar event
- tz   [optional]: timezone, default: UTC

