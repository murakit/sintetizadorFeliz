var scene, renderer;
var stereoEffect;
var camera;
var controls;
var mixer;
var clock = new THREE.Clock();

var dir = new THREE.Vector3();
var speed = 40;
var rmapped = 0;
var frontLight = new THREE.DirectionalLight( 0xFFFFFF, 3 ); // soft white light
var cloud = new THREE.Object3D();
var loader = new THREE.TextureLoader();

var materials = [];
var textures = [];
var geometries = [];

var loadingScreen = document.getElementById( 'loading-screen' );



setUp();

function setUp() {
    setupWorld();
    animate(); 
    //loadCubeMap ('js/3dcubemap/eight/dark-s_' , '.png');
    lights();
   // textLyrics();
}

function setupWorld() {
    clock = new THREE.Clock();
    $container = $('#interface');
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');

    camera = new THREE.PerspectiveCamera(70, 1, 0.01, 10000);
    //camera = new THREE.PerspectiveCamera(50, 1, 0.001, 10000);
    //camera.target = new THREE.Vector3(0, 500, 200);
    camera.position.set(0, 0, 300);
    //camera.position.set(0,0,0);
    scene.add(camera);


    renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerHeight,window.innerWidth);
    document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    element = renderer.domElement;
    $container.append(element);


    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    //controls.maxZoom = 0.9;

    controls.rotateSpeed = 0.2;
    controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 1;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 0;
    controls.maxDistance = 3000;
    controls.target.set(-30, 240, 0);
    controls.update();

    var width  = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);



    const manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        loadingScreen.innerHTML = ('Cargando:'+ '<br>' +  url + '<br>' + 'Favor de esperar' );
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
       /* var mp3 = document.getElementById("myAudio");
        mp3.play();*/
    };

    manager.onLoad = function ( ) {
        console.log( 'Loading complete!');
        loadingScreen.remove();

    };


    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        loadingScreen.innerHTML = (itemsLoaded / itemsTotal * 100) + "%loaded";
        console.log( 'Loading: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };


    var loader = new THREE.GLTFLoader(manager);
        loader.load('models/cd/laterminal.glb', function ( gltf ) {
           /* const tloader = new THREE.TextureLoader();
            tloader.load("img/pl07_skin.png", function(tloader){
                gltf.scene.traverse( function ( child ) {
                    if ( child.isMesh ) {
                    child.material.map = tloader;
                    child.material.needsUpdate = true;
                    child.material.flipY = false;
                    }

                });
            });*/

            gltf.scene.traverse( function( object ) {

                object.frustumCulled = false;


            
            
            } );
            
            mixer = new THREE.AnimationMixer(gltf.scene);
            var action = mixer.clipAction(gltf.animations[0]);
            action.play();
            scene.add( gltf  );
           
           // scene.add( mesh );
            scene.add( gltf.scene );
            
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        function ( error ) {
            console.log( 'An error happened' );
        }
    );





    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/sky.png' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 4, 4 );
    var floorMaterial = new THREE.MeshLambertMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent: true} );
    var floorGeometry = new THREE.SphereGeometry(800, 800);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -50;
    floor.position.z = -200;
    floor.position.x = -150;
    floor.rotation.y = Math.PI / 2;
    scene.add(floor);




    var bkTexture = new THREE.ImageUtils.loadTexture( 'img/cd/collage.jpg' );
    bkTexture.wrapS = bkTexture.wrapT = THREE.RepeatWrapping; 
    bkTexture.repeat.set( 2, 2 );
    var bkMaterial = new THREE.MeshBasicMaterial( { map: bkTexture, side: THREE.DoubleSide} );
    var bkGeometry = new THREE.SphereGeometry(1200, 1200);
    var bk = new THREE.Mesh(bkGeometry, bkMaterial);

    bk.position.y = 0;
    bk.position.z = -220;
    scene.add(bk);





for( var i = 0; i < 20; i++ ){
    loadImgsThree(manager); 
    loadImgsAnime(manager);
    loadImgsDos(manager);
    loadImgsAnimeTres(manager);
}


