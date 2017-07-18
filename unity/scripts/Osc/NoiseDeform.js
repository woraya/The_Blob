#pragma strict

var NoiseScale = 0.001;		// 0.5
var speed = 0.01;			// 0.8
var recalculateNormals = false;

private var baseVertices : Vector3[];
private var noise : Perlin;

function Start ()
{
    noise = new Perlin ();
}

function Update () {
    var mesh : Mesh = GetComponent(MeshFilter).mesh;
	
    var intensity = GameObject.Find("OSC Receiver").GetComponent(OSCReceiver).NoiseIntensity;

    var scale = NoiseScale * intensity;

    if (baseVertices == null)
        baseVertices = mesh.vertices;
		
    var vertices = new Vector3[baseVertices.Length];
	
    var timex = Time.time * speed + 0.1365143;
    var timey = Time.time * speed + 1.21688;
    var timez = Time.time * speed + 2.5564;
    for (var i=0;i<vertices.Length;i++)
    {
        var vertex = baseVertices[i];
				
        vertex.x += noise.Noise(timex + vertex.x, timex + vertex.y, timex + vertex.z) * scale;
        vertex.y += noise.Noise(timey + vertex.x, timey + vertex.y, timey + vertex.z) * scale;
        vertex.z += noise.Noise(timez + vertex.x, timez + vertex.y, timez + vertex.z) * scale;
		
        vertices[i] = vertex;
    }
	
    mesh.vertices = vertices;
	
    if (recalculateNormals)	
        mesh.RecalculateNormals();
    mesh.RecalculateBounds();
}