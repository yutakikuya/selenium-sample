//chromeTest.js
var webdriver = require('/usr/local/lib/node_modules/selenium-webdriver');
var fs = require('fs');
var By = webdriver.By;
var Key = webdriver.Key;
var driver = new webdriver.Builder().
    forBrowser('chrome',undefined,'iPhone 6S Plus').
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

var url =
[
    //'http://devadjust.exblog.jp/20033086/',
    'http://localhost/react_app/web-bluetooth-api-sample/dist/',
    'http://docs.seleniumhq.org/download/'
]

webdriver.WebDriver.prototype.saveScreenshot = function(filename)
{
    filename = filename.replace('|' , '_');
    return driver.takeScreenshot().
    then(function(data)
    {
        fs.writeFile
        (
            filename,
            data.replace(/^data:image\/png;base64,/,''),
            'base64',
            function(error)
            {
                if(error) throw error;
            }
        );
    });
};

function sleep(milliSeconds)
{
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

url.forEach
(
    function(uri)
    {
    var fileName = '';
    driver.get(uri).
        then(function()
        {
          driver.findElement(By.tagName("body")).sendKeys(Key.SPACE);
          //driver.findElement(By.tagName("body")).sendKeys(Key.chord(Key.COMMAND, Key.ADD));


            return driver.getTitle();
        }).
        then(function(title)
        {
            fileName = title;
        }).
        then(function()
        {
          driver.executeScript("document.body.style.zoom='200%'");
            return driver.manage().window().maximize();
        }).
        then(function()
        {
            sleep(500);
            return driver.saveScreenshot( fileName + '_max.png');
        }).
        then(function()
        {
            return driver.manage().window().setSize(1024, 768);
        }).
        then(function()
        {
            sleep(500);
            return driver.saveScreenshot( fileName + '_1024x768.png');
        });
    }
);
driver.quit();
