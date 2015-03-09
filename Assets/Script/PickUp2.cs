using UnityEngine;
using System.Collections;

public class PickUp : MonoBehaviour {
    public enum PickUpCatagory{KEY,HEALTH,SCORE}

    public Texture icon;
    public int points;
    public string fitsLockTag;
    public PickUpCatagory category;
}
