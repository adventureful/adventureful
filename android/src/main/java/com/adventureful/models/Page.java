package com.adventureful.models;

import com.contentful.vault.Asset;
import com.contentful.vault.ContentType;
import com.contentful.vault.Field;
import com.contentful.vault.Resource;

import java.util.List;

@ContentType("page")
public class Page extends Resource {
  @Field
  String title;

  @Field
  String body;

  @Field
  Asset image;

  @Field
  List<Choice> nextPage;

  public String title() {
    return title;
  }

  public String body() {
    return body;
  }

  public Asset image() {
    return image;
  }

  public List<Choice> nextPage() {
    return nextPage;
  }
}
