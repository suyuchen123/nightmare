using UnityEngine;
using System.Collections;

public class PickUp : MonoBehaviour {
    public enum PickUpCatagory{KEY,HEALTH,SCORE}

	public PickUpCatagory category;
	public Texture icon;	//背包界面小图标  
	private int id;			//道具编号
	private int showFlag;	//是否显示在背包栏，0-不显示，1-显示

	public void setId(int i){
		id = i;
	}
	public int getId(){
		return id;
	}
	public int getShowFlag(){
		return showFlag;
	}
	public void show(){
		showFlag = 1;
	}
	public void hide(){
		showFlag = 0;
	}
}
