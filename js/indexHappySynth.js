var scene, renderer;
var stereoEffect;
var camera;
var controls;
var mixer;
var mix;
var mixdos;
var clock = new THREE.Clock();

var dir = new THREE.Vector3();
var speed = 40;
var rmapped = 0;
var frontLight = new THREE.DirectionalLight( 0xFFFFFF, 3 ); // soft white light
var sphereTexture = new THREE.ImageUtils.loadTexture( 'img/space/music.png' );
sphereTexture.wrapS = sphereTexture.wrapT = THREE.RepeatWrapping; 
sphereTexture.repeat.set( 1, 1 );
var sphereMaterial = new THREE.MeshBasicMaterial( { map: sphereTexture, side: THREE.DoubleSide, transparent:true } );
var SphereGeometry = new THREE.SphereGeometry(2500, 2500, 1);
var sphere = new THREE.Mesh(SphereGeometry, sphereMaterial);






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

    camera = new THREE.PerspectiveCamera(50, 1, 0.001, 10000);
    //camera.target = new THREE.Vector3(0, 500, 200);
    camera.position.set(-86, 50, 300);
    //camera.position.set(0,0,0);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    //renderer.setSize(window.innerHeight,window.innerWidth);
    document.body.appendChild(renderer.domElement);
    //renderer.setPixelRatio(window.devicePixelRatio);
    element = renderer.domElement;
    $container.append(element);


    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.autoRotate = true;
    //controls.maxZoom = 0.9;

    controls.rotateSpeed = 0.2;
    controls.zoomSpeed = 0.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 1;
    controls.maxPolarAngle = Math.PI / 2;

    controls.target.set(-70, 50, 0);
    controls.update();

    var width  = $container.width();
    var height = $container.height();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);



    var floorTexture = new THREE.ImageUtils.loadTexture( 'img/notasmusicais2.gif' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 6, 6 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide, transparent:true } );
    var floorGeometry = new THREE.PlaneGeometry(500, 500, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -20;
    floor.position.z = 0;
    floor.position.x =-80;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
   scene.add(floor);

   sphere.position.y = 0;
   sphere.position.z = -220;
   sphere.rotation.x = Math.PI / 2;
   sphere.receiveShadow = true;
   scene.add(sphere);

    const manager = new THREE.LoadingManager();
    manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
       /* var mp3 = document.getElementById("myAudio");
        mp3.play();*/
    };

    manager.onLoad = function ( ) {
        console.log( 'Loading complete!');
      
    };


    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url );
    };


    var loader = new THREE.GLTFLoader(manager);
        loader.load('models/happysynth/moni3.glb', function ( gltf ) {
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


    var loader = new THREE.GLTFLoader(manager);
    loader.load('models/happysynth/moni3pos2.glb', function ( gltf ) {
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
        
        mix = new THREE.AnimationMixer(gltf.scene);
        var actions = mix.clipAction(gltf.animations[0]);
        actions.play();
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


    var loader = new THREE.GLTFLoader(manager);
    loader.load('models/happysynth/moni3pos3.glb', function ( gltf ) {
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
        
        mixdos = new THREE.AnimationMixer(gltf.scene);
        var actions = mixdos.clipAction(gltf.animations[0]);
        actions.play();
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
        }, 59000);


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



   /* for (let x=0; x< 2000; x++){
        cameraChanges(x);
        textLyrics(x);
    }*/

    
  /*  
    random camera changes
  
  setInterval(function () {
        var rand =  Math.random()*2 - 1;
        camera.position.set(rand * camera.position.x, rand * camera.position.z, rand * camera.position.y);
    }, 3000);*/





    function animate() {

        sphere.rotation.z += 0.005;
        sphere.rotation.y += 0.005;


        requestAnimationFrame( animate );
        //var delta = clock.getDelta();
        var delta = clock.getDelta();
       /* var h = rmapped * 0.0200 % 1;
        var s = 0.5;
        var l = 0.5;
        frontLight.color.setHSL ( h, s, l );*/

        if (mix){
            mix.update(delta);
        }


        if (mixdos){
            mixdos.update(delta);
        }
        
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
        scene.add( pointlight ); 

        var pointlight = new THREE.HemisphereLight( 0xFFFFFF, 1 ); // soft white light
        pointlight.position.y=800;
        pointlight.position.z=1900;
        scene.add( pointlight ); 


        var pointlight = new THREE.PointLight( 0XFFFFFF , 1 ); // soft white light
        pointlight.position.y=600;
        pointlight.position.z=100;
        scene.add( pointlight ); 

        var pointlight = new THREE.HemisphereLight( 0XFFFFFF , 1 ); // soft white light
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
                camera.position.set(-100, 80, 130);
                controls.update();
            }, 200);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(-75, 68, 190);
                controls.update();
            }, 1800);
        
        
            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(-33, 129, 172);
                controls.update();
            }, 4800);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(0.7, 240, 105);
                controls.update();
            }, 6200);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(77.03, 281, 237);
                controls.update();
            }, 7700);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(129, 180, 289);
                controls.update();
            }, 11500);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(549, 500, 500);
                controls.update();
            }, 13700);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(129, 180, 289);
                controls.update();
            }, 17000);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(300, 300, 300);
                controls.update();
            }, 21100);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(0.7, 240, 105);
                controls.update();
            }, 32100);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(77.03, 281, 237);
                controls.update();
            }, 37440);

            setTimeout(function() {
                console.log("Bfrontview2");
                camera.position.set(500, 500, 500);
                controls.update();
            }, 41610);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(30, 30, 10);
                controls.update();
            }, 47200);

            setTimeout(function() {
                console.log("Afrontview1");
                camera.position.set(30, 20, -10);
                controls.update();
            }, 488200);
        
        
            setTimeout(function() {
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
            }, 54750);


    }

    

    function textLyrics() {
        setTimeout(function() {
            document.getElementById("lyrics").innerHTML="Me encanta compartir este sintetizador feliz, " + '<br>' + "que mis amigas de youtube me inspiraron a crear";
        }, 1750);
    
    
        setTimeout(function() {
            document.getElementById("lyrics").innerHTML="SINTETIZADOR" + '<br>' +  "FELIZ X3";
        }, 16960);

        setTimeout(function() {
            document.getElementById("lyrics").innerHTML="El día que escuche sus sintetizadores ya," + '<br>' + "me hipnorizaron a cantar, ¡no lo pude resistir!";
        }, 24600);

        setTimeout(function() {
            document.getElementById("lyrics").innerHTML="Ahora quiero compartir ese mismo feelin hacia ti," + '<br>' + "Amiga ponte a bailar, ¡no lo dejes de sentir!";
        }, 32135);

        setTimeout(function() {
            document.getElementById("lyrics").innerHTML="El día que entendí que el mundo no era para mí" + '<br>' + "Solo quize escuchar un sintetizador feliz.";
        }, 39600);

        setTimeout(function() {
            document.getElementById("lyrics").innerHTML="EN ESPAÑOL LATINO"  + '<br>' + " YEAAAAAA";
        }, 47050);


        setTimeout(function() {
            document.getElementById("lyrics").innerHTML="Solo quize escuchar un"  + '<br>' +  "SINTETIZADOR FELIZ";
        }, 50740);


    

    }



   /* setInterval(function(){
        console.log("listopmiherma");
        cameraChanges();
    }, 10000);*/
