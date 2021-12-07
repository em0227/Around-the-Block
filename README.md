## Around the Block

---

Around the Block is a user-friendly app designed for seniors to join social events and make new friends.
Live Site: http://mern-around-the-block.herokuapp.com/

### Background and Overview

---

Have you ever thought about whether your parents or grandparents are still in touch with the world around them? Have you ever worried about if they are happy and healthy when you are not around? According to the [U.S. Department of Health and Human Services](https://acl.gov/sites/default/files/Aging%20and%20Disability%20in%20America/2020ProfileOlderAmericans.Final_.pdf) by the end of 2019, the population of age 65+ in the United States was 54.1 million. What technology can do to help seniors enjoy their social life has become the main goal Around the Block wants to achieve.

As an app designed for the elderly to participate in social events, Around the Block can:

- Clean and simple design with large font size, thus it's easier for our target users to navigate.
- Allow users to signup and login using voice-to-text technology.
- Let users create accounts and recommend friends to join the app.
- Allow users to host events by creating events and providing details such as title, description, location, time and images.

### Technologies

---

- Backend: MongoDB/Express
  Stores users and events data using document data structure, provides better read performance, as well as the ability to retrieve related data with a single database query.

- Frontend: React/Node.js
  Using Axios library, with good defaults to work with JSON data, to make XMLHttpRequests from the browser for a better error handlers.

- Speech Recognition:
  Translate user's input speech into text by following provided command option to signup/login users.

- AWS
  Around the block host user's events' images using AWS to increase app speed and agility.

### Feature: SpeechRecognition for sign-up/login form

---

We utilized the SpeechRecognition interface of the Web Speech API on our sign-up/login form, so when users say keywords like "name", "email", "password" and "submit", it will trigger the change of input fields and capture the corresponding input to the fields.

By strategically arranging the if/else conditions, we make sure that we have the right input in the right fields if user follows our convention saying **"my name is ..., my email is .... my password is ..., submit!"**

```javascript
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
....
mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      if (transcript.includes("submit")) {
      //cleaned up the spaces in the email field and submit
      } else if (transcript.includes("password")) {
        // slice and replace certain keywords in the transcript to have the right password input
        // use this.setState to dynamically set the password field

      } else if (transcript.includes("email")) {
        // slice and replace certain keywords (such as "at" to "@") in the transcript to have the right email input
        // use this.setState to dynamically set the email field

      } else if (transcript.includes("name")) {
        // slice and replace certain keywords in the transcript to have the right name input
        // use this.setState to dynamically set the name field
      }
}
```
