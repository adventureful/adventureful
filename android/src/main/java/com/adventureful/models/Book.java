package com.adventureful.models;

import com.contentful.vault.ContentType;
import com.contentful.vault.Field;
import com.contentful.vault.Resource;

@ContentType("book")
public class Book extends Resource {
  @Field
  String title;

  @Field
  Page startingPage;

  @Field
  String description;

  public String title() {
    return title;
  }

  public Page startingPage() {
    return startingPage;
  }

  public String description() {
    return description;
  }
}
