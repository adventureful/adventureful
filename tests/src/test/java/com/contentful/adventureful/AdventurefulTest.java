package com.contentful.adventureful;

import org.openqa.selenium.By;
import org.testng.annotations.Test;

import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.*;
import static org.testng.Assert.assertTrue;


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

			/** Validate presence of Image Asset */
			$(".container.page img").shouldBe(visible);

			/** Check images loaded with Images API*/
			String src = $(".container.page img").getAttribute("src");
			assertTrue(src.contains("images.contentful.com"), "Wrong url used in 'src' attr. Value:\n" + src);

			/** Validate presence of  Choice Field*/
			$(".container.page p").shouldBe(visible);
			try {
				RandomChoice.getAnyElement($$(By.cssSelector(".list-group-item a"))).click();
			} catch (Exception e) {
				open("/");
			}
		}
	}
}
