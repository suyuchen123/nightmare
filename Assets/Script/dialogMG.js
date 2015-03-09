#pragma strict

//var aimtex: Texture;
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
  	//GUI.DrawTexture(Rect((Screen.width/2)-20,(Screen.height/2)-20,40,40),aimtex);
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
     		else if(dialogNum==1&&page>4){
     			PlayerPrefs.SetInt("dialogflag",0); 	
     			PlayerPrefs.SetInt("currdialog",0);	//对话结束，自由探索	
     		}
     		else if(dialogNum==2&&page>5){		//第二幕场景一结束
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
			stringtoedit = "（走上楼，是一条长长的通道。）";
			break;
		case 2:
			stringtoedit = "（一阵强风吹来，暗含杀气。）";
			break;
		case 3:
			stringtoedit = "吴明：啊……往前走看看吧。";
			break;
		case 4:
			stringtoedit = "（键盘wasd或上下左右键控制角色朝向和走动。）";
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
		    stringtoedit = "父亲：臭小子，几点了，还不起床！";
			break;
		case 2:
		    stringtoedit = "吴明：啊？";
			break;
		case 3:
		    stringtoedit = "吴明：是梦啊……";
		    break;
		case 4:
		    stringtoedit = "父亲：臭小子，叫那么大声，还以为你咋了呢，快起床，吃饭了！";
		    break;
		case 5:
		    stringtoedit = "吴明：知道了，爸~";
		    break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
}