import Story from "./story.mjs"

//import webdriver from "selenium-webdriver"



export default class LoginStory extends Story{

    constructor(arrStory){

        super(arrStory);

        this.username="";//新变量

        this.password="";

        this.expected="";

        this.actual="";

    }



    getValue(message){

        let value="";

        const reg=/\[.*\]/;

        if(reg.test(message)) {

            value=reg.exec(message)[0];

            value=value.substr(1,value.length-2);

        }



        return value;

    }



    When(message){

        super.When(message);

        let value=this.getValue(message);

        if(/enter\suser\sname/i.test(message)) this.username=value;//匹配字符串~~i.忽略大小写~~\s空格

        if(/enter\spassword/i.test(message)) this.password=value;

    }



    Then(message){
        super.Then(message);
        this.expected=this.getValue(message);
        let driver= new webdriver.Builder().forBrowser("chrome").build();

        const login_url='https://everdoc.github.io/hellojs/login.html';

        driver.get(login_url);

        driver.wait(webdriver.until.titleIs("Login Quize"), 1000*10)

        .then((success)=>{

            console.log("Enter:",this.username);

            console.log("Enter:",this.password);

            driver.findElement(webdriver.By.id('name')).sendKeys(this.username);

            driver.findElement(webdriver.By.id('password')).sendKeys(this.password);

            driver.findElement(webdriver.By.tagName('button')).click();



            driver.findElement(webdriver.By.id('result')).getText().then((message)=>{

                this.actual=message;

                console.log("Expected:",this.expected);

                console.log("Actual:", this.actual);

                let isPass=new RegExp(this.expected,'i').test(this.actual);

                console.log("The case is", isPass?"PASS":"FAIL");

                driver.quit();

            });

            },(reason)=>{

                console.log(reason);

                driver.quit();

        });



    }

}