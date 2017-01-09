package com.adventureful.models;

@com.contentful.vault.Space(
    value = AdventurefulSpace.SPACE_ID,
    models = {Book.class, Choice.class, Page.class},
    locales = "en-US"
)
public class AdventurefulSpace {
  public final static String SPACE_ID = "c0gqj91rsyu1";
  public final static String CDA_TOKEN = "21c6c1ddb549280a1a3711ec849e8248f0a8f0e366b427730677c154db7c6d61";
}
