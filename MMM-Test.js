/* 
    2022.05.25 
    Module first test
*/

Module.register("MMM-Test", {

    /* MagicMirror config.js에 표시. */
    defaults: {
        foo: "I'm Sieun!"
    },

    /* 
        start() 및 updateDom()은 모듈이 성공적으로 로드되면 실행. 

        모듈이 로드된 후의 모듈의 출력은 1초마다 업데이트 됨
        출력을 업데이트 하고싶을 때미디 .updateDom() MM.getDom()을 사용하여 재로딩 가능
    */
    start: function () {
        this.count = 0
        var timer = setInterval(() => {
            this.updateDom()
            this.count++
        }, 1000)
    },

    /* 
        MagicMirror 화면 콘첸츠를 렌더링.
        MagicMirror 모듈의 출력을 새로 고침할 때 MagicMirror 코어에 의해 호출됨
    */
    getDom: function () {
        var element = document.createElement("div")
        element.className = "myContent"
        element.innerHTML = "Hello, World!   " + this.config.foo
        
        var subElement = document.createElement("p")
        subElement.innerHTML = "Count(1초마다 업데이트):  " + this.count
        subElement.id = "COUNT"
        element.appendChild(subElement)

        return element   
    },

    /* 
        알림 수신.

        MagicMirror와 모듈이 서로 통신하는 notification을 사용하여 송수신 가능
        결과는 이전과 동일하게 뽀이나, "DOM_OBJETS_CREATED" 알림이 수신된 후에 타이머가 시작되었지만
        모듈이 로드될 때는 시작되지 않음

        즉, 모든 모듈이 처음 DOM_OBJECTS_CREATED 로드되고 렌더링 될 때 알림이 발생하고
            getDom()을 현재 모듈에서 출력을 조정 가능
    */
    notificationReceived: function (notification, payload, sender) {
        switch(notification) {
            case "DOM_OBJETS_CREATED":
                var timer = serInterval(() => {
                    this.updateDom()
                    this.count++
                }, 1000)
                break
        }
    },


    socketNotificationReceived: function () {},
});
