window.addEventListener('load', () => {
    console.log('hello');
    var radios = document.forms["form"].elements["size"];
    for(let i = 0; i < radios.length; i++) {
        radios[i].onclick = function() {
            draw(this.value);
        }
    }

    function draw(value){
        let size = value;
        let requestURL;

        switch(size) {
            case '4':
                requestURL = './data/4x4.json';
                break;
            case '32':
                requestURL = './data/32x32.json';
                break;
            case '256':
                requestURL = null;
                break;
        }

        if (requestURL === null){
            let canvas = document.getElementById('main__canvas');
            let drawArea = canvas.getContext('2d');
            base_image = new Image();
            base_image.src = './data/image.png';
            base_image.onload = function(){
                drawArea.clearRect(0, 0, canvas.width, canvas.height);
                drawArea.drawImage(base_image, 0, 0, 512, 512);
            }
            return;
        }

        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
    
        request.onload = function() {
            let pixels = request.response;
            let canvas = document.getElementById('main__canvas');
            let drawArea = canvas.getContext('2d');
            let pixelSize = 512 / size;

            if (size == 4){
                for (let row = 0; row < pixels.length; row++ ) {
                    for (let collumn = 0; collumn < pixels[row].length; collumn++) {
                        drawArea.fillStyle = `#${pixels[row][collumn]}`;
                        drawArea.fillRect(row * pixelSize, collumn * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
            
            else if (size == 32) {
                for (let row = 0; row < pixels.length; row++ ) {
                    for (let collumn = 0; collumn < pixels[row].length; collumn++) {
                        drawArea.fillStyle = `rgba(${pixels[row][collumn]})`;
                        drawArea.fillRect(row * pixelSize, collumn * pixelSize, pixelSize, pixelSize);
                    }
                }
            }

        }       
    }
    
});

