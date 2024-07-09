const count = 30;
const apiKey = 'ZSGU0gChAimgSYeav8IGgzZjNxVRHhGa6B6d04L5QLc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photoArray =[] ; 
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false ;
let imagesLoaded = 0;
let totalImages =  0;


function imageLoaded(){
    console.log('image loaded');
    imagesLoaded++;
    console.log(imageLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
       console.log('ready =' , ready );

    }
}


function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length
console.log(totalImages);
    photoArray.forEach((photo) => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html); 
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank,'
        });
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular)
        // img.setAttribute('alt', photo.alt_description)
        // img.setAttribute('title', photo.alt_description)
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        
        img.addEventListener('load', imagesLoaded)

       item.appendChild(img);
       imageContainer.appendChild(item);
    });
   
}


async function getPhoto() {
    try {
        const response = await fetch(apiUrl)
        photoArray = await response.json()
        console.log(photoArray)
       displayPhotos();
    } catch (error) {
        console.log(error);
    }
}
window.addEventListener('scroll', () =>{
if(window.innerHeight + window.screenY >= document.body.offsetHeight -1000 && ready){
    ready = false;
    getPhoto()
}

})
getPhoto()