window.addEventListener('load', initCanvas);

function initCanvas() {
    const radios = document.forms["form"].elements["size"];
    for(let i = 0; i < radios.length; i++) {
        radios[i].onclick = function() {
            draw(this.value);
        }
    }
}

const draw = (size) => {
    const getRequestURL = (size) => {
        let URL;

        switch(size) {
            case '4':
                URL = './data/4x4.json';
                break;
            case '32':
                URL = './data/32x32.json';
                break;
            case '256':
                URL = null;
                break;
        }
        
        return URL;
    };

    const drawImage = () => {
        const canvas = document.getElementById('main__canvas');
        const drawArea = canvas.getContext('2d');

        base_image = new Image();
        base_image.src = './data/image.png';
        base_image.onload = function(){
            drawArea.clearRect(0, 0, canvas.width, canvas.height);
            drawArea.drawImage(base_image, 0, 0, 512, 512);
        }
    }

    const drawPixels = (requestURL) => {
        const getColors = (requestURL) => {
            const request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send(); 
            request.onload = () => {
                const colors = request.response;
                setColors(colors);
            }
        }

        const setColors = (colors) => {
            const pixels = colors;
            const canvas = document.getElementById('main__canvas');
            const drawArea = canvas.getContext('2d');
            const pixelSize = 512 / size;
    
            const draw4X4 = (pixels) => {
                for (let row = 0; row < pixels.length; row++ ) {
                    for (let collumn = 0; collumn < pixels[row].length; collumn++) {
                        drawArea.fillStyle = `#${pixels[row][collumn]}`;
                        drawArea.fillRect(row * pixelSize, collumn * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
    
            const draw32X32 = (pixels) => {
                for (let row = 0; row < pixels.length; row++ ) {
                    for (let collumn = 0; collumn < pixels[row].length; collumn++) {
                        drawArea.fillStyle = `rgba(${pixels[row][collumn]})`;
                        drawArea.fillRect(row * pixelSize, collumn * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
    
            if (size == 4){
                draw4X4(pixels);
            }
            
            else if (size == 32) {
                draw32X32(pixels);
            }
        }

        getColors(requestURL);
    }
    
    const requestURL = getRequestURL(size);
    const isImage = requestURL === null;

    if (isImage) {
        drawImage();
    }
    else {
        drawPixels(requestURL);
    }
}
