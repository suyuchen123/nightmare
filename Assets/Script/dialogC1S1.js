#pragma strict

var aimtex: Texture;
var btntex: Texture;
static var stringtoedit: String="";

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
    GUI.skin.label.fontSize = 100;
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
     		else if((dialogNum==1&&page>9) || (dialogNum==2&&page>2) || (dialogNum==3&&page>8)){
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);	//对话结束，自由探索	
     		}
     		else if(dialogNum==4&&page>2){		//第一幕结束
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);
     			Application.LoadLevel("C2-S1");	//场景转换至第二幕
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
			stringtoedit = "------- （卧室） -------";
			break;
		case 2:
			stringtoedit = "吴明：呼,好可怕的噩梦";
			break;
		case 3:
			stringtoedit = "吴明：该下楼吃早餐了,不然妈妈要催促了。";
			break;
		case 4:
			stringtoedit = "（起床，走到房门口，试图开门）";
			break;
		case 5:
			stringtoedit = "吴明：（门怎么锁了！）";
			break;
		case 6:
			stringtoedit = "吴明（喊）：妈妈，你怎么把我的门锁住了！";
			break;
		case 7:
			stringtoedit = "妈妈（遥远的声音）：不是妈妈锁上的，是你自己锁的。妈妈也没办法帮你,自己想办法开门吧。";
			break;
		case 8:
			stringtoedit = "吴明：我自己？我什么时候锁过门。。。";
			break;
		case 9:
			stringtoedit = "吴明：不过我记得房间里有备用钥匙，找找吧。真是怪事。";
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
			stringtoedit = "吴明：（几个碗状艺术品）咦，碗里有把钥匙……不过不像是房门的钥匙啊……";
			break;
		case 2:
			stringtoedit = "------- （获得钥匙） -------";
			GeneralInventory.showItem(1);
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
			stringtoedit = "（发现一个有些显旧的音乐盒）";
			break;
		case 2:
			stringtoedit = "吴明：这是……礼物………………父亲的……礼物……";
			break;
		case 3:
			stringtoedit = "（打开音乐盒，静静的音乐响起，舒缓而温馨）";
			break;
		case 4:
			stringtoedit = "吴明：有些怀念呢，老爹的礼物……爸爸……";
			break;
		case 5:
			stringtoedit = "吴明（震惊）：对了，爸爸……去哪了？";
			break;
		case 6:
			stringtoedit = "（惊起，不慎碰掉音乐盒，底壳碎掉，掉出一把钥匙）";
			break;
		case 7:
			stringtoedit = "吴明：这不是房门的钥匙么！";
			break;
		case 8:
			stringtoedit = "------- （获得卧室房门钥匙） -------";
			GeneralInventory.showItem(2);
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
			stringtoedit = "------- （门开了!） -------";
			GeneralInventory.hideItem(2);
			break;
		case 2:
			stringtoedit = "妈妈：门打开了啊，快下来吃饭吧……";
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
}