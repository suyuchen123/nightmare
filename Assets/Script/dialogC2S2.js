#pragma strict

var aimtex: Texture;
var btntex: Texture;
static var stringtoedit: String="";
var prefabpicture: GameObject;
var prefabspider: GameObject;
var prefabblood: GameObject;

function Start () {
	PlayerPrefs.SetInt("dialogflag",1);
	PlayerPrefs.SetInt("currdialog",1);	//当前显示第一段对话
	PlayerPrefs.SetInt("dialogpage",1);	//显示当前对话的第一页
}

function Update () {

}

function OnGUI()
{
	GeneralInventory.DisplayInventory();
	// Debug.Log(Rect((Screen.width/2)-20,(Screen.width/2)+20,(Screen.height/2)-20,(Screen.height/2)+20));
    GUI.DrawTexture(Rect((Screen.width/2)-20,(Screen.height/2)-20,40,40),aimtex);
    GUI.skin.label.fontSize = 20;
  	var flag:int =PlayerPrefs.GetInt("dialogflag");
  	var dialogNum : int;
	var page : int;
  	if(flag==1)
  	{
  		dialogNum = PlayerPrefs.GetInt("currdialog");
  		page = PlayerPrefs.GetInt("dialogpage");
  		setDialog(dialogNum,page);		//根据对话段与页数确定显示文字内容
  		GUI.TextArea(Rect(20,Screen.height/4*3,Screen.width-200,Screen.height/4-20),stringtoedit);
  		GUI.skin.textArea.fontSize = 40;
    	//Debug.Log(stringtoedit);
    	
    	if(GUI.Button(Rect(Screen.width/12*11,Screen.height-100,40,40),btntex))	//按下对话框边按钮
    	{
     		PlayerPrefs.SetInt("dialogpage",++page);	//下一页
     		if(dialogNum==0)	//查看的是物品说明，只有一句话
     			PlayerPrefs.SetInt("dialogflag",0); 
     		else if((dialogNum==1&&page>6) || (dialogNum==2&&page>6) || (dialogNum==3&&page>6) || 
     		(dialogNum==5&&page>5) || (dialogNum==8&&page>2) || (dialogNum==9&&page>4) || 
     		(dialogNum==10&&page>3)){
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);	//对话结束，自由探索	
     		}
     		else if(dialogNum==4&&page>2){
     			var picture : GameObject = Instantiate(prefabpicture,prefabpicture.transform.position,prefabpicture.transform.rotation);
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);	
     		}
     		else if(dialogNum==6&&page>3){
     			var spider : GameObject = Instantiate(prefabspider,prefabspider.transform.position,prefabspider.transform.rotation);
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);	
     		}
     		else if(dialogNum==7&&page>4){
     			var blood : GameObject = Instantiate(prefabblood,prefabblood.transform.position,prefabblood.transform.rotation);
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);	
     		}
     		else if(dialogNum==11&&page>10){		//第二幕场景一结束
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);
     			Application.LoadLevel("C3-S1");	//场景转换至第三幕场景一
     		}
    	}
  	}
}

