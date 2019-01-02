# Real Estate Personal Project

This frontend application will call [AWS Python services](https://github.com/JasonRectorTech/Real_Estate_Python) currently configured to display properties between $75-150 price/sqft in Northwest Arkansas. This project started as a POC to find good deals on real estate investments.

## Demo

Live Demo: You can view a live demo of the app hosted on [AWS](http://real-estate-maps.s3-website.us-east-2.amazonaws.com/www/index.html)
![Alt text](demo-screenshot.jpg?raw=true)

## Configuration

The frontend is currently configured to pull data under the folloing criteria:
* Cities: Bentonville
* Min Price: $130000
* Max Price: $300000
* Min Price/Sqft: $75
* Max Price/Sqft: $150
* Min Sqft: 1,250
* For Sale: true
* Beds: 2+
* Baths: 2+

I'm working on adding a filter feature so I can easily configure these using a UI. I have data from Northwest Arkansas and Tampa Bay:

![Alt text](demo-filter.jpg?raw=true)

## Getting Started

1. Clone frontend repo: https://github.com/JasonRectorTech/Real_Estate_AngularJS.git
2. Clone backend repo: https://github.com/JasonRectorTech/Real_Estate_Python
3. Simply open index.html from the root of the frontend repo in a browser!

## Technical Details
* Cloud: Amazon Web Services
* Database: MySQL (hosted on AWS)
* Backend: Python
* Rest Framework: Flask
* AWS Integration: Beanstalk for Flask Python
* Frontend: Javascript/AngularJS
* Map Platform: Leaflet

## Contact me

LinkedIn https://www.linkedin.com/in/jasonrectortech/

E-mail: Jason.Rector.Tech@gmail.com
