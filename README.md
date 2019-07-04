# Resume

This is the soure code to my resume site: http://nicopretorius.com. It runs on angular.io and bootstrap and uses a single json file to format your CV.

## Setup

Clone the project with `git clone https://github.com/nicopret/resume.git`

Go the the resume folder and run `npm install`

Once this is done, run the site with `npm start`, and voila!

## Your own stuff

Go to the `assets` folder and open the `resume.json` file. Update this file with your own information and save, once done and saved you will see your details in your browser.

O yes, remember to change the `title` tag in the `index.html` file in the root directory, you want your name & title to display in the browser tag :)

## Hosting

I'm using S3 to host the site, it's easy and cheap.

Once you are ready to publish your resume, just run `npm run build` from the command line. This will create the folder `dist/resume` with all the files you need in there. Just drop those files into your hosting location.

## Still to do

There are no unit testing or end-to-end testing. I know, bad bad me, and I do feel terrible, but this was a quick application I did in my spare time over 2 days. So the testing is high priority on what must still be done.

I also want to render a word and pdf download automatically from the JSON file, I reckon this will be the next step, after that, unit testing and e2e testing.

If you have want me to add anything more, please let me know :)