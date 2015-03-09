#pragma strict
import System.Reflection; 

var campos: Transform;
//var aim_script: itemevent;
private var oldobj: GameObject;
private var oldlight: GameObject;
var prefablight: GameObject; // 选择预设的手电筒光源

function Start () {

}

function OnTriggerEnter(collision : Collider){
	if (collision.CompareTag("trigger")){
		PlayerPrefs.SetInt("dialogflag",1);
   		PlayerPrefs.SetInt("currdialog",2);
   		PlayerPrefs.SetInt("dialogpage",1);
   		Destroy(collision.gameObject);
    }
}

function Update () {
	var pos: Vector3= campos.position;
	pos.x+=1;
 	var ray = Camera.main.ScreenPointToRay(Vector3(Screen.width/2,Screen.height/2,0));
 	var hit: RaycastHit;
	// Debug.Log(pos);
 	if(Physics.Raycast(ray,hit) && PlayerPrefs.GetInt("dialogflag")==0)
    {
          //Debug.DrawLine(ray);//划出射线，只有在scene视图中才能看到
          var gameObj:GameObject = hit.collider.gameObject;
          //Debug.Log("click object name is " + gameObj.name);
          //aim_script=gameObj.GetComponent(itemevent);
          if(gameObj.tag=="jiaohu" || gameObj.tag=="pickup")
          {		
          		// 将所有有交互的物体tag定为jiaohu,所有能拾取的物品tag定为pickup
                if(Input.GetMouseButtonDown(0))  // click events
                   	process(gameObj);             
           		if(oldobj!=gameObj)       //give it a spotlight
           		{
            		Destroy(oldlight,0); 
             		var lightpos:Vector3 =gameObj.transform.position;
             		lightpos.y+=2;		//hight of light.
             		var light:GameObject = Instantiate(prefablight,lightpos,prefablight.transform.rotation);
               		oldlight=light;
           		}      
				oldobj=gameObj;
          }
          else
          {
            	Destroy(oldlight,0); //对于非交互物体不打光
            	oldobj=gameObj;
          }        
	}
}

function process( obj: GameObject)
{  //此处对场景内物品事件进行处理

	if(obj.tag=="jiaohu")
	{
		if(obj.name=="bookshelf")
		{
			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC3S1.stringtoedit="一个书架，没什么特别的。";
		}
		else if(obj.name=="bed001")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC3S1.stringtoedit="一张床，看起来很舒适。";
   		}
  		else if(obj.name=="desktop_chouti")
  		{ 
  			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC3S1.stringtoedit="一张普通的书桌。";	
   		}
   		else if(obj.name=="StrangeBox1")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC3S1.stringtoedit="一个杂物箱。";	
   		}
   		else if(obj.name=="door_zhiwujian" || obj.name=="door_toilet" || obj.name=="door_parents")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC3S1.stringtoedit="门锁上了。";	
   		}	
   	}
}