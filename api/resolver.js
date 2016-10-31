var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  var sample = '<div style="overflow: hidden;border-color: height: 94px; black;border-width: 1px;border-style: solid;"> <img src="https://d.ibtimes.co.uk/en/full/1356835/number-2-u-s-president-barack-obama-second-most-admired-person-planet.jpg?w=400" alt="Smiley face" height="42" width="42" style=" max-width: 117px; max-height: 117px;    width: auto;    height: auto;    float: left;">   <div style="    width: 200px;    display: inline-block;    padding-left: 20px;    height: 90px;    position: relative;">    <div style="      position: absolute;     top: 15%;     height: 6em;">    <span style="     font-family: &quot;Avenir Next&quot;;     font-size: 20px; color:#515151;">Marty Kausas</span>      <br>    <span style="font-family: &quot;Avenir Next&quot;;font-size: 13px; color:#515151;">Developer @      <a href="https://mixmax.com/" target="_blank" style="text-decoration:none; color: #A014BE;">Mixmax</a>    </span><br><a style="font-family: &quot;Avenir Next&quot;; font-size: 13px; color: #428CFF;">Add to Contacts</a>      </div>    </div></div>';

  res.json({
    body: sample
    // Add raw:true if you're returning content that you want the user to be able to edit
  });

  console.log(term);
};



function handleIdString(id, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'http://api.giphy.com/v1/gifs/' + encodeURIComponent(id),
      qs: {
        api_key: key
      },
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var image = response.body.data.images.original;
  var width = image.width > 600 ? 600 : image.width;
  var html = '<img style="max-width:100%;" src="' + image.url + '" width="' + width + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
}

function handleSearchString(term, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'http://api.giphy.com/v1/gifs/random',
      qs: {
        tag: term,
        api_key: key
      },
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var data = response.body.data;

  // Cap at 600px wide
  var width = data.image_width > 600 ? 600 : data.image_width;
  var html = '<img style="max-width:100%;" src="' + data.image_url + '" width="' + width + '"/>';
  res.json({
    body: html
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
}
