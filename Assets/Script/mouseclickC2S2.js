#pragma strict
import System.Reflection; 

var campos: Transform;
//var aim_script: itemevent;
private var oldobj: GameObject;
private var oldlight: GameObject;
var prefablight: GameObject; // 选择预设的手电筒光源
private var dialogLogo: int=0;	//关于logo的对话是否已触发
private var logoCount: int=0;	//logo被检查的次数
private var putLogo: int=0;		//是否已放下画作
private var dialogSpider: int=0;	//关于蜘蛛的对话是否已触发
private var putSpider: int=0;		//是否已放下蜘蛛
private var putBlood: int=0;		//是否已流血
private var dialogFazhen: int=0;	//关于法阵的对话是否已触发

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

	//Debug.Log(obj.name);
	if(obj.tag=="jiaohu")
	{
		if(obj.name=="bookshelf")
		{
			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="一个书架，没什么特别的。";
		}
		else if(obj.name=="bed001")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="一张床，看起来很舒适。";
   		}
  		else if(obj.name=="desktop_chouti")
  		{ 
  			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="一张普通的书桌。";	
   		}
   		else if(obj.name=="bedroom_door2")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="（爸妈房间的门锁上了。）";
   		}
   		else if(obj.name=="fazhen")
   		{
   			if(putLogo==0||putSpider==0||putBlood==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="看上去是一个三角形，三角形的三个顶点上各有一个圆台，圆台上又绘制着不同的图案。";
 			}
 			else if(GeneralInventory.haveItem(7)==0){
 				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",10);
   				PlayerPrefs.SetInt("dialogpage",1);
   				dialogFazhen=1;
 			}
 			else if(GeneralInventory.haveItem(7)==1){
 				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",11);
   				PlayerPrefs.SetInt("dialogpage",1);
 			}
   		}
   		else if(obj.name=="logoCircle")
   		{
   			if(logoCount<2){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="吴明：似乎…………是一只蝙蝠的图案……而且我好像在哪里见过……";
 				logoCount++;
 			}
 			else if(GeneralInventory.haveItem(4)==0){
 				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="吴明：想起来了，那个图案……应该就在我房里……";
 				dialogLogo=1;
 			}
 			else if(GeneralInventory.haveItem(4)==1 && putLogo==0){
 				PlayerPrefs.SetInt("dialogflag",1);		//放下画作
   				PlayerPrefs.SetInt("currdialog",4);
   				PlayerPrefs.SetInt("dialogpage",1);
   				putLogo=1;
 			}
 			else if(putLogo==1){
 				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="画着蝙蝠图案的圆台，圆台上放置着吴明曾经的画作。";
 			}
 		}
 		else if(obj.name=="spiderCircle")
 		{
 			if(GeneralInventory.haveItem(5)==0){
 				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="圆台上画着一只蜘蛛。";
 				dialogSpider=1;
 			}
 			else if(putSpider==0){
 				PlayerPrefs.SetInt("dialogflag",1);		//放下蜘蛛标本
   				PlayerPrefs.SetInt("currdialog",6);
   				PlayerPrefs.SetInt("dialogpage",1);
   				putSpider=1;
 			}
 			else{
 				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="画着蜘蛛图案的圆台，圆台上放置着一个蜘蛛标本。";
 			}
 		}
 		else if(obj.name=="bloodCircle")
 		{
 			if(putLogo==0 || putSpider==0){
 				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="圆台上什么都没有，好奇怪。";
 			}
 			else if(putBlood==0){
 				PlayerPrefs.SetInt("dialogflag",1);		
   				PlayerPrefs.SetInt("currdialog",7);
   				PlayerPrefs.SetInt("dialogpage",1);
   				putBlood=1;
 			}
 			else{
 				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="圆台上出现了一个红色的小球，小球在邪魅地发着光。";
 			}
 		}
   		else if(obj.name=="yugang")
   		{  			
 			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="空浴缸。";
   		}
   		else if(obj.name=="matong")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="一只马桶，盖子盖上了。";		
   		}
   		else if(obj.name=="shelf2"||obj.name=="shelf3")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="一组木制架子，上面放置着些日常物品。";
   		}
   		else if(obj.name=="StrangeBox2")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="工具箱，看起来很新。";
   		}
   		else if(obj.name=="tools")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="一些用于日常清扫的工具。";
   		}
   		else if(obj.name=="dianzha")
   		{
   			PlayerPrefs.SetInt("dialogflag",1);
 			dialogC2S2.stringtoedit="电闸，没什么异常。";
   		}
   	}
   	else	//tag=="pickup"
   	{
   		var item:PickUp; 
   		if(obj.name=="StrangeBox1")	//箱子里的画作 编号：4
   		{
   			if(dialogLogo==0){
   				PlayerPrefs.SetInt("dialogflag",1);
 				dialogC2S2.stringtoedit="一个箱子，好像有机关。";	
   			}
   			else{
   				if(GeneralInventory.haveItem(4)==0)
   				{  		
   					//拾取物品
        			item = obj.GetComponent("PickUp");
        			item.setId(4);
        			item.hide();
        			GeneralInventory.AddItem(item);		
   					//触发对话
   					PlayerPrefs.SetInt("dialogflag",1);
   					PlayerPrefs.SetInt("currdialog",3);
   					PlayerPrefs.SetInt("dialogpage",1);									
        		}
        		else	//已拾取过
        		{
        			PlayerPrefs.SetInt("dialogflag",1);
        			dialogC2S2.stringtoedit="箱子被打开了，没有发现什么特别的东西。";
        		}
   			}			
        }
        else if(obj.name=="muban")	//木板下的蜘蛛标本 编号：5
        {
        	if(dialogSpider==0){
        		PlayerPrefs.SetInt("dialogflag",1);
        		dialogC2S2.stringtoedit="一块木地板，上面似乎画着一只蜘蛛。";
        	}
        	else if(GeneralInventory.haveItem(5)==0){
        		//拾取物品
        		item = obj.GetComponent("PickUp");
        		item.setId(5);
        		item.hide();
        		GeneralInventory.AddItem(item);		
   				//触发对话
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",5);
   				PlayerPrefs.SetInt("dialogpage",1);	
        	}
        	else{
        		PlayerPrefs.SetInt("dialogflag",1);
        		dialogC2S2.stringtoedit="一块画着蜘蛛图案的木地板，底下是空的了。";
        	}       
        }
        else if(obj.name=="guizi_toilet")	//柜子中的塑料杯子 编号：6
        {
        	if(GeneralInventory.haveItem(6)==0){
        		//拾取物品
        		item = obj.GetComponent("PickUp");
        		item.setId(6);
        		item.hide();
        		GeneralInventory.AddItem(item);		
   				//触发对话
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",8);
   				PlayerPrefs.SetInt("dialogpage",1);	
        	}
        	else{
        		PlayerPrefs.SetInt("dialogflag",1);
        		dialogC2S2.stringtoedit="盥洗台的柜子，没什么特别的东西了。";
        	}
        }
        else if(obj.name=="shuicao")	//接一杯血水 编号：7
        {
        	if(dialogFazhen==0||GeneralInventory.haveItem(6)==0){
        		PlayerPrefs.SetInt("dialogflag",1);
        		dialogC2S2.stringtoedit="（拧开水龙头，依旧流出鲜红的血水。）";
        	}
        	else if(GeneralInventory.haveItem(7)==0){
        		//拾取物品
        		item = obj.GetComponent("PickUp");
        		item.setId(7);
        		item.hide();
        		GeneralInventory.AddItem(item);		
   				//触发对话
   				PlayerPrefs.SetInt("dialogflag",1);
   				PlayerPrefs.SetInt("currdialog",9);
   				PlayerPrefs.SetInt("dialogpage",1);	
        	} 
        	else{
        		PlayerPrefs.SetInt("dialogflag",1);
        		dialogC2S2.stringtoedit="（已经接了一杯鲜红的血水了。）";
        	}     
        }
   	}  
}