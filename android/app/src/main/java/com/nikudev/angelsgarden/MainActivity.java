package com.nikudev.angelsgarden;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // DO NOT touch the WebView here — Capacitor handles it
        // If you need media autoplay, use a Capacitor plugin instead
    }
}
