## Live Demo

[https://app.phrblox.com](https://app.phrblox.com)

## อ่านก่อน 

App นี้จะใช้ User Authentication ด้วย Firebase นะครับ ซึ่งก่อนที่จะ Run App นี้ให้ทำการ Connect Firebase ก่อน
1.	สร้างตาราง (New Child) ขึ้นมาครับ ในชื่อ configs เพื่อที่เก็บข้อมูล ดังนี้ 
o	access_token: Access token ที่ได้จากการ auth ใน App Hyperledger Composer REST server
o	rest_url: คือ URL ของ Hyperledger Composer REST Server 
2.	เมื่อทำการ Setting ข้อมูลใน firebase แล้ว ให้เข้าไปแก้ไขโค้ด ในส่วนของ  Initialize Firebase ซึ่งเป็น Object ที่ได้มากจาก Firebase เอาไปแทนที่ในไฟล์ src > config > firebase.js  ครับ 


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!