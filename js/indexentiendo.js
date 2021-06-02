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


var backTexture = new THREE.ImageUtils.loadTexture( 'img/ar5.jpg' );
backTexture.wrapS = backTexture.wrapT = THREE.RepeatWrapping; 
backTexture.repeat.set( 1, 1 );
var backMaterial = new THREE.MeshBasicMaterial( { map: backTexture, side: THREE.DoubleSide, transparent:true } );
var backGeometry = new THREE.CubeGeometry(2500, 2500, 2500, 1);
var back = new THREE.Mesh(backGeometry, backMaterial);

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

    camera = new THREE.PerspectiveCamera(90, 1, 0.001, 10000);
    //camera.target = new THREE.Vector3(0, 500, 200);
    camera.position.set(100, 0, 200);
    //camera.position.set(0,0,0);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerHeight,window.innerWidth);
    document.body.appendChild(renderer.domElement);
    //renderer.setPixelRatio(window.devicePixelRatio);
    element = renderer.domElement;
    $container.append(element);


    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    //controls.maxZoom = 0.9;

    controls.rotateSpeed = 0.1; 
    controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 1;
    controls.maxPolarAngle = Math.PI / 1.5;
    controls.target.set(50, 380, 0);
    controls.update();

    var width  = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);



    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/space/Espiral-R.gif' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 3, 3 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(900, 600, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -10;
    floor.position.z = -50;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
   scene.add(floor);

    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/space/top.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    //floorTexture.repeat.set( 6, 6 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.BoxGeometry(100, 90, 70, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y =40;
    floor.position.x = 400;
    floor.rotation.y = Math.PI / -2.5;
    floor.receiveShadow = true;
    scene.add(floor);

    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/space/top.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    //floorTexture.repeat.set( 6, 6 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.BoxGeometry(130, 90, 70, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y =40;
    floor.position.x = -180;
    floor.rotation.y = Math.PI / 2.5;
    floor.receiveShadow = true;
    scene.add(floor);

    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/6-2-griffin-transparent.png' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    //floorTexture.repeat.set( 6, 6 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 600;
    floor.position.z = -300;
    floor.rotation.z = Math.PI / 2;   
    floor.receiveShadow = true;
    scene.add(floor);

   /* var floorTexture = new THREE.ImageUtils.loadTexture( 'img/space/31130-5-android-transparent-image.png' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    //floorTexture.repeat.set( 6, 6 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(230, 200, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 400;
    floor.position.x = -420;
    floor.rotation.y = Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);*/


    back.position.y = 0;
    back.position.z = -220;
    back.rotation.x = Math.PI / 2;
    back.receiveShadow = true;
    scene.add(back);

    


    const manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        loadingScreen.innerHTML = ('Cargando:' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        loadingScreen.innerHTML = ('Cargando:' + Math.floor(url) + '.\nLoaded ' + itemsLoaded  + itemsTotal );
       /* var mp3 = document.getElementById("myAudio");
        mp3.play();*/
    };

    manager.onLoad = function ( ) {
        loadingScreen.remove();
        console.log( 'Loading complete!');
      
    };


    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        loadingScreen.innerHTML = (itemsLoaded / itemsTotal * 100) + "%loaded";
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };


    var loader = new THREE.GLTFLoader(manager);
        loader.load('models/yoentiendo/hermosanueba2.glb', function ( gltf ) {
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

    for( var i = 0; i < 200; i++ ){
        loadImgsTwo(manager); 
    }


    function loadImgsTwo(){
        geometries = new THREE.PlaneGeometry(70, 70, 70);
        textures = THREE.ImageUtils.loadTexture('img/stars/star.png' );
        textures.wrapS = THREE.RepeatWrapping;
        textures.wrapT= THREE.RepeatWrapping;
        textures.repeat.set( 1, 1 );
        materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
        var planes = new THREE.Mesh(geometries, materials);
        planes.material.side = THREE.DoubleSide;
        planes.position.x = Math.random() * 900;
        planes.position.y = Math.random() * 800;
        planes.position.z = Math.random() * 900;
        //cloud.add(planes);
        scene.add( planes );

    }


    for( var i = 0; i < 200; i++ ){
        loadImgsThree(manager); 
    }


    function loadImgsThree(){
        geometries = new THREE.PlaneGeometry(70, 70, 70);
        textures = THREE.ImageUtils.loadTexture('img/stars/star.png' );
        textures.wrapS = THREE.RepeatWrapping;
        textures.wrapT= THREE.RepeatWrapping;
        textures.repeat.set( 1, 1 );
        materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
        var planes = new THREE.Mesh(geometries, materials);
        planes.material.side = THREE.DoubleSide;
        planes.position.x = Math.random() * -900;
        planes.position.y = Math.random() * 800;
        planes.position.z = Math.random() * -900;
        //cloud.add(planes);
        scene.add( planes );

    }


    for( var i = 0; i < 200; i++ ){
        loadImgsThree(manager); 
    }


    function loadImgsThree(){
        geometries = new THREE.PlaneGeometry(70, 70, 70);
        textures = THREE.ImageUtils.loadTexture('img/stars/star.png' );
        textures.wrapS = THREE.RepeatWrapping;
        textures.wrapT= THREE.RepeatWrapping;
        textures.repeat.set( 1, 1 );
        materials = new THREE.MeshLambertMaterial({map:textures, side: THREE.DoubleSide, transparent:true, depthWrite: false, depthTest: false});
        var planes = new THREE.Mesh(geometries, materials);
        planes.material.side = THREE.DoubleSide;
        planes.position.x = Math.random() * -900;
        planes.position.y = Math.random() * 800;
        planes.position.z = Math.random() * 900;
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
        mp3.play();

        if (mp3.duration > 0 && !mp3.paused) {
            console.log("playiiii");
            textLyrics();
            cameraChanges();
        } else {
            //Not playing...maybe paused, stopped or never played.
        }
        controls.update();


        var play = document.getElementById("but1");
        play.remove();



       /* setInterval(function(){
            console.log("listopmiherma");
            cameraChanges();
            textLyrics();
        }, 59000);*/


    }


    function handleStart(evt) {
        evt.preventDefault();

        var mp3 = document.getElementById("myAudio");
        mp3.loop=true;
        mp3.play();

        if (mp3.duration > 0 && !mp3.paused) {
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
           // textLyrics();
        }, 59000);
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



    function glbLoad() {
        var mp3 = document.getElementById("myAudio");
        mp3.play();
    }




    function animate() {
        back.rotation.x += 0.005;

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

        var pointlight = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
        pointlight.position.y=800;
        pointlight.position.z=1900;
        scene.add( pointlight ); 


        var pointlight = new THREE.PointLight( 0XFFFFFF , 1 ); // soft white light
        pointlight.position.y=600;
        pointlight.position.z=100;
       //scene.add( pointlight ); 

        var pointlight = new THREE.HemisphereLight( 0XFFFFFF , 20 ); // soft white light
        pointlight.position.y=700;
        pointlight.position.z=0;
        scene.add( pointlight ); 

    }

   /* for (let x=0; x< 2000; x++){
        cameraChanges(x);
        textLyrics(x);
    }*/

    





    function cameraChanges() {
            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(811, 380, 424);
                controls.update();
            }, 1);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(467, 194, 110);
                controls.update();
            }, 4140);
        
        
            setTimeout(function() {
                console.log("Bfrontview2");
                controls.target.set(380, 380, 380);
                camera.position.set(-300, 400, -120);
                controls.update();
            }, 8060);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(500, 300, 105);
                controls.update();
            }, 12100);

            setTimeout(function() {
                console.log("Bfrontview2");
                controls.target.set(50, 280, 0);
                camera.position.set(120, 281, 237);
                controls.update();
            }, 16160);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(329, 180, 289);
                controls.update();
            }, 18445);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(150, 300, 140);
                controls.update();
            }, 20070);

            setTimeout(function() {
                console.log("Bfrontview2");

                camera.position.set(355, 259, 49);
                controls.update();
            }, 28110);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(30, 500, 300);
                controls.update();
            }, 32296);

               setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(700, 240, 105);
                controls.update();
            }, 35480);

              setTimeout(function() {
                console.log("Bfrontview2");
                controls.target.set(180, 180, 0);

                camera.position.set(77.03, 281, 237);
                controls.update();
            }, 38960);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(500, 500, 500);
                controls.update();
            }, 40300);

               setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(-180, 340, 330);
                controls.update();
            }, 41980);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-180, 320,140);
                controls.update();
            }, 46078);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(811, 380, 424);
                controls.update();
            }, 56555);

             setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(30, 20, -10);
                controls.update();
            }, 104100);
        
        
         /*      setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(0, 0, -0);
                controls.update();
            }, 50400);

        setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(0.7, 240, 105);
                controls.update();
            }, 51880);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(500, 500, 500);
                controls.update();
            }, 54750);*/


    }

    

    function textLyrics() {
        setTimeout(function() {
            document.getElementById("lyricsEntiendo").innerHTML="Yo entiendo" + '<br>' + "que te ame...";
        }, 16669);
    
    
        setTimeout(function() {
            document.getElementById("lyricsEntiendo").innerHTML="Esta confunsión no viene" + '<br>' + "de un gran dolor";
        }, 24835);

        setTimeout(function() {
            document.getElementById("lyricsEntiendo").innerHTML="sino de un pasado lejano," + '<br>' + "mi amor, mírame";
        }, 29086);

        setTimeout(function() {
            document.getElementById("lyricsEntiendo").innerHTML="como me muero sin ti," + '<br>' + "sin ti...";
        }, 37050);

        setTimeout(function() {
            document.getElementById("lyricsEntiendo").innerHTML="Como me inspira tu corazón" + '<br>' + "mírame";
        }, 50100);

        setTimeout(function() {
            document.getElementById("lyricsEntiendo").innerHTML="ERES PARA MI" + '<br>' + "x4";
        }, 59692);

    

    }



   /* setInterval(function(){
        console.log("listopmiherma");
        cameraChanges();
    }, 10000);*/
