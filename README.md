# Resume

This is the soure code to my resume site: http://nicopretorius.com. It runs on angular.io and bootstrap and uses a single json file to display your CV.

## Setup

Clone the project with `git clone https://github.com/nicopret/resume.git`

Go the the resume folder and run `npm install`

Once this is done, run the site with `npm start`, and voila!

## Your own stuff

Go to the `assets` folder and open the `resume.json` file. Update this file with your own information and save, once done and saved you will see your details in your browser.

Remember to update the `index.html` file to reflect your details for the social media cards and displays and stuff, otherwise the social sharing won't work that well.

## Hosting

I'm using S3 to host the site, it's easy and cheap.

Once you are ready to publish your resume, just run `npm run build` from the command line. This will create the folder `dist/resume` with all the files you need in there. Just drop those files into your hosting location.

## Still to do

Unit testing is getting there, the code coverage is now just above 67%, should be 100% soon.

I also want to render a pdf download automatically from the JSON file, just working on the layout, want it to look a bit different from the word download.

If you have want me to add anything more, please let me know :)