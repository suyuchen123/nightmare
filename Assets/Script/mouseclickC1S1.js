#pragma strict
import System.Reflection; 

var campos: Transform;
//var aim_script: itemevent;
private var oldobj: GameObject;
private var oldlight: GameObject;
var prefablight: GameObject; // 选择预设的手电筒光源
private var isDrawerOpen: int=0;

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
		if(obj.name=="book1")
		{
			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC1S1.stringtoedit="一些教科书，看上去很久没看了。";
		}
		else if(obj.name=="book2")
		{
			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC1S1.stringtoedit="一本侦探小说。";
		}
		else if(obj.name=="bed001")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC1S1.stringtoedit="一张床，看起来很舒适。";
   		}
   		else if(obj.name=="StrangeBox")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC1S1.stringtoedit="一个箱子，好像有机关。";	
   		}
  		else if(obj.name=="desktop_chouti")
  		{ 
  			if(GeneralInventory.haveItem(1)==0)
  			{
  				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC1S1.stringtoedit="（一张书桌，抽屉锁上了。）";		
  			}
  			else
  			{
  				if(isDrawerOpen==0){
  					obj.animation.Play("Take 001");
  					PlayerPrefs.SetInt("dialogflag",1);
  					isDrawerOpen=1;
 					dialogC1S1.stringtoedit="（抽屉锁上了，用碗中获得的钥匙打开了抽屉。）";
 					GeneralInventory.hideItem(1);	
  				}
  				else{	//抽屉已打开
  					PlayerPrefs.SetInt("dialogflag",1);
 					dialogC1S1.stringtoedit="一张书桌。";	
  				}
  			}		
   		}
   		else if(obj.name=="door002")
   		{
   			if(GeneralInventory.haveItem(2)==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC1S1.stringtoedit="门锁上了。得找到钥匙开门。";
   			}
   			else{
   				obj.animation.Play("opendoor");	//开门动画
   				//触发对话
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",4);
   				PlayerPrefs.SetInt("dialogpage",1);	
   			}
   		}
   	}
   	else	//tag=="pickup"
   	{
   		var item:PickUp; 
   		if(obj.name=="bowlandkey")	//碗中的钥匙 编号：1
   		{
   			if(GeneralInventory.haveItem(1)==0)
   			{  				
   				//触发对话
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",2);
   				PlayerPrefs.SetInt("dialogpage",1);	
   				//捡起钥匙
        		item = obj.GetComponent("PickUp");
        		item.setId(1);
        		item.hide();
        		GeneralInventory.AddItem(item);			
        	}
        	else	//已拾取过
        	{
        		PlayerPrefs.SetInt("dialogflag",1);
        		dialogC1S1.stringtoedit="几个碗状艺术品。";
        	}
        }
        else if(obj.name=="MusicBox")	//音乐盒底的钥匙 编号：2
        {
        	if(GeneralInventory.haveItem(2)==0 && isDrawerOpen==1)
        	{
 				//触发对话
        		PlayerPrefs.SetInt("dialogflag",1);
        		PlayerPrefs.SetInt("currdialog",3);
        		PlayerPrefs.SetInt("dialogpage",1);	
        		//拾到钥匙
        		item = obj.GetComponent("PickUp");
        		item.setId(2);
        		item.hide();
        		GeneralInventory.AddItem(item);	 	
        	}
        	else if(GeneralInventory.haveItem(2)==1){
        		PlayerPrefs.SetInt("dialogflag",1);
        		dialogC1S1.stringtoedit="一个有些显旧的音乐盒。";
        	}
        }
   	}  
}