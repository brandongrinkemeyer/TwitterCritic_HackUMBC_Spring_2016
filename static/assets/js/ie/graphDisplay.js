var Button = (function() {
function Button() {
var $this_1 = this;
function $superCstr(){$p.extendClassChain($this_1)}
$this_1.x = 0;
$this_1.y = 0;
$this_1.w = 0;
$this_1.h = 0;
$this_1.c = 0x00000000;
$this_1.l = null;
$this_1.prevClicked =  false;
function display$0() {
$p.noStroke();
        $this_1.$self.listener();
        $p.fill($this_1.c);
        $p.rect($this_1.x, $this_1.y, $this_1.w, $this_1.h);
}
$p.addMethod($this_1, 'display', display$0, false);
function listener$0() {
if($this_1.x < $p.mouseX && $this_1.x + $this_1.w > $p.mouseX && $this_1.y < $p.mouseY && $this_1.y + $this_1.h > $p.mouseY) {
$this_1.$self.mouseoverEvent();

          if ($p.__mousePressed && $p.mouseButton == $p.LEFT) {
$this_1.prevClicked = true;
}
          if (!$p.__mousePressed && $this_1.prevClicked) {
$this_1.prevClicked = false;
            $this_1.$self.leftClickEvent();
}
}
        else if (!$p.__mousePressed && $this_1.prevClicked) {
$this_1.prevClicked = false;
}
}
$p.addMethod($this_1, 'listener', listener$0, false);
function leftClickEvent$0() {
if ($this_1.l != null)
          $p.link($this_1.l);
}
$p.addMethod($this_1, 'leftClickEvent', leftClickEvent$0, false);
function mouseoverEvent$0() {
$p.stroke(255);
}
$p.addMethod($this_1, 'mouseoverEvent', mouseoverEvent$0, false);
function $constr_6(x, y, w, h, c, l){
$superCstr();

$this_1.x = x;
        $this_1.y = y;
        $this_1.w = w;
        $this_1.h = h;
        $this_1.c = c;
        $this_1.l = l;
}

function $constr() {
if(arguments.length === 6) { $constr_6.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
return Button;
})();
$p.Button = Button;
var TweetButton = (function() {
function TweetButton() {
var $this_1 = this;
var $super = { $upcast: $this_1 };
function $superCstr(){Button.apply($super,arguments);if(!('$self' in $super)) $p.extendClassChain($super)}
function $constr_3(positivity, popularity, link){
$superCstr($p.__int_cast(($p.map(positivity, (float)-1, 1, PROFILE_IMAGE_SIZE, $p.width - PROFILE_IMAGE_SIZE))),
            $p.__int_cast(($p.map(buttons.size(), 0, MAX_COLLECTION_SIZE, PROFILE_IMAGE_SIZE, $p.width - PROFILE_IMAGE_SIZE))),
            $p.__int_cast((5 * Math.log10(popularity + 10))),
            $p.__int_cast((5 * Math.log10(popularity + 10))),
            $p.color($p.random(255), $p.random(255), $p.random(255)),
            link);
      var red =  $p.__int_cast(($p.map(positivity, (float)-1, 0, 255, 100)));
      var green =  $p.__int_cast(($p.map(positivity, 0, 1, 100, 255)));
      var blue =  $p.__int_cast(($p.map(Math.abs(positivity), 0, (float).25, 255, 0)));
             $this_1.c = $p.color(red,green,blue);
}

function $constr() {
if(arguments.length === 3) { $constr_3.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
$p.extendStaticMembers(TweetButton, Button);
TweetButton.$base = Button;
return TweetButton;
})();
$p.TweetButton = TweetButton;
var ProfileButton = (function() {
function ProfileButton() {
var $this_1 = this;
var $super = { $upcast: $this_1 };
function $superCstr(){Button.apply($super,arguments);if(!('$self' in $super)) $p.extendClassChain($super)}
function display$0() {
$super.display();
        if (profileImg != null) {
$p.image(profileImg, $this_1.x, $this_1.y, PROFILE_IMAGE_SIZE, PROFILE_IMAGE_SIZE);
}
}
$p.addMethod($this_1, 'display', display$0, false);
function $constr_6(x, y, w, h, c, l){
$superCstr(x, y, w, h, c, l);
}

function $constr() {
if(arguments.length === 6) { $constr_6.apply($this_1, arguments); } else $superCstr();
}
$constr.apply(null, arguments);
}
$p.extendStaticMembers(ProfileButton, Button);
ProfileButton.$base = Button;
return ProfileButton;
})();
$p.ProfileButton = ProfileButton;

   var profileImg = null;
   var profileURL = null;
   var buttons =  new $p.ArrayList ();
   var PROFILE_IMAGE_SIZE =  100;
   var MAX_COLLECTION_SIZE =  100;
   var TEST_PROFILE_1 =  "KANYE_DATA.txt";        var TEST_PROFILE_2 =  "KANYE_DATA_2.txt";      var TEST_PROFILE_3 =  "TYLER_DATA.txt";        
   var f = null,t = null;

   function setup() {
$p.size(800, 800);
     $p.strokeWeight(3);
     f = $p.loadFont("FranklinGothic-Book-48.vlw");
     t = $p.loadFont("VladimirScript-48.vlw");
     $p.textFont(f, 18);

     profileURL = "https://twitter.com/NoodleSelf";
     profileImg = $p.loadImage("https://pbs.twimg.com/profile_images/504287439511617536/SzagAEPy.jpeg");
     var data =  $p.loadStrings("TYLER_DATA.txt");

           for (var i =  0;  i < data.length;  i += 3) {
var link =  "https://twitter.com/statuses/" + data[i];
       var positivity =  Double.parseDouble(data[i + 1]);
       var popularity =  Integer.parseInt(data[i + 2]);
       buttons.add(new TweetButton(positivity, popularity, link));
}

     buttons.add(new ProfileButton(10, 10, PROFILE_IMAGE_SIZE, PROFILE_IMAGE_SIZE, $p.color(102, 117, 127), profileURL));
}
$p.setup = setup;

   function draw() {
$p.background(85, 172, 238);

     for(var $it0 = new $p.ObjectIterator( buttons), b  = void(0); $it0.hasNext() && ((b  = $it0.next()) || true);) {
b.display();
}

     contextItems();
}
$p.draw = draw;

    function contextItems() {
$p.fill(255);

     $p.textFont(t, 56);
     $p.textAlign($p.CENTER, $p.BOTTOM);
     $p.text("TwitterCritic", $p.width/2, 60);
     $p.textFont(f, 22);
     $p.text("positivity analysis of: " + profileURL, $p.width/2, 80);
     $p.textFont(f, 18);
     $p.textAlign($p.LEFT, $p.BOTTOM);
     $p.text("Newer Tweets", PROFILE_IMAGE_SIZE/2, PROFILE_IMAGE_SIZE + 50);
     $p.text("Older Tweets", PROFILE_IMAGE_SIZE/2, $p.height - PROFILE_IMAGE_SIZE);
     $p.text("Negative", PROFILE_IMAGE_SIZE, $p.height - 60);
     $p.text("Positive", $p.width - PROFILE_IMAGE_SIZE - 60, $p.height - 60);

     $p.stroke(255);     
     $p.line(PROFILE_IMAGE_SIZE/3, PROFILE_IMAGE_SIZE + 40, PROFILE_IMAGE_SIZE/3, $p.height - PROFILE_IMAGE_SIZE);
     $p.line(PROFILE_IMAGE_SIZE, $p.height - 40, $p.width - PROFILE_IMAGE_SIZE, $p.height - 40);
}
$p.contextItems = contextItems;
