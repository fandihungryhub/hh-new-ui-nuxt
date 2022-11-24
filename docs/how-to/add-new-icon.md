# Adding new icon

Usually we need to add icon that come from figma from product team.

1. Copy / download the icon from figma as svg
2. rename it to be have prefix `icons-`
   example: `icon-star.svg`
3. move it to folder `/assets/icons`
4. open the file, and
   - remove any `width` and `height` attribute
   - add `stroke="currentColor"` and `fill="currentColor"` if there is none yet
5. Now you can use it in any component
   ```js
   import IconStar from "~icons/hh-icons/icon-star";
   ```
6. Don't forget adjust the width/height/color/background color using css class
   ```js
   <iconStar class="w-[8px] h-[8px] bg-red-500" />
   ```
