var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// var sample = '<img src="https://d.ibtimes.co.uk/en/full/1356835/number-2-u-s-president-barack-obama-second-most-admired-person-planet.jpg?w=400" alt="Smiley face" height="42" width="42" style="width: 366px;height: 276px;float: left;">';
var sample = '<div style="overflow: hidden;border-color: black;border-width: 1px;border-style: solid;"> <img src="https://d.ibtimes.co.uk/en/full/1356835/number-2-u-s-president-barack-obama-second-most-admired-person-planet.jpg?w=400" alt="Smiley face" height="42" width="42" style=" max-width: 117px; max-height: 117px;    width: auto;    height: auto;    float: left;">   <div style="    width: 200px;    display: inline-block;    padding-left: 10px;    height: 90px;    position: relative;">    <div style="      position: absolute;     top: 15%;     height: 6em;">    <span style="     font-family: &quot;Avenir Next&quot;;     font-size: 20px; color:#515151;">Marty Kausas</span>      <br>    <span style="font-family: &quot;Avenir Next&quot;;font-size: 13px; color:#515151;">Developer @      <a href="https://mixmax.com/" target="_blank" style="text-decoration:none; color: #A014BE;">Mixmax</a>    </span><br><a style="font-family: &quot;Avenir Next&quot;; font-size: 13px; color: #428CFF;">Add to Contacts</a>      </div>    </div></div>';


// readTextFile("mixmax.html");

// function setSample(text) {
//   sample = [text, text];
// }

// function readTextFile(file) {
//   var rawFile = new XMLHttpRequest();
//   rawFile.open("GET", file, false);
//   var allText = "";
//   rawFile.onreadystatechange = function () {
//     if(rawFile.readyState === 4) {
//       if(rawFile.status === 200 || rawFile.status == 0) {
//         setSample(rawFile.responseText);
//         allText = rawFile.responseText;
//       }
//     }
//   }
//   rawFile.send(null);
// }

function SignatureCard() {

  this.imageURL = "";
  this.name = "";
  this.role = "";
  this.place = "";
  this.placeURL = "";

  // links contain map of types
  this.links = {"github_url": null, "resume_link": nill};

}

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var response;
  try {
    response = sync.await(request({
      url: 'http://api.giphy.com/v1/gifs/search',
      qs: {
        q: term + ' cats',
        limit: 15,
        api_key: key
      },
      gzip: true,
      json: true,
      timeout: 10 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  if (response.statusCode !== 200 || !response.body || !response.body.data) {
    res.status(500).send('Error');
    return;
  }

  var results = _.chain([2, 3])//response.body.data)
    // .reject(function(image) {
    //   return !image || !image.images || !image.images.fixed_height_small;
    // })
    .map(function(image) {
      return {
        title: sample,
        text: 'stuff'//'http://giphy.com/' + image.id
      };
    })
    .value();

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
};