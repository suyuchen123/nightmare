using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class GeneralInventory : MonoBehaviour
{
    const int ICON_HEIGHT = 66;
    private List<PickUp> inventory = new List<PickUp>();

    private void OnGUI() 
    {
        Rect itemlist = new Rect(0, 0, Screen.width / 2, ICON_HEIGHT);
        GUILayout.BeginArea(itemlist);
        GUILayout.BeginHorizontal();
       
        DisplayInventory();

        GUILayout.FlexibleSpace();
        GUILayout.EndHorizontal();
        GUILayout.EndArea();
    }

    private void DisplayInventory()
    {
        foreach (PickUp item in inventory)
            GUILayout.Label(item.icon);
    }

    private void OnTriggerEnter(Collider hitCollider)
    {
        if (hitCollider.CompareTag("pickup"))
        {
            PickUp item = hitCollider.GetComponent<PickUp>();
            inventory.Add(item);
            Destroy(hitCollider.gameObject);
        }
        else if (hitCollider.CompareTag("stoneDoor"))
        {
            OpenDoor(hitCollider.gameObject);
        }
    }

    private void OpenDoor(GameObject doorGO)
    {
        int colorKeyIndex = FindItemIndex(doorGO.tag);
        if (colorKeyIndex > -1)
        {
            inventory.RemoveAt(colorKeyIndex);
            Destroy(doorGO);
        }
        else
            doorGO.collider.isTrigger = false;
}

    private int FindItemIndex(string doorTag)
    {
        for (int i = 0; i < inventory.Count; i++)
        {
            PickUp item = inventory[i];
            if (item.fitsLockTag == doorTag)
                return i;
        }
        return -1;
    }
}
