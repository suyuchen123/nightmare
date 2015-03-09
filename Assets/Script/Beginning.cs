using UnityEngine;
using System.Collections;

public class Beginning : MonoBehaviour
{
    private string name, begingame, quitgame;

    void Start()
    {
        name = "NIGHTMARE";
        begingame = "Start Game";
        quitgame = "Quit Game";
    }

    // Update is called once per frame
    void OnGUI()
    {
        GUI.Label(new Rect(Screen.width / 2 -300, Screen.height / 4, 600, 100), name);
        GUI.skin.label.fontSize = 100;
        GUI.skin.button.fontSize = 50;
        if (GUI.Button(new Rect(Screen.width / 2 -150, Screen.height / 2, 300, 50), begingame))
        {
            Application.LoadLevel("C1-S1");
        }
        if (GUI.Button(new Rect(Screen.width / 2 -150, Screen.height /2 + 150, 300, 50), quitgame))
        {
            Application.Quit();
        }
    }
}