function setDialog(dialogNum : int , page : int)
{
	if(dialogNum==1){
		switch(page)
		{
		case 1:
			stringtoedit = "------- （再次醒来） -------";
			break;
		case 2:
			stringtoedit = "（吴明在自己的卧室里，窗外依旧是昏暗的。外面传来了妈妈的声音。）";
			break;
		case 3:
			stringtoedit = "妈妈：太累了就休息吧，不要勉强自己。";
			break;
		case 4:
			stringtoedit = "吴明：妈，出事了，卫生间……";
			break;
		case 5:
			stringtoedit = "吴明：（还是不要说了吧。）";
			break;
		case 6:
			stringtoedit = "吴明：（但是总觉得怪怪的，再去检查一遍吧。）";
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}	
	}
	else if(dialogNum==2)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "------ （走出卧室） -------";
			break;
		case 2:
			stringtoedit = "吴明：这是，怎么回事！";
			break;
		case 3:
			stringtoedit = "（此时吴明看到，房间的门上、墙壁上、地板上，有着奇奇怪怪的类似咒符一样的东西，大厅中央还有一个奇怪的三角形。）";
			break;
		case 4:
			stringtoedit = "（同时，下楼的楼梯也不见了，整个第二层似乎成为了一个独立的存在。）";
			break;
		case 5:
			stringtoedit = "吴明：难道，是什么灵异鬼怪在作祟？或是有歹人要对我家不轨？";
			break;
		case 6:
			stringtoedit = "吴明：一定要想办法解决这个诡异的事情。";
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==3)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "一个箱子，好像有机关。";
			break;
		case 2:
			stringtoedit = "吴明：嗯，这个箱子里应该有什么重要的东西……";
			break;
		case 3:
			stringtoedit = "------- （解除机关，打开箱子） -------";		
			break;
		case 4:
			stringtoedit = "吴明：这不是我曾经画的画么！爸爸还夸奖过我";
			break;
		case 5:
			stringtoedit = "吴明：画上的图案好像和刚才看到的蝙蝠图案一模一样……";
			break;
		case 6:
			stringtoedit = "------- （获得曾经的画作） -------";
			GeneralInventory.showItem(4);
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==4)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "吴明：既然那副画作和这个蝙蝠图案一模一样，就先把画放在这里吧。";		
			break;
		case 2:
			stringtoedit = "------- （将画作放置在圆台上） -------";
			GeneralInventory.hideItem(4);
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==5)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "（地板上似乎画着一只蜘蛛。）";
			break;
		case 2:
			stringtoedit = "吴明：这块地板有些蹊跷，这蜘蛛会不会跟圆台上的蜘蛛图案有关呢？";
			break;
		case 3:
			stringtoedit = "（触碰地板时，似乎发现了什么机关，地板滑动，露出底下的空间。）";
			break;
		case 4:
			stringtoedit = "吴明（惊）：是这个蜘蛛标本啊！老爹当年用这个差点吓死我。）";
			break;
		case 5:
			stringtoedit = "------- （获得蜘蛛标本） -------";
			GeneralInventory.showItem(5);
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==6)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "（圆台上画着一只蜘蛛。）";
			break;
		case 2:
			stringtoedit = "吴明：把蜘蛛标本放在这上面试试。";
			break;
		case 3:
			stringtoedit = "------- （将蜘蛛标本放置在圆台上） -------";
			GeneralInventory.hideItem(5);
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==7)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "吴明：圆台上什么都没有呢…………这最后一个东西，是什么呢…………";
			break;
		case 2:
			stringtoedit = "（检查最后一个圆台，手指被莫名其妙地划破，流出了几滴血。）";
			break;
		case 3:
			stringtoedit = "（圆台上闪现亮光，显出一个红色的小球。）";
			break;
		case 4:
			stringtoedit = "吴明：这最后的物品，竟是我的血液么……………………";
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==8)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "（检查盥洗台下方的柜子，发现一个塑料杯子。）";
			break;
		case 2:
			stringtoedit = "------- （获得塑料杯子） -------";
			GeneralInventory.showItem(6);
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==9)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "（拧开水龙头，依旧流出鲜红的血水。）";
			break;
		case 2:
			stringtoedit = "吴明：不知道用这个血水可不可以填满法阵的凹槽呢……………………";
			break;
		case 3:
			stringtoedit = "吴明：先接一杯试试吧。";
			break;
		case 4:
			stringtoedit = "------- （获得一杯血水） -------";
			GeneralInventory.showItem(7);
			GeneralInventory.hideItem(6);
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==10)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "（法阵中间浮现了一个形状奇怪的阴刻图案，旁边有一行字：充盈吧，绯红之华。）";
			break;
		case 2:
			stringtoedit = "吴明：充盈吧，绯红之华……………………是什么意思呢……………………";
			break;
		case 3:
			stringtoedit = "吴明：是不是需要什么东西填充这个凹槽呢……………………";
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
	else if(dialogNum==11)
	{
		switch(page)
		{
		case 1:
			stringtoedit = "（法阵中间浮现了一个形状奇怪的阴刻图案，旁边有一行字：充盈吧，绯红之华。）";
			break;
		case 2:
			stringtoedit = "（用血水慢慢将图案的凹槽填满。）";
			GeneralInventory.hideItem(7);
			break;
		case 3:
			stringtoedit = "（法阵重新发出光芒，房屋中所有奇怪的图案都消失了，原本消失的楼梯也重新出现。）";
			break;
		case 4:
			stringtoedit = "吴明：似乎是解决了呢……这是？";
			break;
		case 5:
			stringtoedit = "（法阵中出现一把沾染了血迹的刀。）";
			break;
		case 6:
			stringtoedit = "吴明：这是爸爸送我的刀啊，为什么会有血迹？";
			break;	
		case 7:
			stringtoedit = "（遥远的声音）：哈哈哈哈，那是你父母的血，哈哈哈哈！";
			break;	
		case 8:
			stringtoedit = "（遥远的声音）：小子，愤怒吧，哈哈哈哈！";
			break;	
		case 9:
			stringtoedit = "吴明：你……";
			break;
		case 10:
			stringtoedit = "（晕厥过去。）";
			break;	
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
}