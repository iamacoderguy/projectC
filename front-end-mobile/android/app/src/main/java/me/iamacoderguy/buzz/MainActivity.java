package me.iamacoderguy.buzz;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import android.os.Build;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "buzz";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    int themeId = R.style.SplashTheme;
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
      switch (Build.MANUFACTURER) {
        case "Xiaomi":
          themeId = R.style.SplashThemeXiaomi;
          break;
        default:
          break;
      }
    }

    SplashScreen.show(this, themeId);
    super.onCreate(savedInstanceState);
  }
}
