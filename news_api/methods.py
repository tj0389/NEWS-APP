import requests
import bs4
import json

def get_headers():
    return {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-IN,en-US;q=0.9,en;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "cookie": "_ga=GA1.2.474379061.1548476083; _gid=GA1.2.251903072.1548476083; __gads=ID=17fd29a6d34048fc:T=1548476085:S=ALNI_MaRiLYBFlMfKNMAtiW0J3b_o0XGxw",
        "origin": "https://inshorts.com",
        "referer": "https://inshorts.com/en/read/",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
        "x-requested-with": "XMLHttpRequest"
    }

def get_news(news_offset=None):
    
    if (news_offset==None):
        data=requests.get("https://inshorts.com/en/read").content
    else:
        response=requests.post("https://inshorts.com/en/ajax/more_news", data={"category": "", "news_offset": news_offset},headers=get_headers())
        if response.status_code != 200:
            print("Error Response code ",response.status_code)
            return news_offset
        else:
            response_json = json.loads(response.text)
            data=response_json["html"]
            
    soup=bs4.BeautifulSoup(data,'lxml')
    dic={ 
        "image" : "", 
        "title" : "", 
        "time" : "", 
        "date" : "",
        "author":"",
        "content":"",
        "link":""
    }
    final=[]
    data_all=soup.find_all('div',{'class':'news-card z-depth-1'})
    for data in data_all:
        img=data.find('div',{'class':'news-card-image'})
        dic['image']=img.attrs['style'][23:-3]
        title=data.find('div',{'class':'news-card-title news-right-box'})
        dic['title']=title.span.text
        time=data.find('div',{'class':'news-card-author-time news-card-author-time-in-title'})
        dic['time']=time.find('span',{'class':'time'}).text
        dic['date']=time.find('span',{'clas':'date'}).text
        dic['author']=time.find('span',{'class':'author'}).text
        dic['content']=data.find('div',{'itemprop':'articleBody'}).text
        more=data.find('a',{'class':'source'})
        if (more==None):
            dic['link']="None"
        else:
            dic['link']=more['href']
        final.append(dic.copy())
    
    with open('xyz.json', 'w') as outfile:
        json.dump(final, outfile)
    
    if (news_offset==None):
        nn=soup.find_all('script',{'type':'text/javascript'})
        news_offset=nn[-1].string[25:35]
    else:
        news_offset = response_json["min_news_id"]
    
    return news_offset
