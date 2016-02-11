package com.example.pena.test_feed_projectnew;

import android.widget.TextView;

import com.google.gson.annotations.SerializedName;

public class MyModel {



    @SerializedName("id_topic")
    public int topicId;
    @SerializedName("title_topic")
    public String titletopic;
    @SerializedName("pic_topic")
    public String pictopic;
    @SerializedName("des_topic")
    public String destopic;

    public MyModel(){

    }


}