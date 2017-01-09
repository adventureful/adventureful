package com.adventureful;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

import com.adventureful.models.AdventurefulSpace;
import com.contentful.java.cda.CDAArray;
import com.contentful.java.cda.CDAClient;
import com.contentful.java.cda.CDAEntry;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class MainActivity extends AppCompatActivity {

  @BindView(R.id.book_main)
  public View main;

  @BindView(R.id.book_title)
  public TextView title;

  @BindView(R.id.book_description)
  public TextView description;

  protected CDAEntry book;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    ButterKnife.bind(this);

    title.setClickable(false);
    description.setClickable(false);

    final CDAClient client = CDAClient
        .builder()
        .setSpace(AdventurefulSpace.SPACE_ID)
        .setToken(AdventurefulSpace.CDA_TOKEN)
        .build();

    client
        .observe(CDAEntry.class)
        .where("content_type", "book")
        .all()
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(new Subscriber<CDAArray>() {
          @Override public void onCompleted() {
            // update book
            if (book != null) {
              title.setText((String) book.getField("title"));
              title.setVisibility(View.VISIBLE);
              description.setText((String) book.getField("description"));
              description.setVisibility(View.VISIBLE);
            }
          }

          @Override public void onError(Throwable e) {
            throw new RuntimeException(e);
          }

          @Override public void onNext(CDAArray books) {
            MainActivity.this.book = (CDAEntry) books.items().get(0);
          }
        });
  }

  @OnClick(R.id.book_main)
  @SuppressWarnings("unused")
  public void onMainClicked(View view) {
    if (book != null) {
      final CDAEntry startingPage = book.getField("startingPage");
      final Intent intent = new Intent(this, PageActivity.class)
          .putExtra("id", startingPage.id());
      startActivity(intent);
    }
  }
}