function loadImgsThree(){
    geometries = new THREE.PlaneGeometry(40, 30);
    textures = THREE.ImageUtils.loadTexture('img/animescards/logo' + i + '.gif' );
    textures.wrapS = THREE.RepeatWrapping;
    textures.wrapT= THREE.RepeatWrapping;
    textures.repeat.set( 1, 1 );
    materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
    var planes = new THREE.Mesh(geometries, materials);
    planes.material.side = THREE.DoubleSide;
    planes.position.x = Math.random() * -700;
    planes.position.y = Math.random() * 1700;
    planes.position.z = Math.random() * 700;
    //cloud.add(planes);
    scene.add( planes );

}

function loadImgsAnime(){
    geometries = new THREE.PlaneGeometry(30, 50);
    textures = THREE.ImageUtils.loadTexture('img/animescards/logo' + i + '.gif' );
    textures.wrapS = THREE.RepeatWrapping;
    textures.wrapT= THREE.RepeatWrapping;
    textures.repeat.set( 1, 1 );
    materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true});
    var planes = new THREE.Mesh(geometries, materials);
    planes.material.side = THREE.DoubleSide;
    planes.position.x = Math.random() * -600;
    planes.position.y = Math.random() * 1200;
    planes.position.z = Math.random() * 400;
    //cloud.add(planes);
    scene.add( planes );

}

function loadImgsDos(){
    geometries = new THREE.PlaneGeometry(30, 50);
    textures = THREE.ImageUtils.loadTexture('img/animescards/logo' + i + '.gif' );
    textures.wrapS = THREE.RepeatWrapping;
    textures.wrapT= THREE.RepeatWrapping;
    textures.repeat.set( 1, 1 );
    materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true});
    var planes = new THREE.Mesh(geometries, materials);
    planes.material.side = THREE.DoubleSide;
    planes.position.x = Math.random() * 600;
    planes.position.y = Math.random() * 1200;
    planes.position.z = Math.random() * -400;
    //cloud.add(planes);
    scene.add( planes );

}

