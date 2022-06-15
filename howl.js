/** Music object */
const sel = new Howl({
  src: ['select1.m4a'],
  sprite: {
    start: [0, 7000],
    main: [7000, 120000, true]
  }
});



/** Was the music started? */
sel.startplayed = false;


/** Play the music from start */
sel.playfromstart = function() {
  console.log('Playing from start');
  sel.startplayed = true;


  sel.volume(1);
  sel.play('start');
  sel.once('end', function() {
    sel.play('main');
    console.log('Start main');
  });


  // Informational log
  sel.on('end', function() {
    console.log('Loop repeat');
  });
}





/** Custom handle for completely stopping the music */
sel.compstop = function() {
  sel.startplayed = false;
  sel.off(); // Clear all events
  sel.stop();
};



document.getElementById('play').onclick = () => 
{
  if (!sel.playing()) {
    if (sel.startplayed) sel.play();
    else sel.playfromstart();
  }
};

document.getElementById('pause').onclick = () => 
{
  sel.pause();
};

document.getElementById('stop').onclick = () => 
{
  sel.compstop();
};

document.getElementById('stopfo').onclick = () => 
{
  sel.fade(1, 0, 2000);
  sel.once('fade', function() {
    sel.compstop();
  });
};
