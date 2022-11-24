# Adding New API

Usually when developing new feature, we need to call an API. One file is for one API end point

1. Create new typescript file inside `/api` folder
   Note.

   - Place it in existing folder if it still related. example place `getOpeningHour.ts` in `restaurant` folder since it's still related
   - Create new group if will create many new API and related
   - Place it in `common` folder if the API context is not specific to any feature

2. import required module

```js
import useHttp from "~/composables/useHttp";
```

3. Create new `Type/Interfacae` to define API Response and Payload
   - Define API Response <br>
     Suppose `hungryhub.com/api/v5/config.json` have respond like this.
     ```js
     {
     "success": true,
     "data": {
     	"enable_gift_card_feature": true,
     	"we_travel_together_icon_url": "https://www.hungryhub.com/uploads/restaurants/tc/image/29/tc.png",
     	"show_distance_on_search_page": false,
     	"culture_locale": "th_TH",
     	"available_locales": [
     		"th",
     		"en"
     	],
     }
     }
     ```
   - Create new type for that response
   ```js
   type GetConfigAPIResponse = {
    success: boolean,
    data: {
      enableGiftCardFeature
    }
   }
   ```