function loadImgsAnimeTres() {
    geometries = new THREE.PlaneGeometry(30, 50);
    textures = THREE.ImageUtils.loadTexture('img/animescards/logo' + i + '.gif' );
    textures.wrapS = THREE.RepeatWrapping;
    textures.wrapT= THREE.RepeatWrapping;
    textures.repeat.set( 1, 1 );
    materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide});
    var planes = new THREE.Mesh(geometries, materials);
    planes.material.side = THREE.DoubleSide;
    planes.position.x = Math.random() * 600;
    planes.position.y = Math.random() * 900;
    planes.position.z = Math.random() * -900;
    //cloud.add(planes);
    scene.add( planes );
}

}

    var audio = document.getElementById("but1");
    audio.addEventListener("touchstart", handleStart, false);
    audio.addEventListener("touchend", handleEnd, false);
    audio.addEventListener("touchcancel", handleCancel, false);
    audio.addEventListener("touchmove", handleMove, false);

    audio.addEventListener("click", onPlay, false);


    function onPlay() {
        var mp3 = document.getElementById("myAudio");
        mp3.loop = true;
        mp3.play();

        if (!mp3.paused || myAudio.currentTime) {
            console.log("playiiii");
            textLyrics();
            cameraChanges();
        } else {
            //Not playing...maybe paused, stopped or never played.
        }
        controls.update();


        var play = document.getElementById("but1");
        play.remove();



        setInterval(function(){
            console.log("listopmiherma");
            cameraChanges();
            textLyrics();
        }, 51300);


    }


    function handleStart(evt) {
        evt.preventDefault();

        var mp3 = document.getElementById("myAudio");
        mp3.loop=true;
        mp3.play();

        if (!mp3.paused || myAudio.currentTime) {
            console.log("playiiii");
            textLyrics();
            cameraChanges();
        } else {
            //Not playing...maybe paused, stopped or never played.
        }
        controls.update();

        var play = document.getElementById("but1");
        play.remove();
        setInterval(function(){
            console.log("listopmiherma");
            cameraChanges();
            textLyrics();
        }, 51300);
    }

    function handleEnd(evt) {
        evt.preventDefault();
        
    }

    function handleCancel(evt) {
        evt.preventDefault();
    }

    function handleMove(evt) {
        evt.preventDefault();
    }


    function animate() {

        requestAnimationFrame( animate );

        //var delta = clock.getDelta();
        var delta = clock.getDelta();
       /* var h = rmapped * 0.0200 % 1;
        var s = 0.5;
        var l = 0.5;
        frontLight.color.setHSL ( h, s, l );*/
        if (mixer) {
            mixer.update(delta);
        }
        renderer.render( scene, camera );
        /*if (mixer.lenght > 0){
            for (var i = 0 ; i < mixer.lenght; i ++) {
                mixer[i].update(delta);
            }
        }*/
       // rmapped ++;
        //mixer.update(this.clock.getDelta());
        //console.log(delta);
        controls.update();
        console.log(camera.position);

    }



    function lights() {
        var light = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
        light.position.y=600;
        //scene.add( light );

        var pointlight = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
        pointlight.position.y=500;
        pointlight.position.x=600;
        //scene.add( pointlight ); 

        var pointlight = new THREE.HemisphereLight( 0XFFC0CB, 2 ); // soft white light
        pointlight.position.y=800;
        pointlight.position.z=1900;
        scene.add( pointlight ); 


        var pointlight = new THREE.PointLight( 0XFFC0CB , 1 ); // soft white light
        pointlight.position.y=800;
        pointlight.position.z=300;
       // scene.add( pointlight ); 

        var pointlight = new THREE.HemisphereLight( 0XFFC0CB , 1 ); // soft white light
        pointlight.position.y=700;
        pointlight.position.z=0;
      // scene.add( pointlight ); 

       var pointlight = new THREE.SpotLight( 0XFFC0CB , 0.8 ); // soft white light
       pointlight.position.y=1000;
       pointlight.position.z=200;
       pointlight.position.x=200;

       scene.add( pointlight );


       var pointlight = new THREE.SpotLight( 0XFFC0CB , 0.6 ); // soft white light
       pointlight.position.y=1200;
       pointlight.position.z=-400;
       pointlight.position.x=-400;

       scene.add( pointlight );

    }

   /* for (let x=0; x< 2000; x++){
        cameraChanges(x);
        textLyrics(x);
    }*/

    





    function cameraChanges() {
            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(103, 234, 257);
                controls.update();
            }, 2050);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(-400, 20, 80);
                controls.update();
            }, 3800);
        
        
            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-144, 354, 98);
                controls.update();
            }, 5100);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(3000, 240, 705);
                controls.update();
            }, 7200);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(500, 240, 105);
                controls.update();
            }, 10500);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-2029, 180, 289);
                controls.update();
            }, 13500);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-400, 20, 80);
                controls.update();
            }, 16000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(30, 30, -210);
                controls.update();
            }, 21200);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(300, 300, 700);
                controls.update();
            }, 24000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(0.7, 240, 605);
                controls.update();
            }, 26000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(30, 30, 10);
                controls.update();
            }, 28000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(500, 500, 500);
                controls.update();
            }, 30000);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(30, 30, 10);
                controls.update();
            }, 32000);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(30, 20, -10);
                controls.update();
            }, 37500);
        
        
            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-400, 20, 80);
                controls.update();
            }, 40000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-400, 20, 80);
                controls.update();
            }, 43000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-400, 20, 80);
                controls.update();
            }, 46000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(30, 20, -10);
                controls.update();
            }, 48000);


    }

    

    function textLyrics() {
        setTimeout(function() {
            document.getElementById("lyricsCD").innerHTML="Quiero verte otra vez dentro de mi cyberspace";
        }, 5100);
    
    
        setTimeout(function() {
            document.getElementById("lyricsCD").innerHTML="Desde que llegaste aqu?? aprete el bot??n de reset.";
        }, 10200);

        setTimeout(function() {
            document.getElementById("lyricsCD").innerHTML="y en la terminal yo tecle $cd y /";
        }, 16070);

        setTimeout(function() {
            document.getElementById("lyricsCD").innerHTML="Al directorio de tu amorX4" ;
        }, 21200);

        setTimeout(function() {
            document.getElementById("lyricsCD").innerHTML="y en la terminal yo tecle $cd y /";
        }, 31975);

        setTimeout(function() {
            document.getElementById("lyricsCD").innerHTML="Al directorio de tu amorX4" ;
        }, 37600);
    

    }



   /* setInterval(function(){
        console.log("listopmiherma");
        cameraChanges();
    }, 10000);*/
