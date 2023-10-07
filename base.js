// Function to check if the mouse is on the left side of the screen and in the middle 40% vertically
function isMouseOnLeftSide(event) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const middleVerticalHeight = 0.3 * screenHeight; // 30% from the top
    return (
        event.clientX <= (1 / 9) * screenWidth &&
        event.clientY >= middleVerticalHeight &&
        event.clientY <= screenHeight - middleVerticalHeight
    );
}

// Function to check if the mouse is on the right side of the screen and in the middle 40% vertically
function isMouseOnRightSide(event) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const middleVerticalHeight = 0.3 * screenHeight; // 30% from the top
    return (
        event.clientX >= (8 / 9) * screenWidth &&
        event.clientY >= middleVerticalHeight &&
        event.clientY <= screenHeight - middleVerticalHeight
    );
}

// Event listener to handle mousemove events
document.addEventListener('mousemove', (event) => {
    const slideContainerLeft = document.querySelector('.slide-container-left');
    const slideContainerRight = document.querySelector('.slide-container-right');

    if (isMouseOnLeftSide(event)) {
        slideContainerLeft.style.left = '-5%';
        slideContainerRight.style.right = '-20%';
    } else if (isMouseOnRightSide(event)) {
        slideContainerRight.style.right = '-5%';
        slideContainerLeft.style.left = '-20%';
    } else {
        slideContainerLeft.style.left = '-20%';
        slideContainerRight.style.right = '-20%';
    }
});

// Function to fade out the div and its children
function fadeOutDiv(divId, duration, callback) {
    const div = document.getElementById(divId);
    const children = div.getElementsByTagName('*');
    let startTime = performance.now();

    function animate() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Gradually change opacity for the div and its children
        div.style.opacity = 1 - progress;
        for (const child of children) {
            if(child.id.toString().indexOf('pullout') == -1){
                child.style.opacity = 1 - progress;
            }
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else if (typeof callback === 'function') {
            callback();
        }
    }

    requestAnimationFrame(animate);
}

// Function to fade in the div and its children
function fadeInDiv(divId, duration, callback) {
    const div = document.getElementById(divId);
    const children = div.getElementsByTagName('*');
    let startTime = performance.now();

    function animate() {
        const currentTime = performance.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Gradually change opacity for the div and its children
        div.style.opacity = progress;
        for (const child of children) {
            if(child.id.toString().indexOf('pullout') == -1){
                child.style.opacity = progress;
            }
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else if (typeof callback === 'function') {
            callback();
        }
    }

    requestAnimationFrame(animate);
}

const circles = document.querySelectorAll('.slide-content');

let isSwapping = false;

function swapCircles() {
    if (isSwapping || this.getAttribute('data-position') === 'center') {
        return; // Return early if swapping is already in progress
    }

    isSwapping = true; // Set the flag to indicate swapping is in progress

    circles.forEach(circle => {
        // Fade out each circle
        fadeOutDiv(circle.id, 300, () => {
            const isLeftCircle = this.getAttribute('data-position') === 'left';

            circles.forEach(circle => {
                const currentPosition = circle.getAttribute('data-position');
                let newPosition;

                // Determine the new position
                switch (currentPosition) {
                    case 'left':
                        newPosition = isLeftCircle ? 'center' : 'right';
                        break;
                    case 'center':
                        newPosition = isLeftCircle ? 'right' : 'left';
                        break;
                    case 'right':
                        newPosition = isLeftCircle ? 'left' : 'center';
                        break;
                    default:
                        newPosition = 'center'; // Default to center position
                }

                // Update the data-position attribute
                circle.setAttribute('data-position', newPosition);

                // Reset the style attribute
                circle.style = null;

                var childCircle = circle.querySelector('.circle-base');

                if(newPosition == 'center' && childCircle.classList.contains('circle-5') && !childCircle.classList.contains('circle-6')) {
                    incrCircleSize(childCircle, 1);
                } else if (childCircle.classList.contains('circle-6') && !childCircle.classList.contains('circle-5')) {
                    incrCircleSize(childCircle, -1);
                }

                var existingPullout = document.getElementById(circle.id + '-pullout');
                if(existingPullout != null) existingPullout.remove();
                if(newPosition == 'left') addPulloutDiv(circle, 'right');
                else if(newPosition == 'right') addPulloutDiv(circle, 'left');

                // Remove old class and add the new class based on the position
                circle.classList.remove(`slide-container-${currentPosition}`);
                circle.classList.add(`slide-container-${newPosition}`);
            });

            // Fade in each circle
            circles.forEach(circle => fadeInDiv(circle.id, 300));
        });
    });

    // After all animations are complete, reset the flag
    setTimeout(() => {
        isSwapping = false;
    }, 300 * circles.length); // Adjust the timeout based on the duration of your animations
}

function incrCircleSize(element, size) {
    if (element?.getAttribute?.('class') != null){
        var currentClasses = element.getAttribute('class').split(' ');
        for (var i = 0; i < currentClasses.length; i++) {
            if (currentClasses[i].includes('circle-') && currentClasses[i] != 'circle-base') {
                var currentSize = currentClasses[i].split('-')[1];
                element.classList.remove(currentClasses[i]);
                element.classList.add('circle-' + (parseInt(currentSize) + size));
            }
        }
    }

    // Increase the size of the children elements, recursively
    var children = element.children;
    for (var j = 0; j < children.length; j++) {
        incrCircleSize(children[j], size);
    }
}

// Add the debounced event listener
circles.forEach(circle => {
    circle.addEventListener('click', swapCircles);
});

function addPulloutDiv(element, direction){
    if(direction != 'left' && direction != 'right') {
        return;
    }

    var pulloutDiv = document.createElement('div');
    pulloutDiv.classList.add('pullout-div');
    pulloutDiv.classList.add('pullout-div-' + direction);
    pulloutDiv.classList.add('secondary-to-' + direction);
    pulloutDiv.id = element.id + '-pullout';
    var pulloutSpan = document.createElement('span');
    pulloutSpan.classList.add('pullout-span');
    pulloutSpan.innerHTML = element.getAttribute('data-description');
    pulloutDiv.appendChild(pulloutSpan);

    element.appendChild(pulloutDiv);
}

// JavaScript to close the div when the close button is clicked
const closeButton = document.querySelector('.close-button');
const closeableDiv = document.querySelector('.closeable-div');

closeButton.addEventListener('click', () => {
    closeableDiv.style.display = 'none';
});

addPulloutDiv(document.getElementById('circle-left'), 'right');
addPulloutDiv(document.getElementById('circle-right'), 'left');