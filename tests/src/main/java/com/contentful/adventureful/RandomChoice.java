package com.contentful.adventureful;

import com.codeborne.selenide.ElementsCollection;
import com.codeborne.selenide.SelenideElement;

import java.util.Random;

/**
 * Created by chuck on 09/01/2017.
 */
public class RandomChoice {

	public static int choices = Integer.parseInt(System.getProperty("choices", "20"));
	private static Random randomGenerator = new Random();

	public static SelenideElement getAnyElement(ElementsCollection elements) {
		SelenideElement item;
		if(!elements.isEmpty()) {
			int index = randomGenerator.nextInt(elements.size());
			item = elements.get(index);
			System.out.println("We choose to: " + item.getText());
		} else {
			item = null;
		}
		return item;
	}
}
