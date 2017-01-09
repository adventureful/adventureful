package com.adventureful.models;

import com.contentful.vault.ContentType;
import com.contentful.vault.Field;
import com.contentful.vault.Resource;

@ContentType("choice")
public class Choice extends Resource {
  @Field
  String name;

  @Field
  Page link;

  public String name() {
    return name;
  }

  public Page link() {
    return link;
  }
}
