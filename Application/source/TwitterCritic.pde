   PImage profileImg;
   String profileURL;
   ArrayList <Button> buttons = new ArrayList <Button>();
   final int PROFILE_IMAGE_SIZE = 100;
   final int MAX_COLLECTION_SIZE = 100;
   final String TEST_PROFILE_1 = "KANYE_DATA.txt";    //Kanye test tweets, s.1
   final String TEST_PROFILE_2 = "KANYE_DATA_2.txt";  //Kanye test tweets, s.2
   final String TEST_PROFILE_3 = "TYLER_DATA.txt";    //Tyler The Creator test tweets, s.1
   
   PFont f, t;
  
   public void setup() {
     size(800, 800);
     strokeWeight(3);
     f = loadFont("FranklinGothic-Book-48.vlw");
     t = loadFont("VladimirScript-48.vlw");
     textFont(f, 18);
  
     String [] data = loadStrings("DATA_FINAL_TEST.txt");
     
     profileURL = "https://twitter.com/" + data[0];
     profileImg = loadImage(data[1]);
     
     //Parses the DATA text file and builds the buttons, storing them in buttons.
     for (int i = 2; i < data.length; i += 3) {
       String link = "https://twitter.com/statuses/" + data[i];
       double positivity = Double.parseDouble(data[i + 1]);
       int popularity = Integer.parseInt(data[i + 2]);
       buttons.add(new TweetButton(positivity, popularity, link));
     }
     
     buttons.add(new ProfileButton(10, 10, PROFILE_IMAGE_SIZE, PROFILE_IMAGE_SIZE, color(102, 117, 127), profileURL));
     
     ////Generic, random test buttons.
     //for (int i = 100; i > 0; i--) {
     // new Button((int)random(PROFILE_IMAGE_SIZE, width - PROFILE_IMAGE_SIZE), (int)random(PROFILE_IMAGE_SIZE, height - PROFILE_IMAGE_SIZE), 20, 20, color(random(255), random(255), random(255)), "https://www.reddit.com/");
     //}
   }
  
   public void draw() {
     background(85, 172, 238);
     
     
     
     for(Button b : buttons) {
       b.display();
     }
     
     //if (profileImg != null) {
     //  image(profileImg, 0, 0, PROFILE_IMAGE_SIZE, PROFILE_IMAGE_SIZE);
     //}
     
     contextItems();
    }
   
    public void contextItems() {
     fill(255);
     
     textFont(t, 56);
     textAlign(CENTER, BOTTOM);
     text("TwitterCritic", width/2, 60);
     textFont(f, 22);
     text("positivity analysis of: " + profileURL, width/2, 80);
     textFont(f, 18);
     textAlign(LEFT, BOTTOM);
     text("Newer Tweets", PROFILE_IMAGE_SIZE/2, PROFILE_IMAGE_SIZE + 50);
     text("Older Tweets", PROFILE_IMAGE_SIZE/2, height - PROFILE_IMAGE_SIZE);
     text("Negative", PROFILE_IMAGE_SIZE, height - 60);
     text("Positive", width - PROFILE_IMAGE_SIZE - 60, height - 60);
     
     
     
     stroke(255);     
     line(PROFILE_IMAGE_SIZE/3, PROFILE_IMAGE_SIZE + 40, PROFILE_IMAGE_SIZE/3, height - PROFILE_IMAGE_SIZE);
     line(PROFILE_IMAGE_SIZE, height - 40, width - PROFILE_IMAGE_SIZE, height - 40);
    }
  

    class Button {
      int x;         //x-coord of top left corner
      int y;         //y-coord of top left corner
      int w;         //width
      int h;         //height
      color c;       //color
      String l;      //hyperlink connected to button click
      
      boolean prevClicked = false;
      
      Button(int x, int y, int w, int h, color c, String l) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.l = l;
  
      }
      
      public void display() {
        noStroke();
        listener();
        fill(c);
        rect(x, y, w, h);
      }
      
      public void listener() {
        if(x < mouseX && x + w > mouseX && y < mouseY && y + h > mouseY) {
          mouseoverEvent();
          
          if (mousePressed && mouseButton == LEFT) {
            prevClicked = true;
          }
          if (!mousePressed && prevClicked) {  //Activates after a press and release while still on the button.
            prevClicked = false;
            leftClickEvent();
          }
          
        }
        else if (!mousePressed && prevClicked) {  //Releases the click-state without activating the behavior when the mouse is moved while held.
            prevClicked = false;
        }
      }
      
      public void leftClickEvent() {
        if (l != null)
          link(l);
      }
      
      public void mouseoverEvent() {
        stroke(255);
      }  
      
    }
  
  class TweetButton extends Button {
    public TweetButton(double positivity, int popularity, String link) {
      super((int)(map((float)positivity, (float)-1, (float)1, (float)PROFILE_IMAGE_SIZE, (float)width - PROFILE_IMAGE_SIZE)),
            (int)(map((float)buttons.size(), (float)0, (float)MAX_COLLECTION_SIZE, (float)PROFILE_IMAGE_SIZE, (float)width - PROFILE_IMAGE_SIZE)),
            (int)(5 * Math.log10(popularity + 10)),
            (int)(5 * Math.log10(popularity + 10)),
            color(random(255), random(255), random(255)),
            link);
      int red = (int)(map((float)positivity, (float)-1, (float)0, (float)255, (float)100));
      int green = (int)(map((float)positivity, (float)0, (float)1, (float)100, (float)255));
      int blue = (int)(map((float)Math.abs(positivity), (float)0, (float).25, (float)255, (float)0));
      //System.out.println("Red: " + red + " Green: " + green);
      c = color(red,green,blue);
    }
    
  }
  
  class ProfileButton extends Button {
    
    public ProfileButton(int x, int y, int w, int h, color c, String l) {
      super(x, y, w, h, c, l);
    }
    
    public void display() {
        super.display();
        if (profileImg != null) {
           image(profileImg, x, y, PROFILE_IMAGE_SIZE, PROFILE_IMAGE_SIZE);
        }
      }
    
  }