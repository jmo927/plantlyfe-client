# PlantLyfe

This is the client side of the PlantLyfe Plant Watering Scheduler. 
The server-side code can be found [here](https://github.com/jmo927/plantlyfe-server).

## Using PlantLyfe

PlantLyfe comes with a number of plants pre-loaded into the database.  You can add more plants or remove unwanted plants in the **Plants** page. Remember to input how often (in days) the plant needs water!

Once loaded, PlantLyfe will display 12 weeks of plant data.  The day's normally-scheduled plants display in black; plants that are scheduled for the weekend appear on the closest weekday (Saturday's plants on Friday, Sunday's on Monday) in blue; plants you forgot to water are in red.  

To mark a plant as watered, just click the *Water* button below the plants name.  This button only appears during today's schedule.  Clicking the button updates the plant's watering schedule for the rest of the week, so while some future weeks may display your Wavy Fern as being scheduled for Monday (via Sunday) and Tuesday, once watered on Monday the schedule should update accordingly to prevent over-watering.

## Technologies Used
- Vue.js.  JavaScript Framework.
- JavaScript. Part of Vue.
- HTML.  Templating in Vue.
- CSS.  Styling in Vue.
- [Heroku](https://plantlyfe.herokuapp.com)*.  Hosting.

*Note that Heroku's load times can be slow when loaded for the first time.  Thank you for your patience. 

## Acceptance Criteria

### Assumptions

- We do not water our plants on a weekend. Work-life balance is important, and we shouldn't be in
the office on a weekend.
- Our plants are reasonably tolerant and will still be happy if they are watered a day before or after
the day they should be watered.
- Watering an individual plant takes no time at all so you don't have to worry about how many
plants can be watered in a particular day.
- The scheduling should start from next Monday and last for 12 weeks.
- All plants will be watered on the first day of the schedule (next Monday).
- We recognize that when to water a plant is heavily dependent on other factors such as soil,
weather, humidity, etc. You can assume that we know exactly when to water these specific plants.
- You have been provided a JSON file which contains data for our plants.

### Acceptance Criteria

- The user can view which plant(s) to water on which date(s).
- The schedule covers the next 12 weeks starting next Monday.
- No plants are watered on Saturdays or Sundays.
- Each plant is watered on its desired schedule or as close as possible, taking into account weekends.
