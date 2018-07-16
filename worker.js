importScripts('./openjpeg.js');
onmessage = function(e) {
  const src = e.data[0];
    console.log('Message received from main script: '+src);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src);
    xhr.mozResponseType = xhr.responseType = 'arraybuffer';

    xhr.onreadystatechange = function(e) {
      if (xhr.readyState !== 4)
        return;

      if (xhr.status !== 200 && xhr.status !== 0)
        throw "Error in XHR response (status = "+xhr.status+")";

      var buffer = (xhr.mozResponseArrayBuffer || xhr.mozResponse ||
                  xhr.responseArrayBuffer || xhr.response);

      var bytes = new Uint8Array(buffer);
      var t0 = new Date().getTime();
      var rgbImage = openjpeg(bytes, 'jp2');
      console.log('Posting message back to main script');
      postMessage([rgbImage]);
    }
    xhr.send(null); 
  }