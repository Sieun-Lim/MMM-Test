
/* 
    MMM-Test.js와 마찬가지로 node_helper.js가 로드되어 모듈에 연결될 때 start()가 실행됨
    MMM-Test.js와 node_helper.js 사이에 socketNotification이 통신에 사용 (알림과 함께 표시됨)

    모듈파일.js는 몇 가지의 제한 사항이 있기에, MagicMirror 프레임워크와 브라우저(Electron/Chromium or Midori)에서
    실행되기 때문에 브라우저가 제공할 수 있는 것보다 더 많은 것이 필요할 대 사용한다.
*/

const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets")
const NodeHelper = require("node_helper");
const mysql = require('mysql');

const db = mysql.createConnection({
	host: '119.194.240.110',
	port: 33060,
	user: 'tlsl13',
	password: '1234',
	database: 'DBtest'
});

module.exports = NodeHelper.create({
    start: function() {
        this.countDown = 10000000
    },

    getDom: function () {
        var wrapper = document.createElement("div")

        var element = document.createElement("div")
        element.className = "myContent"
        element.innerHTML = "Hello, " + this.config.foo
        
        var subElement = document.createElement("p")
        subElement.innerHTML = "Count(1초마다 업데이트):  " + this.count
        subElement.id = "COUNT"
        
        wrapper.appendChild(element)
        wrapper.appendChild(subElement)

        return wrapper   
    },

    notificationReceived: function(notification, payload, sender) {
        switch(notification) {
            case "DOM_OBJECTS_CREATED":
                var timer = setInterval(()=>{
                    this.sendSocketNotification("DO_YOUR_JOB", this.count)
                    this.count++
                }, 1000)
                break
        }
    },

    socketNotificationReceived: function (notification, payload) {
        let self = this;
        switch(notification) {
            case "GET_WEATHER":
                db.connect();
                db.query("select temper from temperature where temRank=1 order by temRank DESC", function (error, result) {
                    if (error) {
                        self.sendSocketNotification("WEATHER_DATA_ERROR", result);
                    }
                    else {
                        self.sendSocketNotification("WEATHER_DATA", result);
                    }
                  });
                db.end();
        }
    },
});
