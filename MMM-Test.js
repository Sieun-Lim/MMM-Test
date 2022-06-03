/* 
    2022.05.26
    Module first test
*/

Module.register("MMM-Test", {

    /* MagicMirror config.js에 표시. */
    defaults: {
        foo: "temperature"
    },

    /* 
        start() 및 updateDom()은 모듈이 성공적으로 로드되면 실행. 

        모듈이 로드된 후의 모듈의 출력은 1초마다 업데이트 됨
        출력을 업데이트 하고싶을 때미디 .updateDom() MM.getDom()을 사용하여 재로딩 가능
    */
    start: function () {
        Log.info("Starting module: " + this.name);
        this.count = 0
        var timer = setInterval(() => {
            this.updateDom()
            this.count++
        }, 1000)
    },

    getStyles: function () {
        return ['MMM-Test.css'];
    },

    /* 
        MagicMirror 화면 콘첸츠를 렌더링.
        MagicMirror 모듈의 출력을 새로 고침할 때 MagicMirror 코어에 의해 호출됨
    */
    getDom: function () {
        var wrapper = document.createElement("div")

        var element = document.createElement("div")
        element.className = "myContent"
        element.innerHTML = this.config.foo
        
        var subElement = document.createElement("p")
        subElement.innerHTML = "Count(Update every second):  " + this.count
        subElement.id = "COUNT"
        
        var table = document.createElement("table")
        var tbdy = document.createElement("tbody")

        var weather = this.weatherInfo;
        console.log(weather);
        //var temp_out = weather[0].temper;

        for(var i=0; i<3; i++) {
            var tr = document.createElement("tr")
            var icon = document.createElement("i")

            switch (i) {
                case 0:
                    var HDHeader1 = document.createElement("div")
                    var textHeader1 = document.createTextNode(" ")
                    var HDHeader2 = document.createElement("div")
                    var textHeader2 = document.createTextNode("Today")
                    var HDHeader3 = document.createElement("div")
                    var textHeader3 = document.createTextNode("Yesterday")
                case 1: 
                    var icon_img = "home"
                    var textDiv = document.createElement("div")
                    var text = document.createTextNode("23°C")
                    var textDiv2 = document.createElement("div")
                    var text2 = document.createTextNode("25°C")
                    break

                case 2:
                    var icon_img = "sign-out"
                    var textDiv = document.createElement("div")
                    var text = document.createTextNode("1")
                    var textDiv2 = document.createElement("div")
                    var text2 = document.createTextNode("26°C")
                    break
            }

            // var HeaderHD_text = document.createTextNode(" ")

            if(i == 0) {
                HDHeader1.className = 'temper-HeaderHD1'
                HDHeader1.appendChild(textHeader1)
                HDHeader2.className = 'temper-HeaderHD2'
                HDHeader2.appendChild(textHeader2)
                HDHeader3.className = 'temper-HeaderHD3'
                HDHeader3.appendChild(textHeader3)

                var td = document.createElement('td')
                td.appendChild(HDHeader1)
                tr.appendChild(td)
                var td = document.createElement('td')
                td.appendChild(HDHeader2)
                tr.appendChild(td)
                var td = document.createElement('td')
                td.appendChild(HDHeader3)
                tr.appendChild(td)

            } else {
                icon.className = 'fa fa-' + icon_img + ' temper-icon'

                textDiv.className = 'temper-text'
                textDiv.appendChild(text)
                textDiv2.className = 'temper-text2'
                textDiv2.appendChild(text2)
    
                var td = document.createElement("td")
                td.className = 'temper-td-icon'
                td.appendChild(icon)
                tr.appendChild(td)
    
                var td = document.createElement('td')
                td.appendChild(textDiv)
                tr.appendChild(td)
    
                var td = document.createElement('td')
                td.appendChild(textDiv2)
                tr.appendChild(td)
            }
            
            tbdy.appendChild(tr)
        }
        table.appendChild(tbdy)

        wrapper.appendChild(element)
        wrapper.appendChild(table)
        wrapper.appendChild(subElement)

        return wrapper   
    },

    /* 
        알림 수신.

        MagicMirror와 모듈이 서로 통신하는 notification을 사용하여 송수신 가능
        결과는 이전과 동일하게 보이나, "DOM_OBJETS_CREATED" 알림이 수신된 후에 타이머가 시작되었지만
        모듈이 로드될 때는 시작되지 않음

        즉, 모든 모듈이 처음 DOM_OBJECTS_CREATED 로드되고 렌더링 될 때 알림이 발생하고
            getDom()을 현재 모듈에서 출력을 조정 가능
    */
    notificationReceived: function (notification, payload, sender) {
        switch(notification) {
            case "DOM_OBJECTS_CREATED":
                Log.info("Requesting weather info");
                this.sendSocketNotification("GET_WEATHER");
                var timer = serInterval(() => {
                    this.updateDom()
                    this.count++
                }, 1000)
                break
        }
    },


    socketNotificationReceived: function (notification, payload) {
        switch (notification) {
        case "WEATHER_DATA":
            console.log("NotificationReceived:" + notification);
            this.weatherInfo = payload;
            this.updateDom();
            break;
        case "WEATHER_DATA_ERROR":
            this.updateDom();
            break;
        }
    },
});
