package com.adventureful;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.adventureful.models.AdventurefulSpace;
import com.contentful.java.cda.CDAAsset;
import com.contentful.java.cda.CDAClient;
import com.contentful.java.cda.CDAEntry;
import com.nostra13.universalimageloader.core.ImageLoader;
import com.nostra13.universalimageloader.core.ImageLoaderConfiguration;

import java.util.List;
import java.util.Map;

import butterknife.BindView;
import butterknife.ButterKnife;
import rx.Subscriber;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;

public class PageActivity extends AppCompatActivity {

  @BindView(R.id.page_title)
  public TextView title;

  @BindView(R.id.page_image)
  public ImageView image;

  @BindView(R.id.page_content)
  public TextView content;

  @BindView(R.id.page_buttons)
  public ViewGroup buttons;

  private CDAEntry page;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_page);
    ButterKnife.bind(this);

    ImageLoader.getInstance().init(ImageLoaderConfiguration.createDefault(this));

    final CDAClient client = CDAClient
        .builder()
        .setSpace(AdventurefulSpace.SPACE_ID)
        .setToken(AdventurefulSpace.CDA_TOKEN)
        .build();

    client
        .observe(CDAEntry.class)
        .one(getIntent().getStringExtra("id"))
        .subscribeOn(Schedulers.io())
        .observeOn(AndroidSchedulers.mainThread())
        .subscribe(new Subscriber<CDAEntry>() {
          @Override public void onCompleted() {
            // update book
            if (page != null) {
              final CDAAsset imageField = page.getField("image");
              if (imageField != null) {
                ImageLoader.getInstance().displayImage("https:" + imageField.url() + "?r=50&w=400", image);
              }

              content.setText((String) page.getField("body"));

              title.setText((String) page.getField("title"));

              List<CDAEntry> nextPage = page.getField("nextPage");
              if (nextPage != null) {
                int index = 0;
                for (final CDAEntry entry : nextPage) {
                  activateNavigationButton((String) entry.getField("name"), getLink(entry), index++);
                }
              }
            }
          }

          private String getLink(CDAEntry entry) {
            final Map<String, Object> link = (Map<String, Object>) entry.rawFields().get("link");
            final Map<String, Object> localized = (Map<String, Object>) link.get("en-US");
            final Map<String, Object> sys = (Map<String, Object>) localized.get("sys");
            return (String) sys.get("id");
          }


          @Override public void onError(Throwable e) {
            throw new RuntimeException(e);
          }

          @Override public void onNext(CDAEntry page) {
            PageActivity.this.page = page;
          }
        });
  }

  void activateNavigationButton(String text, final String id, int index) {
    if (buttons.getChildCount() > index) {
      final Button button = (Button) buttons.getChildAt(index);
      button.setText(text);
      button.setVisibility(View.VISIBLE);

      button.setOnClickListener(new View.OnClickListener() {
        @Override public void onClick(View view) {
          Intent intent = getIntent();
          intent.putExtra("id", id);
          finish();
          startActivity(intent);
        }
      });
    }
  }
}
