using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GeneralInventory : MonoBehaviour
{
    const int ICON_HEIGHT = 66;
    private static List<PickUp> inventory = new List<PickUp>();

    /*private void OnGUI() 
    {
        Rect itemlist = new Rect(0, 0, Screen.width / 2, ICON_HEIGHT);
        GUILayout.BeginArea(itemlist);
        GUILayout.BeginHorizontal();
       
        DisplayInventory();

        GUILayout.FlexibleSpace();
        GUILayout.EndHorizontal();
        GUILayout.EndArea();
    }*/

    public static void DisplayInventory()
    {
		Rect itemlist = new Rect(0, 0, Screen.width / 2, ICON_HEIGHT);
		GUILayout.BeginArea(itemlist);
		GUILayout.BeginHorizontal();

        foreach (PickUp item in inventory) {
			if(item.getShowFlag()==1)
				GUILayout.Label (item.icon);
		}

		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		GUILayout.EndArea();
    }

	public static void AddItem(PickUp item)		//拾取到新物品
	{
		inventory.Add(item);
	}

	public static int haveItem(int i)	//是否已拥编号为i的道具，返回1-是，0-否
	{
		foreach (PickUp item in inventory) {
			if(item.getId()==i)
				return 1;
		}
		return 0;
	}

	public static void hideItem(int i)	//将编号为i的道具隐藏
	{
		foreach (PickUp item in inventory) {
			if(item.getId()==i){
				item.hide();
				break;
			}
		}
	}

	public static void showItem(int i)	//显示编号为i的道具
	{
		foreach (PickUp item in inventory) {
			if(item.getId()==i){
				item.show();
				break;
			}
		}
	}
}
