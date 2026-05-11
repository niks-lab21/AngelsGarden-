package com.niks.angelsgarden;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onWebViewCreated(WebView webView) {
        super.onWebViewCreated(webView);
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
    }
}
