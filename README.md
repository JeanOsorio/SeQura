# SeQura Frontend Technical Test by Jean Osorio

## How to use the library
### Development Mode

You need to install the dependecies and then run the server with the following commands

```bash
npm install
npm start
```
During development mode the library is going  you would have two method available on the window:

#### totalAmount

This method allow you as a develper to send a amount and get a credit agreement. To use this command just write the following command on your browser console:

```javascript
SeQura.totalAmount(39999)
```

Paramether of the method is the total value of a product including the taxes and the last two digits represent the decimal numbers, i.e: 399.99  would be 39999.

> Just in case, is the user send the amount with comma or dot as decimal indicator, we are going to remove it, also you can sent the amount as a string

#### track

This method allow the user or the developer to send some metrics to backend endpoint. To use this method just writt the followin on your commando tab of your browser:

```javascript
SeQura.track({"context":"checkoutWidget", "type":"simulatorInstalmentChanged", "selectedInstalment": 12})
```

### Production Mode

> For the production mode we are assuming that the JS files is serve from http://locahost:8082

 1. install dependencies using the following commando 

```bash
npm install
``` 
 2. Generate the JavaScript file using the following command:

```bash
npm run build:prod
```
 3. Serve the library using the following command
```bash
npx http-server public -p 8082
```
4. Add the following tag to the head of your html page
```html
  <script type="text/javascript" src="http://localhost:8082/sequra.js"></script>
```
 5. Initialice the widget with the following commando (the merchandId is a random number to simulate a merchand identifier o merchan token in the SeQura enviroment). 
```html
  <script type="text/javascript">
    SeQura.init({merchantId: "1a2b3c4d5e6f7g8h9i"});
  </script>
```
 6. Add the following div with the id `SeQura` where do you want the SeQura widget it is going to appear. i.e.:
```html
<div id="SeQura"></div>
```
 7. When the page is ready you should send the initial amount of the product in order to get a SeQura credit agreement, i.e.:

```javascript
function getSeQuraPayments() {
 const sequraElement = document.querySelector('[data-test-id="SeQuraPayments"]');
 if(!sequraElement) {
   setTimeout(getSeQuraPayments, 200);
   return;
 }
 SeQura.totalAmount("399.99");
}

getSeQuraPayments();
```
then you would see something like this:

![SeQura Widget](docImages/widget.png "SeQuraWidget")


## How the widget works



### TODO List

- [X] Create a library without using create-react-app
- [X] Expose an init method to allow merchant to initialize the library with a tokenId
- [X] Expose an unmount method to remove react component library on merchant product page
- [X] Expose a track method to allow merchant to send event to event API
- [X] Espose a totalAmount to allow merchant to request a financial value
- [X] Show select and modal component as show in mockup file
- [ ] Allow merchant to styled the components
- [ ] Create a buffer using a weakMap for the track method instead of sending the events instantly


