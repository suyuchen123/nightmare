#pragma strict

var aimtex: Texture;
var btntex: Texture;
var pauseflag : int =1;
var gamename: String = "NIGHTMARE";
var begingame: String = "Continue Game";
var quitgame: String = "Quit Game";

static var stringtoedit: String="";

function Start () {
	PlayerPrefs.SetInt("dialogflag",1);
	PlayerPrefs.SetInt("currdialog",1);	//当前显示第一段对话
	PlayerPrefs.SetInt("dialogpage",1);	//显示当前对话的第一页
}

function Update () {
 if(   Input.GetKeyDown(KeyCode.Q))
    {
        pauseflag=-pauseflag;
    }
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
        

    if(pauseflag == 1){
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
                else if((dialogNum==1&&page>5) || (dialogNum==2&&page>6) || (dialogNum==3&&page>4) || 
     		    (dialogNum==4&&page>2) || (dialogNum==5&&page>4)){
                    PlayerPrefs.SetInt("dialogflag",0); 	
                    PlayerPrefs.SetInt("currdialog",0);	//对话结束，自由探索	
                }
                else if(dialogNum==6&&page>6){		//第二幕场景一结束
                    PlayerPrefs.SetInt("dialogflag",0); 	
                    PlayerPrefs.SetInt("currdialog",0);
                    Application.LoadLevel("C2-S2");	//场景转换至第二幕场景二
                }
            }
        }
    }
    else if(pauseflag == -1)
    {
        GUI.Label(Rect(Screen.width / 2 -300, Screen.height / 4, 600, 100), gamename);
        GUI.skin.label.fontSize = 100;
        GUI.skin.button.fontSize = 50;
        if (GUI.Button(Rect(Screen.width / 2 -150, Screen.height / 2, 300, 50), begingame))
        {
            pauseflag = -pauseflag;
        }
        if (GUI.Button(Rect(Screen.width / 2 -150, Screen.height /2 + 150, 300, 50), quitgame))
        {
            Application.Quit();
        }
    }
}

function setDialog(dialogNum : int , page : int)
{
	if(dialogNum==1){
		switch(page)
		{
		case 1:
			stringtoedit = "------- （第二天） -------";
			break;
		case 2:
			stringtoedit = "吴明：怎么这么暗……现在几点了……";
			break;
		case 3:
			stringtoedit = "（时钟似乎坏了…………）";
			break;
		case 4:
			stringtoedit = "（开灯，灯不亮…………似乎停电了…………）";
			break;
		case 5:
			stringtoedit = "吴明：去置物间找下总闸看一下吧。";
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
			stringtoedit = "（置物间的门被锁上了。）";
			break;
		case 2:
			stringtoedit = "吴明：妈，置物间怎么上锁了？";
			break;
		case 3:
			stringtoedit = "（没有回应…………………………）";
			break;
		case 4:
			stringtoedit = "吴明：妈~~~妈………………";
			break;
		case 5:
			stringtoedit = "（还是没有回应…………………………）";
			break;
		case 6:
			stringtoedit = "吴明：不在家么？……………没办法，找找钥匙吧…………";
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
			stringtoedit = "（打开柜子）";
			break;
		case 2:
			stringtoedit = "吴明：咦，置物间的钥匙怎么会在这里……";
			break;
		case 3:
			stringtoedit = "------- （获得钥匙） -------";
			GeneralInventory.showItem(3);
			break;
		case 4:
			stringtoedit = "吴明：还有，墙上这是…………血迹？…………好可怕，这是怎么回事？……";
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
			stringtoedit = "------- （用钥匙打开了门!） -------";
			GeneralInventory.hideItem(3);
			break;
		case 2:
			stringtoedit = "吴明：地上怎么也有血迹………………？";
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
			stringtoedit = "（检查电闸：发现电闸被拉下了。重新拨回电闸，恢复电力供应。）";
			break;
		case 2:
			stringtoedit = "（灯亮了！）";
			break;
		case 3:
			stringtoedit = "吴明（定睛一看）：咦，血迹怎么不见了？";
			break;
		case 4:
			stringtoedit = "吴明：难道刚刚是错觉么？去卫生间看看血迹还在不在吧。";
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
			stringtoedit = "（返回卫生间查看，墙壁上的血迹也不见了………………）";
			break;
		case 2:
			stringtoedit = "吴明：最近是怎么了，总是发生这样奇怪的事情………………";
			break;
		case 3:
			stringtoedit = "吴明：算了，先洗把脸清醒一下吧。";
			break;
		case 4:
			stringtoedit = "（打开水龙头，发现流出了鲜红的…………血水…………）";
			break;
		case 5:
			stringtoedit = "吴明：啊啊啊啊啊！！！………………………………";
			break;	
		case 6:
			stringtoedit = "（受到惊吓，晕厥了过去………）";
			break;
		default:
			PlayerPrefs.SetInt("dialogflag",0);
		}
	}
}