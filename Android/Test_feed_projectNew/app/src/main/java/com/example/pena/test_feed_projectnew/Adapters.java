package com.example.pena.test_feed_projectnew;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.List;

/**
 * Created by PENA on 24/9/2558.
 */
public class Adapters extends BaseAdapter{
    getUrl Url = new getUrl();

    Context mContext;
    ViewHolder mViewHolder;
    private LayoutInflater mInflater;
    List<MyModel> mPosts;

    public Adapters(Context context, List<MyModel> posts) {
        mPosts = posts;
        mInflater = (LayoutInflater) context.getSystemService(
                Context.LAYOUT_INFLATER_SERVICE);
        mContext = context;
    }

    @Override
    public int getCount() {
        return mPosts.size();
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        if (convertView == null) {
            convertView = mInflater.inflate(R.layout.custom_list_view, parent, false);
            mViewHolder = new ViewHolder();
            mViewHolder.img = (ImageView) convertView.findViewById(R.id.Img);

            mViewHolder.title = (TextView) convertView.findViewById(R.id.post_title);


            convertView.setTag(mViewHolder);

        } else {
            mViewHolder = (ViewHolder) convertView.getTag();
        }

        MyModel post = mPosts.get(position);

        mViewHolder.title.setText(post.titletopic);
        Picasso.with(mContext).load(Url.mUrl+"/images/"+post.pictopic).into(mViewHolder.img);


        return convertView;

    }
    private class ViewHolder{
        ImageView img;
        TextView title;

    }
}
