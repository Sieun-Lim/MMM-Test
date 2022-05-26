# MMM-Test
MMM-Test

### Install & Configuration ###
___
    cd ~/MagicMirror/modules
    git clone https://github.com/Sieun-Lim/MMM-Test.git
    cd MMM-Test
    npm install


### ScreenShot ###
___
![MMM-Test2](https://user-images.githubusercontent.com/97720335/170504470-a5a74a0c-03d7-4cd0-b554-89f53c70e4bc.png)



### Using the module ###
___
Add it to the modules array in the `config/config.js` file:
```javascript
{
    module: "MMM-Test",
    position: "top_left",
    config: {
        foo: "temperature"
    }
},
```
