from TwitterSearch import *
import urllib
import json 
import sys
from vaderSentiment import vaderSentiment
def main(argv):    
    tso = TwitterUserOrder(argv[1])
    ts = TwitterSearch(
        consumer_key = 'fZ17sUOUc2hXKANTiaL9YNEKZ',
        consumer_secret = 'L0UfVGtIlHLWICcdu9sbRxNzMJmUud9YQTkqflne2Dy6fQaWyN',
        access_token = '2316010663-Q0ivLBwT5hCiSJICSb1u3PMz4FLhQ1lX6dW2MLj',
        access_token_secret = 'ixhRiHuzshh73jgrgvAR295au9BCAzBG3BPCmDaGlnbVR'
     )
    x=0
    epos=0
    nuetral=0
    neg =0
    eneg = 0
    pos = 0
    first = ''

    f6 = open('Application/data/DATA_FINAL_TEST.txt', 'w')
    f6.write(argv[1]+"\n")
    
    for tweet in ts.search_tweets_iterable(tso):

        if x == 0:
            x +=1
            f6.write(tweet['user']['profile_image_url']+"\n")
        data = 'none'
        text = (tweet['text']).encode('utf-8')
        try:
            data = urllib.urlencode({"text": (tweet['text']).encode('utf-8')}) 
        except:
            data = urllib.urlencode({"text": 'none'}) 
        if text.split( )[0] != 'RT':
            negit = vaderSentiment.sentiment(text)['neg']
            neu = vaderSentiment.sentiment(text)['neu']
            posit = vaderSentiment.sentiment(text)['pos']
    #         u = urllib.urlopen("http://www.socialai.gatech.edu/apps/sentiment.html%20.", data)
    #         read = u.read()
    #         
    #         parsed_json = json.loads(read)
    #       
#             print text 
#             print vaderSentiment.sentiment(text) 
      
            
            posit = posit-negit
           
            if posit > .2:
                if posit < .7 :
#                     print "Positive"

                    pos += 1
                else:
#                     print "Extremely positive"

                    epos += 1 
    
                    nuetral += 1
            elif posit < -.1:
                if posit > -.5:
#                     print "Negative"

        
                    neg += 1
                else:
#                     print "Extremely Negative"

                    eneg += 1 
            else:
#                 print "Neutral"

                nuetral += 1
            if x > 100:
                break
            f6.write((str)(tweet['id_str'])+"\n")
            f6.write((str)(posit)+"\n")
            f6.write((str)(tweet['favorite_count']+5*tweet['retweet_count'])+"\n")
            
            x = x+1
    f6.close()
if __name__ == "__main__":
   main(sys.argv)
