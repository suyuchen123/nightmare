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
	GUI.skin.textArea.fontSize = 40;
  	var flag:int =PlayerPrefs.GetInt("dialogflag");
  	var dialogNum : int;
	var page : int;
  	if(flag==1)
  	{
  		dialogNum = PlayerPrefs.GetInt("currdialog");
  		page = PlayerPrefs.GetInt("dialogpage");
  		setDialog(dialogNum,page);		//根据对话段与页数确定显示文字内容
    	GUI.TextArea(Rect(20,Screen.height/4*3,Screen.width-200,Screen.height/4-20),stringtoedit);
    	//Debug.Log(stringtoedit);
    	
    	if(GUI.Button(Rect(Screen.width/12*11,Screen.height-100,40,40),btntex))	//按下对话框边按钮
    	{
     		PlayerPrefs.SetInt("dialogpage",++page);	//下一页
     		if(dialogNum==0)	//查看的是物品说明，只有一句话
     			PlayerPrefs.SetInt("dialogflag",0); 
     		else if(dialogNum==1&&page>5){
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);	//对话结束，自由探索	
     		}
     		else if(dialogNum==2&&page>3){		//第二幕场景一结束
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);
     			Application.LoadLevel("mazeGame");	//场景转换至走迷宫
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
			stringtoedit = "吴明（惊起）：呼……真是可怕的噩梦。";
			break;
		case 2:
			stringtoedit = "（视角转到书桌，看到放置其上的那把沾染血迹的刀。）";
			break;
		case 3:
			stringtoedit = "吴明：不是梦么…………妈妈……爸爸！";
			break;
		case 4:
			stringtoedit = "（空荡荡的房子传来回声）";
			break;
		case 5:
			stringtoedit = "吴明：这是怎么回事！谁搞的鬼！";
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
			stringtoedit = "------ （准备上楼） -------";
			break;
		case 2:
			stringtoedit = "画外音：哈哈哈哈，小子，破除了我的阵法，敢上来与我一战吗？";
			break;
		case 3:
			stringtoedit = "吴明：（父母真是遇险了吗，不行，我要冷静，这之上就是幕后真凶，小心为上。）";
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
}