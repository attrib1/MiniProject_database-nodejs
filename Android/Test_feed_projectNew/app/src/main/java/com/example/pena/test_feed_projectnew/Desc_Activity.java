package com.example.pena.test_feed_projectnew;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.squareup.picasso.Picasso;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Desc_Activity extends ActionBarActivity {
    getUrl Url = new getUrl();

    String topicId;
    TextView title_textView;
    TextView desc_textView;
    ImageView pic_ImagView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_desc);
        title_textView = (TextView) findViewById(R.id.desc_title);
        desc_textView = (TextView) findViewById(R.id.desc_desc);
        pic_ImagView = (ImageView) findViewById(R.id.desc_imageView);

        Bundle bundle = getIntent().getExtras();
        topicId = bundle.getString("topicId");
      //  Toast.makeText(getApplicationContext(), "id :" + topicId, Toast.LENGTH_SHORT).show();
        new SimpleTask().execute();
    }//end onCreate

    private void showdata(String jsonString) {

        GsonBuilder gsonBuilder = new GsonBuilder();
        // gsonBuilder.setDateFormat("M/d/yy hh:mm a"); //Format of our JSON dates
        Gson gson = gsonBuilder.create();
        List<MyModel> posts = new ArrayList<MyModel>();
        //Instruct GSON to parse as a Post array (which we convert into a list)
        posts = Arrays.asList(gson.fromJson(jsonString, MyModel[].class));

        final List<MyModel> finalPosts = posts;


        title_textView.setText("" + finalPosts.get(0).titletopic);
        desc_textView.setText(finalPosts.get(0).destopic);

        Picasso.with(this).load(Url.mUrl+"/images/"+finalPosts.get(0).pictopic).into(pic_ImagView);


    }//end showdata


    class SimpleTask extends AsyncTask<Void, Void, String> {
        @Override
        protected String doInBackground(Void... params) {
            OkHttpClient okHttpClient = new OkHttpClient();

            Request.Builder builder = new Request.Builder();
            Request request = builder.url(Url.mUrl + "/public/" + topicId).build();

            try {
                Response response = okHttpClient.newCall(request).execute();
                if (response.isSuccessful()) {
                    return response.body().string();
                } else {
                    return "Not Success - code : " + response.code();
                }
            } catch (IOException e) {
                e.printStackTrace();
                return "Error - " + e.getMessage();
            }
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            
            if (s.equals("Error")){
                Toast.makeText(getApplicationContext(), "ไม่สามารถติดต่อกับเซิฟเวอร์ได้ / can't connect to server", Toast.LENGTH_SHORT).show();
            }else{
                showdata(s);// if can connect will show data in layout
            }
        }
    }//end Asyncrask


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_desc, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}//end class
