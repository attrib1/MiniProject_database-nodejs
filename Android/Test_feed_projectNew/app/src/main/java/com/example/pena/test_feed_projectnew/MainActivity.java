package com.example.pena.test_feed_projectnew;

import android.content.Intent;
import android.graphics.Color;
import android.os.AsyncTask;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Adapter;
import android.widget.AdapterView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.RelativeLayout;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class MainActivity extends ActionBarActivity {
    private RelativeLayout layoutProgressLoading;
    private RelativeLayout layoutShowData;

    private SwipeRefreshLayout mSwipeRefreshLayout;
    private ListView mListView;
<<<<<<< HEAD
    private  Adapter mAdapter;
    private SwipeRefreshLayout mSwipeRefreshLayout;
   getUrl Url = new getUrl();
=======
    private Adapter mAdapter;
    getUrl Url = new getUrl();
>>>>>>> e54636407d81e535008104d15310dd7b4443d3d8

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

<<<<<<< HEAD
        mListView = (ListView)findViewById(R.id.listView);
        mSwipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_refresh);
        new SimpleTask().execute();
        SwipeRefresh();


    }

    private void SwipeRefresh() {
        mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                new SimpleTask().execute();
                mSwipeRefreshLayout.setRefreshing(false);
            }
        });

    }
=======
            Toolbar mToolBar = (Toolbar)findViewById(R.id.toolbar);
             mToolBar.setTitleTextColor(Color.WHITE);
            mToolBar.setTitle("Tog New");
            setSupportActionBar(mToolBar);


        layoutProgressLoading = (RelativeLayout) findViewById(R.id.progress);
        layoutShowData = (RelativeLayout) findViewById(R.id.Relation_Listview);
        mListView = (ListView) findViewById(R.id.listView);
        mSwipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_refresh);


        mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                mSwipeRefreshLayout.setColorSchemeResources(R.color.red, R.color.blue, R.color.green);
                new SimpleTask().execute();
                mSwipeRefreshLayout.setRefreshing(false);
            }
        });// end refresh

        new SimpleTask().execute();// call load data from web

    }//end oncreate
>>>>>>> e54636407d81e535008104d15310dd7b4443d3d8

    private void showdata(String jsonString) {
      /*  Gson gson = new Gson();
        MyModel myModel = gson.fromJson(jsonString,MyModel.class);
        StringBuilder builder = new StringBuilder();
        builder.setLength(0);
        List<MyModel> posts =  new ArrayList<myModel>();
        Toast.makeText(getApplicationContext(),"ss"+posts,Toast.LENGTH_LONG).show();*/
        /*for (MyModel.PostsEntity post : posts) {
            builder.append(post.getTitle());
            builder.append("\n\n");
        }*/
        //Toast.makeText(this,builder.toString(), Toast.LENGTH_SHORT).show();
        // textResult.setText(builder.toString());

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setDateFormat("M/d/yy hh:mm a"); //Format of our JSON dates
        Gson gson = gsonBuilder.create();
        List<MyModel> posts = new ArrayList<MyModel>();
        //Instruct GSON to parse as a Post array (which we convert into a list)
        posts = Arrays.asList(gson.fromJson(jsonString, MyModel[].class));
        mAdapter = new Adapters(this, posts);
        mListView.setAdapter((ListAdapter) mAdapter);
        final List<MyModel> finalPosts = posts;

        mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // Toast.makeText(getApplicationContext(),"title : "+ finalPosts.get(position).topicId,Toast.LENGTH_SHORT).show();

                Intent intent = new Intent(MainActivity.this, Desc_Activity.class);
                intent.putExtra("topicId", "" + finalPosts.get(position).topicId);
                startActivity(intent);
            }
        });
    }

    /*@Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
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
*/
    class SimpleTask extends AsyncTask<Void, Void, String> {


        @Override
        protected void onPreExecute() {
            super.onPreExecute();

            layoutShowData.setVisibility(View.GONE);
            layoutProgressLoading.setVisibility(View.VISIBLE);
        }

        @Override
        protected String doInBackground(Void... params) {

            OkHttpClient okHttpClient = new OkHttpClient();

            Request.Builder builder = new Request.Builder();
            Request request = builder.url(Url.mUrl + "/public").build();

            try {
                Response response = okHttpClient.newCall(request).execute();
                if (response.isSuccessful()) {
                    return response.body().string();
                } else {
                    Log.e("gooo","use net");
                    return "Not Success - code : " + response.code();
                }
            } catch (IOException e) {
                e.printStackTrace();
                Log.e("connot ", "use net");
                return "Error";
            }
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            layoutProgressLoading.setVisibility(View.GONE);
            layoutShowData.setVisibility(View.VISIBLE);
            if (s.equals("Error")){
                Toast.makeText(getApplicationContext(), "ไม่สามารถติดต่อกับเซิฟเวอร์ได้ / can't connect to server", Toast.LENGTH_SHORT).show();
            }else{
                showdata(s);// if can connect will show data in layout
            }


        }//end onPostExecute
    }//end Asyncrask

}//end class Main
