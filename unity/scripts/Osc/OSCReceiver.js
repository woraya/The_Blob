#pragma strict

public var RemoteIP : String = "127.0.0.1"; //127.0.0.1 signifies a local host (if testing locally
public var SendToPort : int = 5555; //the port you will be sending from
public var ListenerPort : int = 2222; //the port you will be listening on
public var controller : Transform;
public var controller2 : Transform;
public var NoiseIntensity : float = 0;

private var val : float;

// the OSC object
private var osc : Osc;
private var udp : Udp;

public var floorAnimator : Animator;
public var ceilAnimator : Animator;

function Start () {
    //NoiseIntensity = new float;
    
    udp = GetComponent("Udp");
    udp.init(RemoteIP, SendToPort, ListenerPort);

    osc = GetComponent("Osc");
    osc.init(udp);
    osc.SetAllMessageHandler(AllMessageHandler);
}

function Update () {
    NoiseIntensity = val;

    if( NoiseIntensity >= 40 ){

         floorAnimator.SetBool("squeeze",true);
         ceilAnimator.SetBool("squeeze",true);

    }
     else{
         floorAnimator.SetBool("squeeze",false);
         ceilAnimator.SetBool("squeeze",false);
    }
}
/*
public static function Log(message : String) {
    if(debug === true) { 
        Debug.Log(msg);
    }
}*/

public function AllMessageHandler(msg: OscMessage){

    // log the OSC message
    Debug.Log(osc.OscMessageToString(msg));

    // message parameters
    var address = msg.Address;
    var values = msg.Values;

    // variables to hold the data
    var group_id : String;

    // index of our world objects
    var i : int;

    // different actions, based on the address pattern
    switch (address){

        // FORMAT:  /cursor id group_id x y z x_world y_world z_world 
        case "/test":

            // extract the data
            
            val = values[0];

            // log the data

            Debug.Log(
                  "Noise Intensity: " + val
            );

            break;

    }
}