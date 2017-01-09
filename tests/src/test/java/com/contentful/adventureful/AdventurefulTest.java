package com.contentful.adventureful;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import static com.codeborne.selenide.Selenide.*;


/**
 * Our amazing walkthrough
 */
public class AdventurefulTest {
	public int timeout = Integer.parseInt(System.getProperty("timeout", "2000"));

	@Test
	public void letsBeginThis() {
		open("/");
		for (int i = 0; i < RandomChoice.choices; i++) {
			sleep(timeout);
			try {
				RandomChoice.getAnyElement($$(By.cssSelector(".list-group-item a"))).click();
			} catch (Exception e) {
				open("/");
			}
		}
	}
}
