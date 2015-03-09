#pragma strict
import System.Reflection; 

var campos: Transform;
//var aim_script: itemevent;
private var oldobj: GameObject;
private var oldlight: GameObject;
var prefablight: GameObject; // 选择预设的手电筒光源
var prefabNewLight: GameObject;
var prefabNewWall: GameObject;
private var dialog2flag: int=0;	//第二段对话是否已触发
private var dialog5flag: int=0;	//第五段对话是否已触发
private var isDoorOpen: int=0;	//置物间门是否已开

function Start () {

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

	//Debug.Log(obj.name);
	if(obj.tag=="jiaohu")
	{
		if(obj.name=="bookshelf")
		{
			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="一个书架，没什么特别的。";
		}
		else if(obj.name=="bed001")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="一张床，看起来很舒适。";
   		}
   		else if(obj.name=="StrangeBox1")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="一个箱子，好像有机关。";	
   		}
  		else if(obj.name=="desktop_chouti")
  		{ 
  			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="一张普通的书桌。";	
   		}
   		else if(obj.name=="bedroom_door2")
   		{
   			if(dialog2flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="爸妈卧室的门被锁上了。先去置物间吧。";
   			}
   			else{
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="爸妈卧室的门被锁上了。";
   			}			
   		}
   		else if(obj.name=="yugang")
   		{
   			if(dialog2flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="空浴缸。先去置物间吧。";	
 			}
 			else{
 				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="空浴缸。";
 			}
   		}
   		else if(obj.name=="matong")
   		{
   			if(dialog2flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="一只马桶，盖子盖上了。先去置物间吧。";	
   			}
   			else{
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="一只马桶，盖子盖上了。";
   			}			
   		}
   		else if(obj.name=="bloodWall")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="墙上，有好多的血迹。";
   		}
   		else if(obj.name=="shuicao")
   		{
   			if(dialog2flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="普通的洗手池，里面水渍未干。先去置物间吧。";
   			}
   			else if(dialog5flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="普通的洗手池，里面水渍未干。";
   			}
   			else{	//dialog5flag=1
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",6);
   				PlayerPrefs.SetInt("dialogpage",1);
   			} 			
   		}
   		else if(obj.name=="door_zhiwujian")
   		{
   			if(dialog2flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",2);
   				PlayerPrefs.SetInt("dialogpage",1);
   				dialog2flag=1;
   			}
   			else{
   				if(GeneralInventory.haveItem(3)==1 && isDoorOpen==0)		//已获得置物间钥匙，开门
   				{
   					isDoorOpen=1;
   					obj.animation.Play("opendoor");
   					PlayerPrefs.SetInt("dialogflag",1);
   					PlayerPrefs.SetInt("currdialog",4);
   					PlayerPrefs.SetInt("dialogpage",1);
   					obj.Destroy(obj.GetComponent("BoxCollider"));
   				}
   				else if(GeneralInventory.haveItem(3)==0){
   					PlayerPrefs.SetInt("dialogflag",1);
 					dialogC2S1.stringtoedit="（置物间的门被锁上了,需要钥匙。）";
   				}
   			}
   			
   		}
   		else if(obj.name=="shelf2"||obj.name=="shelf3")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="一组木制架子，上面放置着些日常物品。";
   		}
   		else if(obj.name=="StrangeBox2")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="工具箱，看起来很新。";
   		}
   		else if(obj.name=="tools")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S1.stringtoedit="一些用于日常清扫的工具。";
   		}
   		else if(obj.name=="dianzha")
   		{
   			if(dialog5flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",5);
   				PlayerPrefs.SetInt("dialogpage",1);
   				var newLight : GameObject = Instantiate(prefabNewLight,prefabNewLight.transform.position,prefabNewLight.transform.rotation);
   				dialog5flag=1;
   				Destroy(GameObject.Find("bloodWall"));
   				var newWall: GameObject = Instantiate(prefabNewWall,prefabNewWall.transform.position,prefabNewWall.transform.rotation);
   			}
   			else{
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S1.stringtoedit="电闸。";
   			}
   		}
   	}
   	else	//tag=="pickup"
   	{
   		var item:PickUp; 
   		if(obj.name=="guizi_toilet")	//盥洗台柜子里的置物间钥匙 编号：3
   		{
   			if(dialog2flag==0){
   				PlayerPrefs.SetInt("dialogflag",1);
        		dialogC2S1.stringtoedit="盥洗台的柜子。先去置物间吧。";
   			}
   			else{
   				if(GeneralInventory.haveItem(3)==0)
   				{  				
   					//触发对话
   					PlayerPrefs.SetInt("dialogflag",1);
   					PlayerPrefs.SetInt("currdialog",3);
   					PlayerPrefs.SetInt("dialogpage",1);	
   					//捡起钥匙
        			item = obj.GetComponent("PickUp");
        			item.setId(3);
        			item.hide();
        			GeneralInventory.AddItem(item);			
        		}
        		else	//已拾取过
        		{
        			PlayerPrefs.SetInt("dialogflag",1);
        			dialogC2S1.stringtoedit="柜子里没有其他特别的东西了。";
        		}
   			}			
        }
   	}  
}