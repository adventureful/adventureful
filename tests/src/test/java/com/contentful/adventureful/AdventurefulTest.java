package com.contentful.adventureful;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.SelenideElement;
import org.openqa.selenium.By;
import org.testng.annotations.Test;

import java.util.Random;

import static com.codeborne.selenide.Selenide.*;


/**
 * Our amazing walkthrough
 */
public class AdventurefulTest {


	@Test
	public void letsBeginThis() {
		open("/");
		for (int i = 0; i < RandomChoice.choices; i++) {
			sleep(3000);
			try {
				RandomChoice.getAnyElement($$(By.cssSelector(".list-group-item a"))).click();
			} catch (Exception e) {
				open("/");
			}
		}
	}


}
