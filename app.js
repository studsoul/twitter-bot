var twit = require('twit')
var fs = require('fs')

var T = new twit({
    consumer_key:         'qHZWVEtxZ1bmsIINR1dKJRkBw',//consumer_key
    consumer_secret:      '5Mqmade9kXvTLE4SrgpnBvCp4zOC1qEPoEAe2XgmtlS2jln1kq',//consumer_secret
    access_token:         '1282023413318430720-kGiMWyWzQ2UgMcSTXqHbNZ2ECwO4mL',//access_token
    access_token_secret:  'Lab9XeAjFOKUlm7veeSKkF7WSDyUu00WvSg3Dk90tZrwL',//access_token secret
})


/*
   Function for uploading image.
   Usage Example:- tweetImage("Text You want to tweet with Image","NameofImage.png/jpg")
*/
  function tweetImage(tweetText , imgName){
    //Converting image to base64 to easily upload image on twitter servers
    var b64content = fs.readFileSync(imgName, { encoding: 'base64' })

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        // now we can assign alt text to the media, for use by screen readers and
        // other text-based presentations and interpreters
        var mediaIdStr = data.media_id_string //After uploading we get an id of the image
        var AltText = tweetText; // Your Alt Text
        var meta_params = { media_id: mediaIdStr, alt_text:{ text: AltText} }

        T.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)

                var Status= tweetText//Your Status
                var params = { status: Status, media_ids: [mediaIdStr] }

                //Now It will post the tweet with the image.
                T.post('statuses/update', params, function (err, data, response) {
                    console.log("Tweeted")// Console Logging if tweeted.
                })
            }
        })
    })
  }
  
  
  /*
    Function to tweet Text.
    Usage example :- tweetText("Text To tweet but remeber the limit of Twitter")
    */
  
  function tweetText(text) {

  var tweet = text;
  //Converting image to base64 to easily upload image on twitter servers
  T.post('statuses/update', { status: tweet }, function (err, data, response) {
    //console.log(data);
    if(err){
      console.log(err)
      return;
    }
    console.log("Tweeted")

  });


}
