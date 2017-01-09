package com.contentful.adventureful;

import com.codeborne.selenide.ex.ElementNotFound;
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
			try {
				RandomChoice.getAnyElement($$(By.cssSelector(".list-group-item a"))).click();

				/** Validate presence of Image Asset */
				$(".container.page img").shouldBe(visible);

				/** Check images loaded with Images API*/
				String src = $(".container.page img").getAttribute("src");
				assertTrue(src.contains("images.contentful.com"), "Wrong url used in 'src' attr. Value:\n" + src);

				/** Validate presence of Choice Field */
				$(".container.page p").shouldBe(visible);
			} catch (NullPointerException en) {
				// Reload from the beginning, not a perfect one, c'mon it's a demo
				open("/");
			} catch (ElementNotFound el) {
				// Reload from the beginning
				open("/");
			}
		}
	}
}
