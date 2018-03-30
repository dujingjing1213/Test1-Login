export default class Story{   //导出对象

    constructor(content){ //构造函数 对创建此对象的数组函数的引用

        this.content=content;

    }
    Given(context) {

        this.event("given",context);

    }
    When(context){

        this.event("when",context);

    }

    

    Then(context){

        this.event("then",context);

    }

    

    event(event,context){

        console.log(`It's a ${event}: ${context}`);

    }



    Play(){

        for (let index = 0; index < this.content.length; index++) {

            const strContent = this.content[index];

            const key=strContent.substr(0,strContent.indexOf(":"));

            const message=strContent.substr(strContent.indexOf(":")+1);

            switch (key) {

                case "Given":

                    this.Given(message);

                    break;

                case "When":

                    this.When(message);

                    break;

                case "Then":

                    this.Then(message);

                    break;

                default:

                    this.event(key,message);

                    break;

            }




            
        }

    }

}