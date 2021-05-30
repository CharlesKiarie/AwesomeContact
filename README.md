# AwesomeContact - A simple backend-service to process your contact forms...

This project was built to expose a simple endpoint that contact forms can post to a bit of back-end magic amd boom you recieve an email in your desired email service linked to said enpoint. We then could redirect the user to a custom html page you specified or a default one hosted by AwesomeContact.

`[https://awesomecontact/asHSYUS76887ahsgdyts/]`

## Technologies used:
- Node js
- Nodemailer
- Aws ses
- Heroku
- Bcrypt
- MongoDB(Mongodb Atlas)
- express, express-validator, express-sessions

## Notes & Considerations

An ambitious project to build something from scratch....I implemented the mvp with custom sign up and logins and realised I never want to do that on my own ever again it was suxh a headache. Most recent project I am using passport and google for authentication.

I forgot my email and password

The app used aws-ses to send emails to users and all the logic going into managing who an email belongs(a user) and a user can have many emails registered to awesomeContacts endpoints and they could have many thank-you pages.

To prevent losing emails to wierd edge case bugs I used a mailer queue that always ensured a processed contact form's data would always be saved on a mongodb database then processed and sent by the mailer using nodemailer through aws-ses services.

## Why I benched the project/failed

- I had no way to process subscription payments not a lot of payment platforms like stripe in Africa :(
- I got a job(this project helped)
- I was **embarrassed** of what I built(good ol' imposter syndrome)
- I never wrote proper documentation for it on launch it was a medium post I wrote up explaining how to set it up.

## Will i be relaunching it?

Yes, definitely learnt a lot gonna use paypal to charge customers. I will have to rebuild the UI again and include proper beautiful documentation.

Had fun with it and is still always on the back of my mind would be cool to re-launch and go at it seriously again :)

## Screenshots

Looks decent but needs more work don't yuh think.

![Landing page](https://drive.google.com/uc?export=view&id=1hn16H-kXTmbwqCdYfNU6ZrCA1elpWy3g)

Implemented with bcrypt and good ol' validation and custom sign up management code.

![Signup page](https://drive.google.com/uc?export=view&id=12_s1FQlumyW7NjSXSYO8D2lhOLFDlFr9)

Yes, I love lucky star...awesomeContacts default thank you page

![Thankyou page](https://drive.google.com/uc?export=view&id=1AEFh_O6IeiHf8D7B_dwIu-kOCoTAzFdt)

